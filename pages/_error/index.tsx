import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import styles from "./index.module.scss";
import classNames from "classnames/bind";
import Container from "components/UIKit/Container";
import Title from "components/UIKit/Title";
import { useTranslation } from "next-i18next";
import Button from "components/UIKit/Button";
import { URL_MAP } from "constant";
import { ErrorProps } from "next/error";
import { GetStaticProps, NextPageContext } from "next";
const cx = classNames.bind(styles);

function Error({ statusCode }: ErrorProps) {
  const [t] = useTranslation();
  return (
    <main className={cx("Page")}>
      <Container className={cx("Container")}>
        <p className={cx("Code")}>{statusCode}</p>
        <Title className={cx("Title")}>
          {t(`pageError.${statusCode}.title`)}
        </Title>
        <p className={cx("Description")}>
          {t(`pageError.${statusCode}.description`)}
        </p>
        <Button color="primary" tag="link" linkProps={{ href: URL_MAP.home }}>
          {t(`pageError.${statusCode}.btn`)}
        </Button>
      </Container>
    </main>
  );
}

export const getStaticProps = async ({ locale, res, err }: NextPageContext) => {
  let statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  if (statusCode !== 404) statusCode = 500

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common"])),
    },
  };
};

export default Error;
