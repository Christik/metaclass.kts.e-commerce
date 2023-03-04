import { useState, SyntheticEvent, ChangeEvent, FC } from "react";

import Button from "@components/Button";
import { useQueryParamsStoreInit } from "@store/RootStore/hooks/useQueryParamsStoreInit";
import rootStore from "@store/RootStore/instance";
import classnames from "classnames";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";

import styles from "./Search.module.scss";

type SearchProps = {
  className?: string;
};

const Search: FC<SearchProps> = ({ className }) => {
  useQueryParamsStoreInit();

  const [, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(
    rootStore.query.getParam("search") ?? ""
  );

  const onFormSubmit = (evt: SyntheticEvent) => {
    evt.preventDefault();

    if (search) {
      setSearchParams({ search: search });
      return;
    }

    setSearchParams({});
  };

  return (
    <form
      className={classnames(styles.search, className)}
      onSubmit={onFormSubmit}
    >
      <input
        className={styles.input}
        type="text"
        placeholder="Search property"
        value={search}
        onChange={(evt: ChangeEvent<HTMLInputElement>) =>
          setSearch(evt.target.value)
        }
      />

      <svg className={styles.icon} viewBox="0 0 32 32">
        <path d="M15.3332 28.0001C22.3288 28.0001 27.9998 22.329 27.9998 15.3334C27.9998 8.33781 22.3288 2.66675 15.3332 2.66675C8.33756 2.66675 2.6665 8.33781 2.6665 15.3334C2.6665 22.329 8.33756 28.0001 15.3332 28.0001Z" />
        <path d="M29.3332 29.3334L26.6665 26.6667" />
      </svg>

      <Button type="submit" className={styles.button}>
        Find now
      </Button>
    </form>
  );
};

export default observer(Search);
