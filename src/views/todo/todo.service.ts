import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create.todo.dto';
import { UpdateTodoDto } from './dto/update.todo.dto';
import { TodoEntity } from '../../entity/todo.entity';
import { ExceptionHandler } from 'src/infra/http/exception';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  async findAll() {
    return await this.todoRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findOneOrFail(id: number) {
    try {
      return await this.todoRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new ExceptionHandler(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async create(data: CreateTodoDto) {
    try {
      return await this.todoRepository.save(this.todoRepository.create(data));
    } catch (error) {
      throw new ExceptionHandler(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, data: UpdateTodoDto) {
    try {
      const todo = await this.findOneOrFail(id);

      this.todoRepository.merge(todo, data);
      return await this.todoRepository.save(todo);
    } catch (error) {
      throw new ExceptionHandler(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteById(id: number) {
    try {
      await this.findOneOrFail(id);
      return await this.todoRepository.delete(id);
    } catch (error) {
      throw new ExceptionHandler(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
