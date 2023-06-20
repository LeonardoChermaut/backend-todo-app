import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import {
  bodyUpdateTodoMock,
  createTodoMock,
  listTodoMock,
  todoMock,
  updateTodoMock,
} from './_mock';

describe('TodoController', () => {
  let todoController: TodoController;
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        {
          provide: TodoService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(listTodoMock),
            create: jest.fn().mockResolvedValue(todoMock),
            findOneOrFail: jest.fn().mockResolvedValue(listTodoMock[0]),
            update: jest.fn().mockResolvedValue(updateTodoMock),
            deleteById: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    todoController = module.get<TodoController>(TodoController);
    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(todoController).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('should return a todo list entity successfully', () => {
    it('should be defined', async () => {
      const result = await todoController.index();
      expect(result).toEqual(listTodoMock);
    });
  });

  it('should throw an exception', async () => {
    jest.spyOn(service, 'findAll').mockRejectedValueOnce(new Error());
    expect(todoController.index()).rejects.toThrowError();
  });

  describe('should be return a new entity create', () => {
    it('should be defined', async () => {
      const result = await todoController.create(createTodoMock);
      expect(result).toEqual(todoMock);
    });
  });

  it('should throw an exception', async () => {
    jest.spyOn(service, 'create').mockRejectedValueOnce(new Error());
    expect(todoController.create(createTodoMock)).rejects.toThrowError();
  });

  describe('show', () => {
    it('should get a todo item successfully', async () => {
      const result = await todoController.show(1);
      expect(result).toEqual(listTodoMock[0]);
      expect(service.findOneOrFail).toBeCalledTimes(1);
      expect(service.findOneOrFail).toBeCalledWith(1);
    });

    it('should throw an exception', async () => {
      jest.spyOn(service, 'findOneOrFail').mockRejectedValueOnce(new Error());
      expect(todoController.show(1)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a todo item successfully', async () => {
      const result = await todoController.update(1, bodyUpdateTodoMock);

      expect(result).toEqual(updateTodoMock);
      expect(service.update).toBeCalledTimes(1);
      expect(service.update).toBeCalledWith(1, bodyUpdateTodoMock);
    });
  });

  it('should throw an exception', async () => {
    jest.spyOn(service, 'update').mockRejectedValueOnce(new Error());
    expect(todoController.update(1, bodyUpdateTodoMock)).rejects.toThrowError();
  });

  describe('destroy', () => {
    it('should delete a todo item successfully', async () => {
      const result = await todoController.destroy(1);

      expect(result).toBeUndefined();
      expect(service.deleteById).toBeCalledTimes(1);
      expect(service.deleteById).toBeCalledWith(1);
    });
  });

  it('should throw an exception', async () => {
    jest.spyOn(service, 'deleteById').mockRejectedValueOnce(new Error());
    expect(todoController.destroy(1)).rejects.toThrowError();
  });
});
