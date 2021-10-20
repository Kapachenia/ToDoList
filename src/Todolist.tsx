import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType} from './App';
import Button from "./components/Button";
import Input from "./components/Input";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    todolistId: string
    removeTodolist: (todolistId: string) => void
}

export function Todolist({tasks, removeTask, ...props}: PropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)


    const addTaskHandlerForAddTitle = () => {
        // if (title.trim() !== "") {
        if (title) {
            props.addTask(props.todolistId, title)
            setTitle("")
        } else {
            setError("Title is required")
        }
    }

    const tsarFoo = (value: FilterValuesType) => {
        props.changeFilter(props.todolistId, value)
    }

    const onClickHandlerForRemoveTodolist = () => {
        props.removeTodolist(props.todolistId)
    }

    const onClickHandlerForRemove = (Tid: string) => {
        removeTask(props.todolistId, Tid)
    }

    const addTaskHandlerForEnter = () => {
props.addTask(props.todolistId, title)
    }

    return <div>
        <h3>{props.title}</h3>

        <Button callBack={onClickHandlerForRemoveTodolist} name={'x'}/>

        <div>

            <Input title={title}
                   setTitle={setTitle}
                   addTask={addTaskHandlerForEnter}
                   error={error}
                   setError={setError}
            />

            <Button callBack={addTaskHandlerForAddTitle} name={'+'} />

        </div>
        <ul>
            {
                tasks.map(t => {
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistId, t.id, e.currentTarget.checked);
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <span>{t.title}</span>
                        <Button callBack={() => onClickHandlerForRemove(t.id)} name={'x'}/>
                    </li>
                })
            }
        </ul>
        <div>
            <Button callBack={() => tsarFoo('all')} name={'all'} filter={props.filter}/>
            <Button callBack={() => tsarFoo('active')} name={'active'} filter={props.filter}/>
            <Button callBack={() => tsarFoo('completed')} name={'completed'} filter={props.filter}/>
        </div>
    </div>
}
