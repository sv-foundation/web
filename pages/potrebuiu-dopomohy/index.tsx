import classNames from "classnames/bind";
import SEO from "components/SEO";
import FormNeedHelp from "containers/forms/NeedHelp";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import styles from "./index.module.scss";
const cx = classNames.bind(styles);

const PageNeedHelp = () => {
  const [t] = useTranslation();

  return (
    <main className={cx("Page")}>
      <SEO
        title={t("pageNeedHelp.seo.title")}
        description={t("pageNeedHelp.seo.title")}
      />
      <FormNeedHelp />
    </main>
  );
};
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common"])),
    },
  };
};

export default PageNeedHelp;
