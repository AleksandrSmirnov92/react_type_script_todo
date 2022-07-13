export interface TypeForFC {
  tasks: {
    id: number;
    massage: string;
    changeColor: boolean;
  }[];
  removeTask: (id: number) => void;
  filter: string;
  changeCheked: (id: number) => void;
}

export interface TaskAtribute {
  x: {
    id: number;
    changeColor: boolean;
    massage: string;
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
