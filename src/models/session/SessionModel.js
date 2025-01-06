import SessionSchema from './SessionSchema.js'

export const createSession = (sessionObj)=>{
    return SessionSchema(sessionObj).save()
}
export const deleteSession = (filter)=>{
    return SessionSchema.findOneAndDelete(filter)
}
