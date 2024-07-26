import mongoose,{Schema,Document} from "mongoose";
export interface Message extends Document{
    content:string;
    createdAt:Date
}

const messageSchema: Schema<Message> = new Schema({
    content:{type:String,required:true},
    createdAt:{type:Date,default:Date.now}
})

export interface User extends Document{
    username:string;
    email:string;
    password:string;
    verifyCode:string;
    verifyCodeExpiry:Date;
    isVerified:boolean;
    isAcceptingMessages:boolean;
    messages:Message[];
}
const UserSchema: Schema<User> = new Schema({
    username:{type:String,required:[true,"Username is required"],unique:true},
    email:{type:String,required:[true,"Email is required"],unique:true},
    password:{type:String,required:[true,"Password is required"]},
    verifyCode:{type:String,required:true},
    verifyCodeExpiry:{type:Date,required:true},
    isVerified:{type:Boolean,default:false},
    isAcceptingMessages:{type:Boolean,default:true},
    messages:[messageSchema]
})

const UserModel=(mongoose.models.User as mongoose.Model<User>)||mongoose.model<User>("User",UserSchema)

export default UserModel;