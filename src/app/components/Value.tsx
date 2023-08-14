import React from "react";
import { TextboxAutocomplete, TextboxAutocompleteOption} from "figma-ui-kit";


export const Value = () => {
    const options: Array<TextboxAutocompleteOption> = [

        {value: "user.name"},
        {value: "user.email"},
    ];

    return (
   
            <div style={{  width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: "10px"}}>
            <TextboxAutocomplete  placeholder="choose an item..." onInput={()=>{}} options={options} value={null} />

            </div>

      
    )
}