import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface LiveScoreInterface {
  id?: string;
  score: number;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface LiveScoreGetQueryInterface extends GetQueryInterface {
  id?: string;
  organization_id?: string;
}
