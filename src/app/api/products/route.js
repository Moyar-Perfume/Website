import { connectDB } from "@/libs/mongoDB";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  try {
    const products = await Product.find();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Lỗi khi lấy danh sách brand" },
      { status: 500 }
    );
  }
}
