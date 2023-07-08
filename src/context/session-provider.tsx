'use client'
import { SessionProvider } from "next-auth/react";
import { ReactNode } from 'react';

type props = {
    children : ReactNode,
}

export default function Session({children} : props) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

