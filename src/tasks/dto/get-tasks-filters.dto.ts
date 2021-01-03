import { IsIn, IsOptional } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class GetTasksFiltersDto {
  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.DONE, TaskStatus.IN_PROGRESS])
  status: TaskStatus;

  @IsOptional()
  search: string;
}

