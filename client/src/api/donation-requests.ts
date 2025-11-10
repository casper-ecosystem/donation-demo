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
    false
  );
  return {
    data,
    httpCode,
    error,
    loading
  };
};

export interface NewDonation {
  sender_public_key: string;
  amount_cspr: number;
  message?: string;
}

export async function addDonation(data: NewDonation): Promise<void> {
  const res = await fetch(`${API_URL}/api/donations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to add donation');
}
