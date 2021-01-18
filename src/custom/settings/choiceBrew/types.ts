import {Configuration, NsInfo} from 'magicalstrings'

export type ChoicesGenerator = (context: any) => Choice[];
export type ChoiceCallback = (context: any, choice: string) => any;

export enum FlowType {
  back = 'BACK',
  command = 'COMMAND',
}

export interface Choice {
  flow: FlowType;
  name: string;
  description?: string;
  value?: any;
  short?: string;
  callback?: ChoiceCallback;
}

export interface StaticContext {
  config: Configuration;
  nsInfo: NsInfo;
  codeDir: string;
}

export interface StaticInstanceContext {
  staticType: string;
  config: Configuration;
  nsInfo: NsInfo;
  codeDir: string;
}
