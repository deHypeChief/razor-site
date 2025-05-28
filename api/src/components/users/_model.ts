import mongoose from 'mongoose';

export interface IUser {
    sessionClientId: mongoose.Types.ObjectId;
    phoneNumber?: string;
    dateOfBirth?: Date;
    username: string;
    gender: "male" | "female" | "other";
}

const userSchema = new mongoose.Schema<IUser>({
    sessionClientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SessionClient',
    },
    username: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
    },
    dateOfBirth: {
        type: Date,
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: true,
    }
}, { timestamps: true });

export const User = mongoose.model<IUser>('User', userSchema);
