import classNames from "classnames/bind";
import Contacts from "components/Contacts";
import { IconHeart } from "components/Icons";
import Button from "components/UIKit/Button";
import { URL_MAP } from "constant";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

const Footer = () => {
  const [t] = useTranslation();
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className={cx("Component")}>
      <div className={cx("Container")}>
        <div className={cx("Logo")}>
          <img
            src="/images/logo.svg"
            alt="SV Foundation"
          />
        </div>

        <Contacts />
        <div className={cx("HelpBtnContainer")}>
          <Button
            color="primary"
            tag="link"
            linkProps={{href: URL_MAP.donate}}
            iconLeft={<IconHeart />}
          >
            {t("global.help")}
          </Button>
        </div>
        <p className={cx("Copyright")}>{year} © All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
