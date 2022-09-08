import React from 'react';
import Task from '../Task/Task';
import { TypeForFC } from '../typemodule/types';

// можно без React.FC как и в остальных
const AllTasks: React.FC<TypeForFC> = ({
  tasks,
  removeTask,
  filter,
  changeCheked,
}) => {
  const remove = (id: number) => {
    removeTask(id);
  };
  const checkbox = (id: number) => {
    changeCheked(id);
  };

  // тут достаточно странное условие, которому что в любом случае будет
  //           return <Task x={x} remove={remove} checkbox={checkbox} />;
  // думаю его можно удалить тогда
  // Добавлю коментарий
  return (
    <>
      {tasks.map((x: { id: number; message: string; changeColor: boolean }) => {
        if (
          filter === 'ALL' ||
          (filter === 'ALLACTIVE' && x.changeColor === false) ||
          (filter === 'ALLINACTIVE' && x.changeColor === true)
        ) {
          return <Task x={x} remove={remove} checkbox={checkbox} />;
        }
      })}
    </>
  );
};
export default AllTasks;
