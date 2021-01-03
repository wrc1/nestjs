import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFiltersDto } from './dto/get-tasks-filters.dto';


@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) {}
  getTaskById = async (id: number): Promise<Task> => {
      const task = await this.taskRepository.findOne(id);
      if (!task) {
        throw new NotFoundException()
      }
      return task;
  }

  getTasks = async (filterDto: GetTasksFiltersDto): Promise<Task[]> => {
    const tasks = await this.taskRepository.getTasks(filterDto);
    return tasks;
  }

  createTask = async (createTaskDto: CreateTaskDto): Promise<Task>=> {
    return await this.taskRepository.createTask(createTaskDto);
  }
  // createTask = (createTaskDto):Task => {
  //   const { title, description } = createTaskDto;
  //   const task:Task = {
  //     id: uuidv1(),
  //     description,
  //     status: TaskStatus.OPEN,
  //     title
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
  //

  //
  deleteTask = async (id:number): Promise<number> => {
    const results = await this.taskRepository.delete(id);
    const { affected } = results;
    if (!affected) {
      throw new NotFoundException();
    }
    return affected;
  }

  updateTaskStatus = async (id, status): Promise<Task> => {
    const task = await this.getTaskById(id);
    task.status = status;
    await task.save();
    return task;
  };

}
