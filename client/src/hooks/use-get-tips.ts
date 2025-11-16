import { useEffect, useState } from 'react';
import { TipsResponse, getCommunityTips, GetResponseType } from '../api/tips-requests';

export const useGetTips = (limit?: string) => {
  const [getTipsResponse, setGeTipsResponse] = useState<
    GetResponseType<TipsResponse> & { loading: boolean }
  >({
    data: null,
    httpCode: 0,
    error: null,
    loading: true
  });

  const fetchTips = async (limit?: string) => {
    setGeTipsResponse((prev) => ({ ...prev, loading: true, error: null }));
    getCommunityTips(limit)
      .then((response) => {
        setGeTipsResponse({ ...response, loading: false });
      })
      .catch((err) => {
        setGeTipsResponse({
          data: null,
          httpCode: 0,
          error: err,
          loading: false
        });
      });
  };

  useEffect(() => {
    fetchTips(limit);
  }, []);

  const refetch = (limit?: string) => fetchTips(limit);

  return {
    data: getTipsResponse.data,
    httpCode: getTipsResponse.httpCode,
    error: getTipsResponse.error,
    loading: getTipsResponse.loading,
    refetch: refetch
  };
};
