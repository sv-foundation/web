import classNames from "classnames/bind";
import ContactsWithMap from "components/ContactsWithMap";
import DocumentsAndReports from "components/DocumentsAndReports";
import { IconArrowDown, IconCopy } from "components/Icons";
import Button from "components/UIKit/Button";
import ButtonLink from "components/UIKit/ButtonLink";
import Container from "components/UIKit/Container";
import TextField from "components/UIKit/TextField";
import Title from "components/UIKit/Title";
import { useCopy, useDropdown, useFormField } from "helpers";
import { FC, useState } from "react";
import { useTranslation } from "next-i18next";
import styles from "./index.module.scss";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import SEO from "components/SEO";
const cx = classNames.bind(styles);

const PageDonate = () => {
  const [t] = useTranslation();

  return (
    <main className={cx("Page")}>
      <SEO
        title={t("pageDonate.seo.title")}
        description={t("pageDonate.seo.title")}
      />

      <Container className={cx("FormSectionContainer")}>
        <section className={cx("FormSection")}>
          <div className={cx("FormSectionDetails")}>
            <h1 className={cx("FormSectionTitle")}>
              {t("pageDonate.donate.title")}
            </h1>

            <p className={cx("FormSectionDescription")}>
              {t("pageDonate.donate.description")}
            </p>
          </div>
          <DonateForm />
          <div className={cx("FormSectionAdditionalDetails")}>
            <p className={cx("FormSectionDescription")}>
              {t("pageDonate.donate.description")}
            </p>
          </div>
        </section>
      </Container>

      <Container className={cx("AdditionalContainer")}>
        <Requisites />
        <ContactsWithMap />
        <DocumentsAndReports />
      </Container>
    </main>
  );
};

const CURRENCIES = ["UAH", "USD", "EUR"];

const DonateForm = () => {
  const [t] = useTranslation();
  const amount = useFormField("");
  const currency = useFormField("UAH");

  const dropdown = useDropdown({
    popperOptions: { placement: "bottom-end" },
  });

  return (
    <form className={cx("DonateForm")}>
      <h6 className={cx("DonateFormTitle")}>
        {t("pageDonate.donate.form.title")}
      </h6>

      <TextField
        label={t("pageDonate.donate.form.amount")}
        value={amount.value}
        onChange={(e) => amount.change(e.target.value)}
        error={amount.error}
        rightControl={
          <div
            onClick={(e) => e.stopPropagation()}
            className={cx("DonateFormCurrency")}
            ref={dropdown.setRef}
          >
            <ButtonLink
              color="green"
              type="button"
              onClick={dropdown.toggle}
              className={cx(
                "DonateFormCurrencyControl",
                dropdown.open && "active"
              )}
            >
              <span>{currency.value}</span>
              <IconArrowDown className={cx("IconArrow")} />
            </ButtonLink>

            <ul
              ref={dropdown.setPopperRef}
              style={dropdown.popper.styles.popper}
              {...dropdown.popper.attributes.popper}
              className={cx("DonateFormCurrencyContent")}
              data-open={dropdown.open || undefined}
            >
              {CURRENCIES.map((item) => {
                const isSelected = item === currency.value;
                return (
                  <li key={item}>
                    <button
                      type="button"
                      onClick={() => {
                        currency.change(item);
                        dropdown.toggle();
                      }}
                      data-active={isSelected || undefined}
                    >
                      <span tabIndex={-1}>
                        <span>{item}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        }
      />

      <Button className={cx("DonateFormSubmit")} color="primary" type="submit">
        {t("pageDonate.donate.form.submit", {
          amount: amount.value || 0,
          currency: currency.value,
        })}
      </Button>
    </form>
  );
};

const Requisites = () => {
  const [t] = useTranslation();
  const [selectedCurrency, setSelectedCurrency] = useState(CURRENCIES[0]);

  return (
    <section className={cx("Requisites")}>
      <Container>
        <div className={cx("RequisitesHeader")}>
          <div className={cx("RequisitesHeaderMain")}>
            <Title tag="h2" className={cx("RequisitesTitle")}>
              {t("pageDonate.requisites.title")}
            </Title>
            <p className={cx("RequisitesDescription")}>
              {t("pageDonate.requisites.description")}
            </p>
          </div>

          <div className={cx("RequisitesCurrencyList")}>
            {CURRENCIES.map((code) => (
              <Button
                key={code}
                color={code === selectedCurrency ? "primary" : "grey"}
                onClick={() => setSelectedCurrency(code)}
              >
                {t(`global.currency.${code}`)}
              </Button>
            ))}
          </div>
        </div>

        <ul className={cx("RequisitesMain")}>
          <RequisitesItem name="Name" value="Value" />
          <RequisitesItem name="Name" value="Value" />
          <RequisitesItem name="Name" value="Value" />
          <RequisitesItem name="Name" value="Value" />
          <RequisitesItem name="Name" value="Value" />
          <RequisitesItem name="Name" value="Value" />
          <RequisitesItem name="Name" value="Value" />
          <RequisitesItem name="Name" value="Value" />
          <RequisitesItem name="Name" value="Value" />
          <RequisitesItem name="Name" value="Value" />
        </ul>
      </Container>
    </section>
  );
};

const RequisitesItem: FC<{ value: string; name?: string }> = ({
  value,
  name,
}) => {
  const copy = useCopy();
  return (
    <li className={cx("RequisitesItem")}>
      <button type="button" onClick={() => copy(value)}>
        {name && <span className={cx("RequisitesItemName")}>{name}</span>}
        <span className={cx("RequisitesItemValue")}>
          <b>{value}</b>
          <i className={cx("RequisitesItemIcon")}>
            <IconCopy />
          </i>
        </span>
      </button>
    </li>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default PageDonate;
