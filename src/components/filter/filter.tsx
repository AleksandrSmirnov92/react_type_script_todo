import React, { useRef } from 'react';
import FilterCSS from './filter.module.css';
import { FilterValue } from '../typemodule/types';

// можно просто
//const Filter: React.FC<TypeForFC> = ({ changeFilter }) => {
const Filter: React.FC<{ changeFilter: (value: string) => void }> = ({
  changeFilter,
}) => {
  // value
  let value = useRef<HTMLSelectElement>(null);

  let change = () => {
    if (value && value.current) {
      changeFilter(value.current.value);
    }
  };

  /**
   * Сейчас такой warning есть, попробуй понять почему оно так и как это поправить 😀
   * react-dom.development.js:86 Warning: Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>.
   */
  //Исправил потому что реакт использует defoultValue вместо selected и дефотное значение должно совпадать со значением выбранной опцией!
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
