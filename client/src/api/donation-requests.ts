const API_URL = process.env.REACT_APP_API_URL;

export interface Donation {
  id: string;
  sender_public_key: string;
  amount_cspr: number;
  message?: string;
  timestamp: string;
  transaction_hash?: string;
}

// Fetch all donations
export async function getAllDonations(): Promise<Donation[]> {
  const res = await fetch(`${API_URL}/donations`);
  if (!res.ok) throw new Error('Failed to fetch donations');
  return res.json();
}

// Add a new donation
export interface NewDonation {
  sender_public_key: string;
  amount_cspr: number;
  message?: string;
}

export async function addDonation(data: NewDonation): Promise<void> {
  const res = await fetch(`${API_URL}/api/donations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to add donation');
}
