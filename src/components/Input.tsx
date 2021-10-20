import React, {ChangeEvent, KeyboardEvent} from 'react';

export type propsType = {
    title: string
    setTitle: (title: string) => void
    addTask: () => void
}

const Input = (props: propsType) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        // setError(null);
        if (e.charCode === 13) {
            props.addTask();
            props.setTitle("")
        }
    }

    return (
        <div>
            <input value={props.title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                // className={error ? "error" : ""}
            />
        </div>
    );
};

export default Input;