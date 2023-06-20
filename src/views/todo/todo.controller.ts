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
import { ShowTodoSwagger } from '../../helpers/swagger/';
import {
  NotFoundRequestSwagger,
  BadRequestSwagger,
  HttpStatusCode,
} from '../../helpers/swagger/error';

@Controller('api/v1/todos')
@ApiTags('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as tarefas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de tarefas retornada com sucesso',
    isArray: true,
  })
  async index() {
    return await this.todoService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Adicionar uma nova tarefa' })
  @ApiResponse({
    status: 201,
    description: 'Nova tarefa criada com sucesso',
    type: CreateTodoDto,
  })
  @ApiResponse({
    status: HttpStatusCode.BadRequest,
    description: 'Parâmetros inválidos',
    type: BadRequestSwagger,
  })
  async create(@Body() body: CreateTodoDto) {
    return await this.todoService.create(body);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Exibir os dados da tarefa' })
  @ApiResponse({
    status: 200,
    description: 'Dados da tarefa retornada com sucesso',
    type: ShowTodoSwagger,
  })
  @ApiResponse({
    status: HttpStatusCode.NotFound,
    description: 'A tarefa não encontrada',
    type: NotFoundRequestSwagger,
  })
  async show(@Param('id') id: number) {
    return await this.todoService.findOneOrFail(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar os dados da tarefa' })
  @ApiResponse({
    status: 200,
    description: 'Tarefa atualizada com sucesso',
    type: UpdateTodoDto,
  })
  @ApiResponse({
    status: HttpStatusCode.BadRequest,
    description: 'Dados inválidos',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: HttpStatusCode.NotFound,
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
    status: HttpStatusCode.NotFound,
    description: 'Tarefa não encontrada',
    type: NotFoundRequestSwagger,
  })
  async destroy(@Param('id') id: number) {
    await this.todoService.deleteById(id);
  }
}
