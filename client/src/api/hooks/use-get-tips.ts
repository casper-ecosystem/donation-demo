import { useEffect, useState } from 'react';
import { TipsResponse, getCommunityTips, GetResponseType } from '../tips-requests';

export const useGetTips = (offset?: string) => {
  const [getTipsResponse, setGeTipsResponse] = useState<GetResponseType<TipsResponse>>({
    data: null,
    loading: false,
    error: null
  });

  const fetchTips = async (offset?: string) => {
    setGeTipsResponse((prev) => ({ ...prev, loading: true, error: null }));

    getCommunityTips(offset)
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
    fetchTips(offset);
  }, []);

  const refetch = (offset?: string) => fetchTips(offset);

  return {
    data: getTipsResponse.data,
    httpCode: getTipsResponse.httpCode,
    error: getTipsResponse.error,
    loading: getTipsResponse.loading,
    refetch: refetch
  };
};
