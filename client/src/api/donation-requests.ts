import useApi, { GetResponseType } from './hooks/useApi';

const API_URL = process.env.REACT_APP_API_URL;

export interface Donation {
  id: string;
  sender_public_key: string;
  amount_cspr: string;
  message: string;
  timestamp: string;
  transaction_hash: string;
}

export interface DonationResponse {
  items: Donation[];
  total: number;
}

export const getAllDonations = async (
  offset?: string
): Promise<GetResponseType<DonationResponse>> => {
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