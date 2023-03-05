import { API_BASE_URL, API_ENDPOINTS } from "@config/api";
import ApiStore from "@store/ApiStore";
import { CategoryModel, normalizeCategory } from "@store/models/product";
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from "@store/models/shared";
import { Meta } from "@utils/meta";
import { ILocalStore } from "@utils/useLocalStore";
import {
  computed,
  makeObservable,
  observable,
  runInAction,
  action,
} from "mobx";

type PrivateFields = "_list" | "_meta";

export default class CategoryStore implements ILocalStore {
  private readonly _apiStore = new ApiStore(API_BASE_URL);

  private _list: CollectionModel<number, CategoryModel> =
    getInitialCollectionModel();
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<CategoryStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      list: computed,
      meta: computed,
      getCategories: action,
    });
  }

  get list() {
    return linearizeCollection(this._list);
  }

  get meta() {
    return this._meta;
  }

  async getCategories() {
    this._meta = Meta.loading;
    this._list = getInitialCollectionModel();

    try {
      const response = await this._apiStore.request(API_ENDPOINTS.CATEGORIES);

      runInAction(() => {
        this._list = normalizeCollection(
          response.data,
          (element) => element.id,
          normalizeCategory
        );
        this._meta = Meta.success;
      });
    } catch (error) {
      this._list = getInitialCollectionModel();
      this._meta = Meta.error;
    }
  }

  destroy(): void {}
}
