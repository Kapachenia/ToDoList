import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

export type todolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: v1(), title: "What to learn", filter: "all"},
        {id: v1(), title: "What to buy", filter: "all"},
    ])

    // let [filter, setFilter] = useState<FilterValuesType>("all");

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id != id);
        setTasks(filteredTasks);
    }

    function addTask(title: string) {
        let task = {id: v1(), title: title, isDone: false};
        let newTasks = [task, ...tasks];
        setTasks(newTasks);
    }

    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }

        setTasks([...tasks]);
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
                let tasksForTodolist = tasks;
                if (l.filter === "active") {
                    // tasksForTodolist = tasks.filter(t => t.isDone === false);
                }
                if (l.filter === "completed") {
                    // tasksForTodolist = tasks.filter(t => t.isDone === true);
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
                    />
                )
            })}
        </div>
    );
}

export default App;
