import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import {
  bodyUpdateTodoMock,
  createTodoMock,
  listTodoEntityMock,
  todoEntityMock,
  updateTodoMock,
} from './_mock';

describe('TodoController', () => {
  let todoController: TodoController;
  let todoService: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        {
          provide: TodoService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(listTodoEntityMock),
            create: jest.fn().mockResolvedValue(todoEntityMock),
            findOneOrFail: jest.fn().mockResolvedValue(listTodoEntityMock[0]),
            update: jest.fn().mockResolvedValue(updateTodoMock),
            deleteById: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    todoController = module.get<TodoController>(TodoController);
    todoService = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(todoController).toBeDefined();
    expect(todoService).toBeDefined();
  });

  describe('should return a todo list entity successfully', () => {
    it('should be defined', async () => {
      const result = await todoController.index();
      expect(result).toEqual(listTodoEntityMock);
    });
  });

  it('should throw an exception', async () => {
    jest.spyOn(todoService, 'findAll').mockRejectedValueOnce(new Error());
    expect(todoController.index()).rejects.toThrowError();
  });

  describe('should be return a new entity create', () => {
    it('should be defined', async () => {
      const result = await todoController.create(createTodoMock);
      expect(result).toEqual(todoEntityMock);
    });
  });

  it('should throw an exception', async () => {
    jest.spyOn(todoService, 'create').mockRejectedValueOnce(new Error());
    expect(todoController.create(createTodoMock)).rejects.toThrowError();
  });

  describe('show', () => {
    it('should get a todo item successfully', async () => {
      const result = await todoController.show(1);
      expect(result).toEqual(listTodoEntityMock[0]);
      expect(todoService.findOneOrFail).toBeCalledTimes(1);
      expect(todoService.findOneOrFail).toBeCalledWith(1);
    });

    it('should throw an exception', async () => {
      jest
        .spyOn(todoService, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());
      expect(todoController.show(1)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a todo item successfully', async () => {
      const result = await todoController.update(1, bodyUpdateTodoMock);

      expect(result).toEqual(updateTodoMock);
      expect(todoService.update).toBeCalledTimes(1);
      expect(todoService.update).toBeCalledWith(1, bodyUpdateTodoMock);
    });
  });

  it('should throw an exception', async () => {
    jest.spyOn(todoService, 'update').mockRejectedValueOnce(new Error());
    expect(todoController.update(1, bodyUpdateTodoMock)).rejects.toThrowError();
  });

  describe('destroy', () => {
    it('should delete a todo item successfully', async () => {
      const result = await todoController.destroy(1);

      expect(result).toBeUndefined();
      expect(todoService.deleteById).toBeCalledTimes(1);
      expect(todoService.deleteById).toBeCalledWith(1);
    });
  });

  it('should throw an exception', async () => {
    jest.spyOn(todoService, 'deleteById').mockRejectedValueOnce(new Error());
    expect(todoController.destroy(1)).rejects.toThrowError();
  });
});
