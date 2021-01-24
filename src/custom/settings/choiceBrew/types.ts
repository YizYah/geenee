export type ChoicesGenerator = (context: any) => Choice[];
export type ChoiceCallback = (context: any, answers: MenuAnswers) => any;

export enum FlowType {
  back = 'BACK',
  command = 'COMMAND',
}

export interface SelectedInfo {
  flow: FlowType;
  value?: any;
}

export interface MenuAnswers {
  selected: SelectedInfo;
}

export interface Choice {
  flow: FlowType;
  name: string;
  description?: string;
  value?: any;
  short?: string;
  callback?: ChoiceCallback;
}

