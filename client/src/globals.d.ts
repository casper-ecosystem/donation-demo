type GlobalConfig = {
  donation_contract_package_hash: string;
  donation_api_url: string;
  cspr_click_app_name: string;
  cspr_click_app_id: string;
  cspr_live_url: string;
  cspr_chain_name: string;
  gas_price_in_cspr: string;
};

declare const config: GlobalConfig;

declare module '*.svg';

declare module '*.png';
declare module 'facepaint';
declare module 'big.js';
