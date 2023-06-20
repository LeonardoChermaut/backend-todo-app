import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { todoListMock } from './_mock';

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
            findAll: jest.fn().mockResolvedValue(todoListMock),
            create: jest.fn(),
            findOneOrFail: jest.fn(),
            update: jest.fn(),
            deleteById: jest.fn(),
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
      expect(result).toEqual(todoListMock);
    });
  });
});
