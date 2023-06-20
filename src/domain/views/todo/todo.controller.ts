import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TodoService } from './todo.service';
import { UpdateTodoDto, CreateTodoDto } from './dto';
import { ShowTodoSwagger } from '../../../helpers/swagger';
import {
  NotFoundRequestSwagger,
  BadRequestSwagger,
} from '../../../helpers/swagger/error';

@Controller('api/v1/todos')
@ApiTags('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as tarefas' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de tarefas retornada com sucesso',
    isArray: true,
  })
  async index() {
    return await this.todoService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Adicionar uma nova tarefa' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Nova tarefa criada com sucesso',
    type: CreateTodoDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Parâmetros inválidos',
    type: BadRequestSwagger,
  })
  async create(@Body() body: CreateTodoDto) {
    return await this.todoService.create(body);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Exibir os dados da tarefa' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Dados da tarefa retornada com sucesso',
    type: ShowTodoSwagger,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'A tarefa não encontrada',
    type: NotFoundRequestSwagger,
  })
  async show(@Param('id') id: number) {
    return await this.todoService.findOneOrFail(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar os dados da tarefa' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tarefa atualizada com sucesso',
    type: UpdateTodoDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Dados inválidos',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Tarefa não encontrada',
    type: NotFoundRequestSwagger,
  })
  async update(@Param('id') id: number, @Body() body: UpdateTodoDto) {
    return await this.todoService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover uma tarefa' })
  @ApiResponse({ status: 204, description: 'Tarefa removida com sucesso' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Tarefa não encontrada',
    type: NotFoundRequestSwagger,
  })
  async destroy(@Param('id') id: number) {
    await this.todoService.deleteById(id);
  }
}
