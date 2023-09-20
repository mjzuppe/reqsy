import React from "react";

const Select = (props: { id: string, options: { value: any, label: string }[], defaultValue: any, placeholder?:string }) => {
    const { id, options, defaultValue, placeholder, ...rest } = props;
    return (
        <div className="select">
            <select {...rest} placeholder={placeholder} defaultValue={defaultValue || null} id={id}>
                <option disabled>{placeholder}</option>
                {options.map((o: { value: any, label: string }, i) => <option key={`type-${i}`} value={o.value}>{o.label}</option>)}
            </select>
        </div>)
}

export {Select}