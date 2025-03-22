'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Task {
  description: string;
  completed: boolean;
  timestamp: string;
}

export function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingTask, setIsAddingTask] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      setIsLoading(true);
      const response = await fetch('/api/tasks');
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to load tasks');
    } finally {
      setIsLoading(false);
    }
  }

  async function addTask() {
    if (!newTaskDescription.trim()) {
      toast.error('Task description cannot be empty');
      return;
    }

    try {
      setIsAddingTask(true);
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: newTaskDescription }),
      });

      if (!response.ok) {
        throw new Error('Failed to add task');
      }

      const newTask = await response.json();
      setTasks([...tasks, newTask]);
      setNewTaskDescription('');
      toast.success('Task added successfully');
    } catch (error) {
      console.error('Error adding task:', error);
      toast.error('Failed to add task');
    } finally {
      setIsAddingTask(false);
    }
  }

  async function toggleTaskCompletion(index: number) {
    try {
      const response = await fetch('/api/tasks', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          index, 
          completed: !tasks[index].completed 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      const updatedTask = await response.json();
      const updatedTasks = [...tasks];
      updatedTasks[index] = updatedTask;
      setTasks(updatedTasks);

      toast.success(
        updatedTask.completed 
          ? 'Task marked as complete' 
          : 'Task marked as incomplete'
      );
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task');
    }
  }

  async function deleteTask(index: number) {
    try {
      const response = await fetch('/api/tasks', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ index }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      const updatedTasks = tasks.filter((_, i) => i !== index);
      setTasks(updatedTasks);
      toast.success('Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task');
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isAddingTask) {
      addTask();
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Get-er-done</CardTitle>
        <CardDescription>
          Your modern to-do list manager. Add, complete, and remove your tasks.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-6">
          <Input
            placeholder="Add a new task..."
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isAddingTask}
            className="flex-1"
          />
          <Button onClick={addTask} disabled={isAddingTask || !newTaskDescription.trim()}>
            {isAddingTask ? 'Adding...' : 'Add Task'}
          </Button>
        </div>

        {isLoading ? (
          <p className="text-center py-4">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="text-center py-4 text-muted-foreground">No tasks yet. Add some tasks to get started!</p>
        ) : (
          <ul className="space-y-2">
            {tasks.map((task, index) => (
              <li
                key={`${task.timestamp}-${index}`}
                className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-3 flex-1">
                  <Checkbox
                    id={`task-${index}`}
                    checked={task.completed}
                    onCheckedChange={() => toggleTaskCompletion(index)}
                  />
                  <label
                    htmlFor={`task-${index}`}
                    className={`flex-1 cursor-pointer ${
                      task.completed ? 'line-through text-muted-foreground' : ''
                    }`}
                  >
                    {task.description}
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-muted-foreground hidden sm:inline">
                    {new Date(task.timestamp).toLocaleString()}
                  </span>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        Remove
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to delete this task? This action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => {}}>Cancel</Button>
                        <Button 
                          variant="destructive" 
                          onClick={() => {
                            deleteTask(index); 
                            document.querySelector('[role="dialog"]')?.parentElement?.click();
                          }}
                        >
                          Delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-muted-foreground">
          {tasks.filter(t => t.completed).length} of {tasks.length} tasks completed
        </p>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={fetchTasks}
          >
            Refresh
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
} 