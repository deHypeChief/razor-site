import { t } from 'elysia'

export const AdminValidator = {
    create: {
        body: t.Object({
            email: t.String({ format: 'email' }),
            password: t.String({ minLength: 6, error: "Password should be 6 characters max." }),
            fullName: t.String()
        }),
        detail: {
            tags: ['Admin']
        }
    },
    login: {
        body: t.Object({
            email: t.String({ format: 'email' }),
            password: t.String()
        }),
        detail: {
            tags: ['Admin']
        }
    }
}