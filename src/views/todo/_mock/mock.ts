import { TodoEntity } from '../../../entity/todo.entity';
import { CreateTodoDto, UpdateTodoDto } from '../dto';

export const listTodoMock: TodoEntity[] = [
  new TodoEntity({ id: 1, task: 'Todo 1', isDone: 0 }),
  new TodoEntity({ id: 2, task: 'Todo 2', isDone: 0 }),
  new TodoEntity({ id: 3, task: 'Todo 3', isDone: 0 }),
  new TodoEntity({ task: 'Todo 99', isDone: 1 }),
  new TodoEntity({ task: 'Todo 100', isDone: 1 }),
];

export const todoMock: TodoEntity = { ...listTodoMock[3] };

export const createTodoMock: CreateTodoDto = { ...todoMock };

export const updateTodoMock: UpdateTodoDto = { ...listTodoMock[4] };

export const bodyUpdateTodoMock: UpdateTodoDto = { ...updateTodoMock };
