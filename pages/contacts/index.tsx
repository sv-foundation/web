import classNames from "classnames/bind";
import Contacts from "components/Contacts";
import SEO from "components/SEO";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import styles from "./index.module.scss";
const cx = classNames.bind(styles);

const PageContacts = () => {
  const [t] = useTranslation();
  return (
    <main className={cx("Page")}>
      <SEO
        title={t("pageContacts.seo.title")}
        description={t("pageContacts.seo.title")}
      />

      <div className={cx("Container")}>
        <div className={cx("Details")}>
          <h1 className={cx("Title")}>{t("pageContacts.title")}</h1>
          <p className={cx("Description")}>{t("pageContacts.description")}</p>
          <Contacts hideFB withAddress className={cx("Contacts")} />
        </div>
        <div className={cx("Map")}>
          <img src="/images/contacts_map.png" alt="" />
        </div>
      </div>
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

export default PageContacts;
