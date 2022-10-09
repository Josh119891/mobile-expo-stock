import axios, { AxiosResponse } from 'axios';
import { QuoteObject, QuoteResponse, QuoteStock, Stock } from '../types';
// @ts-ignore
import { ALPHA_VANTAGE_API_KEY } from '@env';
const instance = axios.create({
  baseURL: 'https://www.alphavantage.co/query',
  timeout: 5000,
});

export const quoteEndpoint = async (stock: Stock): Promise<QuoteStock> => {
  try {
    const response = await instance.get(`?function=GLOBAL_QUOTE&symbol=${stock.symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`);
    return { ...(response.data as QuoteResponse)['Global Quote'], ...stock } as QuoteStock;
  } catch (error: any) {
    console.log(error.message);
  }
};
