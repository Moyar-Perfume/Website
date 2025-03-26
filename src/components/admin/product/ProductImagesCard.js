import React from "react";
import { Card, Form, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Image from "next/image";

// Hàm chuyển đổi file thành base64
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ProductImagesCard = ({
  fileList,
  setFileList,
  previewOpen,
  setPreviewOpen,
  previewImage,
  setPreviewImage,
  previewTitle,
  setPreviewTitle,
}) => {
  // Xử lý khi xem trước hình ảnh
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  // Xử lý khi thay đổi danh sách hình ảnh
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  // Xử lý khi đóng xem trước hình ảnh
  const handleCancel = () => setPreviewOpen(false);

  return (
    <>
      <Card title="Hình ảnh sản phẩm">
        <Form.Item name="images">
          <Upload
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            beforeUpload={() => false}
            multiple
            maxCount={8}
          >
            {fileList.length >= 8 ? null : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Tải lên</div>
              </div>
            )}
          </Upload>
        </Form.Item>
      </Card>

      {/* Modal xem trước hình ảnh */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 ${
          previewOpen ? "block" : "hidden"
        }`}
        onClick={handleCancel}
      >
        <div
          className="max-w-3xl max-h-[80vh] overflow-auto bg-white p-4 rounded-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-lg font-medium mb-2">{previewTitle}</h3>
          <img
            alt="preview"
            className="max-w-full max-h-[70vh] object-contain"
            src={previewImage}
          />
          <div className="mt-4 text-right">
            <button
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              onClick={handleCancel}
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductImagesCard;
