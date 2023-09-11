import React, { useState } from 'react';
import { IconPlus32, IconToggleButton, IconMinus32, } from "figma-ui-kit";

export const PlusMinusToggle = (props: { onClick: (e: any) => any, defaultValue?: boolean, value?: boolean }) => {
    const [toggledValue, setToggledValue] = useState(props.defaultValue ?? true);
    const clickHandler = () => { 
        setToggledValue(!toggledValue);
        props.onClick(toggledValue);
    };

    return (
        (props.value ?? toggledValue) ?
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

