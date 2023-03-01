import { API_BASE_URL, API_ENDPOINTS } from "@config/api";
import ApiStore from "@store/ApiStore";
import { Meta } from "@utils/meta";
import { ILocalStore } from "@utils/useLocalStore";
import {
  makeObservable,
  observable,
  runInAction,
  computed,
  action,
} from "mobx";

type PrivateFields = "_count" | "_meta";

export default class ProductCountStore implements ILocalStore {
  private readonly _apiStore = new ApiStore(API_BASE_URL);

  private _count = 0;
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<ProductCountStore, PrivateFields>(this, {
      _count: observable,
      _meta: observable,
      count: computed,
      meta: computed,
      getCount: action,
    });
  }

  get count(): number {
    return this._count;
  }

  get meta(): Meta {
    return this._meta;
  }

  async getCount() {
    this._count = 0;
    this._meta = Meta.loading;

    try {
      const response = await this._apiStore.request(API_ENDPOINTS.PRODUCTS);

      runInAction(() => {
        this._count = response.data.length;
        this._meta = Meta.success;
      });
    } catch (error) {
      this._meta = Meta.error;
    }
  }

  destroy(): void {}
}
