import { AnalystInterface } from 'interfaces/analyst';
import { BlogInterface } from 'interfaces/blog';
import { LiveScoreInterface } from 'interfaces/live-score';
import { YoutubeStreamInterface } from 'interfaces/youtube-stream';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface OrganizationInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  analyst?: AnalystInterface[];
  blog?: BlogInterface[];
  live_score?: LiveScoreInterface[];
  youtube_stream?: YoutubeStreamInterface[];
  user?: UserInterface;
  _count?: {
    analyst?: number;
    blog?: number;
    live_score?: number;
    youtube_stream?: number;
  };
}

export interface OrganizationGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
