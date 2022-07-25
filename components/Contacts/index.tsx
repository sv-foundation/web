import styles from "./index.module.scss";
import classNames from "classnames/bind";
import ButtonLink from "components/UIKit/ButtonLink";
import { IconFacebook, IconMail, IconPhone, IconPin } from "components/Icons";
import { CONTACT_FACEBOOK, CONTACT_MAIL, CONTACT_PHONE } from "constant";
import { useTranslation } from "next-i18next";

const cx = classNames.bind(styles);

const Contacts: React.FC<{
  className?: string;
  hideFB?: boolean;
  withAddress?: boolean;
}> = ({ className, hideFB, withAddress }) => {
  const [t] = useTranslation();

  return (
    <div className={cx("Component", className)}>
      <ButtonLink tag="a" href={`tel:${CONTACT_PHONE}`}>
        <IconPhone />
        <span> {CONTACT_PHONE}</span>
      </ButtonLink>
      <ButtonLink tag="a" href={`mailto:${CONTACT_MAIL}`}>
        <IconMail />
        <span> {CONTACT_MAIL}</span>
      </ButtonLink>
      {!hideFB && (
        <ButtonLink tag="a" href={CONTACT_FACEBOOK}>
          <IconFacebook />
          <span> Facebook</span>
        </ButtonLink>
      )}

      {withAddress && (
        <address className={cx("Address")}>
          <IconPin /> <span>{t("global.address")}</span>
        </address>
      )}
    </div>
  );
};

export default Contacts;
