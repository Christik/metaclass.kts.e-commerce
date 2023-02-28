import axios from "axios";

export default class ApiStore {
  private _baseUrl: string | null = null;

  constructor(baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  async request(endpoint: string) {
    return await axios.get(`${this._baseUrl}${endpoint}`);
  }
}
