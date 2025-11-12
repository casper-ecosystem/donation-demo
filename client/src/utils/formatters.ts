import { createIntl, createIntlCache } from '@formatjs/intl';
import i18next from 'i18next';

const cache = createIntlCache();
const intl = createIntl(
  {
    locale: 'en-US',
    messages: {
      'components.transaction_status': 'Success'
    }
  },
  cache
);

export const formatNumber = (
  value: number | string,
  {
    precision,
    minPrecision,
    notation,
    compactDisplay
  }: {
    precision?: number;
    minPrecision?: number;
    notation?: 'compact' | 'standard';
    compactDisplay?: 'short' | 'long';
  } = {}
): string => {
  return intl.formatNumber(value as number, {
    minimumFractionDigits: (minPrecision !== null ? minPrecision : precision) || 0,
    maximumFractionDigits: precision || 0,
    notation,
    compactDisplay
  });
};

export enum HashLength {
  FULL = 0,
  TINY = 5,
  LITTLE = 10,
  SMALL = 15,
  MEDIUM = 20,
  LARGE = 25
}

export const formatTimestamp = (value: string): string => {
  const date = new Date(value);
  const locale = i18next.language || 'en';
  const nativeIntl = new Intl.DateTimeFormat(locale, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short'
  });

  return `${nativeIntl.format(date)}`;
};
