#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let toDoList: string[] = [];
let conditions = true;

console.log(chalk.greenBright("\n \t Welcome to ToDo-list App\n"));



let main = async () => {
    while (conditions) {
        let option = await inquirer.prompt(
            [
                {
                    name: "choice",
                    type: "list",
                    message: "Select an option you want to do",
                    choices: ["Add Task", "Delete Task", "Update Task", "View ToDo-List", "Exit"]
                }
            ]
        )
        if (option.choice === "Add Task") {
            await addTask()
        }
        else if (option.choice === "Delete Task") {
            await deleteTask()
        }
        else if (option.choice === "Update Task") {
             await updateTask()              
        }
        else if (option.choice === "View ToDo-List") {
            await viewTask()
        }
        else if (option.choice === "Exit") {
            conditions = false;
        }
    }

}

let addTask = async () => {
    let newTask = await inquirer.prompt(
        [
            {
                name: "task",
                type: "input",
                message: "Enter your new task"

            }
        ]
    )
    toDoList.push(newTask.task);
    console.log(`\n ${newTask.task} task added successfully in ToDo-List`)
}

let viewTask = () => {
    console.log("\n Your ToDo-List \n");
    toDoList.forEach((task, index) => {
        console.log(`${index} ${task}`)
    })
}
let deleteTask = async () => {
    await viewTask()
    let taskIndex = await inquirer.prompt(
        [
            {
                name: "index",
                type: "number",
                message: "Enter the index no. of the task you want to delete "
            }
        ]
    )
    let deletedTask = toDoList.splice(taskIndex.index, 1);
    console.log(`\n ${deletedTask} This task has been deleted successfully from your ToDo-List`)
}

let updateTask = async () => {
    await viewTask()
    let update_task_index = await inquirer.prompt(
        [
            {
                name: "index",
                type: "number",
                message: "Enter the index of the task you want to update:"
            },
            {
                name: "new_task",
                type: "input",
                message: "Now enter new task name:"
            }
        ]
    )
    toDoList[update_task_index.index] = update_task_index.new_task
    console.log(`\n Task at index no. ${update_task_index.index} updated successfully [For updated list check option:"View ToDo-List]`)
}
main();

