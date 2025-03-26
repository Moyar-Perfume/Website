import { NextResponse } from "next/server";
import Brand from "@/models/Brand";
import mongoose from "mongoose";
import { connectDB } from "@/libs/mongoDB";
import cloudinary from "@/libs/cloudinary";
import { deleteCloudinaryImage } from "@/libs/cloudinary";
import { getPublicIdFromUrl } from "@/utils/formatter";
import Product from "@/models/Product";

// Xử lý yêu cầu DELETE
export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "ID không hợp lệ!" }, { status: 400 });
    }

    // Tìm thương hiệu trước khi xóa để lấy URL logo
    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { error: "Không tìm thấy thương hiệu!" },
        { status: 404 }
      );
    }

    // Lấy public_id từ URL logo
    if (product.logo) {
      const publicId = getPublicIdFromUrl(product.logo);

      if (publicId) {
        try {
          // Xóa hình ảnh từ Cloudinary
          console.log("Deleting image with public ID:", publicId);
          const cloudinaryResult = await deleteCloudinaryImage(publicId);
          console.log("Cloudinary delete result:", cloudinaryResult);
        } catch (cloudinaryError) {
          console.error(
            "Error deleting image from Cloudinary:",
            cloudinaryError
          );
          // Tiếp tục xóa brand ngay cả khi xóa ảnh thất bại
        }
      }
    }

    // Xóa thương hiệu
    const deletedProduct = await Product.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Đã xóa thương hiệu và hình ảnh thành công",
      deletedProduct,
    });
  } catch (error) {
    console.error("Error deleting brand:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
