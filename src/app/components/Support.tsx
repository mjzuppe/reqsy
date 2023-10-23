import React, {useState} from "react";
import { Select } from "../util/ui/select";
import { Button } from "figma-ui-kit";
import { controller } from "../functions/utils";

export const Support = (props: { user: any }) => {
   const [category, setCategory] = useState("General");
   const [email, setEmail] = useState("");
   const [message, setMessage] = useState("");
   const [complete, setComplete] = useState(false);
   const [errors, setErrors] = useState([] as string[]);

   const handleSubmit = () => {
      const emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      let invalid = [];
      const validEmail = emailRegex.test(email);
      if (!validEmail) invalid = ["email"];
      if (message.length < 5) invalid = [...invalid, "message"];
      if (invalid.length > 0) return setErrors(invalid);
      controller({func: "support", data: {category, email, text:message}})
      setComplete(true);
   }  

   const Form =  <div className="action-container-subcontainer">
   <Select onChange={(e:any)=>{setCategory(e.currentTarget.value)}} style={{marginTop: "10px"}} id={"support-category"} defaultValue={"General"} placeholder="Subject" options={["General", "Bug", "Feature Request"].map((opt: string) => ({ label: opt, value: opt }))} />
   <div  style={{marginLeft: "5px", width: "97%", marginTop: "10px"}} ><input  onInput={(e:any)=>setEmail(e.currentTarget.value)} placeholder="Enter email address" className={`text-input${errors.includes('email')? " warning-border":""}`} type="email"/></div>
   <div style={{  marginTop: "10px",  display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <textarea onInput={(e:any)=>setMessage(e.currentTarget.value)} maxLength={256} className={`support-text${errors.includes('message')? " warning-border":""}`} placeholder="Enter your message..." />
   </div>
   <div style={{marginLeft: "10px"}}>
   <Button onClick={handleSubmit} secondary style={{ fontSize: "10px", height: "20px", lineHeight: "10px" }} >submit</Button>
   </div>
</div>

   const Complete = <div style={{margin: "10px"}} className="action-container-subcontainer">
      <div><h2>Message Sent</h2></div>
      <div><p>We'll be in touch.</p></div>
   </div>

   return (
      <div id="action-container">
         <div className="action-container-content">
            <div ><p><strong>Contact us.</strong> We want to hear from you.</p></div>
         </div>
         {complete? Complete : Form}
      </div>
   )
}