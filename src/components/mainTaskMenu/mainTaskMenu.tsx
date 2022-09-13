import React, { useRef, useState } from 'react';
import AddTaskCSS from './mainTaskMenu.module.css';

interface AddTask {
  // опечатка
  addTask: (input: string) => void;
}

const MainTaskMenu = ({ addTask }: AddTask) => {
  const refText = useRef<HTMLInputElement>(null);
  const [input, setinput] = useState('');

  // можно назвать onInputChange или onInput
  const onInputChange = () => {
    // можно refText?.current
    if (refText?.current) {
      setinput(refText.current.value);
    }
  };

  const add_task_input = (input: string): void => {
    if (input.trim() !== '') {
      addTask(input);
      setinput('');
    } else {
      alert('Вы ничего не ввели!');
    }
  };

  const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      addTask(input);
    }
  };

  return (
    <div className={AddTaskCSS.add_task}>
      <h1 className={AddTaskCSS.add_task_text}>Добавить задачу</h1>
      <div className={AddTaskCSS.add_task_input_and_button}>
        <input
          ref={refText}
          type="text"
          className={AddTaskCSS.add_task_input}
          onChange={onInputChange}
          onKeyDown={onKeyPressHandler}
          value={input}
          placeholder="Добавить задачу"
        />
        <button className={AddTaskCSS.button_add}>
          <span
            className={AddTaskCSS.button_add_text}
            onClick={() => {
              add_task_input(input);
            }}>
            Добавить
          </span>
        </button>
      </div>
    </div>
  );
};
// localStorage.clear();
export default MainTaskMenu;
