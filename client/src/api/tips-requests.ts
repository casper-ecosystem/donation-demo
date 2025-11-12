import useApi, { GetResponseType } from './hooks/use-api';

const API_URL = process.env.REACT_APP_API_URL;

export interface Tip {
  id: string;
  sender_public_key: string;
  amount_cspr: string;
  message: string;
  timestamp: string;
  transaction_hash: string;
}

export interface TipsResponse {
  items: Tip[];
  total: number;
}

export const getCommunityTips = async (
  offset?: string
): Promise<GetResponseType<TipsResponse>> => {
  const { data, error, loading, httpCode } = await useApi(
    `${API_URL}/donations${offset ? '?offset=' + offset : ''}`,
    'GET',
    null,
    {},
  );
  return {
    data,
    httpCode,
    error,
    loading
  };
};