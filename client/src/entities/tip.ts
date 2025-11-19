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
