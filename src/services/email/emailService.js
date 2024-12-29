import { transport } from "./transport.js";
import { userActivationEmailTemplate } from "./emailTemplate.js";

export const userActivationEmail =async (obj)=>{
    const info = await transport.sendMail(
        userActivationEmailTemplate(obj)
    )
    
    return info.messageId
}