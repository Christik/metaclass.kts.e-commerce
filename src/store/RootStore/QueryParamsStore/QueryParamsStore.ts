import { makeObservable, action, observable } from "mobx";
import * as qs from "qs";

type PrivateFields = "_params";

export default class QueryParamsStore {
  private _params: qs.ParsedQs = {};
  private _search: string = "";
  private _category: string = "";

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable.ref,
      setSearch: action,
    });
  }

  getParam(key: string): string {
    return this._params[key] as string;
  }

  setSearch(search: string) {
    search = search.startsWith("?") ? search.slice(1) : search;

    if (this._search !== search) {
      this._search = search;
      this._params = qs.parse(search);
    }
  }

  setCategory(category: string) {
    if (this._category !== category) {
      this._category = category;
      this._params = qs.parse(category);
    }
  }
}
