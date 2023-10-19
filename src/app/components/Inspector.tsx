import React, { useState } from "react";
// components
import { IconPlus32, IconMinus32, IconToggleButton, IconButton, IconEllipsis32, IconLockLocked32, Button, Link } from "figma-ui-kit";
import { Menu } from "../util/ui/menu";
import { Condition } from "./Condition";
import { General } from "./General";
import { Notes } from "./Notes";
import { Behaviors } from "./Behaviors";
// data
import { controller } from "../functions/utils";
import { Select } from "../util/ui/select";




const InspectorItem = (props: {title: string, selectionData: any, db: any, readOnly: boolean, disabled?: boolean, currentViewValue?: string, currentView?: (e:string)=>any}) => {
    const { title, selectionData, db, disabled, currentView, currentViewValue, readOnly } = props;
    const [expanded, setExpanded] = useState(false);
    const clickHandler = () => setExpanded(!expanded);
    const view = { "Condition": <Condition disabled={disabled} currentView={currentView} selectionData={selectionData} db={db} readOnly={readOnly} />, "General": <General selectionData={selectionData} db={db} readOnly={readOnly} />, "Notes": <Notes disabled={disabled} readOnly={readOnly} selectionData={selectionData} currentViewValue={currentViewValue} />, "Behaviors": <Behaviors disabled={disabled} readOnly={readOnly} db={db} selectionData={selectionData} currentViewValue={currentViewValue}/> }[title || "Template"]
    const badgeCount = { "Condition": selectionData.condition.length, "General": selectionData.tag.length, "Notes": selectionData.note.filter((n:any) => n.id === currentViewValue).length, "Behaviors": 0 }[title || "Template"]
    return (
        <div className={`items-list-item ${title !== 'Notes' && "items-border-bottom"}`}>
            <div className="items-list-item-alwaysdisplay">
                <div style={{display: "flex"}}><div className="label">{title}</div>
                {badgeCount? <div style={{backgroundColor: "#0d99ff", borderRadius: "15px", padding: "0 5px 0 5px", marginLeft: "10px", textAlign: "center"}}>{badgeCount}</div> : <div/>}
                </div>

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
    const [linkView, setLinkView] = useState(false);
    return linkView? <LinkToComponentView setLinkView={(e:any)=>setLinkView(e)} db={props.db} /> : <RegisterOrLinkView setLinkView={(e:any)=>setLinkView(e)} db={props.db} />
    
}

const RegisterOrLinkView = (props: {db: any, setLinkView: (any)=>any}) => {
    const {db} = props;
    const libraryIsEmpty = db.library === undefined || Object.keys(db.library).length === 0;
    const handleLinkViewClick = () => props.setLinkView(true);
    const handleRegisterComponent = async () => {
        await controller({func: 'init', data: {model: 'selection'}});
    };
    return(<div id="action-container">
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", width: "100%"}} className="action-container-content">
        <div style={{fontWeight: "bold", fontSize: "1.5em", padding: "5px"}}>No data to display</div>
        <div style={{padding: "5px"}}><Button onClick={handleRegisterComponent} style={{width: "180px"}}>Register as new element</Button></div>
        {!libraryIsEmpty && <div style={{padding: "5px"}}><Button onClick={handleLinkViewClick} style={{width: "180px"}}>Link to library element</Button></div>}
    </div>
</div>
)
}

const LinkToComponentView = (props: {db: any, setLinkView: (any) => any}) => {
    const {db, setLinkView} = props;
    const options = Object.keys(db.library).map((e:any) => ({label: db.library[e].label, value: e}));

    const handleLinkComponent = async () => {
        const e:any = document.getElementById("inspector-link-choose-origin");
        const selectedLabel = e.options[e.selectedIndex].value;
        await controller({func: 'init', data: {model: 'selection'}});
        await controller({func: 'write', data: {model: 'selection', key: 'link', value: selectedLabel}});
    }

    return(<div id="action-container">
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", width: "100%"}} className="action-container-content">
        <div style={{fontWeight: "bold", fontSize: "1.5em", padding: "5px"}}>Link To Library Element</div>

        <div style={{display: "flex", flexDirection: "column", alignItems: "center", marginTop: "10px"}}>
            <Select defaultValue={Object.keys(db.library)[0]} id={"inspector-link-choose-origin"} options={options} />
            <div style={{margin: "10px", display: "flex", flexDirection: "row"}}>
            <Button style={{ marginLeft: "5px", fontSize: "10px", height: "20px", lineHeight: "10px" }}  onClick={handleLinkComponent}>submit</Button>
            <Button style={{ marginLeft: "5px", fontSize: "10px", height: "20px", lineHeight: "10px" }} onClick={()=>setLinkView(false)} secondary>cancel</Button>
            </div>
        </div>
    </div>
</div>
)
}

export const Inspector = (props: {selectionData:any, db: any, readOnly: boolean}) => {
    const {selectionData, db, readOnly} = props;
    const label = selectionData?.label;
    const [conditionView, setConditionView] = useState("default");
    const sourceData =  selectionData?.link? selectionData.linkData : selectionData;
    const componentIsLinked = Boolean(selectionData?.link);
    return ((selectionData === undefined) || (selectionData.init === '' && readOnly)) ? <NoSelectionView/> : selectionData.init === ''? <NotRegisteredView db={db} /> : (
        <div id="action-container">
            <div style={{ justifyContent: "space-between" }} className="action-container-content">
                <div style={{ fontWeight: "bold", fontSize: "1.3em", display: "flex", alignItems: "center" }}>{label || ""}{conditionView === "default"? "" : ` / ${conditionView}`}
                {/* <IconLockLocked32/> */}
                </div>
                <div style={{ display: "flex" }}>
                    <div style={{ display: "flex", alignItems: "center"}}>
                     {componentIsLinked && <div style={{ padding: "3px", borderRadius: "4px", backgroundColor: "rgba(256, 256, 256, 0.2)", marginLeft: "5px" }}>{selectionData.linkData.label}</div>}
                    </div>
                    {!readOnly && <Menu marginLeft={"-15%"} onClick={(e) => console.log("TARGET:", e)} options={["delete?"]} trigger={<IconButton><IconEllipsis32 /></IconButton>} />}
                </div>
            </div>

            <div className="action-container-subcontainer">
                <div className="items-list">
                    <InspectorItem readOnly={readOnly} title="General" selectionData={sourceData} db={db} />
                    <InspectorItem readOnly={readOnly} disabled={componentIsLinked} title="Condition" selectionData={sourceData} db={db} currentView={setConditionView}/>
                    <InspectorItem readOnly={readOnly} disabled={componentIsLinked} title="Behaviors" selectionData={sourceData} db={db} />
                    <InspectorItem readOnly={readOnly} disabled={componentIsLinked} title="Notes" selectionData={sourceData} db={db} currentViewValue={conditionView}/>
                </div>
            </div>
        </div>
    )
}