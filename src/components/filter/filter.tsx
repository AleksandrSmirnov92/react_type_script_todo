import React, { useRef } from "react";
import FilterCSS from "./filter.module.css";
enum FilterValues {
  ALL = "ALL",
  ALLACTIVE = "ALLACTIVE",
  ALLINACTIVE = "ALLINACTIVE",
  DEFAULT = "DEFAULT",
}
interface FilterValue {
  changeFilter: (value: string) => void;
}
const Filter: React.FC<FilterValue> = ({ changeFilter }) => {
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
        defaultValue={FilterValues.DEFAULT}
      >
        <option id="1" value={FilterValues.ALL} selected>
          Выбрать все{" "}
        </option>
        <option id="2" value={FilterValues.ALLACTIVE}>
          {" "}
          Выбрать активные{" "}
        </option>
        <option id="3" value={FilterValues.ALLINACTIVE}>
          Выбрать законченные
        </option>
      </select>
    </div>
  );
};
export default Filter;
