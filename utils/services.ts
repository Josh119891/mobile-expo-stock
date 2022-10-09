import axios, { AxiosResponse } from 'axios';
import { QuoteObject, QuoteResponse, QuoteStock, Stock, ChartResponse } from '../types';
// @ts-ignore
import { ALPHA_VANTAGE_API_KEY } from '@env';
const instance = axios.create({
  baseURL: 'https://www.alphavantage.co/query',
  timeout: 5000,
});

export const quoteEndpoint = async (stock: Stock): Promise<QuoteStock> => {
  const response = await instance.get(`?function=GLOBAL_QUOTE&symbol=${stock.symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`);
  return { ...(response.data as QuoteResponse)['Global Quote'], ...stock } as QuoteStock;
};

export const getDailyStock = async (symbol: string): Promise<ChartResponse | undefined> => {
  try {
    const response = await instance.get(`?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`);
    return response.data['Time Series (Daily)'];
  } catch (error: any) {
    alert(error.message);
  }
};

export const getMonthlyStock = async (symbol: string): Promise<ChartResponse | undefined> => {
  try {
    const response = await instance.get(`?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`);
    return response.data['Monthly Time Series'];
  } catch (error: any) {
    alert(error.message);
  }
};
