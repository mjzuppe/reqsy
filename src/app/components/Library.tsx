import React, { useState } from "react";
import { SearchTextbox, IconToggleButton, IconPlus32, IconMinus32, IconLayerComponent16, IconLayerFrame16, IconEllipsis32, IconButton } from "figma-ui-kit";
import { LeftMenu } from "../util/ui/left-menu";
import { TagIcon16 } from "../util/ui/svg";

export const Library = () => {
    const [expanded, setExpanded] = useState([]);
    const clickHandlerAdd = (i) => setExpanded([...expanded, i]);
    const clickHandlerRemove = (i) => setExpanded(expanded.filter((e) => e !== i));

    return (
        <div id="action-container">
             <div className="action-container-content">
                <p><strong>Library.</strong> Do more things like this.</p>
            </div>
            <div className="action-container-subnav">
                <SearchTextbox value={""} placeholder="search names" />
            </div>
           
            <div className="action-container-subcontainer">
                <div className="items-list">
                    <div className="items-list-item">
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
                                <div className="flex-center" title="source component" style={{ padding: "0 10px 0 10px"}}><IconLayerComponent16 /><p>Button</p></div>
                                <div className="flex-center" title="frame location" style={{ padding: "0 10px 0 10px" }}><IconLayerFrame16 /><p>SignUp Screen</p></div>
                                <LeftMenu marginLeft={"-7%"} onClick={(e)=> console.log("TARGET:", e)} options={["edit","share", "delete"]} trigger={<IconButton><IconEllipsis32/></IconButton>}/>
                            </div>
                            <div  title="associated tags" style={{ width: "100%", padding: "0 10px 0 10px" }}><div className="flex-center"> <TagIcon16/><p style={{paddingLeft: 2}}>ONE, TWO</p></div>  </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}