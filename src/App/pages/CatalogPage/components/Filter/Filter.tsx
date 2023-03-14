import { FC, useCallback, useEffect, useMemo } from "react";

import Select, { Option } from "@components/Select";
import CategoryStore from "@store/CategoryStore";
import rootStore from "@store/RootStore/instance";
import { Meta } from "@utils/meta";
import { useLocalStore } from "@utils/useLocalStore";
import classnames from "classnames";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";

import styles from "./Filter.module.scss";

const FilterHeader: FC = () => {
  return (
    <div className={styles.header}>
      <svg className={styles.icon} viewBox="0 0 30 30">
        <path d="M6.75 2.625H23.25C24.625 2.625 25.75 3.75 25.75 5.125V7.875C25.75 8.875 25.125 10.125 24.5 10.75L19.125 15.5C18.375 16.125 17.875 17.375 17.875 18.375V23.75C17.875 24.5 17.375 25.5 16.75 25.875L15 27C13.375 28 11.125 26.875 11.125 24.875V18.25C11.125 17.375 10.625 16.25 10.125 15.625L5.375 10.625C4.75 10 4.25 8.875 4.25 8.125V5.25C4.25 3.75 5.375 2.625 6.75 2.625Z" />
        <path d="M13.6625 2.625L7.5 12.5" />
      </svg>
      Filter
    </div>
  );
};

type FilterProps = {
  className?: string;
};

const Filter: FC<FilterProps> = ({ className }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryStore = useLocalStore(() => new CategoryStore());

  const categoryParam = rootStore.query.getParam("category");
  const value = categoryParam ? String(categoryParam) : "";

  const options = useMemo<Option[]>(() => {
    return categoryStore.list.map(({ id, name }) => ({
      key: String(id),
      value: name,
    }));
  }, [categoryStore.list]);

  const onSelectChange = useCallback(
    (option: Option | null) => {
      if (option?.key) {
        searchParams.set("category", option.key);
      } else {
        searchParams.delete("category");
      }

      searchParams.delete("page");
      setSearchParams(searchParams);
      categoryStore.setCurrent(option ? Number(option.key) : null);
    },
    [categoryStore, searchParams, setSearchParams]
  );

  useEffect(() => {
    categoryStore.getCategories();
  }, [categoryStore]);

  useEffect(() => {
    const id = Number(rootStore.query.getParam("category"));
    categoryStore.setCurrent(id);
  }, [categoryStore]);

  return (
    <Select
      className={classnames(
        styles.filter,
        { [styles["filter_disabled"]]: categoryStore.isLoading },
        className
      )}
      options={options}
      value={value}
      disabled={categoryStore.isLoading}
      onChange={onSelectChange}
      pluralizeOptions={() => <FilterHeader />}
    />
  );
};

export default observer(Filter);
