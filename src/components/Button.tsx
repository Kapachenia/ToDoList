import React from 'react';

type propsType = {
    callBack : () => void
    name: string
}

const Button = (props: propsType) => {

    const onClickHandler = () => {
        props.callBack()
    }

    return (
        <div>
            <button onClick={onClickHandler}>
                {props.name}
            </button>
        </div>
    );
};

export default Button;