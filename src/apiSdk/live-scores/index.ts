import axios from 'axios';
import queryString from 'query-string';
import { LiveScoreInterface, LiveScoreGetQueryInterface } from 'interfaces/live-score';
import { GetQueryInterface } from '../../interfaces';

export const getLiveScores = async (query?: LiveScoreGetQueryInterface) => {
  const response = await axios.get(`/api/live-scores${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createLiveScore = async (liveScore: LiveScoreInterface) => {
  const response = await axios.post('/api/live-scores', liveScore);
  return response.data;
};

export const updateLiveScoreById = async (id: string, liveScore: LiveScoreInterface) => {
  const response = await axios.put(`/api/live-scores/${id}`, liveScore);
  return response.data;
};

export const getLiveScoreById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/live-scores/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteLiveScoreById = async (id: string) => {
  const response = await axios.delete(`/api/live-scores/${id}`);
  return response.data;
};
