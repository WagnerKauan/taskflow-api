import Joi from "joi"

export const schemaRegister = Joi.object({

    name: Joi.string().trim().replace(/ +/g, ' ').min(3).required().messages({
        'string.empty': 'O nome é obrigatório.',
        'string.min': 'O nome precisa pelo menos ter 3 caracteres.'
    }),

    email: Joi.string().trim().email().required().messages({
        'string.empty': 'O email é obrigatório.',
        'string.email': 'Formato de email inválido.'
    }),

    password: Joi.string().trim().min(6).required().messages({
        'string.empty': 'A senha é obrigatória.',
        'string.min': 'A senha deve ter no mínimo 6 caracteres.'
    })
})