export interface TypeForFC {
  tasks: {
    id: number;
    message: string;
    changeColor: boolean;
  }[];
  removeTask: (id: number) => void;
  filter: string;
  changeChecked: (id: number) => void;
}

export interface TaskAtribute {
  x: {
    id: number;
    changeColor: boolean;
    message: string;
  };
  checkbox: (id: number) => void;
  remove: (id: number) => void;
}

export enum FilterValue {
  ALL = 'ALL',
  ALLACTIVE = 'ALLACTIVE',
  ALLINACTIVE = 'ALLINACTIVE',
  DEFAULT = 'DEFAULT',
}
