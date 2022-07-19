import classNames from "classnames/bind";
import Contacts from "components/Contacts";
import { IconArrowDown, IconHeart, IconMenu } from "components/Icons";
import Button from "components/UIKit/Button";
import ButtonLink from "components/UIKit/ButtonLink";
import { BREAKPOINT_IPAD, URL_MAP } from "constant";
import { useDropdown, useWidthCondition } from "helpers";
import { Fragment, useState } from "react";
import { useTranslation } from "next-i18next";
import styles from "./index.module.scss";
import LanguageSwitcher from "./LanguageSwitcher";
import Sidemenu from "./Sidemenu";
import Link from "next/link";
import { useRouter } from "next/router";

const cx = classNames.bind(styles);

const Header = () => {
  const { t } = useTranslation();
  const isIpadOrLess = useWidthCondition((w) => w < BREAKPOINT_IPAD);
  const [showSidemenu, setShowSidemenu] = useState(false);

  return (
    <Fragment>
      <div className={cx("SubHeader")}>
        <div className={cx("Container")}>
          <Contacts className={cx("Contacts")} />
          <LanguageSwitcher />
        </div>
      </div>
      <header className={cx("Header")}>
        <div className={cx("Container")}>
          <Link className={cx("Logo")} href={URL_MAP.home}>
            <a>
              <img src="/images/logo.svg" alt="SV Foundation" />
            </a>
          </Link>

          <div className={cx("Main")}>
            {!isIpadOrLess && <Nav />}
            <Button
              className={cx("BtnDonate")}
              color="primary"
              tag="link"
              linkProps={{ href: URL_MAP.donate }}
              iconLeft={<IconHeart />}
            >
              {t("global.help")}
            </Button>

            {isIpadOrLess && (
              <button
                onClick={() => setShowSidemenu(!showSidemenu)}
                type="button"
                className={cx("BtnSidebar")}
              >
                <IconMenu />
              </button>
            )}
          </div>
        </div>
      </header>
      <Sidemenu isOpen={showSidemenu} close={() => setShowSidemenu(false)} />
    </Fragment>
  );
};

const Nav = () => {
  const { t } = useTranslation();
  const dropdown = useDropdown({
    popperOptions: { placement: "bottom-end" },
  });

  const { pathname } = useRouter();
  const isActivePage = (target = "") => {
    return target === pathname.split("#")[0];
  };

  return (
    <nav className={cx("Nav")}>
      <div>
        <ButtonLink
          tag="link"
          linkProps={{ href: URL_MAP.home }}
          className={cx("NavLink", { activeLink: isActivePage(URL_MAP.home) })}
        >
          {t("header.nav.home")}
        </ButtonLink>
      </div>
      <div
        className={cx("NavLinkDropdown")}
        onMouseLeave={() => dropdown.setOpen(false)}
      >
        <ButtonLink
          onMouseEnter={() => dropdown.setOpen(true)}
          tag="link"
          linkProps={{ href: URL_MAP.aboutFoundation.index }}
          onClick={dropdown.toggle}
          className={cx("NavLink", "NavLinkDropdownControl", {
            active: dropdown.open,
            activeLink: isActivePage(URL_MAP.aboutFoundation.index),
          })}
        >
          <span ref={dropdown.setRef as any}>
            {t("header.nav.aboutFoundation.main")}
          </span>

          <IconArrowDown className={cx("IconArrow")} />
        </ButtonLink>

        <ul
          ref={dropdown.setPopperRef}
          style={dropdown.popper.styles.popper}
          {...dropdown.popper.attributes.popper}
          className={cx("NavLinkDropdownContent")}
          data-open={dropdown.open || undefined}
        >
          <li>
            <Link href={URL_MAP.aboutFoundation.ourWork}>
              <a onClick={dropdown.toggle}>
                <span tabIndex={-1}>
                  <span>{t("header.nav.aboutFoundation.ourWork")}</span>
                </span>
              </a>
            </Link>
          </li>
          <li>
            <Link href={URL_MAP.aboutFoundation.team}>
              <a onClick={dropdown.toggle}>
                <span tabIndex={-1}>
                  <span>{t("header.nav.aboutFoundation.team")}</span>
                </span>
              </a>
            </Link>
          </li>
          <li>
            <Link href={URL_MAP.aboutFoundation.docs}>
              <a onClick={dropdown.toggle}>
                <span tabIndex={-1}>
                  <span>{t("header.nav.aboutFoundation.docs")}</span>
                </span>
              </a>
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <ButtonLink
          className={cx("NavLink", {
            activeLink: isActivePage(URL_MAP.needHelp),
          })}
          tag="link"
          linkProps={{ href: URL_MAP.needHelp }}
        >
          {t("header.nav.needHelp")}
        </ButtonLink>
      </div>
      <div>
        <ButtonLink
          className={cx("NavLink", { activeLink: isActivePage(URL_MAP.news) })}
          tag="link"
          linkProps={{ href: URL_MAP.news }}
        >
          {t("header.nav.news")}
        </ButtonLink>
      </div>
      <div>
        <ButtonLink
          className={cx("NavLink", {
            activeLink: isActivePage(URL_MAP.contacts),
          })}
          tag="link"
          linkProps={{ href: URL_MAP.contacts }}
        >
          {t("header.nav.contacts")}
        </ButtonLink>
      </div>
    </nav>
  );
};

export default Header;
