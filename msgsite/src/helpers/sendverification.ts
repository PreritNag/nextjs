import resend from "@/lib/resend";
import VerificationEmail from "../../email/verificationemail";

import { ApiResponse } from "../types/ApiResponse";

export default async function sendverification(
    username: string,
    email: string,
    otp: string
): Promise<ApiResponse> {
    try{
      await resend.emails.send({
        from:'onboarding@resend.dev',
        to:email,
        subject:'Verify your account',
        react:VerificationEmail({username,otp}),
      })  

        return {
            success: true,
            message: "Verification email sent",
            data: {
                username,
                email,
                otp
            }
        }
    }
    catch(err){
        console.log("Error sending verification email",err);
        return {
            success: false,
            message: "Error sending verification email",
            error: err
        }
    }
}