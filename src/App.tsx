import React, { useState, useEffect } from 'react';
import AppCSS from './App.module.css';
import AllTasks from './components/allTasks/allTasks';
import Filter from './components/filter/filter';
import Header from './components/header/header';
import MainTaskMenu from './components/mainTaskMenu/mainTaskMenu';
import { FilterValue } from './components/typemodule/types';

interface Task {
  id: number;
  message: string;
  changeColor: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('todo')!) ?? [];
    } catch {
      return [];
    }
  });
  const [counter, setCounter] = useState<number>(() => {
    try {
      return JSON.parse(localStorage.getItem('counter')!) ?? 0;
    } catch {
      return 0;
    }
  });
  const [filter, setFilter] = useState<string>(FilterValue.ALL);

  useEffect(() => {
    localStorage.setItem('counter', JSON.stringify(counter));
    localStorage.setItem('todo', JSON.stringify(tasks));
    localStorage.setItem('Filter', JSON.stringify(filter));
    // лучше counter рассчитывать при изменении таски просто выбором из тасок количества
  }, [tasks, filter, counter]); // оно ругалось потому что ты используешь переменную из состояния counter но не указал ее в зависимостях
  useEffect(() => {
    setCounter(
      tasks.filter((x: { changeColor: boolean }) => !x.changeColor).length
    );
  }, [tasks]);
  const addTask = (input: string) => {
    setTasks((prevTasks: Task[]) => {
      return [
        ...prevTasks,
        {
          id: Math.random(), // может и совпасть, для простоты можно сделать просто счетчик от 0 и в него добавлять
          message: input,
          changeColor: false,
        },
      ];
    });
    // (1) лучше через useEffect(() => { setCounter(tasks.filter(x => !x.changeColor).length) }, [tasks])
    // setCounter(counter + 1);
  };
  const removeTask = (id: number): void => {
    //setTasks([...tasks.filter((addMessage: Task) => addMessage.id !== id)]);
    // Нет смысла дополнительно [...] писать filter и так вернет новый массив, типизировать тоже не надо он и так знает что tasks: Task[] типа
    setTasks(tasks.filter((task: { id: number }) => task.id !== id));

    // логика должна быть в эффекте (1)
    // for (const item of tasks) {
    //   if (item.id === id && item.changeColor === false) {
    // setCounter(counter - 1);

    //   break;
    // }
    // }
  };
  const changeFilter = (value: string) => {
    setFilter(value);
  };
  // опечатка checked
  const changeChecked = (id: number) => {
    // тоже заворачивать в [...] нет смысла map возвращает новый массив, и тип писать
    setTasks(
      tasks.map((item: Task) => {
        if (item.id === id) {
          item.changeColor = !item.changeColor;

          // логика пусть в эффект (1) уезжает
          // if (item.changeColor) {
          //   // setCounter(counter - 1);
          // } else {
          //   // setCounter(counter + 1);
          // }
        }
        return item;
      })
    );
  };

  return (
    <div className={`${AppCSS.App} ${AppCSS.AppWrapper}`}>
      <Header counter={counter} />
      <MainTaskMenu addTask={addTask} />
      <Filter changeFilter={changeFilter} />
      <AllTasks
        tasks={tasks}
        removeTask={removeTask}
        filter={filter}
        changeChecked={changeChecked}
      />
    </div>
  );
}

export default App;
