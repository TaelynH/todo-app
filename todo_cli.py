#!/usr/bin/env python3
"""
CLI To-Do List Application

A simple command-line interface for managing tasks with the following features:
- Add tasks with timestampssssss
- View tasks with their status ;laksjdvpoiwrjgpoiawjrga
- Mark tasks as complete (with strikethrough effect)
- Remove tasks abcddddd
- Save/load tasks from a file for persistence
"""

import json
import os
import datetime
from colorama import init, Fore, Style

# Initialize colorama
init(autoreset=True)

class TodoList:
    def __init__(self, filename="tasks.json"):
        """Initialize the TodoList with an empty tasks list and a filename for storage."""
        self.tasks = []
        self.filename = filename
        self.load_tasks()
    
    def add_task(self, task_description):
        """Add a new task with the current timestamp."""
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        self.tasks.append({
            "description": task_description,
            "completed": False,
            "timestamp": timestamp
        })
        print(f"{Fore.GREEN}Task added: {task_description}")
        self.save_tasks()
    
    def view_tasks(self):
        """Display all tasks with their status and number."""
        if not self.tasks:
            print(f"{Fore.YELLOW}No tasks available. Add some tasks first!")
            return
        
        print(f"\n{Fore.CYAN}===== YOUR TO-DO LIST =====")
        for idx, task in enumerate(self.tasks, 1):
            status = f"{Fore.GREEN}[DONE]" if task["completed"] else f"{Fore.RED}[TODO]"
            description = task["description"]
            # Apply strikethrough effect for completed tasks using ANSI escape codes
            if task["completed"]:
                description = f"\u0336".join(description) + "\u0336"  # Unicode strikethrough
            
            timestamp = task["timestamp"]
            print(f"{idx}. {status} {description} {Fore.BLUE}(Added: {timestamp}){Style.RESET_ALL}")
        print(f"{Fore.CYAN}===========================\n")
    
    def complete_task(self, task_number):
        """Mark a task as complete by its number."""
        try:
            task_idx = task_number - 1
            if 0 <= task_idx < len(self.tasks):
                self.tasks[task_idx]["completed"] = True
                print(f"{Fore.GREEN}Task marked as complete: {self.tasks[task_idx]['description']}")
                self.save_tasks()
            else:
                print(f"{Fore.RED}Invalid task number. Please try again.")
        except ValueError:
            print(f"{Fore.RED}Please enter a valid number.")
    
    def remove_task(self, task_number):
        """Remove a task by its number."""
        try:
            task_idx = task_number - 1
            if 0 <= task_idx < len(self.tasks):
                removed_task = self.tasks.pop(task_idx)
                print(f"{Fore.YELLOW}Task removed: {removed_task['description']}")
                self.save_tasks()
            else:
                print(f"{Fore.RED}Invalid task number. Please try again.")
        except ValueError:
            print(f"{Fore.RED}Please enter a valid number.")
    
    def save_tasks(self):
        """Save tasks to a JSON file."""
        try:
            with open(self.filename, 'w') as f:
                json.dump(self.tasks, f, indent=2)
            print(f"{Fore.BLUE}Tasks saved successfully.")
        except Exception as e:
            print(f"{Fore.RED}Error saving tasks: {str(e)}")
    
    def load_tasks(self):
        """Load tasks from a JSON file if it exists."""
        if os.path.exists(self.filename):
            try:
                with open(self.filename, 'r') as f:
                    self.tasks = json.load(f)
                print(f"{Fore.BLUE}Tasks loaded successfully.")
            except Exception as e:
                print(f"{Fore.RED}Error loading tasks: {str(e)}")
                # Initialize with empty tasks if loading fails
                self.tasks = []
        else:
            # If the file doesn't exist, start with an empty task list
            self.tasks = []
            print(f"{Fore.YELLOW}No saved tasks found. Starting with an empty list.")

def print_menu():
    """Display the main menu options."""
    print(f"\n{Fore.CYAN}===== TO-DO LIST MENU =====")
    print(f"{Fore.WHITE}1. Add a task")
    print(f"{Fore.WHITE}2. View tasks")
    print(f"{Fore.WHITE}3. Mark a task as complete")
    print(f"{Fore.WHITE}4. Remove a task")
    print(f"{Fore.WHITE}5. Save and exit")
    print(f"{Fore.CYAN}==========================\n")

def main():
    """Main function to run the to-do list application."""
    print(f"{Fore.MAGENTA}Welcome to the CLI To-Do List Application!")
    todo_list = TodoList()
    
    while True:
        print_menu()
        choice = input(f"{Fore.YELLOW}Enter your choice (1-5): {Style.RESET_ALL}")
        
        if choice == '1':
            task = input(f"{Fore.WHITE}Enter task description: {Style.RESET_ALL}")
            if task:
                todo_list.add_task(task)
            else:
                print(f"{Fore.RED}Task description cannot be empty.")
        
        elif choice == '2':
            todo_list.view_tasks()
        
        elif choice == '3':
            todo_list.view_tasks()
            try:
                task_number = int(input(f"{Fore.WHITE}Enter the number of the task to mark as complete: {Style.RESET_ALL}"))
                todo_list.complete_task(task_number)
            except ValueError:
                print(f"{Fore.RED}Please enter a valid number.")
        
        elif choice == '4':
            todo_list.view_tasks()
            try:
                task_number = int(input(f"{Fore.WHITE}Enter the number of the task to remove: {Style.RESET_ALL}"))
                todo_list.remove_task(task_number)
            except ValueError:
                print(f"{Fore.RED}Please enter a valid number.")
        
        elif choice == '5':
            todo_list.save_tasks()
            print(f"{Fore.MAGENTA}Thank you for using the CLI To-Do List Application. Goodbye!")
            break
        
        else:
            print(f"{Fore.RED}Invalid choice. Please enter a number between 1 and 5.")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print(f"\n{Fore.MAGENTA}Application terminated by user. Goodbye!") 