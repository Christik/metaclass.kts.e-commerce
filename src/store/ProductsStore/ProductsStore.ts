import { API_BASE_URL, API_ENDPOINTS } from "@config/api";
import { Product } from "@config/types";
import ApiStore from "@store/ApiStore";
import { Meta } from "@utils/meta";

export default class ProductsStore {
  private readonly _apiStore = new ApiStore(API_BASE_URL);

  private _list: Product[] = [];
  private _meta: Meta = Meta.initial;

  get list(): Product[] {
    return this._list;
  }

  get meta(): Meta {
    return this._meta;
  }

  async getProducts(offset: number = 0, limit: number = 0) {
    this._list = [];
    this._meta = Meta.loading;

    try {
      const url = `${API_ENDPOINTS.PRODUCTS}?offset=${offset}&limit=${limit}`;
      const response = await this._apiStore.request(url);

      this._list = response.data;
      this._meta = Meta.success;
    } catch (error) {
      this._meta = Meta.error;
    }
  }
}
