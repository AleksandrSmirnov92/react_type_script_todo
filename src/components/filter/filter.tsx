import React, { useRef } from 'react';
import FilterCSS from './filter.module.css';
import { FilterValue } from '../typemodule/types';

const Filter: React.FC<{ changeFilter: (value: string) => void }> = ({
  changeFilter,
}) => {
  let value = useRef<HTMLSelectElement>(null);

  let change = () => {
    if (value && value.current) {
      changeFilter(value.current.value);
    }
  };

  return (
    <div className={FilterCSS.filter_block}>
      <select
        ref={value}
        onChange={change}
        className={FilterCSS.filter}
        defaultValue={FilterValue.ALL}>
        <option id="1" value={FilterValue.ALL}>
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
