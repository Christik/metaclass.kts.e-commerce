import { ILocalStore } from "@utils/useLocalStore";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export default class ApiStore implements ILocalStore {
  private _config: AxiosRequestConfig;

  constructor(baseUrl: string) {
    this._config = {
      baseURL: baseUrl,
    };
  }

  async get<T>(endpoint: string): Promise<T> {
    const response: AxiosResponse<T> = await axios.get(endpoint, this._config);
    return response.data;
  }

  async post<T, U>(endpoint: string, data: U) {
    const response: AxiosResponse<T> = await axios.post(
      endpoint,
      data,
      this._config
    );
    return response.data;
  }

  destroy(): void {}
}
