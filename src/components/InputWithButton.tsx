import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import Button from "./Button";

type propsType = {
    todolistId: string
    addTask: (todolistId: string, title: string) => void
}

const InputWithButton = (props: propsType) => {



    const addTask = () => {
        // if (title.trim() !== "") {
        //     props.addTask(props.todolistId, title.trim());
        //     setTitle("");
        // } else {
        //     setError("Title is required");
        // }
    }




    return (
        <div>
            {/*<input value={title}*/}
            {/*       onChange={onChangeHandler}*/}
            {/*       onKeyPress={onKeyPressHandler}*/}
            {/*    // className={error ? "error" : ""}*/}
            {/*/>*/}

            <Button callBack={addTask} name={'+'}/>

            {/*{error && <div className="error-message">{error}</div>}*/}
            )
        </div>
    )
}

export default InputWithButton

