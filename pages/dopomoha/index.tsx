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
import { FC, FormEventHandler, useState } from "react";
import { useTranslation } from "next-i18next";
import styles from "./index.module.scss";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import SEO from "components/SEO";
import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import getFundDocuments, {
  GetFundsDocumentsResponse,
} from "api/getFundDocuments";
import makePayment from "api/makePayment";
import { useRouter } from "next/router";
import getPaymentSystemFondy, {
  GetPaymentSystemFondyResponse,
} from "api/getPaymentSystemFondy";
import getPaymentDetails, {
  GetPaymentDetailsResponse,
} from "api/getPaymentDetails";
const cx = classNames.bind(styles);

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const PageDonate = ({ docs, paymentDetails, paymentSystemFondy }: Props) => {
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
          <DonateForm data={paymentSystemFondy} />
          <div className={cx("FormSectionAdditionalDetails")}>
            <p className={cx("FormSectionDescription")}>
              {t("pageDonate.donate.description")}
            </p>
          </div>
        </section>
      </Container>

      <Container className={cx("AdditionalContainer")}>
        <Requisites data={paymentDetails} />
        <ContactsWithMap />
        <DocumentsAndReports data={docs} />
      </Container>
    </main>
  );
};

const DonateForm = ({ data }: { data: GetPaymentSystemFondyResponse }) => {
  const [t] = useTranslation();
  const amount = useFormField("");
  const currency = useFormField(data.currencies[0].name);
  const { locale } = useRouter();
  const [loading, setLoading] = useState(false);

  const dropdown = useDropdown({
    popperOptions: { placement: "bottom-end" },
  });

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    setLoading(true);

    const response = await makePayment({
      locale,
      amount: Number(amount.value.replace(",", ".")).toFixed(2),
      currency: currency.value,
    });

    if (response.error) {
      amount.changeError(response.error.message);
    } else if (!response.data) {
      amount.changeError(t("pageDonate.donate.form.errors.globalError"));
    } else {
      if ("checkout_url" in response.data) {
        if (!response.data.checkout_url) {
          amount.changeError(t("pageDonate.donate.form.errors.globalError"));
        } else {
          document.location.assign(response.data.checkout_url);
        }
      } else {
        const error = response.data.amount[0] || response.data.currency[0];
        amount.changeError(
          t([`pageDonate.donate.form.errors.${error}`, error])
        );
      }
    }

    setLoading(false);
  };

  return (
    <form onSubmit={onSubmit} className={cx("DonateForm")}>
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
              {data.currencies.map(({ name: item }) => {
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

      <Button
        disabled={loading}
        className={cx("DonateFormSubmit")}
        color="primary"
        type="submit"
      >
        {t("pageDonate.donate.form.submit", {
          amount: amount.value || 0,
          currency: currency.value,
        })}
      </Button>
    </form>
  );
};

const Requisites = ({ data }: { data: GetPaymentDetailsResponse }) => {
  const [t] = useTranslation();
  const [selectedCurrency, setSelectedCurrency] = useState(
    data[0].currency_code
  );
  const selectedPaymentMethod = data.find(
    ({ currency_code }) => currency_code === selectedCurrency
  );

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
            {data.map(({ currency_code }) => (
              <Button
                key={currency_code}
                color={currency_code === selectedCurrency ? "primary" : "grey"}
                onClick={() => setSelectedCurrency(currency_code)}
              >
                {currency_code}
              </Button>
            ))}
          </div>
        </div>

        <ul className={cx("RequisitesMain")}>
          {selectedPaymentMethod.fields.map(({ name, value }) => (
            <RequisitesItem name={name} value={value} key={name} />
          ))}
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

export const getServerSideProps: GetServerSideProps<{
  docs?: null | GetFundsDocumentsResponse;
  paymentSystemFondy?: null | GetPaymentSystemFondyResponse;
  paymentDetails?: null | GetPaymentDetailsResponse;
}> = async ({ locale }) => {
  const docsData = await getFundDocuments({
    locale,
  });

  const paymentSystemFondyData = await getPaymentSystemFondy({ locale });
  const paymentDetailsData = await getPaymentDetails({ locale });

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      docs: docsData.error || !docsData.data ? null : docsData.data,
      paymentSystemFondy:
        paymentSystemFondyData.error || !paymentSystemFondyData.data
          ? null
          : paymentSystemFondyData.data,
      paymentDetails:
        paymentDetailsData.error || !paymentDetailsData.data
          ? null
          : paymentDetailsData.data,
    },
  };
};

export default PageDonate;
