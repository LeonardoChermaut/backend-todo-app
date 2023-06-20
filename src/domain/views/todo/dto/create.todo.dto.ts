import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsNotEmpty } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty({ message: 'Task is required' })
  @ApiProperty({ type: String, description: 'The task to do' })
  task: string;

  @IsNotEmpty()
  @IsIn([true, false])
  @ApiPropertyOptional({ type: Boolean, default: false })
  isDone: boolean;
}
