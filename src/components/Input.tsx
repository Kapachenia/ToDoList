import React, {ChangeEvent, KeyboardEvent} from 'react';
import './../App.css';


export type propsType = {
    title: string
    setTitle: (title: string) => void
    addTask: () => void
    error: any
    setError: any
}

const Input = (props: propsType) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        props.setError(null);
        if (e.charCode === 13 ) {
            if (props.title) {
                props.addTask();
                props.setTitle("")
            } else props.setError("Title is required")
        }
    }

    return (
        <div>
            <input value={props.title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={props.error ? "error" : ""}
            />
            <div className={"errorMessage"}>{props.error}</div>
        </div>
    );
};

export default Input;