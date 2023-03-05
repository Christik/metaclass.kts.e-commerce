import {
  useState,
  SyntheticEvent,
  ChangeEvent,
  FC,
  useEffect,
  useCallback,
} from "react";

import Button from "@components/Button";
import rootStore from "@store/RootStore/instance";
import classnames from "classnames";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";

import styles from "./Search.module.scss";

type SearchProps = {
  className?: string;
};

const Search: FC<SearchProps> = ({ className }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");

  const onInputChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    setSearch(evt.target.value);
  }, []);

  const onFormSubmit = useCallback(
    (evt: SyntheticEvent) => {
      evt.preventDefault();

      if (search) {
        searchParams.set("search", search);
      } else {
        searchParams.delete("search");
      }

      searchParams.delete("page");
      setSearchParams(searchParams);
    },
    [search, searchParams, setSearchParams]
  );

  useEffect(() => {
    setSearch(rootStore.query.getParam("search"));
  }, []);

  return (
    <form
      className={classnames(styles.search, className)}
      onSubmit={onFormSubmit}
    >
      <input
        className={styles.input}
        type="text"
        placeholder="Search property"
        value={search || ""}
        onChange={onInputChange}
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
