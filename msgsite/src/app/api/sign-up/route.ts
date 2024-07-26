import dbConnect from "@/lib/dbConnect";
import UserModel from '../../../model/user';
import bcrypt from 'bcryptjs';
import sendverification from "@/helpers/sendverification";
import { request } from "http";

export async function POST(req: Request) {
    await dbConnect();
    try{
       const {username,email,password}= await request.json();
       
    }
    catch(err){
        console.log("Error signing up",err);
        return Response.json({
            success: false,
            message: "Error signing up",
            error: err
        })
    }
}