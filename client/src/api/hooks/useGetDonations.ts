import { useEffect, useState } from 'react';
import { GetResponseType } from './useApi';
import { DonationResponse, getAllDonations } from '../donation-requests';

export const useGetDonations = (offset?: string) => {
  const [getDonationResponse, setGetDonationResponse] = useState<GetResponseType<DonationResponse>>(
    {
      data: null,
      loading: false,
      error: null
    }
  );

  const fetchDonations = async (offset?: string) => {
    setGetDonationResponse(prev => ({ ...prev, loading: true, error: null }));

    getAllDonations(offset)
        .then(response => {
          setGetDonationResponse({ ...response });
        })
        .catch(err => {
          setGetDonationResponse({
            data: null,
            loading: false,
            error: err,
          });
        });
  };


  useEffect(() => {
    fetchDonations(offset);
  }, []);

  const refetch = (offset?: string) => fetchDonations(offset);

  return {
    data: getDonationResponse.data,
    httpCode: getDonationResponse.httpCode,
    error: getDonationResponse.error,
    loading: getDonationResponse.loading,
    refetch: refetch
  };
};