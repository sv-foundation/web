import ReactPaginate from "react-paginate";
import styles from "./index.module.scss";
import classNames from "classnames/bind";
import { BREAKPOINT_LANDSCAPE } from "constant";
import { useWidthCondition } from "helpers";
import { IconArrowDown } from "components/Icons";
const cx = classNames.bind(styles);

type Props = {
  pageCount: number;
  onChangePage(page: number): void;
  page: number;
  className?: string;
};

const Pagination = (props: Props) => {
  const isLandscapeOrLess = useWidthCondition((w) => w < BREAKPOINT_LANDSCAPE);

  if (props.pageCount < 2) return null;

  return (
    <ReactPaginate
      containerClassName={cx("Component", props.className ?? "")}
      pageCount={props.pageCount}
      previousLabel={<IconArrowDown />}
      previousClassName={cx("BtnPage", "BtnPrevious")}
      pageClassName={cx("BtnPage")}
      breakClassName={cx("BtnPage")}
      activeClassName={cx("active")}
      nextClassName={cx("BtnPage", "BtnNext")}
      nextLabel={<IconArrowDown />}
      onPageChange={({ selected }) => props.onChangePage(selected)}
      forcePage={props.page}
      marginPagesDisplayed={isLandscapeOrLess ? 1 : 1}
      pageRangeDisplayed={isLandscapeOrLess ? 1 : 5}
    />
  );
};

export default Pagination;
