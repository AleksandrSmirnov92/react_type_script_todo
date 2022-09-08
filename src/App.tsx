import React, { useState, useEffect } from "react";
import AppCSS from "./App.module.css";
import AllTasks from "./components/allTasks/allTasks";
import Filter from "./components/filter/filter";
import Header from "./components/header/header";
import MainTaskMenu from "./components/mainTaskMenu/mainTaskMenu";
import { FilterValue } from "./components/typemodule/types";

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
interface Task {
  id: number;
  message: string;
  changeColor: boolean;
}

// FIXME: тут будет тип Task[] просто
//const getTasksFromLocalStorage = (): Task[] | [] => {
const getTasksFromLocalStorage = (): Task[] => {
  // Можно не делать два раза JSON.parse, но потенциально JSON.parse может упасть поэтому лучше написать
  /**
  try {
    return JSON.parse(localStorage.getItem("todo")) ?? [];
  } catch {
    return [];
  }
   */
  const tasksLocalStorage = JSON.parse(localStorage.getItem("todo")!);
  if (tasksLocalStorage) {
    return JSON.parse(localStorage.getItem("todo")!);
  } else {
    return [];
  }
};

function App() {
  //const [tasks, setTasks] = useState<Task[]>(getTasksFromLocalStorage()); // как типизировать ???
  // лучше передать в useState функцию тогда она будет вызвана один раз а не на каждый рендер
  const [tasks, setTasks] = useState(getTasksFromLocalStorage); // оно автоматически типизируется

  // тут аналогично лучше вычислять один раз при помощи функции
  const [counter, setCounter] = useState<number>(getCounterFromLocalStorage());
  const [filter, setFilter] = useState<string>(FilterValue.ALL);


  useEffect(() => {
    localStorage.setItem("counter", JSON.stringify(counter));
    localStorage.setItem("todo", JSON.stringify(tasks));
    localStorage.setItem("Filter", JSON.stringify(filter));
    // лучше counter рассчитывать при изменении таски просто выбором из тасок количества
  }, [tasks, filter]); // оно ругалось потому что ты используешь переменную из состояния counter но не указал ее в зависимостях

  const addTask = (input: string) => {
    // можно не типизировать оно само знает свой тип
    //setTasks((prevTasks: Task[]) => {
    setTasks((prevTasks) => {
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
    setCounter(counter + 1);
  };
  const removeTask = (id: number): void => {

    //setTasks([...tasks.filter((addMessage: Task) => addMessage.id !== id)]);
    // Нет смысла дополнительно [...] писать filter и так вернет новый массив, типизировать тоже не надо он и так знает что tasks: Task[] типа
    setTasks(tasks.filter((task) => task.id !== id));
    
    // логика должна быть в эффекте (1)
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
  // опечатка checked
  const changeCheked = (id: number) => {
    // тоже заворачивать в [...] нет смысла map возвращает новый массив, и тип писать
    setTasks([
      ...tasks.map((item: Task) => {
        if (item.id === id) {
          item.changeColor = !item.changeColor;
          
          // логика пусть в эффект (1) уезжает
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

  // опечатки addTaskk changeCheked
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
