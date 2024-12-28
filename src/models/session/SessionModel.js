import SessionSchema from './SessionSchema.js'

export const createSession = (sessionObj)=>{
    return SessionSchema(sessionObj).save()
}