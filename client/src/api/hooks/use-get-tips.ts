import { useEffect, useState } from 'react';
import { TipsResponse, getCommunityTips, GetResponseType } from '../tips-requests';

export const useGetTips = (limit?: string) => {
  const [getTipsResponse, setGeTipsResponse] = useState<GetResponseType<TipsResponse>>({
    data: null,
    loading: false,
    error: null
  });

  const fetchTips = async (limit?: string) => {
    setGeTipsResponse((prev) => ({ ...prev, loading: true, error: null }));

    getCommunityTips(limit)
      .then((response) => {
        setGeTipsResponse({ ...response });
      })
      .catch((err) => {
        setGeTipsResponse({
          data: null,
          loading: false,
          error: err
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
