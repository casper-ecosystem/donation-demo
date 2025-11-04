import { Currency, CurrencySettings, CurrencyType } from '@make-software/csprclick-ui';

export const CURRENCIES: Currency[] = [
  {
    code: 'USD',
    title: 'US Dollar',
    type_id: CurrencyType.FIAT
  },
  {
    code: 'EUR',
    title: 'Euro',
    type_id: CurrencyType.FIAT
  },
  {
    code: 'JPY',
    title: 'Japanese Yen',
    type_id: CurrencyType.FIAT
  },
  {
    code: 'GBP',
    title: 'Pound Sterling',
    type_id: CurrencyType.FIAT
  },
  {
    code: 'CAD',
    title: 'Canadian Dollar',
    type_id: CurrencyType.FIAT
  },
  {
    code: 'CHF',
    title: 'Swiss Franc',
    type_id: CurrencyType.FIAT
  },
  {
    code: 'CNY',
    title: 'Chinese Yuan',
    type_id: CurrencyType.FIAT
  },
  {
    code: 'BTC',
    title: 'Bitcoin',
    type_id: CurrencyType.CRYPTO
  },
  {
    code: 'ETH',
    title: 'Ethereum',
    type_id: CurrencyType.CRYPTO
  },
  {
    code: 'AED',
    title: 'UAE Dirham',
    type_id: CurrencyType.FIAT
  },
  {
    code: 'ARS',
    title: 'Argentine Peso',
    type_id: CurrencyType.FIAT
  },
  {
    code: 'AUD',
    title: 'Australian Dollar',
    type_id: CurrencyType.FIAT
  },
  {
    code: 'BRL',
    title: 'Brazilian Real',
    type_id: CurrencyType.FIAT
  },
  {
    code: 'CZK',
    title: 'Czech Koruna',
    type_id: CurrencyType.FIAT
  },
  {
    code: 'DKK',
    title: 'Danish Krone',
    type_id: CurrencyType.FIAT
  },
  {
    code: 'HUF',
    title: 'Hungarian Forint',
    type_id: CurrencyType.FIAT
  },
  {
    code: 'ILS',
    title: 'Israeli New Shekel',
    type_id: CurrencyType.FIAT
  },
  {
    code: 'INR',
    title: 'Indian Rupee',
    type_id: CurrencyType.FIAT
  },
  {
    code: 'MXN',
    title: 'Mexican Peso',
    type_id: CurrencyType.FIAT
  },
  {
    code: 'NOK',
    title: 'Norwegian Krone',
    type_id: CurrencyType.FIAT
  },
  {
    code: 'NZD',
    title: 'New Zealand Dollar',
    type_id: CurrencyType.FIAT
  },
  {
    code: 'PLN',
    title: 'Polish Złoty',
    type_id: CurrencyType.FIAT
  },
  {
    code: 'SAR',
    title: 'Saudi Riyal',
    type_id: CurrencyType.FIAT
  },
  {
    code: 'SEK',
    title: 'Swedish Krona',
    type_id: CurrencyType.FIAT
  },
  {
    code: 'TRY',
    title: 'Turkish Lira',
    type_id: CurrencyType.FIAT
  },
  {
    code: 'UAH',
    title: 'Ukrainian Hryvnia',
    type_id: CurrencyType.FIAT
  }
];

export const currencySettings = (currency: Currency, setCurrency: (c: Currency) => void) => {
  return {
    currencies: CURRENCIES,
    onChangeCurrency: (c: Currency) => {
      setCurrency(c);
      console.log(`Switched currency to ${c.code}`);
    },
    currentCurrency: currency
  } as CurrencySettings;
};
