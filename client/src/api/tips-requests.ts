const API_URL = config.donation_api_url;

export interface ErrorResult {
  error: string;
  details: string;
}

export interface GetResponseType<Entity extends any> {
  error: ErrorResult | null;
  httpCode: number;
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
      return {
        data: null,
        httpCode: res.status,
        error: {
          error: data.error,
          details: data.details
        }
      };
    }

    return {
      data,
      httpCode: res.status,
      error: null
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      data: null,
      httpCode: 0,
      error: {
        error: 'Network error',
        details: message
      }
    };
  }
};
