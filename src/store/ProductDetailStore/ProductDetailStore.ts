import { API_BASE_URL, API_ENDPOINTS } from "@config/api";
import ApiStore from "@store/ApiStore";
import { normalizeProduct, ProductModel } from "@store/models/product";
import { Meta } from "@utils/meta";
import { ILocalStore } from "@utils/useLocalStore";
import {
  makeObservable,
  observable,
  computed,
  action,
  runInAction,
} from "mobx";

type PrivateFields = "_product" | "_meta";

export default class ProductDetailStore implements ILocalStore {
  private readonly _apiStore = new ApiStore(API_BASE_URL);

  private _product: ProductModel | null = null;
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<ProductDetailStore, PrivateFields>(this, {
      _product: observable.ref,
      _meta: observable,
      product: computed,
      meta: computed,
      getProductDetail: action,
    });
  }

  get product(): ProductModel | null {
    return this._product;
  }

  get meta(): Meta {
    return this._meta;
  }

  async getProductDetail(id: string) {
    this._product = null;
    this._meta = Meta.loading;

    try {
      const url = `${API_ENDPOINTS.PRODUCTS}${id}`;
      const response = await this._apiStore.request(url);

      runInAction(() => {
        this._product = normalizeProduct(response.data);
        this._meta = Meta.success;
      });
    } catch (error) {
      this._meta = Meta.error;
    }
  }

  destroy(): void {}
}
