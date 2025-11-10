// import { useState } from 'react';
// import { GetResponseType } from './useApi';
// import { DonationResponse, getAllDonations } from '../donation-requests';
// import { useOnMountUnsafe } from '../../hooks/useOnMountUnsafe';
//
// export const useGetDonations = (offset?: string) => {
//   const [getDonationResponse, setGetDonationResponse] = useState<GetResponseType<DonationResponse>>(
//     {
//       data: null,
//       loading: false,
//       error: null
//     }
//   );
//
//   const fetchDonations = async (offset?: string) => {
//     setGetDonationResponse(prev => ({ ...prev, loading: true, error: null })); // mark loading true
//     try {
//       const response = await getAllDonations(offset);
//       setGetDonationResponse({
//         ...response,
//         loading: false,
//       });
//     } catch (err: any) {
//       setGetDonationResponse({
//         data: null,
//         loading: false,
//         error: err,
//       });
//     }
//   };
//
//   // const fetchDonations = async (offset?: string) => {
//   //   const response = await getAllDonations(offset);
//   //   setGetDonationResponse(response);
//   // };
//
//   useOnMountUnsafe(() => fetchDonations(offset));
//
//   const refetch = (offset?: string) => fetchDonations(offset);
//
//   return {
//     data: getDonationResponse.data,
//     httpCode: getDonationResponse.httpCode,
//     error: getDonationResponse.error,
//     loading: getDonationResponse.loading,
//     refetch: refetch
//   };
// };

import { useOnMountUnsafe } from '../../hooks/useOnMountUnsafe';
import { DonationResponse, getAllDonations } from '../donation-requests';
import { GetResponseType } from './useApi';
import { useState } from 'react';

export const useGetDonations = (offset?: string) => {
  const [getDonationResponse, setGetDonationResponse] = useState<GetResponseType<DonationResponse>>(
    {
      data: null,
      loading: false,
      error: null
    }
  );

  const fetchDonations = async (offset?: string) => {
    setGetDonationResponse((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await getAllDonations(offset);

      setGetDonationResponse({
        data: response.data ? { ...response.data, items: [...response.data.items] } : null,
        httpCode: response.httpCode,
        error: null,
        loading: false
      });
    } catch (err: any) {
      setGetDonationResponse({
        data: null,
        httpCode: undefined,
        error: err,
        loading: false
      });
    }
  };

  useOnMountUnsafe(() => fetchDonations(offset));

  const refetch = (offset?: string) => {
    fetchDonations(offset);
  };

  return {
    data: getDonationResponse.data,
    httpCode: getDonationResponse.httpCode,
    error: getDonationResponse.error,
    loading: getDonationResponse.loading,
    refetch
  };
};
