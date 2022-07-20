import { FC, Fragment } from "react";
import classNames from "classnames/bind";
import styles from "./index.module.scss";
import { IconClose, IconHeart } from "components/Icons";
import Sidebar from "components/Sidebar";
import Button from "components/UIKit/Button";
import ButtonLink from "components/UIKit/ButtonLink";
import { BREAKPOINT_LANDSCAPE, URL_MAP } from "constant";
import { useTranslation } from "next-i18next";
import { useWidthCondition } from "helpers";
import LanguageSwitcher from "../LanguageSwitcher";
import Link from "next/link";
import { useRouter } from "next/router";
const cx = classNames.bind(styles);

const Sidemenu: FC<{ close(): void; isOpen: boolean }> = ({
  close,
  isOpen,
}) => {
  const [t] = useTranslation();
  const isLandscapeOrLess = useWidthCondition((w) => w < BREAKPOINT_LANDSCAPE);
  const { pathname } = useRouter();
  const isActivePage = (target = "") => {
    return target === pathname.split("#")[0];
  };

  return (
    <Sidebar
      className={cx("Sidebar")}
      position="right"
      isOpen={isOpen}
      close={close}
    >
      <header className={cx("SidebarHeader")}>
        <Link onClick={close} className={cx("SidebarLogo")} href={URL_MAP.home}>
          <a>
            <img src="/images/logo.svg" alt="SV Foundation" />
          </a>
        </Link>

        <button onClick={close} type="button" className={cx("SidebarBtnClose")}>
          <IconClose />
        </button>
      </header>

      <main className={cx("SidebarMain")}>
        {isLandscapeOrLess && (
          <LanguageSwitcher
            placement="bottom-start"
            className={cx("LanguageSwitcher")}
          />
        )}

        <nav>
          <div>
            <ButtonLink
              onClick={close}
              tag="link"
              linkProps={{ href: URL_MAP.home }}
              className={isActivePage(URL_MAP.home) ? "active" : ""}
            >
              {t("header.nav.home")}
            </ButtonLink>
          </div>
          <div>
            <ButtonLink
              onClick={close}
              tag="link"
              linkProps={{ href: URL_MAP.aboutFoundation.index }}
              className={
                isActivePage(URL_MAP.aboutFoundation.index) ? "active" : ""
              }
            >
              {t("header.nav.aboutFoundation.main")}
            </ButtonLink>
            <div className={cx("SidebarSubLinks")}>
              <ButtonLink
                onClick={close}
                tag="link"
                className={cx("SidebarSubLink")}
                linkProps={{ href: URL_MAP.aboutFoundation.ourWork }}
              >
                <Fragment>{t("header.nav.aboutFoundation.ourWork")}</Fragment>
              </ButtonLink>
              <ButtonLink
                onClick={close}
                tag="link"
                className={cx("SidebarSubLink")}
                linkProps={{ href: URL_MAP.aboutFoundation.team }}
              >
                <Fragment> {t("header.nav.aboutFoundation.team")}</Fragment>
              </ButtonLink>
              <ButtonLink
                onClick={close}
                tag="link"
                className={cx("SidebarSubLink")}
                linkProps={{ href: URL_MAP.aboutFoundation.docs }}
              >
                <Fragment> {t("header.nav.aboutFoundation.docs")}</Fragment>
              </ButtonLink>
            </div>
          </div>

          <div>
            <ButtonLink
              onClick={close}
              tag="link"
              linkProps={{ href: URL_MAP.needHelp }}
              className={isActivePage(URL_MAP.needHelp) ? "active" : ""}
            >
              {t("header.nav.needHelp")}
            </ButtonLink>
          </div>
          <div>
            <ButtonLink
              onClick={close}
              tag="link"
              linkProps={{ href: URL_MAP.news }}
              className={isActivePage(URL_MAP.news) ? "active" : ""}
            >
              {t("header.nav.news")}
            </ButtonLink>
          </div>
          <div>
            <ButtonLink
              onClick={close}
              tag="link"
              linkProps={{ href: URL_MAP.contacts }}
              className={isActivePage(URL_MAP.contacts) ? "active" : ""}
            >
              {t("header.nav.contacts")}
            </ButtonLink>
          </div>
        </nav>
      </main>

      <footer className={cx("SidebarFooter")}>
        <Button
          color="primary"
          tag="link"
          linkProps={{ href: URL_MAP.donate }}
          onClick={close}
          iconLeft={<IconHeart />}
        >
          {t("global.help")}
        </Button>
      </footer>
    </Sidebar>
  );
};

export default Sidemenu;
