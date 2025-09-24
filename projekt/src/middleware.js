import { NextResponse } from "next/server"

export default function middleware(request){
     let token = request.cookies.has('sh_token')
      let userId = request.cookies.has('user_id')
      if( !token || !userId){
     return NextResponse.redirect(new URL('/', request.url))}
    
}

export const config = {
    matcher: "/profile/:path*"
}