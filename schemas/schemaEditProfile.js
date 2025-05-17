import Joi from "joi"

export const schemaEditProfile = Joi.object({

    name: Joi.string().trim().replace(/ +/g, ' ').min(3).messages({
        'string.min': 'O nome precisa pelo menos ter 3 caracteres.'
    }),

    email: Joi.string().trim().email().messages({
        'string.email': 'Formato de email inválido.'
    }),

    oldPassword: Joi.string().trim().min(6).messages({
        'string.min': 'A senha deve ter no mínimo 6 caracteres.'
    }),

    newPassword: Joi.string().trim().min(6).messages({
        'string.min': 'A senha deve ter no mínimo 6 caracteres.'
    })
}) // exige que pelo menos um dos campos esteja presente
    .or('name', 'email', 'oldPassword', 'newPassword')
    // se um for enviado, o outro também deve
    .with('oldPassword', 'newPassword')
    .with('newPassword', 'oldPassword')
    .error(errors => {
        errors.forEach(err => {
            // Verifica se a chave e o contexto existem antes de tentar acessar
            if (err.context && err.context.key) {
                if (err.code === 'object.missing') {
                    err.message = 'Pelo menos um dos campos precisa ser enviado.'
                }

                if (err.code === 'object.with') {
                    if (err.context.key === 'oldPassword') {
                        err.message = 'Para trocar a senha, informe também a nova senha.'
                    }

                    if (err.context.key === 'newPassword') {
                        err.message = 'Para trocar a senha, informe a senha atual.'
                    }
                }
            }
        })
        return errors
    })