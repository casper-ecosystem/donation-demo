import { useEffect, useState, useCallback } from 'react';

import { GetResponseType, TipsResponse } from '@/entities';
import { getCommunityTips } from '@/api';

type TipsState = GetResponseType<TipsResponse> & { loading: boolean };

export const useGetTips = (limit?: string) => {
  const [state, setState] = useState<TipsState>({
    data: null,
    httpCode: 0,
    error: null,
    loading: true
  });

  const fetchTips = useCallback(async (lim?: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await getCommunityTips(lim);
      setState({ ...response, loading: false });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setState({
        data: null,
        httpCode: 0,
        error: { error: 'Unexpected error', details: message },
        loading: false
      });
    }
  }, []);

  useEffect(() => {
    const abortController = new AbortController();

    fetchTips(limit);

    return () => {
      abortController.abort();
    };
  }, [fetchTips, limit]);

  return {
    data: state.data,
    httpCode: state.httpCode,
    error: state.error,
    loading: state.loading,
    refetch: fetchTips
  };
};
