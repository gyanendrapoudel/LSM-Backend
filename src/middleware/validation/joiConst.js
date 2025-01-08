import Joi from 'joi'

export const FNAME = Joi.string().min(2)
export const LNAME = Joi.string()
export const PHONE = Joi.string()
export const EMAIL = Joi.string().email({ minDomainSegments: 2 })
export const PASSWORD = Joi.string()