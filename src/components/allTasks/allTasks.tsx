import React from 'react';
import Task from '../Task/Task';
import { TypeForFC } from '../typemodule/types';

const AllTasks: React.FC<TypeForFC> = ({
  tasks,
  removeTask,
  filter,
  changeChecked,
}) => {
  const remove = (id: number) => {
    removeTask(id);
  };
  const checkbox = (id: number) => {
    changeChecked(id);
  };

  return (
    <>
      {tasks.map((x: { id: number; message: string; changeColor: boolean }) => {
        if (
          filter === 'ALL' ||
          (filter === 'ALLACTIVE' && !x.changeColor) ||
          (filter === 'ALLINACTIVE' && x.changeColor)
        ) {
          return <Task x={x} remove={remove} checkbox={checkbox} />;
        }
      })}
    </>
  );
};
export default AllTasks;
