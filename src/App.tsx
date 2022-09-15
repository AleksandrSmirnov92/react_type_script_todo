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
  }, [tasks, filter, counter]);
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
          id: Math.random(),
          message: input,
          changeColor: false,
        },
      ];
    });
  };
  const removeTask = (id: number): void => {
    setTasks(tasks.filter((task: { id: number }) => task.id !== id));
  };
  const changeFilter = (value: string) => {
    setFilter(value);
  };

  const changeChecked = (id: number) => {
    setTasks(
      tasks.map((item: Task) => {
        if (item.id === id) {
          item.changeColor = !item.changeColor;
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
