import { AUTH_TOKEN, statusCode } from '../../constants';

export interface ErrorResult {
  code: string;
  message: string;
  description?: string | React.ReactElement;
}

export interface GetResponseType<Entity extends any> {
  loading: boolean;
  error: ErrorResult | null;
  httpCode?: number;
  data: Entity | null;
}

const useApi = async (
  url: string,
  method: string,
  payload: any,
  headers: object,
  withAuth: boolean,
  authToken?: string
): Promise<GetResponseType<any>> => {
  const result: GetResponseType<any> = {
    httpCode: 0,
    loading: true,
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

  withAuth &&
    (requestOptions.headers['Authorization'] =
      `Bearer ${authToken ? authToken : localStorage.getItem(AUTH_TOKEN)}`);

  try {
    const response = await fetch(url, requestOptions);
    httpCode = response.status;

    if (httpCode === statusCode.no_content) {
      return {
        data: {},
        httpCode,
        error: null,
        loading: false
      };
    }

    if (httpCode >= statusCode.unexpected_error) {
      const message = await response.text();
      result.error = {
        code: '',
        message: message
      };
      result.loading = false;
      return result;
    }
    const data = await response.json();

    result.httpCode = httpCode;

    if (data?.error) {
      result.data = null;
      result.error = data.error;
      result.loading = false;
      return result;
    }

    result.data = data;
    result.loading = false;

    return result;
  } catch (error: any) {
    result.error = {
      code: error.code,
      message: error.message
    };
    result.loading = false;

    return result;
  }
};

export default useApi;
