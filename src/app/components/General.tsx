import React from "react";
import { TextboxAutocomplete, TextboxAutocompleteOption, Textbox} from "figma-ui-kit";

export const General = () => {
    const options: Array<TextboxAutocompleteOption> = [

        {value: "user.name"},
        {value: "user.email"},
    ];

    const issueOptions: Array<TextboxAutocompleteOption> = [
        {value: "x0293"},
    ];

    return (
            <div style={{  width: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: "10px"}}>
            <Textbox value={null} placeholder="enter a name"/>
            <TextboxAutocomplete  placeholder="select/enter tag" onInput={()=>{}} options={options} value={null} />
            <TextboxAutocomplete  placeholder="select/enter issue url" onInput={()=>{}} options={issueOptions} value={null} />
          
            </div>
    )
}