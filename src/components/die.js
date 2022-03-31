import React from 'react';

export default function Die(props) {

    const styles = {
        backgroundColor: props.isHeld ? '#59e391' : 'white'
    }

    return (
        <div
            style={styles}
            className="die-face"
            onClick={props.holdDice}
        >
            <h2>{props.value}</h2>
        </div>
    )
}  