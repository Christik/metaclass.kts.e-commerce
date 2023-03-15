import { API_BASE_URL, API_ENDPOINTS } from "@config/api";
import ApiStore from "@store/ApiStore";
import {
  getInitialUserModel,
  normalizeUser,
  UserApi,
  UserModel,
} from "@store/models/user";
import { AuthStatus } from "@utils/auth";
import { getToken, saveToken } from "@utils/token";
import { ILocalStore } from "@utils/useLocalStore";
import {
  computed,
  makeObservable,
  observable,
  action,
  runInAction,
} from "mobx";

type AuthData = {
  email: string;
  password: string;
};

type AuthResponse = {
  access_token: string;
  refresh_token: string;
};

type PrivateFields = "_status" | "_user";

export default class AuthStore implements ILocalStore {
  private readonly _apiStore = new ApiStore(API_BASE_URL);

  private _status: AuthStatus = AuthStatus.unknown;
  private _user: UserModel = getInitialUserModel();

  constructor() {
    makeObservable<AuthStore, PrivateFields>(this, {
      _status: observable,
      _user: observable,
      status: computed,
      user: computed,
      isAuthorized: computed,
      login: action.bound,
      getUser: action.bound,
    });
  }

  get status(): AuthStatus {
    return this._status;
  }

  get user(): UserModel {
    return this._user;
  }

  get isAuthorized(): boolean {
    return this._status === AuthStatus.auth;
  }

  async login(data: AuthData): Promise<void> {
    const response = await this._apiStore.post<AuthResponse, AuthData>(
      API_ENDPOINTS.AUTH,
      data
    );

    saveToken(response.access_token);
    await this.getUser();
  }

  async getUser(): Promise<void> {
    try {
      const user = await this._apiStore.get<UserApi>(API_ENDPOINTS.AUTH_USER, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      runInAction(() => {
        this._user = normalizeUser(user);
        this._status = AuthStatus.auth;
      });
    } catch (error) {
      this._status = AuthStatus.noAuth;
    }
  }

  destroy(): void {
    this._apiStore.destroy();
  }
}
