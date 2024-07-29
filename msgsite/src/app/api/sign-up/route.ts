import dbConnect from "@/lib/dbConnect";
import UserModel from '../../../model/user';
import bcrypt from 'bcryptjs';
import sendverification from "@/helpers/sendverification";
import { request } from "http";
import VerificationEmail from "../../../../email/verificationemail";

export async function POST(req: Request) {
    await dbConnect();
    try{
       const {username,email,password}= await req.json();
       const existingUserVerifiedbyUsername=await UserModel
       .findOne({username, isVerified: true});

       if(existingUserVerifiedbyUsername){
        return Response.json({
            success: false,
            message: "Username already exists",
        },{
            status: 400})
    }
    const verifycode=Math.floor(100+Math.random()*1000000).toString();
        const existingUserVerifiedbyEmail=await UserModel
        .findOne({email, isVerified: true});
        if(existingUserVerifiedbyEmail){
           if(existingUserVerifiedbyEmail.isVerified){
               return Response.json({
                success: false,
                message: "Email already exists",
           },{status: 400})}
           else{
            const hashedPassword=await bcrypt.hash(password,10);
            existingUserVerifiedbyEmail.password=hashedPassword;
            existingUserVerifiedbyEmail.verifyCode=verifycode;
            existingUserVerifiedbyEmail.verifyCodeExpiry=new Date(Date.now()+3600000);
            await existingUserVerifiedbyEmail.save();
           }
}else{
    const hashedPassword=await bcrypt.hash(password,10);
    const expiryDate=new Date();
    expiryDate.setHours(expiryDate.getHours()+1);
const newuser=await new UserModel({
    username,
    email,
    password:hashedPassword,
    verifycode,
    verifyCodeExpiry:expiryDate,
    isVerified:false,
    isAcceptingMessages:true,
    messages:[]
})
await newuser.save();
const emailresponse=await sendverification(username,email,verifycode);
if(!emailresponse.success){
    return Response.json({
    success: true,
    message: "Sign up successful",
    data: newuser
})
}

//     const user=await UserModel.create({
//         username,
//         email,
//         password:hashedPassword
//     })
//     await sendverification(username,email,user.verifyCode);
//     return Response.json({
//         success: true,
//         message: "Sign up successful",
// })
}
}    catch(err){
        console.log("Error signing up",err);
        return Response.json({
            success: false,
            message: "Error signing up",
            error: err
        })
    }
}