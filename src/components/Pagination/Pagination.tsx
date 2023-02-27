import { FC, useMemo, memo } from "react";

import classnames from "classnames";

import styles from "./Pagination.module.scss";

type PaginationProps = {
  className?: string;
  length: number;
  limit: number;
  current: number;
  onChange: (pageNumber: number) => void;
};

const SIBLING_COUNT = 2;

const Pagination: FC<PaginationProps> = ({
  className,
  length,
  limit,
  current,
  onChange,
}) => {
  const total = useMemo(() => Math.ceil(length / limit), [length, limit]);
  const isPageFirst = current === 1;
  const isPageLast = current === total;

  const pages = useMemo(() => {
    return Array.from({ length: total }).reduce(
      (result: number[], _, index) => {
        const pageNumber = index + 1;
        const isEdge = pageNumber === 1 || pageNumber === total;
        const isLeftDots = pageNumber < current - SIBLING_COUNT;
        const isRightDots = pageNumber > current + SIBLING_COUNT;

        if (isLeftDots && !isEdge) {
          if (result.includes(-1)) {
            return result;
          }

          result.push(-1);
          return result;
        }

        if (isRightDots && !isEdge) {
          if (result.includes(-2)) {
            return result;
          }

          result.push(-2);
          return result;
        }

        result.push(pageNumber);
        return result;
      },
      []
    );
  }, [total, current]);

  if (total < 2) {
    return null;
  }

  return (
    <nav className={classnames(styles.pagination, className)}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <button
            type="button"
            className={classnames(styles.arrow, styles.prev, {
              [styles["arrow_inactive"]]: isPageFirst,
            })}
            disabled={isPageFirst}
            onClick={() => onChange(current - 1)}
          >
            Previous
            <svg viewBox="0 0 12 24">
              <path d="M11.1201 22.56L2.42678 13.8667C1.40012 12.84 1.40012 11.16 2.42678 10.1333L11.1201 1.44" />
            </svg>
          </button>
        </li>

        {pages.map((page) => {
          const isInactive = page === current;
          const isDots = page < 0;

          return (
            <li key={page} className={styles.item}>
              {isDots ? (
                <div className={styles.dots}>...</div>
              ) : (
                <button
                  type="button"
                  className={classnames(styles.page, {
                    [styles["page_inactive"]]: isInactive,
                  })}
                  disabled={isInactive}
                  onClick={() => onChange(page)}
                >
                  {page}
                </button>
              )}
            </li>
          );
        })}

        <li className={styles.item}>
          <button
            type="button"
            className={classnames(styles.arrow, styles.next, {
              [styles["arrow_inactive"]]: isPageLast,
            })}
            disabled={isPageLast}
            onClick={() => onChange(current + 1)}
          >
            Next
            <svg viewBox="0 0 12 24">
              <path d="M0.879883 22.56L9.57322 13.8667C10.5999 12.84 10.5999 11.16 9.57322 10.1333L0.879883 1.44" />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default memo(Pagination);
