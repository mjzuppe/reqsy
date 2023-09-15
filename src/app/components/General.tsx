import React from "react";
import { TextboxAutocomplete, TextboxAutocompleteOption, Textbox} from "figma-ui-kit";
import { TextInput } from "../util/ui/text-input";
// data
import { controller } from "../functions/utils";

export const General = (props: {selectionData: any}) => {
    const {selectionData} = props;
    const options: Array<TextboxAutocompleteOption> = [
        {value: "user.name"},
        {value: "user.email"},
    ];
    const {label} = selectionData;

    const handleLabelChange = (e: any) => {
        console.log("handleLabelChange", e);
    }

    return (
            <div style={{  width: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: "10px"}}>
            <TextInput onblur={handleLabelChange} defaultValue={label || ""} placeholder="enter a label" />
            <TextboxAutocomplete  placeholder="select/enter tag" onInput={()=>{}} options={options} value={'user.name'} />
            </div>
    )
}