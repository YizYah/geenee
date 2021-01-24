import {Configuration, NsInfo, Specs, SpecSet} from 'magicalstrings'

export interface StaticContext {
  config: Configuration;
  nsInfo: NsInfo;
  codeDir: string;
  session?: any;
}

export interface StaticTypeContext {
  staticType: string;
  config: Configuration;
  nsInfo: NsInfo;
  codeDir: string;
}

export interface StaticInstanceContext {
  instance: string;
  staticType: string;
  config: Configuration;
  nsInfo: NsInfo;
  codeDir: string;
  session?: any;
}

export interface SetContext {
  specsForInstance: any;
  specsForType: Specs | SpecSet;
  currentName: string;
  type: string;
  required: boolean;
  session?: any;
}

export interface EditInstanceContext {
  specsForInstance: any;
  specsForType: Specs;
  currentName: string;
  type: string;
  required: boolean;
  session?: any;
}
