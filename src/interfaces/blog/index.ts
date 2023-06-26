import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface BlogInterface {
  id?: string;
  title: string;
  content: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface BlogGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  content?: string;
  organization_id?: string;
}
