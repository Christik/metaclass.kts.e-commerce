import { API_BASE_URL, API_ENDPOINTS } from "@config/api";
import ApiStore from "@store/ApiStore";
import {
  normalizeProduct,
  ProductApi,
  ProductModel,
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
  action,
  runInAction,
} from "mobx";

type PrivateFields = "_list" | "_meta";

export default class ProductsStore implements ILocalStore {
  private readonly _apiStore = new ApiStore(API_BASE_URL);

  private _list: CollectionModel<number, ProductModel> =
    getInitialCollectionModel();
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<ProductsStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      list: computed,
      meta: computed,
      getProducts: action,
    });
  }

  get list(): ProductModel[] {
    return linearizeCollection<number, ProductModel>(this._list);
  }

  get meta(): Meta {
    return this._meta;
  }

  async getProducts(offset: number = 0, limit: number = 0) {
    this._list = getInitialCollectionModel();
    this._meta = Meta.loading;

    try {
      const url = `${API_ENDPOINTS.PRODUCTS}?offset=${offset}&limit=${limit}`;
      const response = await this._apiStore.request(url);

      runInAction(() => {
        this._list = normalizeCollection<number, ProductApi, ProductModel>(
          response.data,
          (element) => element.id,
          normalizeProduct
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
