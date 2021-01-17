export enum FlowType {
  back = "BACK",
  menu = "MENU",
  command = "COMMAND",
}

export interface Choice {
  flow: FlowType;
  name: string;
  description?: string;
  value?: any;
  short?: string;
  callback?: any;
}

export interface Choices {
  [index: number]: Choice;
}
