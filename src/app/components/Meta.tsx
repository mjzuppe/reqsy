import React, { useState } from "react";
import { Submenu } from "../util/ui/submenu";
import { SearchTextbox } from "figma-ui-kit";
// Componenets
import { Tags } from "./Tags";
import { Variables } from "./Variables";

export const Meta = () => {
    const [currentView, setCurrentView] = useState("Variables");
    const submenuClickHandler = (e) => setCurrentView(e);
    const view:any = {"Tags": <Tags />, "Variables": <Variables />}[currentView || "Tags"];

    return (
        <div id="action-container">
             <div className="action-container-content">
                <p><strong>Meta.</strong> Do more things like this.</p>
            </div>
            <div className="action-container-subnav">
                <Submenu onClick={submenuClickHandler} options={["Tags", 'Variables']}/>
            </div>
            <div className="action-container-search">
                <SearchTextbox value={""} placeholder="search names" />
            </div>
            <div className="action-container-subcontainer"> 
                {view}
            </div> 
        </div>
    )
}