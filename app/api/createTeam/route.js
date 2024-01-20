import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
 
export async function GET() {
  const {userId} = auth();
  if(!userId){
    return new Response("Unauthorized", { status: 401 });
  }
  console.log(userId);
  return Response.json({userId: userId});
}