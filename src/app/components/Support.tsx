import React from "react";
import { Select } from "../util/ui/select";
import { Button } from "figma-ui-kit";

export const Support = (props: { user: any }) => {
   return (
      <div id="action-container">
         <div className="action-container-content">
            <div ><p><strong>Contact us.</strong> We want to hear from you.</p></div>
         </div>
         <div className="action-container-subcontainer">
            <Select style={{marginTop: "10px"}}  id={"support-category"} defaultValue={null} placeholder="Subject" options={["General", "Bug", "Feature Request"].map((opt: string) => ({ label: opt, value: opt }))} />
            <div style={{marginLeft: "5px", width: "97%", marginTop: "10px"}} ><input placeholder="Enter email address" className="text-input" type="text"/></div>
            <div style={{  marginTop: "10px",  display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
               <textarea maxLength={256} className="support-text" placeholder="Enter your message..." />
            </div>
            <div style={{marginLeft: "10px"}}>
            <Button secondary style={{ fontSize: "10px", height: "20px", lineHeight: "10px" }} >submit</Button>
            </div>
         </div>
      </div>
   )
}