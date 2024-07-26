import {Message} from "../model/user";
export interface ApiResponse {
    success: boolean;
    message: string;
    isAcceptingMessages?: boolean;
    messages?:Array<Message>; 
    data?: any;
    error?: any;
}