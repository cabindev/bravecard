import { type NextRequest } from 'next/server';
import { writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const title = formData.get('title') as string;
  const message = formData.get('message') as string;
  const image = formData.get('image') as File | null;

  let imageName: string | null = null;

  if (image) {
    const byteLength = await image.arrayBuffer();
    const bufferData = Buffer.from(byteLength);

    const timestamp = new Date().getTime();
    const fileExtension = path.extname(image.name);
    const fileName = `${timestamp}${fileExtension}`;
    const pathOfImage = `./public/braveCards/${fileName}`;
    imageName = fileName;

    await writeFile(pathOfImage, bufferData);
  }

  try {
    const newCard = await prisma.card.create({
      data: {
        title,
        message,
        imageName: imageName || '',
      },
    });

    // Revalidate the path to ensure the new card is immediately visible
    revalidatePath('/');

    return NextResponse.json(newCard);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}