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
import rootStore from "@store/RootStore/instance";
import { Meta } from "@utils/meta";
import { ILocalStore } from "@utils/useLocalStore";
import {
  computed,
  makeObservable,
  observable,
  action,
  runInAction,
  reaction,
  IReactionDisposer,
} from "mobx";

type PrivateFields =
  | "_list"
  | "_count"
  | "_page"
  | "_limit"
  | "_offset"
  | "_meta"
  | "_category"
  | "_search"
  | "_setOffset";

export default class ProductsStore implements ILocalStore {
  private readonly _apiStore = new ApiStore(API_BASE_URL);

  private _list: CollectionModel<number, ProductModel> =
    getInitialCollectionModel();
  private _count: number | null = null;
  private _limit: number = 0;
  private _offset: number = 0;
  private _meta: Meta = Meta.initial;
  private _search: string = rootStore.query.getParam("search");
  private _page: number = rootStore.query.getParam("page")
    ? Number(rootStore.query.getParam("page"))
    : 1;
  private _category: number | null = rootStore.query.getParam("category")
    ? Number(rootStore.query.getParam("category"))
    : null;

  constructor(limit: number) {
    this._limit = limit;

    makeObservable<ProductsStore, PrivateFields>(this, {
      _list: observable.ref,
      _count: observable,
      _page: observable,
      _limit: observable,
      _offset: observable,
      _category: observable,
      _search: observable,
      _meta: observable,
      list: computed,
      count: computed,
      page: computed,
      category: computed,
      meta: computed,
      _setOffset: action,
      setCategory: action,
      setPage: action,
      getProducts: action,
    });
  }

  get list(): ProductModel[] {
    return linearizeCollection<number, ProductModel>(this._list);
  }

  get count(): number | null {
    return this._count;
  }

  get page(): number {
    return this._page;
  }

  get limit(): number {
    return this._limit;
  }

  get category(): number | null {
    return this._category;
  }

  get meta(): Meta {
    return this._meta;
  }

  private _setOffset = (): void => {
    this._offset = this._page * this._limit - this._limit;
  };

  setPage = (page: number): void => {
    this._page = page;
    this._setOffset();
  };

  setCategory = (id: number | null): void => {
    this._category = id;
  };

  private async _getList(
    offset: number = 0,
    limit: number = 0
  ): Promise<ProductApi[]> {
    const offsetPath = `offset=${offset}&limit=${limit}`;
    const categoryPath = this._category ? `categoryId=${this._category}` : "";
    const titlePath = this._search ? `title=${this._search}` : "";
    const url = `${API_ENDPOINTS.PRODUCTS}?${offsetPath}&${categoryPath}&${titlePath}`;

    return await this._apiStore.request<ProductApi[]>(url);
  }

  async getProducts(shouldCounterRecalc: boolean = false): Promise<void> {
    this._list = getInitialCollectionModel();
    this._meta = Meta.loading;

    try {
      const list = await this._getList(this._offset, this._limit);
      let allList;
      shouldCounterRecalc = this._count === null || shouldCounterRecalc;

      if (shouldCounterRecalc) {
        allList = await this._getList();
      }

      runInAction(() => {
        this._list = normalizeCollection<number, ProductApi, ProductModel>(
          list,
          (element) => element.id,
          normalizeProduct
        );

        this._count = shouldCounterRecalc ? allList?.length : this._count;
        this._meta = Meta.success;
      });
    } catch (error) {
      this._count = 0;
      this._list = getInitialCollectionModel();
      this._meta = Meta.error;
    }
  }

  private readonly _querySearchReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam("search"),
    async (search) => {
      this._search = search as string;
      this.setPage(1);
      await this.getProducts(true);
    }
  );

  private readonly _queryCategoryReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam("category"),
    async (category) => {
      this._category = Number(category);
      this.setPage(1);
      await this.getProducts(true);
    }
  );

  private readonly _queryPageReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam("page"),
    (page) => {
      if (page) {
        this.setPage(Number(page));
        this.getProducts();
      }
    }
  );

  destroy(): void {}
}
