import { API_BASE_URL, API_ENDPOINTS } from "@config/api";
import ApiStore from "@store/ApiStore";
import {
  CategoryApi,
  CategoryModel,
  normalizeCategory,
} from "@store/models/product";
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

type PrivateFields = "_list" | "_current" | "_meta";

export default class CategoryStore implements ILocalStore {
  private readonly _apiStore = new ApiStore(API_BASE_URL);

  private _list: CollectionModel<number, CategoryModel> =
    getInitialCollectionModel();
  private _current: CategoryModel | null = null;
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<CategoryStore, PrivateFields>(this, {
      _list: observable.ref,
      _current: observable,
      _meta: observable,
      list: computed,
      current: computed,
      meta: computed,
      setCurrent: action,
      getCategories: action,
    });
  }

  get list(): CategoryModel[] {
    return linearizeCollection(this._list);
  }

  get current(): CategoryModel | null {
    return this._current;
  }

  get meta(): Meta {
    return this._meta;
  }

  setCurrent(id: number | null): void {
    this._current = id === null ? id : this._list.entities[id];
  }

  async getCategories(): Promise<void> {
    this._meta = Meta.loading;
    this._list = getInitialCollectionModel();

    try {
      const data = await this._apiStore.request<CategoryApi[]>(
        API_ENDPOINTS.CATEGORIES
      );

      runInAction(() => {
        this._list = normalizeCollection(
          data,
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
