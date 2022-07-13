import React from 'react';
import Task from '../Task/Task';
import { TypeForFC } from '../typemodule/types';

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
  return (
    <>
      {' '}
      {tasks.map((x: { id: number; massage: string; changeColor: boolean }) => {
        if (filter === 'ALL') {
          return <Task x={x} remove={remove} checkbox={checkbox} />;
        }
        if (filter === 'ALLACTIVE' && x.changeColor === false) {
          return <Task x={x} remove={remove} checkbox={checkbox} />;
        }
        if (filter === 'ALLINACTIVE' && x.changeColor === true) {
          return <Task x={x} remove={remove} checkbox={checkbox} />;
        }
      })}
    </>
  );
};
export default AllTasks;
