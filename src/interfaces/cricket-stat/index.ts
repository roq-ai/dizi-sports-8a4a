import { AnalystInterface } from 'interfaces/analyst';
import { GetQueryInterface } from 'interfaces';

export interface CricketStatInterface {
  id?: string;
  stat: string;
  analyst_id?: string;
  created_at?: any;
  updated_at?: any;

  analyst?: AnalystInterface;
  _count?: {};
}

export interface CricketStatGetQueryInterface extends GetQueryInterface {
  id?: string;
  stat?: string;
  analyst_id?: string;
}
