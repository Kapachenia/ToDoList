import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import Button from "./components/Button";

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

    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(props.todolistId, title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }

    // const onAllClickHandler = () => props.changeFilter(props.todolistId, "all");
    // const onActiveClickHandler = () => props.changeFilter(props.todolistId, "active");
    // const onCompletedClickHandler = () => props.changeFilter(props.todolistId, "completed");

    const tsarFoo = (value: FilterValuesType) => {
        props.changeFilter(props.todolistId, value)
    }

    const onClickHandlerForRemoveTodolist = () => {
        props.removeTodolist(props.todolistId)
    }

    return <div>
        <h3>{props.title}</h3>
        <button onClick={onClickHandlerForRemoveTodolist}>x</button>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addTask}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
        <ul>
            {
                tasks.map(t => {
                    const onClickHandler = () => removeTask(props.todolistId, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistId, t.id, e.currentTarget.checked);
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <Button callBack={() => tsarFoo('all')} name={'all'} />
            <Button callBack={() => tsarFoo('active')} name={'active'} />
            <Button callBack={() => tsarFoo('completed')} name={'completed'} />
        </div>
    </div>
}
