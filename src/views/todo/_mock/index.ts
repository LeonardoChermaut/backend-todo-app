import { TodoEntity } from '../../../entity/todo.entity';

export const todoListMock: TodoEntity[] = [
  new TodoEntity({ id: 1, task: 'Todo 1', isDone: 0 }),
  new TodoEntity({ id: 2, task: 'Todo 2', isDone: 0 }),
  new TodoEntity({ id: 3, task: 'Todo 3', isDone: 0 }),
  new TodoEntity({ id: 4, task: 'Todo 4', isDone: 0 }),
];
