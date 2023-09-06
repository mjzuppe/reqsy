import React, { useState } from 'react';
import { IconPlus32, IconToggleButton, IconMinus32, } from "figma-ui-kit";

export const PlusMinusToggle = (props: { onClick: (e: any) => any, plus?: boolean }) => {
    const [isPlus, setIsPlus] = useState(props.plus ?? true);
    const clickHandler = () => { 
        setIsPlus(!isPlus);
        props.onClick(isPlus);
    };

    return (
        isPlus ?
            <div>
                <IconToggleButton onClick={clickHandler} value={null}>
                    <IconPlus32 />
                </IconToggleButton>
            </div>
            :
            <div>
                <IconToggleButton onClick={clickHandler} value={null}>
                    <IconMinus32 />
                </IconToggleButton>
            </div>
    )
}

