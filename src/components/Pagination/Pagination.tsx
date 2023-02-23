import { FC } from "react";

import classnames from "classnames";

import styles from "./Pagination.module.scss";

type PaginationProps = {
  className?: string;
};

const Pagination: FC<PaginationProps> = (props) => {
  const { className } = props;

  return (
    <nav className={classnames(styles.pagination, className)}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <div
            className={classnames(styles.arrow, styles.prev, styles.inactive)}
          >
            Previous
            <svg viewBox="0 0 12 24">
              <path d="M11.1201 22.56L2.42678 13.8667C1.40012 12.84 1.40012 11.16 2.42678 10.1333L11.1201 1.44" />
            </svg>
          </div>
        </li>

        <li className={styles.item}>
          <div className={classnames(styles.page, styles.inactive)}>1</div>
        </li>

        <li className={styles.item}>
          <a className={styles.page} href="#todo">
            2
          </a>
        </li>

        <li className={styles.item}>
          <a className={styles.page} href="#todo">
            3
          </a>
        </li>

        <li className={styles.item}>
          <div className={styles.divider}>...</div>
        </li>

        <li className={styles.item}>
          <a className={styles.page} href="#todo">
            10
          </a>
        </li>

        <li className={styles.item}>
          <a className={classnames(styles.arrow, styles.next)} href="#todo">
            Next
            <svg viewBox="0 0 12 24">
              <path d="M0.879883 22.56L9.57322 13.8667C10.5999 12.84 10.5999 11.16 9.57322 10.1333L0.879883 1.44" />
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
