"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Form,
  Input,
  Button,
  message,
  Upload,
  Switch,
  Space,
  Card,
  InputNumber,
  Divider,
  Select,
  Tabs,
  Tag,
  Menu,
  Slider,
} from "antd";
import {
  PlusOutlined,
  MinusCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import api from "@/constants/apiURL";
import slugify from "slugify";
import Image from "next/image";
import BasicInfoCard from "@/components/admin/product/BasicInfoCard";
import ProductImagesCard from "@/components/admin/product/ProductImagesCard";
import ProductTagsCard from "@/components/admin/product/ProductTagsCard";

const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

// Hàm chuyển đổi file thành base64
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function AddProduct() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  // State cho các tag tùy chỉnh
  const [customTags, setCustomTags] = useState({
    nongdo: [],
    mua: [],
    gioitinh: [],
    toahuong: [],
    doluumui: [],
    muihuong: [],
    notehuong: [],
    phongcach: [],
    dotuoi: [],
    shadow: [],
    khuyendung: [],
    thoigian: [],
  });

  // State cho input tag mới
  const [newTagText, setNewTagText] = useState("");
  const [activeTabKey, setActiveTabKey] = useState("nongdo");

  // Danh sách tag được nhóm theo loại (chỉ những tag cố định)
  const fixedTagGroups = {
    nongdo: [
      { value: "nongdo_Eau de Cologne (EDC)", label: "Eau de Cologne (EDC)" },
      { value: "nongdo_Eau de Parfum (EDP)", label: "Eau de Parfum (EDP)" },
      { value: "nongdo_Eau de Toilette (EDT)", label: "Eau de Toilette (EDT)" },
      {
        value: "nongdo_Parfum ( Extrait de Parfum)",
        label: "Parfum (Extrait de Parfum)",
      },
    ],
    mua: [
      { value: "mua_Mùa Xuân", label: "Mùa Xuân" },
      { value: "mua_Mùa Hè", label: "Mùa Hè" },
      { value: "mua_Mùa Thu", label: "Mùa Thu" },
      { value: "mua_Mùa Đông", label: "Mùa Đông" },
    ],
    gioitinh: [
      { value: "gioitinh_Nước Hoa Nam", label: "Nước Hoa Nam" },
      { value: "gioitinh_Nước Hoa Nữ", label: "Nước Hoa Nữ" },
      { value: "gioitinh_Nước Hoa Unisex", label: "Nước Hoa Unisex" },
    ],
    muihuong: [
      { value: "muihuong_Ambery", label: "Ambery" },
      { value: "muihuong_Aromatic Fougere", label: "Aromatic Fougere" },
      { value: "muihuong_Chypre", label: "Chypre" },
      { value: "muihuong_Citrus", label: "Citrus" },
      { value: "muihuong_Floral", label: "Floral" },
      { value: "muihuong_Leather", label: "Leather" },
      { value: "muihuong_Woody", label: "Woody" },
    ],
    notehuong: [
      { value: "notehuong_Spicy", label: "Spicy" },
      { value: "notehuong_Chypre", label: "Chypre" },
      { value: "notehuong_Tobacco", label: "Tobacco" },
      { value: "notehuong_Gourmand", label: "Gourmand" },
      { value: "notehuong_Ambery (Oriental)", label: "Ambery (Oriental)" },
      { value: "notehuong_Leather", label: "Leather" },
      { value: "notehuong_Musk Skin", label: "Musk Skin" },
      { value: "notehuong_Citrus", label: "Citrus" },
      { value: "notehuong_Green", label: "Green" },
      { value: "notehuong_Watery", label: "Watery" },
      { value: "notehuong_Aromatic Fougere", label: "Aromatic Fougere" },
      { value: "notehuong_Aldehydic", label: "Aldehydic" },
      { value: "notehuong_Floral", label: "Floral" },
      { value: "notehuong_Fruity", label: "Fruity" },
    ],
    doluumui: [
      { value: "doluumui_3", label: "Vừa" },
      { value: "doluumui_6", label: "Lâu" },
      { value: "doluumui_8", label: "Tốt" },
      { value: "doluumui_10", label: "Rất Tốt" },
    ],
    toahuong: [
      { value: "toahuong_Gần", label: "Gần" },
      { value: "toahuong_Vừa", label: "Vừa" },
      { value: "toahuong_Xa", label: "Xa" },
    ],
    shadow: [],
    khuyendung: [],
    thoigian: [],
  };

  // State để quản lý tags đã chọn và hiển thị debug
  const [selectedTags, setSelectedTags] = useState([]);

  // Thêm state cho các loại tag mới
  const [shadowValues, setShadowValues] = useState({
    r: 0,
    g: 0,
    b: 0,
    inputValue: "",
  });
  const [khuyendungValues, setKhuyendungValues] = useState({
    xuan: 0,
    ha: 0,
    thu: 0,
    dong: 0,
  });
  const [thoigianValues, setThoigianValues] = useState({ ngay: 0, dem: 0 });

  // Thêm state và ref để quản lý vị trí fixed
  const [isTagsFixed, setIsTagsFixed] = useState(false);
  const [isTagsCollapsed, setIsTagsCollapsed] = useState(false);
  const tagsProductRef = useRef(null);
  const selectedTagsRef = useRef(null);

  // Tạo useEffect riêng để xử lý việc đặt lại isTagsCollapsed khi không fixed nữa
  useEffect(() => {
    // Khi isTagsFixed chuyển từ true sang false, đặt lại isTagsCollapsed = false
    if (!isTagsFixed && isTagsCollapsed) {
      setIsTagsCollapsed(false);
    }
  }, [isTagsFixed, isTagsCollapsed]);

  // UseEffect xử lý scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!tagsProductRef.current || !selectedTagsRef.current) return;

      const tagsProductRect = tagsProductRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;

      // Kiểm tra nếu đã scroll qua phần Tags sản phẩm
      if (tagsProductRect.bottom < 0) {
        setIsTagsFixed(false);
        return;
      }

      // Kiểm tra nếu đã scroll xuống đủ xa để fixed
      if (scrollY > 300) {
        // Điều chỉnh giá trị này tùy theo layout thực tế
        setIsTagsFixed(true);
      } else {
        setIsTagsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Không thêm isTagsCollapsed vào dependencies ở đây

  // Hàm kiểm tra màu tối hay sáng để chọn màu chữ phù hợp
  const isDarkColor = (r, g, b) => {
    return r * 0.299 + g * 0.587 + b * 0.114 < 128;
  };

  // Hàm thêm tag shadow
  const handleAddShadowTag = () => {
    const { r, g, b } = shadowValues;
    const tagValue = `shadow_${r} ${g} ${b}`;

    // Kiểm tra xem tag đã tồn tại chưa
    const currentTags = form.getFieldValue("tags") || [];
    if (currentTags.includes(tagValue)) {
      message.warning("Màu này đã được thêm!");
      return;
    }

    // Thêm vào form
    const newTags = [...currentTags, tagValue];
    form.setFieldsValue({ tags: newTags });
    setSelectedTags(newTags);

    // Reset giá trị của input sau khi thêm thành công
    setShadowValues((prev) => ({
      ...prev,
      inputValue: "", // Chỉ xóa inputValue, giữ lại giá trị r,g,b
    }));
  };

  // Xử lý khi submit form
  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      // Tạo slug từ tên sản phẩm
      const slug = slugify(values.name, { lower: true });

      // Chuẩn bị dữ liệu để gửi lên server
      const productData = {
        name: values.name,
        slug: slug,
        tag: values.tags ? values.tags.join(",") : "",
        available: values.available,
        variants: values.variants || [],
      };

      // Thêm hình ảnh nếu có
      if (fileList.length > 0) {
        const imagePromises = fileList.map(async (file) => {
          if (file.originFileObj) {
            return await getBase64(file.originFileObj);
          }
          return null;
        });

        const images = await Promise.all(imagePromises);
        productData.images = images.filter(Boolean);
      }

      // Gọi API để tạo sản phẩm mới
      const response = await api.post("/products", productData);

      message.success("Thêm sản phẩm thành công!");
      form.resetFields();
      setFileList([]);
      setCustomTags({
        nongdo: [],
        mua: [],
        gioitinh: [],
        muihuong: [],
        doluumui: [],
        notehuong: [],
        phongcach: [],
        dotuoi: [],
        toahuong: [],
        phathanh: [],
      });

      // Chuyển hướng về trang quản lý sản phẩm sau khi thêm thành công
      router.push("/admin/manage-product");
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
      setFileList([]);
      setCustomTags({
        nongdo: [],
        mua: [],
        gioitinh: [],
        muihuong: [],
        doluumui: [],
        notehuong: [],
        phongcach: [],
        dotuoi: [],
        toahuong: [],
        phathanh: [],
      });

      // Chuyển hướng về trang quản lý sản phẩm sau khi thêm thành công
      router.push("/admin/manage-product");
    } finally {
      setLoading(false);
    }
  };

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

  // Xử lý khi quay lại trang quản lý sản phẩm
  const handleBack = () => {
    router.push("/admin/manage-product");
  };

  // Hàm để lấy tags cho một nhóm cụ thể
  const getTagsForGroup = (groupKey) => {
    // Kết hợp tags cố định và tùy chỉnh
    const fixedOptions = fixedTagGroups[groupKey] || [];
    const customOptions = customTags[groupKey].map((tag) => ({
      value: `${groupKey}_${tag}`,
      label: tag,
    }));

    return [...fixedOptions, ...customOptions];
  };

  // Cập nhật hàm thêm tag tùy chỉnh để hỗ trợ thêm tag cho nhóm cụ thể
  const handleAddCustomTag = (groupKey = activeTabKey) => {
    if (!newTagText.trim()) {
      message.warning("Vui lòng nhập nội dung tag!");
      return;
    }

    // Tạo tag mới với prefix là groupKey
    const newTag = `${groupKey}_${newTagText.trim()}`;

    // Kiểm tra xem tag đã tồn tại chưa
    const currentTags = form.getFieldValue("tags") || [];
    if (currentTags.includes(newTag)) {
      message.warning("Tag này đã tồn tại!");
      return;
    }

    // Thêm vào danh sách tag tùy chỉnh
    setCustomTags((prev) => ({
      ...prev,
      [groupKey]: [...prev[groupKey], newTagText.trim()],
    }));

    // Thêm vào form
    form.setFieldsValue({
      tags: [...currentTags, newTag],
    });

    // Cập nhật selectedTags
    setSelectedTags([...currentTags, newTag]);

    // Reset input
    setNewTagText("");
  };

  // Hàm chuyển đổi key nhóm thành label hiển thị
  function getTabLabel(groupKey) {
    const labelMap = {
      nongdo: "Nồng độ",
      mua: "Mùa",
      gioitinh: "Giới tính",
      notehuong: "Note Hương",
      muihuong: "Mùi hương",
      phongcach: "Phong cách",
      dotuoi: "Độ tuổi",
      toahuong: "Tỏa hương",
      doluumui: "Độ lưu mùi",
      phathanh: "Phát hành",
      shadow: "Màu sắc",
      khuyendung: "Khuyên dùng",
      thoigian: "Thời gian",
    };

    return labelMap[groupKey] || groupKey;
  }

  // Hàm để lấy màu cho tag
  function getTagColor(groupKey) {
    const colorMap = {
      nongdo: "blue",
      mua: "green",
      gioitinh: "purple",
      muihuong: "red",
      notehuong: "orange",
      doluumui: "cyan",
      toahuong: "magenta",
      shadow: "purple",
      khuyendung: "volcano",
      thoigian: "geekblue",
    };

    return colorMap[groupKey] || "default";
  }

  // Thêm hàm parseColorInput vào component
  const parseColorInput = (value, addTag = false) => {
    // Kiểm tra định dạng RGB: rgb(R, G, B)
    const rgbRegex = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/i;
    // Kiểm tra định dạng R, G, B
    const numbersRegex = /^(\d+),\s*(\d+),\s*(\d+)$/;
    // Kiểm tra định dạng HEX: #RRGGBB hoặc RRGGBB
    const hexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
    // Kiểm tra định dạng HEX rút gọn: #RGB hoặc RGB
    const shortHexRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

    let r, g, b;
    let match;

    // Thử phân tích theo định dạng RGB
    match = value.match(rgbRegex);
    if (match) {
      r = parseInt(match[1], 10);
      g = parseInt(match[2], 10);
      b = parseInt(match[3], 10);
    }
    // Thử phân tích theo định dạng R, G, B
    else if ((match = value.match(numbersRegex))) {
      r = parseInt(match[1], 10);
      g = parseInt(match[2], 10);
      b = parseInt(match[3], 10);
    }
    // Thử phân tích theo định dạng HEX
    else if ((match = value.match(hexRegex))) {
      r = parseInt(match[1], 16);
      g = parseInt(match[2], 16);
      b = parseInt(match[3], 16);
    }
    // Thử phân tích theo định dạng HEX rút gọn
    else if ((match = value.match(shortHexRegex))) {
      r = parseInt(match[1] + match[1], 16);
      g = parseInt(match[2] + match[2], 16);
      b = parseInt(match[3] + match[3], 16);
    }

    // Nếu phân tích thành công
    if (r !== undefined && g !== undefined && b !== undefined) {
      // Kiểm tra phạm vi hợp lệ
      if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
        // Cập nhật state (giữ nguyên inputValue)
        setShadowValues((prevState) => ({
          ...prevState,
          r,
          g,
          b,
        }));

        // Nếu yêu cầu thêm tag
        if (addTag) {
          const tagValue = `shadow_${r} ${g} ${b}`;
          const currentTags = form.getFieldValue("tags") || [];

          if (!currentTags.includes(tagValue)) {
            // Thêm vào form
            const newTags = [...currentTags, tagValue];
            form.setFieldsValue({ tags: newTags });
            setSelectedTags(newTags);
            message.success("Đã thêm màu mới");

            // Nếu thêm tag thành công thì mới xóa giá trị input
            setShadowValues((prevState) => ({
              ...prevState,
              inputValue: "",
            }));
          } else {
            message.warning("Màu này đã được thêm!");
          }
        }

        return true;
      } else {
        if (addTag) {
          message.error("Giá trị RGB phải nằm trong khoảng 0-255");
        }
      }
    } else if (addTag) {
      message.error(
        "Định dạng không hợp lệ. Sử dụng: rgb(R,G,B) hoặc #RRGGBB hoặc R,G,B"
      );
    }

    return false;
  };

  return (
    <div className="bg-white shadow-md p-6 w-full min-h-[calc(100vh-70px)]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Thêm sản phẩm mới</h1>
        <Button onClick={handleBack}>Quay lại</Button>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          available: true,
          variants: [{ capacity: "", price: 0, quantity: 0, available: true }],
        }}
      >
        {/* Thông tin cơ bản và Hình ảnh */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Thông tin cơ bản */}
          <BasicInfoCard form={form} />

          {/* Hình ảnh sản phẩm */}
          <ProductImagesCard
            fileList={fileList}
            setFileList={setFileList}
            previewOpen={previewOpen}
            setPreviewOpen={setPreviewOpen}
            previewImage={previewImage}
            setPreviewImage={setPreviewImage}
            previewTitle={previewTitle}
            setPreviewTitle={setPreviewTitle}
          />
        </div>

        {/* Tags sản phẩm */}
        <ProductTagsCard
          form={form}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          customTags={customTags}
          setCustomTags={setCustomTags}
        />

        {/* Biến thể sản phẩm */}
        <Card title="Biến thể sản phẩm" className="mb-6">
          <Form.List name="variants">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key} className="mb-4">
                    <div className="flex items-center mb-2">
                      <h4 className="text-base font-medium">
                        Biến thể #{name + 1}
                      </h4>
                      {fields.length > 1 && (
                        <MinusCircleOutlined
                          className="ml-2 text-red-500 cursor-pointer"
                          onClick={() => remove(name)}
                        />
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <Form.Item
                        {...restField}
                        name={[name, "capacity"]}
                        label="Dung tích"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập dung tích!",
                          },
                        ]}
                      >
                        <Input placeholder="Ví dụ: 50ml, 100ml" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "price"]}
                        label="Giá"
                        rules={[
                          { required: true, message: "Vui lòng nhập giá!" },
                        ]}
                      >
                        <InputNumber
                          min={0}
                          placeholder="Giá"
                          style={{ width: "100%" }}
                          formatter={(value) =>
                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          }
                          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "quantity"]}
                        label="Số lượng"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập số lượng!",
                          },
                        ]}
                      >
                        <InputNumber
                          min={0}
                          placeholder="Số lượng"
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "available"]}
                        label="Trạng thái biến thể"
                        valuePropName="checked"
                      >
                        <Switch
                          checkedChildren="Có sẵn"
                          unCheckedChildren="Hết hàng"
                        />
                      </Form.Item>
                    </div>
                    {fields.length > 1 && <Divider />}
                  </div>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Thêm biến thể
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Card>

        {/* Nút submit */}
        <div className="flex justify-end">
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Thêm sản phẩm
          </Button>
        </div>
      </Form>
    </div>
  );
}
