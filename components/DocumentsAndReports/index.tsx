import classNames from "classnames/bind";
import { IconDoc } from "components/Icons";
import Container from "components/UIKit/Container";
import Title from "components/UIKit/Title";
import { useTranslation } from "next-i18next";
import styles from "./index.module.scss";
const cx = classNames.bind(styles);

const DocumentsAndReports = () => {
  const [t] = useTranslation();
  return (
    <section id="docs" className={cx("Component")}>
      <Container className={cx("Container")}>
        <Title tag="h2">{t("documentsAndReports.title")}</Title>

        <ul className={cx("Files")}>
          <li>
            <a href="" target="_blank">
              <i>
                <IconDoc />
              </i>

              <span>asjkfjdsk fdjfl sd</span>
            </a>
          </li>
          <li>
            <a href="" target="_blank">
              <i>
                <IconDoc />
              </i>

              <span>asjkfjdsk fdjfl sd</span>
            </a>
          </li>
        </ul>
      </Container>
    </section>
  );
};

export default DocumentsAndReports;
