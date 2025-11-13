const API_URL = config.donation_api_url;

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

export const getCommunityTips = async (limit?: string): Promise<GetResponseType<TipsResponse>> => {
  try {
    const res = await fetch(`${API_URL}/donations${limit ? '?limit=' + limit : ''}`, {
      cache: 'no-store'
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.details || data.error || 'Unknown API error');
    }

    return {
      data,
      httpCode: res.status,
      loading: false,
      error: null
    };
  } catch (err: any) {
    return {
      data: null,
      httpCode: 500,
      loading: false,
      error: err
    };
  }
};
