import axios from 'axios';
import { Account } from './account';

interface ErrorResponse {
  code: string;
  message: string;
  description: string;
}
export interface Response<T> {
  data?: T;
  error?: ErrorResponse;
}

export class CSPRCloudAPIClient {
  private client: axios.AxiosInstance;

  constructor(url: string, accessKey: string) {
    this.client = axios.create({
      baseURL: url,
      headers: { authorization: accessKey },
    });
  }

  async getAccount(accountIdentifier: string): Promise<Response<Account>> {
    const accHash = accountIdentifier.replace('account-hash-', '');

    const response = await this.client.get<Response<Account>>(`/accounts/${accHash}`);

    return response.data;
  }
}
