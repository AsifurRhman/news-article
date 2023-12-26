import prisma from "@/db/prismaDb";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { categoryName: string } }
  ) {
    try {
      const categoryName = params.categoryName;
      const posts = await prisma.category.findUnique({
        where: { categoryName },
        include: {
          posts: { include: { author: true }, orderBy: { createdAt: "desc" } },
        },
      });
  
      return NextResponse.json(posts);
    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: "Could not fetch post" });
    }
  }
  