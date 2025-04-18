import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const User = new Schema({
    name:String,
    email:{type:String, unique:true},
    pass :String
});

const Todo = new Schema({
    userId:ObjectId,
    title:String,
    done:{type: Boolean, default:false},
})

export const UserModel = mongoose.model('users', User);
export const TodoModel = mongoose.model('todos', Todo);
