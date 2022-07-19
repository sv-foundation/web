import styles from "./index.module.scss";
import classNames from "classnames/bind";
import ButtonLink from "components/UIKit/ButtonLink";
import { IconFacebook, IconMail, IconPhone, IconPin } from "components/Icons";
import { CONTACT_MAIL, CONTACT_PHONE } from "constant";
import { useTranslation } from "next-i18next";

const cx = classNames.bind(styles);

const googleMapsAddressLink =
  "https://www.google.com/maps/search/%D0%A3%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D0%B0,+81340+%D0%9B%D1%8C%D0%B2%D1%96%D0%B2%D1%81%D1%8C%D0%BA%D0%B0+%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C+%D0%9C%D0%BE%D1%81%D1%82%D0%B8%D1%81%D1%8C%D0%BA%D0%B8%D0%B9+%D1%80%D0%B0%D0%B9%D0%BE%D0%BD+%D0%BC+%D0%A1%D1%83%D0%B4%D0%BE%D0%B2%D0%B0+%D0%92%D0%B8%D1%88%D0%BD%D1%8F+%D0%B2%D1%83%D0%BB.+%D0%9B%D1%96%D1%81%D0%BE%D0%B7%D0%B0%D0%B2%D0%BE%D0%B4%D1%81%D1%8C%D0%BA%D0%B0+%D0%B1.2%2F1/@49.7868715,23.3719803,17z/data=!3m1!4b1";

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
      <ButtonLink tag="a" href={`mail:${CONTACT_MAIL}`}>
        <IconMail />
        <span> {CONTACT_MAIL}</span>
      </ButtonLink>
      {!hideFB && (
        <ButtonLink>
          <IconFacebook />
          <span> Facebook</span>
        </ButtonLink>
      )}

      {withAddress && (
        <address className={cx("Address")}>
          <ButtonLink
            tag="a"
            color="dark"
            target="_blank"
            href={googleMapsAddressLink}
          >
            <IconPin /> <span>{t("global.address")}</span>
          </ButtonLink>
        </address>
      )}
    </div>
  );
};

export default Contacts;
