import React from 'react';
import HeaderCSS from './header.module.css';
interface Props {
  counter: number;
}
const Header: React.FC<Props> = ({ counter }: Props) => {
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
