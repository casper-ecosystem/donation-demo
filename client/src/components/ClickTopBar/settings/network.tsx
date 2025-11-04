export const NETWORKS = ['Mainnet', 'Testnet'];

export const networkSettings = (network: string, setNetwork: (n: string) => void) => {
  return {
    networks: NETWORKS,
    onNetworkSwitch: (n: string) => {
      setNetwork(n);
      console.log(`Switched network to ${n}.`);
    },
    currentNetwork: network
  };
};
