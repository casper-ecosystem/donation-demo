import { statusCode } from '../../constants';

export interface ErrorResult {
  error: string;
  details: string;
}

export interface GetResponseType<Entity extends any> {
  loading?: boolean;
  error: ErrorResult | null;
  httpCode?: number;
  data: Entity | null;
}

const useApi = async (
  url: string,
  method: string,
  payload: any,
  headers: object
): Promise<GetResponseType<any>> => {
  const result: GetResponseType<any> = {
    httpCode: 0,
    error: null as ErrorResult | null,
    data: null
  };

  let httpCode = 0;

  const requestOptions: any = {
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers
    }
  };

  payload && (requestOptions['body'] = JSON.stringify(payload));

  try {
    const response = await fetch(url, requestOptions);
    httpCode = response.status;

    if (httpCode === statusCode.no_content) {
      return {
        data: {},
        httpCode,
        error: null
      };
    }

    if (httpCode >= statusCode.unexpected_error) {
      const details = await response.text();
      result.error = {
        error: '',
        details: details
      };
      return result;
    }
    const data = await response.json();

    result.httpCode = httpCode;

    if (data?.error) {
      result.data = null;
      result.error = data.error;
      return result;
    }

    result.data = data;

    return result;
  } catch (er: any) {
    result.error = {
      error: er,
      details: er.details
    };

    return result;
  }
};

export default useApi;
