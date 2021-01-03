import { Task } from './task.entity';
import { EntityRepository, Repository} from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFiltersDto } from './dto/get-tasks-filters.dto';

// Tell to the typeOrm - this is the repository  for Task
@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

  getTasks = async (filterDto: GetTasksFiltersDto): Promise<Task[]> => {
    const { search, status } = filterDto;
    console.log(status);
    const query = this.createQueryBuilder('task');
    if (status) {
      query.andWhere('task.status = :status', { status })
    }

    if (search) {
      query.andWhere('task.title LIKE :search OR task.description LIKE :search', {search: `%${search}%`});
    }
    const tasks = await query.getMany();
    return tasks;
  }

  createTask = async (createTaskDto: CreateTaskDto): Promise<Task> => {
    const { title, description } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    await task.save();
    return task;
  }

  // deleteTask = async (id: number) => {
  //   const task = new Task();
  //   await task.delete(id);
  //
  // }
}
