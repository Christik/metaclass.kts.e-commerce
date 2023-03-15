import AuthStore from "./AuthStore";
import QueryParamsStore from "./QueryParamsStore";

export default class RootStore {
  readonly query = new QueryParamsStore();
  readonly auth = new AuthStore();
}
