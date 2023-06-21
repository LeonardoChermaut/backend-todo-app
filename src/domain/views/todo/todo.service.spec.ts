import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoService } from './todo.service';
import { TodoEntity } from '../../entity';
import { listTodoEntityMock, todoEntityMock } from './_mock';

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
            create: jest.fn().mockReturnValueOnce(todoEntityMock),
            save: jest.fn().mockResolvedValue(todoEntityMock),
            merge: jest.fn(),
            delete: jest.fn(),
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
});
