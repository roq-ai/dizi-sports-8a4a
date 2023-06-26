import axios from 'axios';
import queryString from 'query-string';
import { CricketStatInterface, CricketStatGetQueryInterface } from 'interfaces/cricket-stat';
import { GetQueryInterface } from '../../interfaces';

export const getCricketStats = async (query?: CricketStatGetQueryInterface) => {
  const response = await axios.get(`/api/cricket-stats${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createCricketStat = async (cricketStat: CricketStatInterface) => {
  const response = await axios.post('/api/cricket-stats', cricketStat);
  return response.data;
};

export const updateCricketStatById = async (id: string, cricketStat: CricketStatInterface) => {
  const response = await axios.put(`/api/cricket-stats/${id}`, cricketStat);
  return response.data;
};

export const getCricketStatById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/cricket-stats/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCricketStatById = async (id: string) => {
  const response = await axios.delete(`/api/cricket-stats/${id}`);
  return response.data;
};
