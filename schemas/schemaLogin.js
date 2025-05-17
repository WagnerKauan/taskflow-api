import Joi from "joi"

export const schemaLogin = Joi.object({

    email: Joi.string().trim().email().required().messages({
        'string.empty': 'O email é obrigatório.',
        'string.email': 'Formato de email inválido.'
    }),

    password: Joi.string().trim().required().messages({
        'string,empty': 'A senha é obrigatória.',
    })
})