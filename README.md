# Task Tracker CLI

A simple command-line task tracker built with Node.js. Tasks are stored in a local JSON file and can be created, updated, deleted, and tracked through different statuses.

## Features

* Add tasks
* Update task descriptions
* Delete tasks
* Mark tasks as in progress
* Mark tasks as done
* List all tasks
* Filter tasks by status
* Persistent storage using a JSON file

## Technologies Used

* Node.js
* JavaScript
* File System (fs) module

## Usage

### Add a Task
node task-cli.js add "Buy groceries"

### Update a Task
node task-cli.js update 1 "Buy groceries and milk"


### Delete a Task
node task-cli.js delete 1


### Mark a Task as In Progress
node task-cli.js mark-in-progress 1

### Mark a Task as Done
node task-cli.js mark-done 1


### List All Tasks
node task-cli.js list


### List Tasks by Status
node task-cli.js list todo

node task-cli.js list in-progress

node task-cli.js list done


## Learning Outcomes
This project helped me practice:

* Working with the Node.js File System module
* Reading and writing JSON data
* Command-line argument parsing
* Callback functions
* CRUD operations
* Refactoring code using helper functions

