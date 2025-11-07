export interface DonationEventPayload {
  sender_public_key: string;
  amount_cspr: number;
  message: string;
  transaction_hash: string;
  timestamp: number;
}

export interface Event<T> {
  action: string;
  data: {
    contract_package_hash: string;
    contract_hash: string;
    name: string;
    data: T;
  };
  extra: {
    deploy_hash: string;
    event_id: number;
    transform_id: number;
  };
  timestamp: string;
}