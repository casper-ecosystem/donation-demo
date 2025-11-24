const API_URL = config.donation_api_url;

export const getProxyWasm = async (): Promise<Uint8Array> => {
  const res = await fetch(`${API_URL}/proxy-wasm`);
  if (!res.ok) {
    const message = await res.text().catch(() => res.statusText);
    throw new Error(`Failed to fetch proxy WASM: ${message}`);
  }

  const buffer = await res.arrayBuffer();
  return new Uint8Array(buffer);
};
