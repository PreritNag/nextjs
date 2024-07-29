import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";


const UsernameQuerySchema = z.object({
    username:usernameValidation
})

export async function POST(req: Request) {
    await dbConnect();
    try{
        const {searchParams}=new URL(req.url);
        const queryParam={
            username:searchParams.get("username")
        }
        //validate with zod
        const result=UsernameQuerySchema.safeParse(queryParam);
        console.log(result);
        if(!result.success){
            return Response.json({
                success: false,
                message: result.error.issues[0].message
            },{
                status: 400
            })
        }
        const {username}=result.data;
        const existingUser=await UserModel.findOne({username,isVerified:true});
        if(existingUser){
            return Response.json({
                success: false,
                message: "Username is already taken",
            },{
                status: 400
            })}
        return Response.json({
            success: true,
            message: "Username is available",
        },{
            status: 200
        })
    }
    catch(error){
        console.error(error);   
        return Response.json({
            success: false,
            message: "Internal Server Error",
        },
    {
        status: 500
    })
    }}