import React, { useState, useRef, DetailedHTMLProps } from 'react';

interface TextInput extends DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    onblur: (e: any) => any,
    dblclick?: boolean,
    invalidlist?: string[],
    allowEmpty?: boolean
}

export const TextInput = (props: TextInput) => {
    const { dblclick, invalidlist, onblur, allowEmpty, ...rest } = props;
    const [dblClicked, setDblClicked] = useState(false);
    const [warning, setWarning] = useState(false);
    const elementRef = useRef(null);
    const defaultValue = props.value || props.defaultValue || "";

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

    const handleBlur = async (e:any) => {
        if (!allowEmpty && e.target.value.trim() === "") {
            elementRef.current.value = defaultValue;
            await setWarning(false);
            await setDblClicked(false);
            await elementRef.current.blur();
        }
        if (invalidlist.includes(e.target.value)) {
            await setWarning(true);
            return e.target.focus();
        }
        await setDblClicked(false);
        onblur(e);
    }

    return <input defaultValue={defaultValue} {...rest} ref={elementRef} onBlur={handleBlur} readOnly={dblclick && !dblClicked} onDoubleClick={handleDblClick} onKeyDown={blurInput} className={`${!dblClicked ? "text-input-readonly" : `text-input${warning ? '-warning' : ''}`}`} />
}
