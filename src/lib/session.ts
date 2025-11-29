// 'use server'
"use client";

// import { cookies } from 'next/headers'
// import { SessionPayload } from './definitions'

// type Type = 'USER' | 'VERIFICATION'
 
// export async function createSession(type: Type, payload: SessionPayload) {
//   let expiresAt
//   if(type === 'USER'){
//     expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
//   }else if(type === 'VERIFICATION'){
//     expiresAt = new Date(Date.now() + 60 * 60 * 1000)
//   }
 
//   // 3. Store the session in cookies for optimistic auth checks
//   const cookieStore = await cookies()
//   cookieStore.set( `exserc-${type.toLowerCase()}`, JSON.stringify(payload), {
//     httpOnly: true,
//     secure: true,
//     expires: expiresAt,
//     sameSite: 'lax',
//     path: '/',
//   })
// }

// export async function getSession(type: Type) {
//   const cookieStore = await cookies()
//   const session = cookieStore.get(`exserc-${type.toLowerCase()}`)
//   if (!session) return null
//   return JSON.parse(session?.value) as SessionPayload
// }

// export async function updateSession(type: Type, payload: Partial<SessionPayload>) {
//   const session = await getSession(type)
//   if (!session) return
//   createSession(type, { ...session, ...payload })
  
// }

// export async function deleteSession(type: Type) {
//   const cookieStore = await cookies()
//     cookieStore.delete(`exserc-${type.toLowerCase()}`)
// }


type Type = "USER" | "VERIFICATION";

export type SessionPayload = {
  [key: string]: any;
};

function getExpiry(type: Type) {
  if (type === "USER") {
    // 7 days
    return Date.now() + 7 * 24 * 60 * 60 * 1000;
  } else if (type === "VERIFICATION") {
    // 1 hour
    return Date.now() + 60 * 60 * 1000;
  }
  return null;
}

export function createSession(type: Type, payload: SessionPayload) {
  const expiry = getExpiry(type);
  const sessionData = {
    ...payload,
    expiry,
  };
  localStorage.setItem(
    `exserc-${type.toLowerCase()}`,
    JSON.stringify(sessionData)
  );
}

export function getSession(type: Type): SessionPayload | null {
  const raw = localStorage.getItem(`exserc-${type.toLowerCase()}`);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    if (parsed.expiry && Date.now() > parsed.expiry) {
      // session expired → clean up
      deleteSession(type);
      return null;
    }
    return parsed;
  } catch (e) {
    console.error("Failed to parse session:", e);
    return null;
  }
}

export function updateSession(type: Type, payload: Partial<SessionPayload>) {
  const session = getSession(type);
  if (!session) return;
  createSession(type, { ...session, ...payload });
}

export function deleteSession(type: Type) {
  localStorage.removeItem(`exserc-${type.toLowerCase()}`);
}