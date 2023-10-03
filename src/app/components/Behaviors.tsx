import React, {useState} from "react";
import {  Textbox, SegmentedControlOption, Dropdown, IconCode16, TextboxAutocomplete, Button } from "figma-ui-kit";
import { Select } from "../util/ui/select";

const BehaviorRow = () => 
 <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
    <TextboxAutocomplete value={null} options={[]} />
    <Textbox variant="border" value="" />
 </div>

const BehaviorRows = () =>    <div style={{  width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start", paddingBottom: "10px"}}>
<BehaviorRow/>
</div>

const CreateBehaviors = () => <div style={{  width: "100%", display: "flex", flexDirection: "row", alignItems: "flex-start", paddingBottom: "10px"}}>
    <Button onClick={()=>{}} style={{ marginLeft: "5px", fontSize: "10px", height: "20px", lineHeight: "10px" }}>Use recommended</Button> 
    <Button onClick={()=>{}} style={{ marginLeft: "5px", fontSize: "10px", height: "20px", lineHeight: "10px" }}>Create manually</Button> 
</div>

const SuggestBehavior = (props: {handleCancel: (any)=>any}) => <div style={{  width: "100%", display: "flex", flexDirection: "row", alignItems: "flex-start", paddingBottom: "10px"}}>
<Select style={{width: "100px"}} id="behavior-element-type-select" defaultValue={null} placeholder="element or UI" options={[{label: "select", value: "select"}]}/>
<Button  onClick={()=>{}} style={{ marginLeft: "5px", fontSize: "10px", height: "20px", lineHeight: "10px" }}>submit</Button> 
<Button onClick={props.handleCancel} secondary style={{ marginLeft: "5px", fontSize: "10px", height: "20px", lineHeight: "10px" }}>cancel</Button> 
</div>

export const Behaviors = () => {
    const isNew = true;
    const [selectBehaviorView, setSelectBehaviorView] = useState(false);

    const view = isNew? (selectBehaviorView? <SuggestBehavior handleCancel={()=>setSelectBehaviorView(false)}/> : <div onClick={()=>setSelectBehaviorView(true)}><CreateBehaviors /></div>) : <BehaviorRows />;

    return     <div key={`inspector-behavior}`} style={{  width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start", paddingBottom: "10px"}}>
        {view}
    </div>