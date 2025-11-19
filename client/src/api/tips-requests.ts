import { GetResponseType, TipsResponse } from '@/entities';

const API_URL = config.donation_api_url;

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
