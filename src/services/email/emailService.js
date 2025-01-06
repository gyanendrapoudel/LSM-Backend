import { transport } from "./transport.js";
import {
  userActivationEmailTemplate,
  userActivatedEmailTemplate,
} from './emailTemplate.js'

export const userActivationEmail =async (obj)=>{
    const info = await transport.sendMail(
        userActivationEmailTemplate(obj)
    )
    
    return info.messageId
}

export const userActivateEmail = async (obj) => {
  const info = await transport.sendMail(userActivatedEmailTemplate(obj))
  return info.messageId
}