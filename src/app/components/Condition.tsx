import React, {useState, useRef} from "react";
import { TextboxAutocomplete,  TextboxAutocompleteOption, IconEllipsis32, IconButton, Button } from "figma-ui-kit";
import { LeftMenu } from "../util/ui/left-menu";
import { TextInput } from "../util/ui/text-input";
import {Select} from "../util/ui/select";

export const Condition = (props: {db: any, selectionData: any}) => {
    const { db, selectionData } = props;
    const allConditions = selectionData.condition;
    const options: any = allConditions.map((c: {id:string, label:string}) => ({ value: c.id, label: c.label }));

    const [condition, setCondition] = useState(allConditions.length? allConditions[0].value : "");
    const [createEditCondition, setCreateEditCondition] = useState(false);

    const handleConditionValueChange = (e: any) => {
        setCondition(e);
    };
    const handleConditionChange = async (e: any) => {
        console.log(e.target.value);
    }
    const handleButtonClick = () => {
        setCreateEditCondition(true);
        setTimeout(() => {
            document.getElementById("condition-create").focus();
        }, 100);
   
    }

    return (
   
            <div style={{  width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: "10px"}}>
            {
                createEditCondition ? <TextInput id={"condition-create"} placeholder="Enter a condition" onblur={handleConditionChange} /> : !allConditions.length? <Button onClick={handleButtonClick} style={{marginLeft: "5px", fontSize: "10px", height: "20px", lineHeight: "10px"}}>Create...</Button> : <Select id="condition-selection"  defaultValue={""} options={options} />
            }
            {/* <TextboxAutocomplete  placeholder="choose an item..." onBlur={handleConditionChange} onValueInput={handleConditionValueChange} options={options} value={condition} /> */}
                <LeftMenu marginLeft={"-7%"} onClick={(e)=> console.log("TARGET:", e)} options={["delete"]} trigger={<IconButton><IconEllipsis32/></IconButton>}/>
            </div>

      
    )
}