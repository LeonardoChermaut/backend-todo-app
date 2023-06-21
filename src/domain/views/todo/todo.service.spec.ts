import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoService } from './todo.service';
import { TodoEntity } from '../../entity';
import {
  createTodoMock,
  listTodoEntityMock,
  todoEntityMock,
  updateTodoMock,
} from './_mock';

describe('TodoService', () => {
  let todoService: TodoService;
  let todoRepository: Repository<TodoEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getRepositoryToken(TodoEntity),
          useValue: {
            find: jest.fn().mockResolvedValue(listTodoEntityMock),
            findOneOrFail: jest.fn().mockResolvedValue(todoEntityMock),
            create: jest.fn().mockReturnValue(createTodoMock),
            save: jest.fn().mockResolvedValue(createTodoMock),
            merge: jest.fn().mockReturnValue(updateTodoMock),
            delete: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    todoService = module.get<TodoService>(TodoService);
    todoRepository = module.get<Repository<TodoEntity>>(
      getRepositoryToken(TodoEntity),
    );
  });

  it('should be defined', () => {
    expect(todoService).toBeDefined();
    expect(todoRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a list of todo entities successfully', async () => {
      const result = await todoService.findAll();
      expect(result).toEqual(listTodoEntityMock);
      expect(todoRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if finding todos fails', async () => {
      jest.spyOn(todoRepository, 'find').mockRejectedValueOnce(new Error());
      await expect(todoService.findAll()).rejects.toThrowError();
    });
  });

  describe('findOneOrFail', () => {
    it('should return a todo entity by ID successfully', async () => {
      const result = await todoService.findOneOrFail(3);
      expect(result).toEqual(todoEntityMock);
      expect(todoRepository.findOneOrFail).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if todo is not found', async () => {
      jest
        .spyOn(todoRepository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());
      expect(
        todoService.findOneOrFail(todoEntityMock.id),
      ).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('should create a todo entity successfully', async () => {
      const result = await todoService.create(todoEntityMock);
      expect(result).toEqual(todoEntityMock);
      expect(todoRepository.create).toHaveBeenCalledTimes(1);
      expect(todoRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if creating todo fails', async () => {
      jest.spyOn(todoRepository, 'save').mockRejectedValueOnce(new Error());
      await expect(todoService.create(todoEntityMock)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a todo entity successfully', async () => {
      const result = await todoService.update(
        todoEntityMock.id,
        updateTodoMock,
      );
      expect(result).toEqual(updateTodoMock);
      expect(todoRepository.merge).toHaveBeenCalledTimes(1);
      expect(todoRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if updating todo fails', async () => {
      jest.spyOn(todoRepository, 'save').mockRejectedValueOnce(new Error());
      await expect(
        todoService.update(todoEntityMock.id, updateTodoMock),
      ).rejects.toThrowError();
    });
  });

  describe('deleteById', () => {
    it('should delete a todo entity successfully', async () => {
      const result = await todoService.deleteById(todoEntityMock.id);
      expect(result).toBeUndefined();
      expect(todoRepository.findOneOrFail).toHaveBeenCalledTimes(1);
      expect(todoRepository.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if deleting todo fails', async () => {
      jest.spyOn(todoRepository, 'delete').mockRejectedValueOnce(new Error());
      await expect(
        todoService.deleteById(todoEntityMock.id),
      ).rejects.toThrowError();
    });
  });
});
