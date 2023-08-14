import React, {useState} from "react";
import { IconPlus32, Dropdown, IconToggleButton, IconButton, IconEllipsis32, IconMinus32, Textbox } from "figma-ui-kit";
// import { TagIcon16 } from "../util/ui/svg";
import { LeftMenu } from "../util/ui/left-menu";

export const Variables = () => {
    const [expanded, setExpanded] = useState([]);
    const clickHandlerAdd = (i) => setExpanded([...expanded, i]);
    const clickHandlerRemove = (i) => setExpanded(expanded.filter((e) => e !== i));

    const typeOptions = [{value: "string"}, {value: "number"}, {value: "boolean"}, {value: "object"}, {value: "array"}];
    return (
        <>
            <div style={{ display: "flex", justifyContent: "flex-end", padding: "5px" }}>
                <IconToggleButton onClick={() => clickHandlerAdd(1)} value={null}>
                    <IconPlus32 />
                </IconToggleButton>
            </div>
            <div className="items-list">
                    <div className="items-list-item items-border-bottom">
                        <div className="items-list-item-alwaysdisplay">
                            <div className="label">name</div>

                            {
                                !expanded.includes(1) ?
                                    <div>
                                        <IconToggleButton onClick={() => clickHandlerAdd(1)} value={null}>
                                            <IconPlus32 />
                                        </IconToggleButton>
                                    </div>
                                    :
                                    <div>
                                        <IconToggleButton onClick={() => clickHandlerRemove(1)} value={null}>
                                            <IconMinus32 />
                                        </IconToggleButton>
                                    </div>
                            }
                        </div>
                        <div className={`items-list-item-expanded ${expanded.includes(1) ? "" : "hide"}`} >
                            <div style={{ alignItems: "center", width: "100%", display: "flex", justifyContent: "space-between" }}>
                                <div className="flex-center" title="source component" style={{ padding: "0 10px 0 10px"}}><Dropdown placeholder="type" style={{position: "absolute", marginLeft: "-8px", width: "100px"}} onChange={()=>{}} options={typeOptions} value={'string'} /></div>
                                <div className="flex-center" title="frame location" style={{ padding: "0 10px 0 10px" }}><Textbox style={{width: "150px"}} onInput={()=>{}} placeholder="validation/notes" value={""} /></div>
                                <LeftMenu marginLeft={"-7%"} onClick={(e)=> console.log("TARGET:", e)} options={["edit","delete"]} trigger={<IconButton><IconEllipsis32/></IconButton>}/>
                            </div>
                        
                        </div>
                        
                    </div>
                </div>
        </>
    )
}