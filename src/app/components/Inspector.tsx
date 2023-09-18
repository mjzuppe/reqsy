import React, { useState } from "react";
// components
import { IconPlus32, IconMinus32, IconToggleButton, IconButton, IconEllipsis32, IconLockLocked32, Button } from "figma-ui-kit";
import { LeftMenu } from "../util/ui/left-menu";
import { Condition } from "./Condition";
import { General } from "./General";
import { Notes } from "./Notes";
import { Behaviors } from "./Behaviors";
// data
import { controller } from "../functions/utils";



const InspectorItem = (props: {title: string, selectionData: any}) => {
    const { title, selectionData } = props;
    const [expanded, setExpanded] = useState(false);
    const clickHandler = () => setExpanded(!expanded);
    const view = { "Condition": <Condition />, "General": <General selectionData={selectionData} />, "Notes": <Notes />, "Behaviors": <Behaviors/> }[title || "Template"]
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

const NoSelectionView = () => <div id="action-container">
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", width: "100%"}} className="action-container-content">
        <div style={{fontWeight: "bold", fontSize: "1.5em", padding: "5px"}}>No data to display</div>
        <div style={{padding: "5px"}}>Please select a component.</div>
    </div>
</div>

const NotRegisteredView = (props: {db: any}) => {
    const {db} = props;
    const handleRegisterComponent = async () => {
        await controller({func: 'init', data: {model: 'selection'}});
    };
    return(<div id="action-container">
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", width: "100%"}} className="action-container-content">
        <div style={{fontWeight: "bold", fontSize: "1.5em", padding: "5px"}}>No data to display</div>
        <div style={{padding: "5px"}}><Button onClick={handleRegisterComponent} style={{width: "180px"}}>Register as new component</Button></div>
        <div style={{padding: "5px"}}><Button disabled style={{width: "180px"}}>Link to library component</Button></div>
    </div>
</div>
)
}


export const Inspector = (props: {selectionData:any, db: any}) => {
    const {selectionData, db} = props;
    const label = selectionData?.label;
    return selectionData === undefined ? <NoSelectionView/> : selectionData.init === ''? <NotRegisteredView db={db} /> : (
        <div id="action-container">
            <div style={{ justifyContent: "space-between" }} className="action-container-content">
                <div style={{ fontWeight: "bold", fontSize: "1.3em", display: "flex", alignItems: "center" }}>{label || ""}
                {/* <IconLockLocked32/> */}
                </div>
                <div style={{ display: "flex" }}>
                    {/* <div style={{ display: "flex", alignItems: "center"}}>
                        {["signup", "bobba", "x0239"].map((e, i) => <div style={{ padding: "3px", borderRadius: "4px", backgroundColor: "rgba(256, 256, 256, 0.2)", marginLeft: "5px" }} key={e + i}>{e}</div>)}
                    </div> */}
                    <LeftMenu marginLeft={"-15%"} onClick={(e) => console.log("TARGET:", e)} options={["delete?"]} trigger={<IconButton><IconEllipsis32 /></IconButton>} />
                </div>
            </div>

            <div className="action-container-subcontainer">
                <div className="items-list">
                    <InspectorItem title="General" selectionData={selectionData} />
                    <InspectorItem title="Condition" selectionData={selectionData} />
                    <InspectorItem title="Behaviors" selectionData={selectionData} />
                    <InspectorItem title="Notes" selectionData={selectionData} />
                </div>
            </div>
        </div>
    )
}