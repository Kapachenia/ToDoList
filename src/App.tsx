import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import InputWithButton from './components/InputWithButton';

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
        {id: todolistId1, title: "What to learn", filter: 'all'},
        {id: todolistId2, title: "What to buy", filter: 'all'},
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
        setTodolists([...todolists.filter( f => f.id !== todolistId)])
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    function removeTask(todolistId: string, id: string) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter( f => f.id !== id) })
    }

    function addTask(title: string, todolistId: string ) {
        setTasks({...tasks, [todolistId]: [{id: v1(), title, isDone: false}, ...tasks[todolistId]]})
    }

    function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(m => m.id === taskId ? {...m, isDone: isDone} : m)})
    }

    function changeTaskTitle(todolistId: string, taskId: string, NewTitle: string) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(m => m.id === taskId ? {...m, title: NewTitle} : m)})
    }

    function changeFilter(todolistId: string, filter: FilterValuesType) {
        setTodolists(todolists.map(t => t.id === todolistId ? {...t, filter} : t))
    }

    function changeTodolistTitle(todolistId: string, NewTitle: string) {
        setTodolists(todolists.map(t => t.id === todolistId ? {...t, title: NewTitle} : t))

    }

    function addTodolist(title: string) {
        let todolist: todolistsType = {
            id: v1(),
            title,
            filter: 'all'
        }
        setTodolists([todolist, ...todolists])
        setTasks({...tasks, [todolist.id] : []})
    }
    
    return (
        <div className="App">

            <InputWithButton addItem={addTodolist} />

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
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                )
            })}


        </div>
    );
}

export default App;