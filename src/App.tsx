import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

type todolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksType = { [key: string]: Array<TaskType> }

function App() {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: todolistId1, title: "What to learn", filter: 'active'},
        {id: todolistId2, title: "What to buy", filter: 'completed'},
    ])

    const [tasks, setTasks] = useState<TasksType>({
            [todolistId1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "Rest API", isDone: false},
                {id: v1(), title: "GraphQL", isDone: false},
            ],
            [todolistId2]: [
                {id: v1(), title: "Book", isDone: true},
                {id: v1(), title: "Milk", isDone: true},
                {id: v1(), title: "Bread", isDone: false},
            ]
        }
    )

    const removeTodolist = (todolistId: string) => {
        setTodolists([...todolists.filter(f => f.id !== todolistId)])
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    function removeTask(todolistId: string, id: string) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(f => f.id !== id)})

        // let newTasks = tasks[todolistId]
        // let filteredTasks = newTasks.filter(t => t.id != id)
        // tasks[todolistId] = filteredTasks
        // setTasks({...tasks})
    }

    function addTask(todolistId: string, title: string) {
        setTasks({...tasks, [todolistId]: [{id: v1(), title: title, isDone: false}, ...tasks[todolistId]]})

        // let task = {id: v1(), title: title, isDone: false}
        // let tasksTodo = tasks[todolistId]
        // let newTasks = [task, ...tasksTodo]
        //
        // tasks[todolistId] = newTasks
        // setTasks({...tasks})
    }

    function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(m => m.id === taskId ? {...m, isDone} : m)})

        // let task = tasks.find(t => t.id === taskId);

        // let newTasks = tasks[todolistId]
        // let task = newTasks.find(t => t.id === taskId)
        // if (task) {
        //     task.isDone = isDone;
        //     setTasks({...tasks})
        // }
    }

    function changeFilter(todolistId: string, filter: FilterValuesType) {
        setTodolists(todolists.map(t => t.id === todolistId ? {...t, filter} : t))
    }

    return (
        <div className="App">

            {todolists.map(t => {

                let tasksForTodolist = tasks[t.id];

                if (t.filter === "active") {
                    tasksForTodolist = tasks[t.id].filter(t => t.isDone === false);
                }
                if (t.filter === "completed") {
                    tasksForTodolist = tasks[t.id].filter(t => t.isDone === true);
                }

                return (
                    <Todolist
                        key={t.id}
                        todolistId={t.id}
                        title={t.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={t.filter}
                        removeTodolist={removeTodolist}
                    />
                )
            })}


        </div>
    );
}

export default App;
