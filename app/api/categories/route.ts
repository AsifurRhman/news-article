import prisma from '@/db/prismaDb';
import { NextResponse } from 'next/server'
import React from 'react'

export async function GET(request: Request) {
  try {
   
const categories=await prisma.category.findMany({})
return NextResponse.json(categories)
  } catch (error) {
    console.log(error);
    return NextResponse.json({message : "SomeThing Went Wrong !!"})
 }
}
