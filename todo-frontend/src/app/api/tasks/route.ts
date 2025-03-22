import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { promises as fsPromises } from 'fs';
import { Task } from '@/types/task';

// Path to the tasks.json file
const dataFilePath = path.join(process.cwd(), '../tasks.json');

// Helper function to read tasks
async function readTasks(): Promise<Task[]> {
  try {
    // Log the data file path for debugging
    console.log('Attempting to read tasks from:', dataFilePath);
    
    // Check if file exists
    if (!fs.existsSync(dataFilePath)) {
      console.log('File does not exist, creating empty file');
      // Create empty tasks file if it doesn't exist
      await fsPromises.writeFile(dataFilePath, JSON.stringify([], null, 2));
      return [];
    }
    
    const data = await fsPromises.readFile(dataFilePath, 'utf8');
    const parsed = JSON.parse(data);
    console.log('Successfully read tasks, count:', parsed.length);
    return parsed;
  } catch (error) {
    console.error('Error reading tasks:', error);
    return [];
  }
}

// Helper function to write tasks
async function writeTasks(tasks: Task[]): Promise<boolean> {
  try {
    console.log('Writing tasks to:', dataFilePath, 'count:', tasks.length);
    await fsPromises.writeFile(dataFilePath, JSON.stringify(tasks, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing tasks:', error);
    return false;
  }
}

// GET /api/tasks - Get all tasks
export async function GET() {
  const tasks = await readTasks();
  return NextResponse.json(tasks);
}

// POST /api/tasks - Add a new task
export async function POST(request: Request) {
  try {
    const { description } = await request.json();
    
    if (!description) {
      return NextResponse.json(
        { error: 'Task description is required' },
        { status: 400 }
      );
    }
    
    const tasks = await readTasks();
    const newTask: Task = {
      description,
      completed: false,
      timestamp: new Date().toISOString()
    };
    
    tasks.push(newTask);
    await writeTasks(tasks);
    
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error('Error adding task:', error);
    return NextResponse.json(
      { error: 'Failed to add task' },
      { status: 500 }
    );
  }
}

// PATCH /api/tasks - Update a task (mark as complete)
export async function PATCH(request: Request) {
  try {
    const { index, completed } = await request.json();
    
    if (index === undefined) {
      return NextResponse.json(
        { error: 'Task index is required' },
        { status: 400 }
      );
    }
    
    const tasks = await readTasks();
    
    if (index < 0 || index >= tasks.length) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }
    
    tasks[index].completed = completed !== undefined ? completed : !tasks[index].completed;
    await writeTasks(tasks);
    
    return NextResponse.json(tasks[index]);
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 }
    );
  }
}

// DELETE /api/tasks - Delete a task
export async function DELETE(request: Request) {
  try {
    const { index } = await request.json();
    
    if (index === undefined) {
      return NextResponse.json(
        { error: 'Task index is required' },
        { status: 400 }
      );
    }
    
    const tasks = await readTasks();
    
    if (index < 0 || index >= tasks.length) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }
    
    const removedTask = tasks.splice(index, 1)[0];
    await writeTasks(tasks);
    
    return NextResponse.json(removedTask);
  } catch (error) {
    console.error('Error deleting task:', error);
    return NextResponse.json(
      { error: 'Failed to delete task' },
      { status: 500 }
    );
  }
} 