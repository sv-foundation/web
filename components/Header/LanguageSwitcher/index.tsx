import { Placement } from "@popperjs/core";
import classNames from "classnames/bind";
import { IconArrowDown, IconGlobe } from "components/Icons";
import ButtonLink from "components/UIKit/ButtonLink";
import { useDropdown } from "helpers";
import { FC } from "react";
import styles from "./index.module.scss";
import { useRouter } from "next/router";
const cx = classNames.bind(styles);

export const LANGUAGES_MAP: { [key: string]: string } = {
  uk: "Українська",
};

const LanguageSwitcher: FC<{ className?: string; placement?: Placement }> = ({
  className = "",
  placement = "bottom-end",
}) => {
  const router = useRouter();
  const dropdown = useDropdown({
    popperOptions: { placement },
  });

  return (
    <div ref={dropdown.setRef} className={className}>
      <ButtonLink
        type="button"
        onClick={dropdown.toggle}
        className={cx("Control", dropdown.open && "active")}
      >
        <IconGlobe />

        <span>{LANGUAGES_MAP[router.locale as string]}</span>

        <IconArrowDown className={cx("IconArrow")} />
      </ButtonLink>

      <ul
        ref={dropdown.setPopperRef}
        style={dropdown.popper.styles.popper}
        {...dropdown.popper.attributes.popper}
        className={cx("Content")}
        data-open={dropdown.open || undefined}
      >
        {Object.entries(LANGUAGES_MAP).map(([code, label]) => {
          const isCurrentLng = router.locale === code;
          return (
            <li key={code}>
              <button
                onClick={() => {
                  dropdown.toggle();
                  router.push(router.pathname, router.pathname, {
                    locale: code,
                  });
                }}
                data-active={isCurrentLng || undefined}
              >
                <span tabIndex={-1}>
                  <span>{label}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LanguageSwitcher;
