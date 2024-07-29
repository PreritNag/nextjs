'use client'
import { SessionProvider } from "next-auth/react"
import Component from '../app/(auth)/login/page';

export default function AuthProvider({children}: {children: React.ReactNode}) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
} 