import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface YoutubeStreamInterface {
  id?: string;
  url: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface YoutubeStreamGetQueryInterface extends GetQueryInterface {
  id?: string;
  url?: string;
  organization_id?: string;
}
