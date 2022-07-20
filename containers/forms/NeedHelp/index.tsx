import classNames from "classnames/bind";
import Contacts from "components/Contacts";
import Button from "components/UIKit/Button";
import TextareaField from "components/UIKit/TextareaField";
import TextField from "components/UIKit/TextField";
import { useFormField } from "helpers";
import { FC, FormEventHandler, useCallback, useState } from "react";
import { useTranslation } from "next-i18next";
import { useDropzone, DropzoneOptions } from "react-dropzone";
import styles from "./index.module.scss";
import {
  IconAttach,
  IconCheck,
  IconClose,
  IconDoc,
  IconTrash,
} from "components/Icons";
import ButtonLink from "components/UIKit/ButtonLink";
import Title from "components/UIKit/Title";
import Container from "components/UIKit/Container";
import makeHelpRequest from "api/makeHelpRequest";
import { useRouter } from "next/router";
import Loader from "assets/loader.svg";
const cx = classNames.bind(styles);

type Attachment = {
  file: File;
};

const FormNeedHelp: FC<{ isIntroPage?: boolean }> = ({ isIntroPage }) => {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const fullName = useFormField("");
  const organization = useFormField("");
  const email = useFormField("");
  const phone = useFormField("");
  const message = useFormField("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  const onDrop = useCallback<NonNullable<DropzoneOptions["onDrop"]>>(
    (acceptedFiles) => {
      setAttachments([
        ...attachments,
        ...acceptedFiles.map((file) => ({ file })),
      ]);
    },
    []
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
  });

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    setLoading(true);

    const response = await makeHelpRequest({
      locale,
      full_name: fullName.value,
      organization_name: organization.value,
      email: email.value,
      phone_number: phone.value,
      message: message.value,
      file: attachments.map(({ file }) => file),
    });

    if (response.error) {
      setError(response.error.message);
    } else if (!response.data) {
      setError(t("formNeedHelp.error.description"));
    } else {
      if ("id" in response.data) {
        setIsSuccess(true);
      } else {
        if (response.data.full_name) {
          fullName.changeError(response.data.full_name[0]);
        }
        if (response.data.organization_name) {
          organization.changeError(response.data.organization_name[0]);
        }
        if (response.data.email) {
          email.changeError(response.data.email[0]);
        }
        if (response.data.phone_number) {
          phone.changeError(response.data.phone_number[0]);
        }
        if (response.data.message) {
          message.changeError(response.data.message[0]);
        }
        if (response.data.file) {
          setError(response.data.file[0]);
        }
      }
    }

    setLoading(false);
  };

  return (
    <Container className={cx("Component", { isIntroPage })}>
      <div className={cx("Details")}>
        <Title tag={isIntroPage ? "h2" : "h1"}>{t("formNeedHelp.title")}</Title>

        <p>{t("formNeedHelp.description.0")}</p>
        <p>{t("formNeedHelp.description.1")}</p>

        <Contacts className={cx("Contacts")} />
      </div>

      <div className={cx("FormContainer")}>
        <form {...getRootProps()} onSubmit={onSubmit} className={cx("Form")}>
          <div className={cx("FieldRow")}>
            <TextField
              value={fullName.value}
              error={fullName.error}
              onChange={(e) => fullName.change(e.target.value)}
              label={t("formNeedHelp.formFields.fullName")}
            />
            <TextField
              value={organization.value}
              error={organization.error}
              onChange={(e) => organization.change(e.target.value)}
              label={t("formNeedHelp.formFields.organization")}
            />
          </div>
          <div className={cx("FieldRow")}>
            <TextField
              type="email"
              value={email.value}
              error={email.error}
              onChange={(e) => email.change(e.target.value)}
              label={t("formNeedHelp.formFields.email")}
            />
            <TextField
              value={phone.value}
              error={phone.error}
              onChange={(e) => phone.change(e.target.value)}
              label={t("formNeedHelp.formFields.phone")}
            />
          </div>
          <TextareaField
            value={message.value}
            error={message.error}
            onChange={(e) => message.change(e.target.value)}
            label={t("formNeedHelp.formFields.message")}
          />

          <div onClick={open} className={cx("FileField")}>
            <p className={cx("FileFieldDragHint", { isDragActive })}>
              {t("formNeedHelp.formFields.attachments.dragHint")}
            </p>
            <i className={cx("FileFieldIcon")}>
              <IconAttach />
            </i>
            <div>
              <p className={cx("FileFieldLabel")}>
                {t("formNeedHelp.formFields.attachments.label")}
              </p>
              <p className={cx("FileFieldDescription")}>
                {t("formNeedHelp.formFields.attachments.description")}
              </p>
            </div>

            <input {...getInputProps()} />
          </div>

          {attachments.length > 0 && (
            <ul className={cx("AttachmentList")}>
              {attachments.map((attachment, i) => (
                <li key={attachment.file.name + i} className={cx("Attachment")}>
                  <i className={cx("AttachmentIcon")}>
                    <IconDoc />
                  </i>

                  <div className={cx("AttachmentMain")}>
                    <p className={cx("AttachmentName")}>
                      {attachment.file.name}
                    </p>
                    <div className={cx("AttachmentActions")}>
                      <ButtonLink onClick={() => removeAttachment(i)}>
                        <IconTrash />
                        <span>
                          {t("formNeedHelp.formFields.attachments.remove")}
                        </span>
                      </ButtonLink>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <Button type="submit" className={cx("FormBtnSubmit")} color="primary">
            {t("formNeedHelp.btnSubmit")}
          </Button>

          {loading && (
            <div className={cx("Loader")}>
              <Loader />
            </div>
          )}

          {isSuccess && (
            <div className={cx("SuccessScreen")}>
              <i>
                <IconCheck />
              </i>

              <p>
                <b>{t("formNeedHelp.success.title")}</b>
              </p>
              <p>{t("formNeedHelp.success.description")}</p>
            </div>
          )}

          {error && (
            <div className={cx("ErrorScreen")}>
              <i>
                <IconClose />
              </i>

              <p>
                <b>{t("formNeedHelp.error.title")}</b>
              </p>
              <p>{error}</p>

              <Button
                type="button"
                color="primary"
                onClick={() => setError("")}
              >
                {t("formNeedHelp.error.btn")}
              </Button>
            </div>
          )}
        </form>
      </div>
    </Container>
  );
};

export default FormNeedHelp;
