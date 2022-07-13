import React, { useRef } from 'react';
import FilterCSS from './filter.module.css';
import { FilterValue } from '../typemodule/types';
interface TypeForFC {
  changeFilter: (value: string) => void;
}
const Filter: React.FC<TypeForFC> = ({ changeFilter }) => {
  let valuee = useRef<HTMLSelectElement>(null);
  let change = () => {
    if (valuee && valuee.current) {
      changeFilter(valuee.current.value);
    }
  };
  return (
    <div className={FilterCSS.filter_block}>
      <select
        ref={valuee}
        onChange={change}
        className={FilterCSS.filter}
        defaultValue={FilterValue.DEFAULT}>
        <option id="1" value={FilterValue.ALL} selected>
          Выбрать все{' '}
        </option>
        <option id="2" value={FilterValue.ALLACTIVE}>
          {' '}
          Выбрать активные{' '}
        </option>
        <option id="3" value={FilterValue.ALLINACTIVE}>
          Выбрать законченные
        </option>
      </select>
    </div>
  );
};
export default Filter;
