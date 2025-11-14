export interface DonationEventPayload {
  sender: string;
  amount: number;
  praise: string;
}

export interface ContractEvent<T> {
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