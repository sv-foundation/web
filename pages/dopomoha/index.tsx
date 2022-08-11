import getFundDocuments, {
  GetFundsDocumentsResponse,
} from "api/getFundDocuments";
import getPaymentDetails, {
  GetPaymentDetailsResponse,
} from "api/getPaymentDetails";
import getPaymentSystemFondy, {
  GetPaymentSystemFondyResponse,
} from "api/getPaymentSystemFondy";
import makePayment from "api/makePayment";
import classNames from "classnames/bind";
import ContactsWithMap from "components/ContactsWithMap";
import DocumentsAndReports from "components/DocumentsAndReports";
import { IconArrowDown, IconCheck, IconCopy, IconQr } from "components/Icons";
import ModalWithQr from "components/ModalWithQr";
import QR from "components/QR";
import SEO from "components/SEO";
import Button from "components/UIKit/Button";
import ButtonLink from "components/UIKit/ButtonLink";
import Container from "components/UIKit/Container";
import TextField from "components/UIKit/TextField";
import Title from "components/UIKit/Title";
import {
  BREAKPOINT_PHONE,
  CRYPTO_ADDRESS_BTC,
  CRYPTO_ADDRESS_ERC20,
  CRYPTO_ADDRESS_TRX20,
} from "constant";
import { useCopy, useDropdown, useFormField, useWidthCondition } from "helpers";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useEffect,
  useMemo,
  useState,
} from "react";
import styles from "./index.module.scss";
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
          {paymentSystemFondy && <DonateForm data={paymentSystemFondy} />}
          <div className={cx("FormSectionAdditionalDetails")}>
            <p className={cx("FormSectionDescription")}>
              {t("pageDonate.donate.description")}
            </p>
          </div>
        </section>
      </Container>

      <Container className={cx("AdditionalContainer")}>
        {paymentDetails && <Requisites data={paymentDetails} />}
        <ContactsWithMap />
        {docs && <DocumentsAndReports data={docs} />}
      </Container>
    </main>
  );
};

