import axios, { AxiosResponse } from "axios";

export default class ApiStore {
  private _baseUrl: string | null = null;

  constructor(baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  async request<T>(endpoint: string): Promise<T> {
    const response: AxiosResponse<T> = await axios.get(
      `${this._baseUrl}${endpoint}`
    );
    return response.data;
  }
}
