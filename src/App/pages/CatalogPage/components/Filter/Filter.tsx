import { FC } from "react";

import MultiDropdown from "@components/MultiDropdown";
import { Option } from "@components/MultiDropdown";
import classnames from "classnames";

import styles from "./Filter.module.scss";

type FilterProps = {
  className?: string;
};

const createHeader = (options: Option[]) => (
  <div className={styles.header}>
    <svg className={styles.icon} viewBox="0 0 30 30">
      <path d="M6.75 2.625H23.25C24.625 2.625 25.75 3.75 25.75 5.125V7.875C25.75 8.875 25.125 10.125 24.5 10.75L19.125 15.5C18.375 16.125 17.875 17.375 17.875 18.375V23.75C17.875 24.5 17.375 25.5 16.75 25.875L15 27C13.375 28 11.125 26.875 11.125 24.875V18.25C11.125 17.375 10.625 16.25 10.125 15.625L5.375 10.625C4.75 10 4.25 8.875 4.25 8.125V5.25C4.25 3.75 5.375 2.625 6.75 2.625Z" />
      <path d="M13.6625 2.625L7.5 12.5" />
    </svg>
    Filter
    {options.length > 0 && (
      <span className={styles.counter}>({options.length})</span>
    )}
  </div>
);

const Filter: FC<FilterProps> = ({ className }) => {
  return (
    <MultiDropdown
      className={classnames(styles.filter, className)}
      options={[
        { key: "0", value: "Handmade Fresh Table" },
        { key: "1", value: "Change title" },
        { key: "2", value: "Clothes" },
      ]}
      value={[{ key: "msk", value: "Москва" }]}
      onChange={() => {}}
      pluralizeOptions={createHeader}
    />
  );
};

export default Filter;
