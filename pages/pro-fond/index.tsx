import classNames from "classnames/bind";
import ContactsWithMap from "components/ContactsWithMap";
import DocumentsAndReports from "components/DocumentsAndReports";
import { IconBox, IconCar, IconChicken, IconMedicine } from "components/Icons";
import Button from "components/UIKit/Button";
import Container from "components/UIKit/Container";
import Title from "components/UIKit/Title";
import { CONTACT_MAIL, URL_MAP } from "constant";
import { useEffect, useMemo } from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import styles from "./index.module.scss";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import SEO from "components/SEO";
import getFundDocuments, {
  GetFundsDocumentsResponse,
} from "api/getFundDocuments";
import { InferGetServerSidePropsType, GetServerSideProps } from "next";
const cx = classNames.bind(styles);
type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const PageAboutFoundation = ({ docs }: Props) => {
  const { t } = useTranslation();
  const { asPath } = useRouter();
  const hash = useMemo(() => asPath.split("#")[1], [asPath]);
  useEffect(() => {
	const targetElement = document.getElementById(
	  hash + "-section"
	) as HTMLElement;

	if (hash && targetElement) {
	  const headerHeight = document.getElementById("header")?.offsetHeight ?? 0;
	  const top =
		targetElement.offsetTop -
		Math.max(
		  headerHeight -
			parseInt(window.getComputedStyle(targetElement).paddingTop),
		  0
		);
	  window.scrollTo({
		behavior: "smooth",
		top,
	  });
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
		<section id="ourWork-section" className={cx("Section", "Activity")}>
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
				  <IconMedicine />
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

			  <Button color="secondary" tag="a" href={`mailto:${CONTACT_MAIL}`}>
				{t("pageAboutFoundation.activity.items.2.btn")}
			  </Button>
			</li>
			<li>
			  <div>
				<i>
				  <IconBox />
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

		<section id="team-section" className={cx("Section", "Team")}>
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
			<li>
			  <img
				src="/images/about_foundation_team_Iarovii.jpg"
				alt=""
			  />
			  <h3>{t("pageAboutFoundation.team.members.Iarovii.name")}</h3>
			  <p>{t("pageAboutFoundation.team.members.Iarovii.role")}</p>
			</li>
			<li>
			  <img
				src="/images/about_foundation_team_Dyshleviy.jpg"
				alt=""
			  />
			  <h3>{t("pageAboutFoundation.team.members.Dyshleviy.name")}</h3>
			  <p>{t("pageAboutFoundation.team.members.Dyshleviy.role")}</p>
			</li>
			<li>
			  <img
				src="/images/about_foundation_team_Subbotin.jpg"
				alt=""
			  />
			  <h3>{t("pageAboutFoundation.team.members.Subbotin.name")}</h3>
			  <p>{t("pageAboutFoundation.team.members.Subbotin.role")}</p>
			</li>
			<li>
			  <img
				src="/images/about_foundation_team_Dmytrenko.jpg"
				alt=""
			  />
			  <h3>{t("pageAboutFoundation.team.members.Dmytrenko.name")}</h3>
			  <p>{t("pageAboutFoundation.team.members.Dmytrenko.role")}</p>
			</li>
			<li>
			  <img
				src="/images/about_foundation_team_Khmara.jpg"
				alt=""
			  />
			  <h3>{t("pageAboutFoundation.team.members.Khmara.name")}</h3>
			  <p>{t("pageAboutFoundation.team.members.Khmara.role")}</p>
			</li>
			<li>
			  <img
				src="/images/about_foundation_team_Reshetnyk.jpg"
				alt=""
			  />
			  <h3>{t("pageAboutFoundation.team.members.Reshetnyk.name")}</h3>
			  <p>{t("pageAboutFoundation.team.members.Reshetnyk.role")}</p>
			</li>
			<li>
			  <img
				src="/images/about_foundation_team_Zlobin.jpg"
				alt=""
			  />
			  <h3>{t("pageAboutFoundation.team.members.Zlobin.name")}</h3>
			  <p>{t("pageAboutFoundation.team.members.Zlobin.role")}</p>
			</li>
			<li>
			  <img
				src="/images/about_foundation_team_Kuksa.jpg"
				alt=""
			  />
			  <h3>{t("pageAboutFoundation.team.members.Kuksa.name")}</h3>
			  <p>{t("pageAboutFoundation.team.members.Kuksa.role")}</p>
			</li>
			<li>
			  <img
				src="/images/about_foundation_team_Yamkovyi.png"
				alt=""
			  />
			  <h3>{t("pageAboutFoundation.team.members.Yamkovyi.name")}</h3>
			  <p>{t("pageAboutFoundation.team.members.Yamkovyi.role")}</p>
			</li>
			<li>
			  <img
				src="/images/about_foundation_team_Zakutniev.png"
				alt=""
			  />
			  <h3>{t("pageAboutFoundation.team.members.Zakutniev.name")}</h3>
			  <p>{t("pageAboutFoundation.team.members.Zakutniev.role")}</p>
			</li>
			<li>
			  <img
				src="/images/about_foundation_team_Аvershyn.png"
				alt=""
			  />
			  <h3>{t("pageAboutFoundation.team.members.Аvershyn.name")}</h3>
			  <p>{t("pageAboutFoundation.team.members.Аvershyn.role")}</p>
			</li>
			<li>
			  <img
				src="/images/about_foundation_team_Schiefer.png"
				alt=""
			  />
			  <h3>{t("pageAboutFoundation.team.members.Schiefer.name")}</h3>
			  <p>{t("pageAboutFoundation.team.members.Schiefer.role")}</p>
			</li>
			<li>
			  <img
				src="/images/about_foundation_team_Vigert.png"
				alt=""
			  />
			  <h3>{t("pageAboutFoundation.team.members.Vigert.name")}</h3>
			  <p>{t("pageAboutFoundation.team.members.Vigert.role")}</p>
			</li>
			<li>
			  <img
				src="/images/about_foundation_team_Dudukal.png"
				alt=""
			  />
			  <h3>{t("pageAboutFoundation.team.members.Dudukal.name")}</h3>
			  <p>{t("pageAboutFoundation.team.members.Dudukal.role")}</p>
			</li>
			<li>
			  <img
				src="/images/about_foundation_team_Pushanko.png"
				alt=""
			  />
			  <h3>{t("pageAboutFoundation.team.members.Pushanko.name")}</h3>
			  <p>{t("pageAboutFoundation.team.members.Pushanko.role")}</p>
			</li>
			<li>
			  <img
				src="/images/about_foundation_team_Faustova-Andriienko.png"
				alt=""
			  />
			  <h3>{t("pageAboutFoundation.team.members.Faustova-Andriienko.name")}</h3>
			  <p>{t("pageAboutFoundation.team.members.Faustova-Andriienko.role")}</p>
			</li>
			<li>
			  <img
				src="/images/about_foundation_team_Pantschenko.png"
				alt=""
			  />
			  <h3>{t("pageAboutFoundation.team.members.Pantschenko.name")}</h3>
			  <p>{t("pageAboutFoundation.team.members.Pantschenko.role")}</p>
			</li>
			<li>
			  <img
				src="/images/about_foundation_team_Tretiak.png"
				alt=""
			  />
			  <h3>{t("pageAboutFoundation.team.members.Tretiak.name")}</h3>
			  <p>{t("pageAboutFoundation.team.members.Tretiak.role")}</p>
			</li>
		  </ul>
		</section>
	  </Container>
	  <ContactsWithMap />
	  {docs && <DocumentsAndReports data={docs} />}
	</main>
  );
};

export const getServerSideProps: GetServerSideProps<{
  docs?: null | GetFundsDocumentsResponse;
}> = async ({ locale }) => {
  const docsData = await getFundDocuments({
	locale: locale as string,
  });

  return {
	props: {
	  ...(await serverSideTranslations(locale as string, ["common"])),
	  docs: docsData.error || !docsData.data ? null : docsData.data,
	},
  };
};
export default PageAboutFoundation;
