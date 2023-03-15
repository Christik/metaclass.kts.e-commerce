import { API_BASE_URL, API_ENDPOINTS } from "@config/api";
import ApiStore from "@store/ApiStore";
import {
  getInitialProductModel,
  normalizeProduct,
  ProductApi,
  ProductModel,
} from "@store/models/product";
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

  private _product: ProductModel = getInitialProductModel();
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<ProductDetailStore, PrivateFields>(this, {
      _product: observable.ref,
      _meta: observable,
      product: computed,
      meta: computed,
      isLoading: computed,
      isError: computed,
      isSuccess: computed,
      getProductDetail: action.bound,
    });
  }

  get product(): ProductModel {
    return this._product;
  }

  get meta(): Meta {
    return this._meta;
  }

  get isLoading(): boolean {
    return this._meta === Meta.loading;
  }

  get isError(): boolean {
    return this._meta === Meta.error;
  }

  get isSuccess(): boolean {
    return this._meta === Meta.success;
  }

  async getProductDetail(id: string): Promise<void> {
    this._meta = Meta.loading;
    this._product = getInitialProductModel();

    try {
      const url = `${API_ENDPOINTS.PRODUCTS}${id}`;
      const data = await this._apiStore.get<ProductApi>(url);

      runInAction(() => {
        this._product = normalizeProduct(data);
        this._meta = Meta.success;
      });
    } catch (error) {
      this._product = getInitialProductModel();
      this._meta = Meta.error;
    }
  }

  destroy(): void {
    this._apiStore.destroy();
  }
}
