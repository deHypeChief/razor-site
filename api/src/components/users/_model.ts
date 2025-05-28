import mongoose from 'mongoose';

export interface IUser {
    sessionClientId: mongoose.Types.ObjectId;
    phoneNumber?: string;
    dateOfBirth?: Date;
    username: string;
    bio: string;
    gender: "male" | "female" | "other";
    personalInfo: {
        locationInfo: {
            country: string;
            state: string;
            fullAddress: string;
        };
        schoolInfo: {
            school: string;
            schoolLocation: string;
            department: string;
            faculty: string;
        };
    };
    favouriteSpaces: mongoose.Types.ObjectId[]
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
    bio: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: true,
    },
    favouriteSpaces: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Space',
    }],
    personalInfo: {
        locationInfo: {
            country: {
                type: String,
                default: ""
            },
            state: {
                type: String,
            },
            address1: {
                type: String,
                default: ""
            },
            address2: {
                type: String,
                default: ""
            },
            zipCode: {
                type: String,
                default: ""
            }
        },
        schoolInfo: {
            school: {
                type: String,
                default: ""
            },
            schoolLocation: {
                type: String,
                default: ""
            },
            department: {
                type: String,
                default: ""
            },
            faculty: {
                type: String,
                default: ""
            },
        }
    }
}, { timestamps: true });

export const User = mongoose.model<IUser>('User', userSchema);
