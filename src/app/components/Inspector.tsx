import React, { useState } from "react";
import { IconPlus32, IconMinus32, IconToggleButton, IconButton, IconEllipsis32, IconLockLocked32 } from "figma-ui-kit";
import { LeftMenu } from "../util/ui/left-menu";
// components
import { Template } from "./Template";
import { Condition } from "./Condition";
import { General } from "./General";
import { Notes } from "./Notes";
import { Behaviors } from "./Behaviors";



const InspectorItem = (props) => {
    const { title } = props;
    const [expanded, setExpanded] = useState(false);
    const clickHandler = () => setExpanded(!expanded);
    const view = { "Template": <Template />,"Condition": <Condition />, "General": <General />, "Notes": <Notes />, "Behaviors": <Behaviors/> }[title || "Template"]
    return (
        <div className={`items-list-item ${title !== 'Notes' && "items-border-bottom"}`}>
            <div className="items-list-item-alwaysdisplay">
                <div style={{display: "flex"}}><div className="label">{title}</div><div style={{backgroundColor: "#0d99ff", borderRadius: "15px", padding: "0 5px 0 5px", marginLeft: "10px", textAlign: "center"}}>28</div></div>

                {
                    !expanded ?
                        <div>
                            <IconToggleButton onClick={clickHandler} value={null}>
                                <IconPlus32 />
                            </IconToggleButton>
                        </div>
                        :
                        <div>
                            <IconToggleButton onClick={clickHandler} value={null}>
                                <IconMinus32 />
                            </IconToggleButton>
                        </div>
                }
            </div>
            <div className={`items-list-item-expanded ${expanded ? "" : "hide"}`} >
                {view}
            </div>

        </div>
    )
}

export const Inspector = () => {
    return (
        <div id="action-container">
            {/* <div className="action-container-content">
                <p><strong>Inspector.</strong> Do more things like this.</p>
            </div> */}
            <div style={{ justifyContent: "space-between" }} className="action-container-content">
                <div style={{ fontWeight: "bold", fontSize: "1.5em", display: "flex", alignItems: "center" }}>Signup <IconLockLocked32/></div>
                <div style={{ display: "flex" }}>
                    <div style={{ display: "flex", alignItems: "center"}}>
                        {["signup", "bobba", "x0239"].map((e, i) => <div style={{ padding: "3px", borderRadius: "4px", backgroundColor: "rgba(256, 256, 256, 0.2)", marginLeft: "5px" }} key={e + i}>{e}</div>)}
                    </div>
                    <LeftMenu marginLeft={"-15%"} onClick={(e) => console.log("TARGET:", e)} options={["lock/unlock", "copy", "paste", "delete..."]} trigger={<IconButton><IconEllipsis32 /></IconButton>} />
                </div>
            </div>

            <div className="action-container-subcontainer">
                <div className="items-list">
                    <InspectorItem title="General" />
                    <InspectorItem title="Template" />
                    <InspectorItem title="Condition" />
                    <InspectorItem title="Behaviors" />
                    <InspectorItem title="Notes" />
                </div>
            </div>
        </div>
    )
}