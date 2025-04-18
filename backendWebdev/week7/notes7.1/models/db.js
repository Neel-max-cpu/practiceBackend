import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const User = new Schema({
    name:String,
    email:{type:String, unique:true},
    // pass :String
    hashedpass:String
});

const Todo = new Schema({
        // userId:ObjectId,
        userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'users' },      // using relationships --
        title:String,
        done:{type: Boolean, default:false},
        dueBy: Date         //optional --
    },
    {
    timestamp:true
})

export const UserModel = mongoose.model('users', User);
export const TodoModel = mongoose.model('todos', Todo);
