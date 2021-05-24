import {Institution} from '../institution';

export interface Course{
  id?: number;
  name: string;
  institution?: Institution;
}
