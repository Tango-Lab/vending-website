import { TypeCurrency } from '@/@types/currency';

/**
 * Formats a given number as a currency with commas as thousands separators and ensures two decimal places.
 * If the argument is not a valid number, it returns a default value.
 *
 * @param {number} argument - The number to format.
 * @param {string} [defaultTo=''] - The default value to return if the input is not a valid number.
 * @param {CurrencyType} [currency='KHR'] - The currency code to format the number (e.g., 'USD', 'KHR').
 * @returns {string} The formatted number with commas and two decimal places as a currency, or the default value.
 *
 * @example
 * formatCurrency(1234567.5); // "៛1,234,567.50" (assuming 'KHR' default)
 * formatCurrency(1234567.5, '', 'USD'); // "$1,234,567.50"
 * formatCurrency(NaN, 'N/A'); // "N/A"
 */
export function formatCurrencyWithSymbol(argument: number, defaultTo = '', currency: TypeCurrency = 'KHR'): string {
  if (!isValidNumber(argument)) {
    return defaultTo;
  }

  // Default currency formatting with symbol
  const formattedNumber = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    currencyDisplay: 'symbol',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(argument);

  // Handle special case for KHR (Cambodian Riel) which may not show the symbol properly in some environments
  if (currency === 'KHR') {
    return `៛ ${formattedNumber.replace(/[^0-9,.]/g, '')}`; // Replace any remaining symbols, keeping the number format
  }

  return formattedNumber;
}

/**
 * Formats a given number with commas as thousands separators and ensures two decimal places.
 * If the argument is not a valid number, it returns a default value.
 *
 * @param {number} argument - The number to format.
 * @param {string} [defaultTo=''] - The default value to return if the input is not a valid number.
 * @returns {string} The formatted number with commas and two decimal places, or the default value.
 *
 * @example
 * formatNumber(1234567.5); // "1,234,567.50"
 * formatNumber(NaN, 'N/A'); // "N/A"
 */
export function formatNumber(argument: number, defaultTo = '') {
  if (!isValidNumber(argument)) {
    return defaultTo;
  }

  return argument.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function isValidNumber(value: number): boolean {
  return typeof value === 'number' && !isNaN(value);
}
