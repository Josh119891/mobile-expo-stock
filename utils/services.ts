import axios, { AxiosResponse } from 'axios';
import { QuoteObject, QuoteResponse } from '../types';
// @ts-ignore
import { ALPHA_VANTAGE_API_KEY } from '@env';
const instance = axios.create({
  baseURL: 'https://www.alphavantage.co/query',
  timeout: 1000,
});

export const quoteEndpoint = async (symbol: string): Proimse<QuoteObject> => {
  try {
    const response = await instance.get(`?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`);
    return (response.data as QuoteResponse)['Global Quote'];
  } catch (error: any) {
    console.log(error.message);
  }
};
