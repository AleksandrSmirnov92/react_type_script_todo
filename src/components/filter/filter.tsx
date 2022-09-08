import React, { useRef } from 'react';
import FilterCSS from './filter.module.css';
import { FilterValue } from '../typemodule/types';
interface FilterProps {
  changeFilter: (value: string) => void;
}
// можно просто 
//const Filter: React.FC<TypeForFC> = ({ changeFilter }) => {
const Filter = ({ changeFilter }: FilterProps) => {
  // value
  let valuee = useRef<HTMLSelectElement>(null);
  let change = () => {
    if (valuee && valuee.current) {
      changeFilter(valuee.current.value);
    }
  };

  /**
   * Сейчас такой warning есть, попробуй понять почему оно так и как это поправить 😀
   * react-dom.development.js:86 Warning: Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>.
   */

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
