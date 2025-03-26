import { NextResponse } from "next/server";
import { connectDB } from "@/libs/mongoDB";

import cloudinary from "@/libs/cloudinary";
import Brand from "@/models/Brand";
import slugify from "slugify";

export async function GET() {
  await connectDB();
  try {
    const brands = await Brand.find();
    return NextResponse.json(brands, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Lỗi khi lấy danh sách brand" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  await connectDB();
  try {
    const { name, logo, description } = await req.json();

    const slug = slugify(name, { lower: true, strict: true });

    let existingBrandBySlug = await Brand.findOne({ slug });
    if (existingBrandBySlug) {
      return Response.json({ error: "Brand đã tồn tại !!!" }, { status: 400 });
    }

    const uploadResponse = await cloudinary.v2.uploader.upload(logo, {
      transformation: [{ width: 100, height: 100, crop: "limit" }],
      folder: "brands",
      public_id: slug,
      use_filename: true,
    });

    const newBrand = await Brand.create({
      name,
      logo: uploadResponse.secure_url,
      slug: slug,
      description: description,
    });

    return NextResponse.json(newBrand, { status: 201 });
  } catch (error) {
    console.error("Lỗi tạo brand:", error);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