const DonateForm = ({ data }: { data: GetPaymentSystemFondyResponse }) => {
  const [t] = useTranslation();
  const amount = useFormField("");
  const currency = useFormField(data?.currencies?.[0]?.name);
  const { locale } = useRouter();
  const [loading, setLoading] = useState(false);

  const dropdown = useDropdown({
    popperOptions: { placement: "bottom-end" },
  });

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    setLoading(true);

    const response = await makePayment({
      locale: locale as string,
      amount: Number(amount.value.replace(",", ".")).toFixed(2),
      currency: currency.value,
    });

    if (response.error) {
      amount.changeError(response.error.message);
    } else if (!response.data || typeof response.data !== "object") {
      amount.changeError(
        response.data || t("pageDonate.donate.form.errors.globalError")
      );
    } else {
      if ("checkout_url" in response.data) {
        if (!response.data.checkout_url) {
          amount.changeError(t("pageDonate.donate.form.errors.globalError"));
        } else {
          document.location.assign(response.data.checkout_url);
        }
      } else {
        const error =
          response.data.amount?.[0] || response.data.currency?.[0] || "";
        amount.changeError(
          t([`pageDonate.donate.form.errors.${error}`, error])
        );
      }
    }

    setLoading(false);
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const pattern = /^[1-9]\d*([.,]\d{0,2})?$/;
    const MAX = 1_000_000;

    let value = e.target.value;
    if (value && !pattern.test(value)) {
      value = amount.value;
    }

    if (!isNaN(+value) && +value > MAX) {
      value = `${MAX}`;
    }

    amount.change(value);
  };

  return (
    <form onSubmit={onSubmit} className={cx("DonateForm")}>
      <h6 className={cx("DonateFormTitle")}>
        {t("pageDonate.donate.form.title")}
      </h6>

      <TextField
        label={t("pageDonate.donate.form.amount")}
        value={amount.value}
        onChange={onChange}
        inputMode="decimal"
        error={amount.error}
        type="text"
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
              {data?.currencies?.map(({ name: item }) => {
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

const CRYPTO_CURRENCY = "crypto";
const Requisites = ({ data }: { data: GetPaymentDetailsResponse }) => {
  const [t] = useTranslation();
  const [selectedCurrency, setSelectedCurrency] = useState(
    data?.[0]?.currency_code ?? CRYPTO_CURRENCY
  );

  const isCryptoSelected = CRYPTO_CURRENCY === selectedCurrency;

  const selectedPaymentMethod = data?.find(
    ({ currency_code }) => currency_code === selectedCurrency
  )?.fields;

  const cryptoAddresses = useMemo(() => {
    return [
      {
        name: "USDT (TRC 20)",
        value: CRYPTO_ADDRESS_TRX20,
        icon: <img src="/images/crypto-usdt.svg" />,
      },
      {
        name: "Tron (TRX)",
        value: CRYPTO_ADDRESS_TRX20,
        icon: <img src="/images/crypto-trx.svg" />,
      },
      {
        name: "Bitcoin (BTC)",
        value: CRYPTO_ADDRESS_BTC,
        icon: <img src="/images/crypto-btc.svg" />,
      },
      {
        name: "USDT (ERC 20)",
        value: CRYPTO_ADDRESS_ERC20,
        icon: <img src="/images/crypto-usdt.svg" />,
      },
      {
        name: "Etherium (ETH)",
        value: CRYPTO_ADDRESS_ERC20,
        icon: <img src="/images/crypto-eth.svg" />,
      },
    ];
  }, []);

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

            <Button
              color={isCryptoSelected ? "primary" : "grey"}
              onClick={() => setSelectedCurrency(CRYPTO_CURRENCY)}
            >
              {t("pageDonate.requisites.cryptoCurrency")}
            </Button>
          </div>
        </div>

        <ul className={cx("RequisitesMain")}>
          {isCryptoSelected
            ? cryptoAddresses.map((data, i) => {
                return <RequisitesItem {...data} withQr key={i} />;
              })
            : selectedPaymentMethod?.map(({ name, value }, i) => (
                <RequisitesItem
                  name={name}
                  value={value}
                  key={selectedCurrency + name + `${i}` + value}
                />
              ))}
        </ul>
      </Container>
    </section>
  );
};

const RequisitesItem: FC<{
  value: string;
  name?: string;
  icon?: JSX.Element;
  withQr?: boolean;
}> = ({ value, name, withQr, icon }) => {
  const copy = useCopy();
  const isPhone = useWidthCondition((w) => w < BREAKPOINT_PHONE);
  const [copied, setCopied] = useState(false);
  const qrDropdown = useDropdown({ popperOptions: { placement: "bottom" } });
  const [qrModalShow, setQrModalShow] = useState(false);

  useEffect(() => {
    if (copied) {
      const tid = setTimeout(() => {
        setCopied(false);
      }, 2000);

      return () => {
        clearTimeout(tid);
      };
    }
  }, [copied]);

  return (
    <li className={cx("RequisitesItem")}>
      <span role="button" onClick={() => copy(value, () => setCopied(true))}>
        {name && (
          <span className={cx("RequisitesItemName")}>
            {icon && <span className={cx("RequisitesItemIcon")}>{icon}</span>}

            {name}
          </span>
        )}
        <span className={cx("RequisitesItemValue")}>
          <b>{value}</b>
          <span className={cx("RequisitesItemActionGroup")}>
            {withQr && (
              <div
                onClick={(e) => e.stopPropagation()}
                className={cx("RequisitesDropdown")}
                ref={qrDropdown.setRef}
              >
                <i
                  role="button"
                  onClick={
                    isPhone ? () => setQrModalShow(true) : qrDropdown.toggle
                  }
                  className={cx("RequisitesItemAction")}
                >
                  <IconQr />
                </i>

                <div
                  ref={qrDropdown.setPopperRef}
                  style={qrDropdown.popper.styles.popper}
                  {...qrDropdown.popper.attributes.popper}
                  className={cx("RequisitesDropdownContent")}
                  data-open={qrDropdown.open || undefined}
                >
                  <QR data={value} />
                </div>
              </div>
            )}
            <i className={cx("RequisitesItemAction", { copied })}>
              {copied ? <IconCheck /> : <IconCopy />}
            </i>
          </span>
        </span>
      </span>

      <ModalWithQr
        data={value}
        isOpen={qrModalShow}
        close={() => setQrModalShow(false)}
      />
    </li>
  );
};

export const getServerSideProps: GetServerSideProps<{
  docs?: null | GetFundsDocumentsResponse;
  paymentSystemFondy?: null | GetPaymentSystemFondyResponse;
  paymentDetails?: null | GetPaymentDetailsResponse;
}> = async ({ locale }) => {
  const docsData = await getFundDocuments({
    locale: locale as string,
  });

  const paymentSystemFondyData = await getPaymentSystemFondy({
    locale: locale as string,
  });
  const paymentDetailsData = await getPaymentDetails({
    locale: locale as string,
  });

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common"])),
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
