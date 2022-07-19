import classNames from "classnames/bind";
import Contacts from "components/Contacts";
import Container from "components/UIKit/Container";
import { useTranslation } from "next-i18next";
import styles from "./index.module.scss";
const cx = classNames.bind(styles);

const ContactsWithMap = () => {
  const [t] = useTranslation();

  return (
    <section className={cx("Component")}>
      <Container className={cx("Container")}>
        <div className={cx("Content")}>
          <div className={cx("Details")}>
            <h2 className={cx("Title")}>{t("pageContacts.title")}</h2>
            <p className={cx("Description")}>{t("pageContacts.description")}</p>
            <Contacts hideFB withAddress className={cx("Contacts")} />
          </div>

          <img
            className={cx("Map")}
            src="/images/contacts_map.png"
            alt=""
          />
        </div>
      </Container>
    </section>
  );
};

export default ContactsWithMap;
