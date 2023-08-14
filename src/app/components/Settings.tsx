import React, { useState } from "react";

import { Submenu } from "../util/ui/submenu";
// Componenets
import { Support} from "./Support";
import { Account } from "./Account";

export const Settings = () => {
    const [currentView, setCurrentView] = useState("Account");
    const submenuClickHandler = (e) => setCurrentView(e);
    const view:any = {"Account": <Account />, "Support": <Support />}[currentView || "Account"];

    return (
        <div id="action-container">
            <div style={{padding: "15px"}} className="action-container-subnav items-border-bottom">
                <Submenu onClick={submenuClickHandler} options={["Account", 'Support']}/>
            </div>
            <div className="action-container-subcontainer"> 
                {view}
            </div> 
        </div>
    )
}