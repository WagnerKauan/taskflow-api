import Joi from "joi";

export const schemaEditTask = Joi.object({
    title: Joi.string().trim().min(3).replace(/ +/g, ' ').max(80).messages({
        'string.min': 'O título deve ter no mínimo 3 caracteres.',
        'string.max': 'O título deve ter no máximo 80 caracteres.'
    }),

    description: Joi.string().trim().replace(/ +/g, ' ').min(10).max(500).messages({
        'string.min': 'A descrição precisa ter no mínimo 10 caracteres.',
        'string.max': 'A descrição deve ter no máximo 500 caracteres.',
    }),

    status: Joi.string().valid('pendente','em andamento','concluída').required().messages({
        'any.only': 'O status deve ser "pendente", "em andamento" ou "concluída".',
        'string.empty': 'O status é obrigatório.'
    }),
})