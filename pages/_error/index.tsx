import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import styles from "./index.module.scss";
import classNames from "classnames/bind";
import Container from "components/UIKit/Container";
import Title from "components/UIKit/Title";
import { useTranslation } from "next-i18next";
import Button from "components/UIKit/Button";
import { URL_MAP } from "constant";
const cx = classNames.bind(styles);

function Error({ statusCode }) {
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

export async function getStaticProps({ locale, res, err }) {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      statusCode,
    },
  };
}

export default Error;
