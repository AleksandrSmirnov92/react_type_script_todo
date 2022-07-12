import React, { useState, useEffect } from 'react';
import AppCSS from './App.module.css';
import Header from './components/header/header';
const getCounterFromLocalStorage = (): number => {
  const counterLocalStorage: Storage = JSON.parse(
    localStorage.getItem('counter')!
  );
  if (counterLocalStorage) {
    return JSON.parse(localStorage.getItem('counter')!);
  } else {
    return 0;
  }
};
const getTasksFromLocalStorage = (): unknown => {
  const tasksLocalStorage = JSON.parse(localStorage.getItem('todo')!);
  if (tasksLocalStorage) {
    return JSON.parse(localStorage.getItem('todo')!);
  } else {
    return [];
  }
};
function App() {
  const [tasks, setTasks] = useState(getTasksFromLocalStorage());
  const [counter, setCounter] = useState<number>(getCounterFromLocalStorage());
  const [filter, setFilter] = useState<string>('ALL');
  useEffect(() => {
    localStorage.setItem('counter', JSON.stringify(counter));
    localStorage.setItem('todo', JSON.stringify(tasks));
    localStorage.setItem('Filter', JSON.stringify(filter));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks, filter]);
  return (
    <div className={`${AppCSS.App} ${AppCSS.AppWrapper}`}>
      <Header counter={counter} />
    </div>
  );
}

export default App;
