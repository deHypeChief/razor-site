import { t } from 'elysia'

export const UserValidator = {
    create: {
        body: t.Object({
            profile: t.String(),
            username: t.String({ minLength: 3, maxLength: 50 }),
            email: t.String({ format: 'email' }),
            password: t.String({ minLength: 8 }),
            fullName: t.String(),
            phoneNumber: t.String(),
            bio: t.String(),
            gender: t.Enum({ male: 'male', female: 'female', other: 'other' }),
            dateOfBirth: t.String({ format: 'date' }),
        }),
        query: t.Object({
            role: t.Enum({ student: 'student', huttspoter: 'huttspoter', host: 'host' })
        }),
        detail: {
            tags: ['User']
        }
    },
    login: {
        body: t.Object({
            email: t.String({ format: 'email' }),
            password: t.String()
        }),
        detail: {
            tags: ['User']
        }
    },
    role: {
        detail: {
            tags: ['User']
        }
    }
}