import React from "react";
import { TextboxAutocomplete, TextboxAutocompleteOption, IconEllipsis32, IconButton } from "figma-ui-kit";
import { LeftMenu } from "../util/ui/left-menu";

export const Condition = () => {
    const options: Array<TextboxAutocompleteOption> = [

        {value: "user.name === ''"},
        {value: "user.name !== soemthing"},
    ];

    return (
   
            <div style={{  width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: "10px"}}>
            <TextboxAutocomplete  placeholder="choose an item..." onInput={()=>{}} options={options} value={'user.name'} />
                <LeftMenu marginLeft={"-7%"} onClick={(e)=> console.log("TARGET:", e)} options={["delete"]} trigger={<IconButton><IconEllipsis32/></IconButton>}/>
            </div>

      
    )
}