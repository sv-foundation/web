import classNames from "classnames/bind";
import Contacts from "components/Contacts";
import Container from "components/UIKit/Container";
import { BREAKPOINT_LANDSCAPE, } from "constant";
import { useWidthCondition } from "helpers";
import { useTranslation } from "next-i18next";
import styles from "./index.module.scss";
const cx = classNames.bind(styles);

const ContactsWithMap = () => {
  const [t] = useTranslation();
  const isLandscapeOrLess = useWidthCondition((w) => w < BREAKPOINT_LANDSCAPE);

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
            src={
              isLandscapeOrLess
                ? "/images/contacts_map-phone.jpg"
                : "/images/contacts_map.png"
            }
            alt=""
          />
        </div>
      </Container>
    </section>
  );
};

export default ContactsWithMap;
