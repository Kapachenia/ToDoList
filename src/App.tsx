import React, {useState} from 'react';
import './App.css';
import {Todolist, TaskType} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

export type TasksType = {[key: string] : Array<TaskType>}

export type todolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let todolistID1=v1();
    let todolistID2=v1();

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]:[
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]:[
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    const removeTodolist = (todolistsID: string) => {
        setTodolists(todolists.filter( f => f.id !== todolistsID ))
    }

    function removeTask(todolistID: string, id: string) {
        setTasks({...tasks, [todolistID] : tasks[todolistID].filter( f => f.id !== id)})

        // let filteredTasks = tasks.filter(t => t.id != id);
        // setTasks(filteredTasks);
    }

    function addTask(todolistID: string, title: string) {
        setTasks({...tasks, [todolistID] : [{id: v1(), title: title, isDone: false}, ...tasks[todolistID]]})

        // let task = {id: v1(), title: title, isDone: false};
        // let newTasks = [task, ...tasks];
        // setTasks(newTasks);
    }

    function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todolistID] : tasks[todolistID].map( m => m.id === taskId ? {...m, isDone: isDone} : m)})

        // setTasks({...tasks, [todolistID] : tasks[todolistID].map( m => m.id === taskId ? {...m, isDone: isDone} : m )})

        // let task = tasks.find(t => t.id === taskId);
        // if (task) {
        //     task.isDone = isDone;
        // }
        //
        // setTasks([...tasks]);
    }


    function changeFilter(todolistId: string, value: FilterValuesType) {
        setTodolists(todolists.map( t => t.id === todolistId ? {...t, filter: value} : t))


        // let currentTodolist = todolists.find( f => f.id === todolistId)
        // if (currentTodolist) {
        //     currentTodolist.filter = value
        //     setTodolists([...todolists])
        // }
    }


    return (
        <div className="App">
            {todolists.map(l => {
                let tasksForTodolist = tasks[l.id];
                if (l.filter === "active") {
                    tasksForTodolist = tasks[l.id].filter(t => t.isDone === false);
                }
                if (l.filter === "completed") {
                    tasksForTodolist = tasks[l.id].filter(t => t.isDone === true);
                }

                return (
                    <Todolist
                        key={l.id}
                        todolistId={l.id}
                        title={l.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={l.filter}
                        removeTodolist={removeTodolist}
                    />
                )
            })}
        </div>
    );
}

export default App;
