import { CricketStatInterface } from 'interfaces/cricket-stat';
import { OrganizationInterface } from 'interfaces/organization';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface AnalystInterface {
  id?: string;
  organization_id?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;
  cricket_stat?: CricketStatInterface[];
  organization?: OrganizationInterface;
  user?: UserInterface;
  _count?: {
    cricket_stat?: number;
  };
}

export interface AnalystGetQueryInterface extends GetQueryInterface {
  id?: string;
  organization_id?: string;
  user_id?: string;
}
