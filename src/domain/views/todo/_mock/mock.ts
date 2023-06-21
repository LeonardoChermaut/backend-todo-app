import { TodoEntity } from '../../../entity';
import { CreateTodoDto, UpdateTodoDto } from '../dto';

export const listTodoEntityMock: TodoEntity[] = [
  new TodoEntity({ id: 1, task: 'Todo 1' }),
  new TodoEntity({ id: 2, task: 'Todo 2' }),
  new TodoEntity({ id: 3, task: 'Todo 3' }),
];

export const todoEntityMock: TodoEntity = { ...listTodoEntityMock[2] };

export const createTodoMock: CreateTodoDto = { ...todoEntityMock };

export const updateTodoMock: UpdateTodoDto = { ...createTodoMock };

export const bodyUpdateTodoMock: UpdateTodoDto = { ...updateTodoMock };
