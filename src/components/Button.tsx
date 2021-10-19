import React from "react";

type propsType = {
    callBack: () => void
    name: string
}

const Button = (props: propsType) => {

    const onClickHandler = () => {
        props.callBack()
    }

    return (
        <button onClick={onClickHandler}>{props.name}</button>
    )
}

export default Button