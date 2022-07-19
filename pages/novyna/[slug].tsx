import classNames from "classnames/bind";
import {
  IconArrowDown,
  IconFacebook,
  IconTime,
  IconTwitter,
} from "components/Icons";
import Button from "components/UIKit/Button";
import Container from "components/UIKit/Container";
import { BREAKPOINT_LANDSCAPE, URL_MAP } from "constant";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import styles from "./index.module.scss";
import Image from "next/image";
import Title from "components/UIKit/Title";
import SEO from "components/SEO";
import { useWidthCondition } from "helpers";
const cx = classNames.bind(styles);

const PageNews = () => {
  const [t] = useTranslation();

  const Actions = (
    <div className={cx("Actions")}>
      <Button
        color="sand"
        iconLeft={<IconArrowDown className={cx("BtnBackIcon")} />}
        tag="link"
        linkProps={{ href: URL_MAP.news }}
      />

      <Share />
    </div>
  );

  return (
    <main className={cx("Page")}>
      <SEO
        title="Custom title"
        description="Custom description"
        ogImage="image"
      />

      <Container className={cx("Container")}>
        {Actions}
        <div className={cx("Post")}>
          <time className={cx("Datetime")}>
            <IconTime /> 12 Січ 2022
          </time>

          <Title className={cx("Title")}>Title</Title>

          <ul className={cx("Tags")}>
            <li>Tags</li>
            <li>Tags</li>
            <li>Tags</li>
            <li>Tags</li>
            <li>Tags</li>
            <li>Tags</li>
          </ul>

          <img className={cx("CoverImage")} alt="" />
          {/* <Image className={cx("CoverImage")} src="https://example.com" layout="fill" /> */}

          <div className={cx("Content")}>
            <p>
              Отримали чудовий подарунок від Євгена Хаїрова — Nissan Navara i
              Nissan Pathfinder, повністю обслужені та доглянуті. Завдяки тому,
              що автівки були отримані після ТО, ми мали змогу пофарбувати та
              підготувати їх для передачі нашим захисникам максимально швидко.
              Navara поїхав на Харківщину, буде працювати під кордоном.
              Pathfinder передано контррозвідувальникам на півдні від Курахово.
            </p>
          </div>
        </div>
        {Actions}
      </Container>
    </main>
  );
};

const Share = ({ title = "" }) => {
  const [t] = useTranslation();
  const isLandscapeOrLess = useWidthCondition((w) => w < BREAKPOINT_LANDSCAPE);
  const url =
    typeof window !== "undefined"
      ? window.location.origin + window.location.pathname
      : "";
  const fbLink = `https://www.facebook.com/sharer.php?u=${encodeURIComponent(
    url
  )}&t=${encodeURIComponent(title)}`;
  const twitterLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    url
  )}&text=${encodeURIComponent(title)}`;

  return (
    <div className={cx("Share")}>
      <Button color="sand" iconLeft={<IconFacebook />} tag="a" href={fbLink}>
        {!isLandscapeOrLess && t("global.shareFB")}
      </Button>
      <Button
        color="sand"
        iconLeft={<IconTwitter />}
        tag="a"
        href={twitterLink}
      >
        {!isLandscapeOrLess && t("global.shareTwitter")}
      </Button>
    </div>
  );
};

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default PageNews;
