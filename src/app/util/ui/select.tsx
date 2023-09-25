import React, {DetailedHTMLProps} from "react";
interface SelectInput extends DetailedHTMLProps<React.InputHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
    id:string,
    options: { value: any, label: string }[],
    defaultValue: any,
    placeholder?:string

}

const Select = (props: SelectInput) => {
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