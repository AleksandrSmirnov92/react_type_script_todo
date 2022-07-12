import React, { useRef, useState } from 'react';
import AddTaskCSS from './mainTaskMenu.module.css';

interface AddTask {
  addTaskk: (input: string) => void;
}

const MainTaskMenu = ({ addTaskk }: AddTask) => {
  const refText = useRef<HTMLInputElement>(null);
  const [input, setinput] = useState('');
  const taskText = () => {
    if (refText && refText.current) {
      setinput(refText.current.value);
    }
  };
  const addTask = (input: string): void => {
    if (input.trim() !== '') {
      addTaskk(input);
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
          onChange={taskText}
          onKeyDown={onKeyPressHandler}
          value={input}
          placeholder="Добавить задачу"
        />
        <button className={AddTaskCSS.button_add}>
          <span
            className={AddTaskCSS.button_add_text}
            onClick={() => {
              addTask(input);
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
