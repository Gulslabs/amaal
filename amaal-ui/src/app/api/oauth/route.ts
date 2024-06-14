import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
// Redirected from Amall-Server
// https://github.com/vercel/next.js/discussions/48434 . **DONT INCLUDE sameSite while setting response.cookies.set*** 
export async function GET(request: NextRequest) {
  const urlParams = new URL(request.url).searchParams;
  const token = urlParams.get("token");  
  if (token) {
    const url = new URL('/amaal', new URL(request.url).origin);
    const response = NextResponse.redirect(url, {status: 302});
    response.cookies.set('token', token, {path: '/', httpOnly: true});      
    return response;
  } else {
    return new NextResponse("Missing token", { status: 400 });
  }
}
