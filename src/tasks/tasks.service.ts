import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) { }

    async getTaskById(id: number): Promise<Task> {
        const task = await this.taskRepository.findOne(id);

        if (!task) {
            throw new NotFoundException('Task not found');
        }

        return task;
    }

    // private tasks: Task[] = [];

    // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    //     const { status, search } = filterDto;

    //     let tasks = this.getAllTasks();

    //     if (status) {
    //         tasks = tasks.filter(task => task.status === status)
    //     }

    //     if (search) {
    //         tasks = tasks.filter(tasks => tasks.title.includes(search) || tasks.description.includes(search))
    //     }

    //     return tasks;
    // }

    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }

    // createTask(createTaskDto: CreateTaskDto): Task {
    //     const { title, description } = createTaskDto;
    //     const task: Task = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN,
    //     };

    //     this.tasks.push(task);
    //     return task;
    // }

    // updateTask(id: string, status: TaskStatus): Task {
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }

    // deleteTaskById(id: string): void {
    //     const found = this.getTaskById(id);
    //     this.tasks = this.tasks.filter(task => task.id !== found.id);
    // }
}
