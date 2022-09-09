import React from 'react';
import HeaderCSS from './header.module.css';
interface Props {
  counter: number;
}
// можно просто
//const Header: React.FC<Props> = ({ counter }: Props) => {
// исправил
const Header: React.FC<Props> = ({ counter }) => {
  return (
    <header className={HeaderCSS.header}>
      <div className={HeaderCSS.header_wrapper}>
        <span className={HeaderCSS.header_span}>Осталось выполнить</span>

        <span className={HeaderCSS.header_span2}>{counter}</span>
      </div>
    </header>
  );
};
export default Header;
