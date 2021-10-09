import { Schema, model, connect } from 'mongoose';

interface User {
    name: string;
    email: string;
    avatar?: string;
    password: string;
    date: Date | undefined;
  }

const UserSchema = new Schema<User>({

    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }

})

const User = model('User', UserSchema);

export default User;