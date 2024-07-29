import 'next-auth'

declare module 'next-auth' {
    interface User{
        _id?:string;
        isVerified?:boolean;
        isAcceptingMessages?:boolean;
        messages?:Message[]
        username?:string
    }
    interface Session{
        user:{
            _id?:string;
            isVerified?:boolean;
            isAcceptingMessages?:boolean;
            messages?:Message[]
            username?:string
        }&DefaultSession['user']
    }
}

declare module 'next-auth/jwt' {
    interface JWT{
        _id?:string;
        isVerified?:boolean;
        isAcceptingMessages?:boolean;
        messages?:Message[]
        username?:string
    }
}