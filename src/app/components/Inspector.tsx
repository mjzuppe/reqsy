import React, {useState} from "react";
import { IconPlus32, IconMinus32, IconToggleButton } from "figma-ui-kit";
// components
import { Template } from "./Template";
import { References } from "./References";
import { Condition } from "./Condition";
import { Value } from "./Value";
import { Notes } from "./Notes";


const InspectorItem = (props) => {
    const {title} = props;
    const [expanded, setExpanded] = useState(false);
    const clickHandler = () => setExpanded(!expanded);
    const view = {"Template":<Template/>, "References": <References/>, "Condition": <Condition/>, "Value":<Value/>, "Notes": <Notes/>}[title || "Template"]
    return(
        <div className={`items-list-item ${title !== 'Notes' && "items-border-bottom"}`}>
                        <div className="items-list-item-alwaysdisplay">
                            <div className="label">{title}</div>

                            {
                                !expanded?
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
    return(
        <div id="action-container">
            <div className="action-container-content">
                <p><strong>Inspector.</strong> Do more things like this.</p>
            </div>
            <div className="action-container-subcontainer">
                <div className="items-list">
                    <InspectorItem title="Template"  />
                    <InspectorItem title="Condition"  />
                    <InspectorItem title="Value"  />
                    <InspectorItem title="References"  />
                    <InspectorItem title="Notes"  />
                </div>
            </div>
        </div>
    )
}