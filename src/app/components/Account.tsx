import React, {useState} from "react";
import { Button, LoadingIndicator } from "figma-ui-kit";

export const Account = (props: {user: any}) => {
    const {user} = props;
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState("");
    const {id_figma, status, trial_end, license_key} = user;

   return ( 
    <div style={{display: "flex column"}}>
        <div style={{display: "flex", flexDirection: "row", width: "100%", padding: "15px"}}>
            <div style={{width: "25%", fontWeight: "bold"}} className="label">Figma ID</div>
            <div style={{width: "25%"}} className="label">{id_figma}</div>
        </div>
        {/* <div style={{display: "flex", flexDirection: "row", width: "100%", padding: "15px"}}>
            <div style={{width: "25%", fontWeight: "bold"}} className="label">Email</div>
            <div style={{width: "25%"}} className="label">mark@aubry.ai</div>
        </div> */}
        <div style={{display: "flex", flexDirection: "row", width: "100%", padding: "15px"}}>
            <div style={{width: "25%", fontWeight: "bold"}} className="label">Status</div>
            <div style={{width: "25%"}} className="label">{status.split("-").join(" ")}</div>
        </div>
       {Boolean(license_key) && <div style={{display: "flex", flexDirection: "row", width: "100%", padding: "15px"}}>
            <div style={{width: "25%", fontWeight: "bold"}} className="label">Key</div>
            <div style={{width: "75%"}} className="label">{license_key}</div>
        </div>}
      
      
        {Boolean(!license_key) && <div style={{display: "flex", flexDirection: "column", width: "100%", padding: "15px"}}>
            <div style={{width: "25%", fontWeight: "bold"}} className="label">License Key</div>
            <div style={{width: "100%"}} ><input disabled={processing} className="text-input border-bottom" type="text"/></div>
            {Boolean(error) && <div style={{width: "100%", color: "#ff0d31"}}><p>{error}</p></div>}
            <div style={{marginTop: "10px"}}><Button disabled={processing} secondary style={{ fontSize: "10px", height: "20px", lineHeight: "10px" }}>Submit</Button></div>
        </div>}
      

    </div>
   )
}