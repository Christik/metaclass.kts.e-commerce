import { API_BASE_URL, API_ENDPOINTS } from "@config/api";
import ApiStore from "@store/ApiStore";
import { Meta } from "@utils/meta";

export default class ProductCountStore {
  private readonly _apiStore = new ApiStore(API_BASE_URL);

  private _count = 0;
  private _meta: Meta = Meta.initial;

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
      this._count = response.data.length;
      this._meta = Meta.success;
    } catch (error) {
      this._meta = Meta.error;
    }
  }
}
