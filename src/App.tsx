import React, { useState, useEffect } from "react";
import AppCSS from "./App.module.css";
import AllTasks from "./components/allTasks/allTasks";
import Filter from "./components/filter/filter";
import Header from "./components/header/header";
import MainTaskMenu from "./components/mainTaskMenu/mainTaskMenu";
const getCounterFromLocalStorage = (): number => {
  const counterLocalStorage: Storage = JSON.parse(
    localStorage.getItem("counter")!
  );
  if (counterLocalStorage) {
    return JSON.parse(localStorage.getItem("counter")!);
  } else {
    return 0;
  }
};
const getTasksFromLocalStorage = (): unknown => {
  const tasksLocalStorage = JSON.parse(localStorage.getItem("todo")!);
  if (tasksLocalStorage) {
    return JSON.parse(localStorage.getItem("todo")!);
  } else {
    return [];
  }
};
function App() {
  enum FilterValue {
    ALL = "ALL",
    ALLACTIVE = "ALLACTIVE",
    ALLINACTIVE = "ALLINACTIVE",
  }
  const [tasks, setTasks] = useState(getTasksFromLocalStorage());
  const [counter, setCounter] = useState<number>(getCounterFromLocalStorage());
  const [filter, setFilter] = useState<string>(FilterValue.ALL);
  useEffect(() => {
    localStorage.setItem("counter", JSON.stringify(counter));
    localStorage.setItem("todo", JSON.stringify(tasks));
    localStorage.setItem("Filter", JSON.stringify(filter));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks, filter]);

  interface Task {
    id: number;
    message: string | null;
    changeColor: boolean;
  }
  const addTask = (input: string) => {
    setTasks((prevTasks: Task[]): Object[] => {
      return [
        ...prevTasks,
        {
          id: Math.random(),
          massage: input,
          changeColor: false,
        },
      ];
    });
    setCounter(counter + 1);
  };
  const removeTask = (id) => {
    setTasks([...tasks.filter((addMessage) => addMessage.id !== id)]);
    for (const item of tasks) {
      if (item.id === id && item.changeColor === false) {
        setCounter(counter - 1);
        break;
      }
    }
  };
  const changeFilter = (value: string) => {
    setFilter(value);
  };
  const changeCheked = (id) => {
    setTasks([
      ...tasks.map((item) => {
        if (item.id === id) {
          item.changeColor = !item.changeColor;
          if (item.changeColor) {
            setCounter(counter - 1);
          } else {
            setCounter(counter + 1);
          }
        }
        return item;
      }),
    ]);
  };
  return (
    <div className={`${AppCSS.App} ${AppCSS.AppWrapper}`}>
      <Header counter={counter} />
      <MainTaskMenu addTaskk={addTask} />
      <Filter changeFilter={changeFilter} />
      <AllTasks
        tasks={tasks}
        removeTask={removeTask}
        filter={filter}
        changeCheked={changeCheked}
      />
    </div>
  );
}

export default App;
