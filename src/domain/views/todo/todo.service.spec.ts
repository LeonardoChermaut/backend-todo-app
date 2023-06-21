import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TodoService } from './todo.service';
import { TodoEntity } from '../../entity';
import { listTodoEntityMock, todoEntityMock } from './_mock';

describe('TodoService', () => {
  let todoService: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getRepositoryToken(TodoEntity),
          useValue: {
            find: jest.fn().mockResolvedValue(listTodoEntityMock),
            findOneOrFail: jest.fn().mockResolvedValue(todoEntityMock),
            create: jest.fn(),
            merge: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    todoService = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(todoService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a list of todo entities successfully', async () => {
      const result = await todoService.findAll();

      expect(result).toEqual(listTodoEntityMock);
    });

    it('should throw an error if finding todos fails', async () => {
      jest.spyOn(todoService, 'findAll').mockRejectedValueOnce(new Error());
      await expect(todoService.findAll()).rejects.toThrowError();
    });
  });

  describe('findOneOrFail', () => {
    it('should return a todo entity by ID successfully', async () => {
      const result = await todoService.findOneOrFail(3);

      expect(result).toEqual(todoEntityMock);
    });

    it('should throw an error if todo is not found', async () => {
      jest
        .spyOn(todoService, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());
      await expect(
        todoService.findOneOrFail(todoEntityMock.id),
      ).rejects.toThrowError();
    });
  });
});
