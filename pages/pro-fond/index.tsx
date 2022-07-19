import classNames from "classnames/bind";
import ContactsWithMap from "components/ContactsWithMap";
import DocumentsAndReports from "components/DocumentsAndReports";
import { IconBox, IconCar, IconChicken, IconMedicine } from "components/Icons";
import Button from "components/UIKit/Button";
import Container from "components/UIKit/Container";
import Title from "components/UIKit/Title";
import { URL_MAP } from "constant";
import { useEffect, useMemo } from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import styles from "./index.module.scss";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import SEO from "components/SEO";
const cx = classNames.bind(styles);

const PageAboutFoundation = () => {
  const { t } = useTranslation();
  const { pathname } = useRouter();
  const hash = useMemo(() => pathname.split("#")[1], [pathname]);

  useEffect(() => {
    const targetElement = document.getElementById(hash);
    if (hash && targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [hash]);

  return (
    <main className={cx("Component")}>
      <SEO
        title={t("pageAboutFoundation.seo.title")}
        description={t("pageAboutFoundation.seo.title")}
      />
      <Container className={cx("IntroContainer")}>
        <section className={cx("Intro")}>
          <div>
            <h1>{t("pageAboutFoundation.intro.title")}</h1>

            <p>{t("pageAboutFoundation.intro.text.0")}</p>
            <p>{t("pageAboutFoundation.intro.text.1")}</p>
            <p>{t("pageAboutFoundation.intro.text.2")}</p>

            <div className={cx("IntroBtnGroup")}>
              <Button
                color="primary"
                tag="link"
                linkProps={{ href: URL_MAP.donate }}
              >
                {t("pageAboutFoundation.intro.btnDonate")}
              </Button>
              <Button
                color="secondary"
                tag="link"
                linkProps={{ href: URL_MAP.needHelp }}
              >
                {t("pageAboutFoundation.intro.btnNeedHelp")}
              </Button>
            </div>
          </div>
        </section>
      </Container>

      <Container>
        <section id="ourWork" className={cx("Section", "Activity")}>
          <Title tag="h2" className={cx("Title")}>
            {t("pageAboutFoundation.activity.title")}
          </Title>
          <ul className={cx("ActivityItems")}>
            <li>
              <div>
                <i>
                  <IconCar />
                </i>
                <h3>{t("pageAboutFoundation.activity.items.0.title")}</h3>
                <p>{t("pageAboutFoundation.activity.items.0.description")}</p>
              </div>

              <Button
                color="secondary"
                tag="link"
                linkProps={{ href: URL_MAP.donate }}
              >
                {t("pageAboutFoundation.activity.items.0.btn")}
              </Button>
            </li>
            <li>
              <div>
                <i>
                  <IconBox />
                </i>
                <h3>{t("pageAboutFoundation.activity.items.1.title")}</h3>
                <p>{t("pageAboutFoundation.activity.items.1.description")}</p>
              </div>

              <Button
                color="secondary"
                tag="link"
                linkProps={{ href: URL_MAP.donate }}
              >
                {t("pageAboutFoundation.activity.items.1.btn")}
              </Button>
            </li>
            <li>
              <div>
                <i>
                  <IconChicken />
                </i>
                <h3>{t("pageAboutFoundation.activity.items.2.title")}</h3>
                <p>{t("pageAboutFoundation.activity.items.2.description")}</p>
              </div>

              <Button
                color="secondary"
                tag="link"
                linkProps={{ href: URL_MAP.donate }}
              >
                {t("pageAboutFoundation.activity.items.2.btn")}
              </Button>
            </li>
            <li>
              <div>
                <i>
                  <IconMedicine />
                </i>
                <h3>{t("pageAboutFoundation.activity.items.3.title")}</h3>
                <p>{t("pageAboutFoundation.activity.items.3.description")}</p>
              </div>
              <Button
                color="secondary"
                tag="link"
                linkProps={{ href: URL_MAP.donate }}
              >
                {t("pageAboutFoundation.activity.items.3.btn")}
              </Button>
            </li>
          </ul>
        </section>

        <section id="team" className={cx("Section", "Team")}>
          <Title tag="h2" className={cx("Title")}>
            {t("pageAboutFoundation.team.title")}
          </Title>

          <ul className={cx("TeamMembers")}>
            <li>
              <img src="/images/about_foundation_team_Lesko@2x.jpg" alt="" />
              <h3>{t("pageAboutFoundation.team.members.Lesko.name")}</h3>
              <p>{t("pageAboutFoundation.team.members.Lesko.role")}</p>
            </li>
            <li>
              <img src="/images/about_foundation_team_Karnauh@2x.jpg" alt="" />
              <h3>{t("pageAboutFoundation.team.members.Karnauh.name")}</h3>
              <p>{t("pageAboutFoundation.team.members.Karnauh.role")}</p>
            </li>
            <li>
              <img
                src="/images/about_foundation_team_Slobodyanuk@2x.jpg"
                alt=""
              />
              <h3>{t("pageAboutFoundation.team.members.Slobodyanuk.name")}</h3>
              <p>{t("pageAboutFoundation.team.members.Slobodyanuk.role")}</p>
            </li>
            <li>
              <img src="/images/about_foundation_team_Pojidaev@2x.jpg" alt="" />
              <h3>{t("pageAboutFoundation.team.members.Pojidaev.name")}</h3>
              <p>{t("pageAboutFoundation.team.members.Pojidaev.role")}</p>
            </li>
            <li>
              <img src="/images/about_foundation_team_IValah@2x.jpg" alt="" />
              <h3>{t("pageAboutFoundation.team.members.IValah.name")}</h3>
              <p>{t("pageAboutFoundation.team.members.IValah.role")}</p>
            </li>
            <li>
              <img src="/images/about_foundation_team_VValah@2x.jpg" alt="" />
              <h3>{t("pageAboutFoundation.team.members.VValah.name")}</h3>
              <p>{t("pageAboutFoundation.team.members.VValah.role")}</p>
            </li>
            <li>
              <img
                src="/images/about_foundation_team_SArinshtein@2x.jpg"
                alt=""
              />
              <h3>{t("pageAboutFoundation.team.members.SArinshtein.name")}</h3>
              <p>{t("pageAboutFoundation.team.members.SArinshtein.role")}</p>
            </li>
            <li>
              <img
                src="/images/about_foundation_team_DArinshtein@2x.jpg"
                alt=""
              />
              <h3>{t("pageAboutFoundation.team.members.DArinshtein.name")}</h3>
              <p>{t("pageAboutFoundation.team.members.DArinshtein.role")}</p>
            </li>
          </ul>
        </section>
      </Container>
      <ContactsWithMap />
      <DocumentsAndReports />
    </main>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default PageAboutFoundation;
