import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFiltersDto } from './dto/get-tasks-filters.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation-pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  async getTasks(@Query(ValidationPipe) filterDto: GetTasksFiltersDto): Promise<Task[]> {
    return await this.taskService.getTasks(filterDto);
  }

  @Get('/:id')
  async getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return await this.taskService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createTask(@Body() crateTaskDto: CreateTaskDto): Promise<Task> {
    return await this.taskService.createTask(crateTaskDto);
  }
  //
  @Delete('/:id')
  async deleteTask(@Param('id', ParseIntPipe) id: number):Promise<number>  {
    return await this.taskService.deleteTask(id);
  }

  @Patch('/:id/status')
  async updateTaskStatus (
    @Param('id', ParseIntPipe) id:number,
    @Body('status') status: TaskStatus
    ) : Promise <Task> {
    return await this.taskService.updateTaskStatus(id, status);
    }

}
