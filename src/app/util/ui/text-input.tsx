import React, { useState, useRef } from 'react';

export const TextInput = ({dblclick = false, invalidlist = [], ...props}) => {
    const [dblClicked, setDblClicked] = useState(false);
    const [warning, setWarning] = useState(false);
    const elementRef = useRef(null);
    const defaultValue = props.value || props.defaultValue;

    const blurInput = async (e) => {
        if (e.key === "Enter") {
            e.target.blur();
        }
        else if (e.key === "Escape") {
            elementRef.current.value = defaultValue;
            await setWarning(false);
            await setDblClicked(false);
            await elementRef.current.blur();
        }
    };

    const handleDblClick = (e) => {
            if (!dblClicked) {
                setDblClicked(true);
                
            }
            elementRef.current.focus();
    };

    const handleBlur = (e) => {
        if (invalidlist.includes(e.target.value)) {
            setWarning(true);
            return e.target.focus();
        }
        setDblClicked(false);
        props.onblur(e);
    }

    return <input ref={elementRef} onBlur={handleBlur} readOnly={dblclick && !dblClicked} onDoubleClick={handleDblClick}  {...props} onKeyDown={blurInput} className={`${!dblClicked ? "text-input-readonly":`text-input${warning? '-warning' : ''}`}`} /> 
}
