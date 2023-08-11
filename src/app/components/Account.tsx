import React from "react";

export const Account = () => {
   return ( 
    <div style={{display: "flex column"}}>
        <div style={{display: "flex", flexDirection: "row", width: "100%", padding: "15px"}}>
            <div style={{width: "25%", fontWeight: "bold"}} className="label">Tier</div>
            <div style={{width: "25%"}} className="label">Free</div>
        </div>
        <div style={{display: "flex", flexDirection: "row", width: "100%", padding: "15px"}}>
            <div style={{width: "25%", fontWeight: "bold"}} className="label">Key</div>
            <div style={{width: "25%"}} className="label">ASDKJ-2342-ASDLKJLJS-234</div>
        </div>
        <div style={{display: "flex", flexDirection: "row", width: "100%", padding: "15px"}}>
            <div style={{width: "25%", fontWeight: "bold"}} className="label">Email</div>
            <div style={{width: "25%"}} className="label">mark@aubry.ai</div>
        </div>
        <div style={{display: "flex", flexDirection: "row", width: "100%", padding: "15px"}}>
            <div style={{width: "25%", fontWeight: "bold"}} className="label">Billing</div>
            <div style={{width: "25%"}} className="label"><a>click here</a></div>
        </div>
      

    </div>
   )
}