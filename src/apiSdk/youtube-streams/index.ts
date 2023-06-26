import axios from 'axios';
import queryString from 'query-string';
import { YoutubeStreamInterface, YoutubeStreamGetQueryInterface } from 'interfaces/youtube-stream';
import { GetQueryInterface } from '../../interfaces';

export const getYoutubeStreams = async (query?: YoutubeStreamGetQueryInterface) => {
  const response = await axios.get(`/api/youtube-streams${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createYoutubeStream = async (youtubeStream: YoutubeStreamInterface) => {
  const response = await axios.post('/api/youtube-streams', youtubeStream);
  return response.data;
};

export const updateYoutubeStreamById = async (id: string, youtubeStream: YoutubeStreamInterface) => {
  const response = await axios.put(`/api/youtube-streams/${id}`, youtubeStream);
  return response.data;
};

export const getYoutubeStreamById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/youtube-streams/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteYoutubeStreamById = async (id: string) => {
  const response = await axios.delete(`/api/youtube-streams/${id}`);
  return response.data;
};
