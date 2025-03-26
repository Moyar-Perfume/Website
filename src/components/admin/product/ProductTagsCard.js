import React, { useState, useRef, useEffect } from "react";
import {
  Card,
  Tag,
  Input,
  Button,
  Select,
  Slider,
  message,
  Form,
  Tabs,
} from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Image from "next/image";

const { Option } = Select;

const ProductTagsCard = ({
  form,
  selectedTags,
  setSelectedTags,
  customTags,
  setCustomTags,
}) => {
  // State cho input tag mới
  const [newTagText, setNewTagText] = useState("");
  const [activeTabKey, setActiveTabKey] = useState("nongdo");

  // State để quản lý vị trí fixed
  const [isTagsFixed, setIsTagsFixed] = useState(false);
  const [isTagsCollapsed, setIsTagsCollapsed] = useState(false);
  const tagsProductRef = useRef(null);
  const selectedTagsRef = useRef(null);

  // Các state cho các loại tag đặc biệt
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
      { value: "notehuong_Spicy", label: "Spicy (Cay Nồng)" },
      { value: "notehuong_Chypre", label: "Chypre" },
      { value: "notehuong_Tobacco", label: "Tobacco (Thuốc Lá)" },
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
  }, []);

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
    <Card title="Tags sản phẩm" className="mb-6" ref={tagsProductRef}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cột trái: Tất cả các loại tag */}
        <div className="w-full">
          <h3 className="text-base font-medium mb-3">Chọn tags</h3>

          {Object.keys(customTags).map((groupKey) => (
            <div key={groupKey} className="mb-6 pb-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <Tag
                  color={getTagColor(groupKey)}
                  className="text-base px-3 py-1"
                >
                  {getTabLabel(groupKey)}
                </Tag>

                {/* Chỉ hiển thị phần thêm tag mới cho phongcach và dotuoi */}
                {["phongcach", "dotuoi"].includes(groupKey) && (
                  <div className="flex">
                    <Input
                      placeholder={`Thêm ${getTabLabel(
                        groupKey
                      ).toLowerCase()} mới`}
                      value={groupKey === activeTabKey ? newTagText : ""}
                      onChange={(e) => {
                        setActiveTabKey(groupKey);
                        setNewTagText(e.target.value);
                      }}
                      onPressEnter={() => handleAddCustomTag(groupKey)}
                      style={{ width: "180px" }}
                      size="small"
                    />
                    <Button
                      type="primary"
                      size="small"
                      onClick={() => handleAddCustomTag(groupKey)}
                      style={{ marginLeft: 4 }}
                      className="bg-blue-500"
                    >
                      +
                    </Button>
                  </div>
                )}
              </div>

              {/* Component tùy chỉnh cho Shadow (Màu sắc) */}
              {groupKey === "shadow" && (
                <div className="mb-4">
                  {/* Phần nhập mã màu RGB hoặc HEX */}
                  <div className="flex flex-col md:flex-row items-start gap-4">
                    {/* Phần trái: Nhập mã RGB hoặc HEX */}
                    <div className="w-full md:w-2/3">
                      <h4 className="mb-2 text-sm font-medium">
                        Nhập mã màu (RGB hoặc HEX):
                      </h4>
                      <div className="flex items-center mb-4 gap-4">
                        <Input
                          placeholder="rgb(60, 60, 60) hoặc #3c3c3c hoặc 60, 60, 60"
                          className="mr-2"
                          value={shadowValues.inputValue || ""}
                          onChange={(e) => {
                            const value = e.target.value;
                            // Lưu giá trị người dùng nhập vào state
                            setShadowValues({
                              ...shadowValues,
                              inputValue: value,
                            });

                            // Chỉ phân tích màu khi giá trị đủ dài
                            if (value.trim().length >= 3) {
                              parseColorInput(value.trim());
                            }
                          }}
                          onPressEnter={(e) => {
                            const value = e.target.value.trim();
                            // Xử lý chuỗi nhập vào khi nhấn Enter
                            if (parseColorInput(value, true)) {
                              // Nếu phân tích thành công và thêm màu
                              setShadowValues({
                                ...shadowValues,
                                inputValue: "", // Xóa giá trị sau khi áp dụng
                              });
                            }
                          }}
                        />
                        <Button
                          onClick={() => {
                            // Thêm màu hiện tại vào tags
                            handleAddShadowTag();
                            // Xóa giá trị input
                            setShadowValues({
                              ...shadowValues,
                              inputValue: "",
                            });
                          }}
                          type="primary"
                          className="bg-blue-500"
                        >
                          Thêm
                        </Button>
                      </div>
                    </div>

                    {/* Phần phải: Xem trước màu shadow */}
                    <div className="w-full md:w-1/3 flex flex-col justify-center items-center">
                      <h4 className="mb-2 text-sm font-medium">
                        Xem trước Shadow:
                      </h4>

                      {/* Hiển thị màu sắc dưới dạng shadow thực sự */}
                      <div className="flex flex-col items-center w-full mb-4">
                        {/* Khối chứa hình ảnh với shadow có màu tùy chỉnh */}
                        <div
                          className="w-32 h-32 rounded-md mb-4 bg-transparent flex items-center justify-center overflow-hidden"
                          style={{
                            position: "relative",
                          }}
                        >
                          <div className="w-[100px] h-[100px] relative">
                            <Image
                              src="/placeholder-product/placeholder-product.png"
                              fill
                              alt="Chai nước hoa"
                              style={{
                                objectFit: "contain",
                                filter: `drop-shadow(0 0 5px rgba(${shadowValues.r}, ${shadowValues.g}, ${shadowValues.b}, 0.8))
                                            drop-shadow(0 0 5px rgba(${shadowValues.r}, ${shadowValues.g}, ${shadowValues.b}, 0.4))`,
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Thông tin màu */}
                      <div className="text-center mb-2 border-t border-gray-200 pt-3 w-full">
                        <div className="text-sm font-medium">
                          RGB: {shadowValues.r}, {shadowValues.g},{" "}
                          {shadowValues.b}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          HEX: #{shadowValues.r.toString(16).padStart(2, "0")}
                          {shadowValues.g.toString(16).padStart(2, "0")}
                          {shadowValues.b.toString(16).padStart(2, "0")}
                        </div>
                        <div
                          className="text-xs mt-2 cursor-pointer text-blue-500 flex items-center justify-center"
                          onClick={() => {
                            const rgbText = `rgb(${shadowValues.r}, ${shadowValues.g}, ${shadowValues.b})`;
                            navigator.clipboard.writeText(rgbText);
                            message.success("Đã sao chép: " + rgbText);
                          }}
                        >
                          <button className="text-xs border border-blue-400 rounded px-2 py-1 hover:bg-blue-50">
                            Sao chép RGB
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Component tùy chỉnh cho Khuyendung (4 mùa) */}
              {groupKey === "khuyendung" && (
                <div className="mb-4">
                  <div className="mb-2">
                    <div className="flex items-center mb-2">
                      <span className="mr-2 w-16">Xuân:</span>
                      <Slider
                        min={0}
                        max={100}
                        step={10}
                        value={khuyendungValues.xuan}
                        onChange={(value) => {
                          // Cập nhật giá trị xuân
                          const newValues = {
                            ...khuyendungValues,
                            xuan: value,
                          };
                          setKhuyendungValues(newValues);

                          // Tạo tag mới
                          const tagValue = `khuyendung_${newValues.xuan}_${newValues.ha}_${newValues.thu}_${newValues.dong}`;

                          // Lấy tất cả các tag hiện tại
                          const currentTags = form.getFieldValue("tags") || [];

                          // Lọc bỏ tag khuyendung cũ nếu có
                          const filteredTags = currentTags.filter(
                            (tag) => !tag.startsWith("khuyendung_")
                          );

                          // Thêm tag mới vào danh sách
                          const newTags = [...filteredTags, tagValue];

                          // Cập nhật form và state
                          form.setFieldsValue({ tags: newTags });
                          setSelectedTags(newTags);
                        }}
                        className="flex-1"
                        marks={{
                          0: "0",
                          20: "20",
                          40: "40",
                          60: "60",
                          80: "80",
                          100: "100",
                        }}
                      />
                    </div>
                    <div className="flex items-center mb-2">
                      <span className="mr-2 w-16">Hạ:</span>
                      <Slider
                        min={0}
                        max={100}
                        step={10}
                        value={khuyendungValues.ha}
                        onChange={(value) => {
                          // Cập nhật giá trị hạ
                          const newValues = {
                            ...khuyendungValues,
                            ha: value,
                          };
                          setKhuyendungValues(newValues);

                          // Tạo tag mới
                          const tagValue = `khuyendung_${newValues.xuan}_${newValues.ha}_${newValues.thu}_${newValues.dong}`;

                          // Lấy tất cả các tag hiện tại
                          const currentTags = form.getFieldValue("tags") || [];

                          // Lọc bỏ tag khuyendung cũ nếu có
                          const filteredTags = currentTags.filter(
                            (tag) => !tag.startsWith("khuyendung_")
                          );

                          // Thêm tag mới vào danh sách
                          const newTags = [...filteredTags, tagValue];

                          // Cập nhật form và state
                          form.setFieldsValue({ tags: newTags });
                          setSelectedTags(newTags);
                        }}
                        className="flex-1"
                        marks={{
                          0: "0",
                          20: "20",
                          40: "40",
                          60: "60",
                          80: "80",
                          100: "100",
                        }}
                      />
                    </div>
                    <div className="flex items-center mb-2">
                      <span className="mr-2 w-16">Thu:</span>
                      <Slider
                        min={0}
                        max={100}
                        step={10}
                        value={khuyendungValues.thu}
                        onChange={(value) => {
                          // Cập nhật giá trị thu
                          const newValues = {
                            ...khuyendungValues,
                            thu: value,
                          };
                          setKhuyendungValues(newValues);

                          // Tạo tag mới
                          const tagValue = `khuyendung_${newValues.xuan}_${newValues.ha}_${newValues.thu}_${newValues.dong}`;

                          // Lấy tất cả các tag hiện tại
                          const currentTags = form.getFieldValue("tags") || [];

                          // Lọc bỏ tag khuyendung cũ nếu có
                          const filteredTags = currentTags.filter(
                            (tag) => !tag.startsWith("khuyendung_")
                          );

                          // Thêm tag mới vào danh sách
                          const newTags = [...filteredTags, tagValue];

                          // Cập nhật form và state
                          form.setFieldsValue({ tags: newTags });
                          setSelectedTags(newTags);
                        }}
                        className="flex-1"
                        marks={{
                          0: "0",
                          20: "20",
                          40: "40",
                          60: "60",
                          80: "80",
                          100: "100",
                        }}
                      />
                    </div>
                    <div className="flex items-center mb-2">
                      <span className="mr-2 w-16">Đông:</span>
                      <Slider
                        min={0}
                        max={100}
                        step={10}
                        value={khuyendungValues.dong}
                        onChange={(value) => {
                          // Cập nhật giá trị đông
                          const newValues = {
                            ...khuyendungValues,
                            dong: value,
                          };
                          setKhuyendungValues(newValues);

                          // Tạo tag mới
                          const tagValue = `khuyendung_${newValues.xuan}_${newValues.ha}_${newValues.thu}_${newValues.dong}`;

                          // Lấy tất cả các tag hiện tại
                          const currentTags = form.getFieldValue("tags") || [];

                          // Lọc bỏ tag khuyendung c

                          // Lọc bỏ tag khuyendung cũ nếu có
                          const filteredTags = currentTags.filter(
                            (tag) => !tag.startsWith("khuyendung_")
                          );

                          // Thêm tag mới vào danh sách
                          const newTags = [...filteredTags, tagValue];

                          // Cập nhật form và state
                          form.setFieldsValue({ tags: newTags });
                          setSelectedTags(newTags);
                        }}
                        className="flex-1"
                        marks={{
                          0: "0",
                          20: "20",
                          40: "40",
                          60: "60",
                          80: "80",
                          100: "100",
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Component tùy chỉnh cho Thoigian (Ngày/Đêm) */}
              {groupKey === "thoigian" && (
                <div className="mb-4">
                  <div className="mb-2">
                    <div className="flex items-center mb-2">
                      <span className="mr-2 w-16">Ngày:</span>
                      <Slider
                        min={0}
                        max={100}
                        step={10}
                        value={thoigianValues.ngay}
                        onChange={(value) => {
                          // Cập nhật giá trị ngày
                          const newValues = {
                            ...thoigianValues,
                            ngay: value,
                          };
                          setThoigianValues(newValues);

                          // Tạo tag mới
                          const tagValue = `thoigian_${newValues.ngay}_${newValues.dem}`;

                          // Lấy tất cả các tag hiện tại
                          const currentTags = form.getFieldValue("tags") || [];

                          // Lọc bỏ tag thoigian cũ nếu có
                          const filteredTags = currentTags.filter(
                            (tag) => !tag.startsWith("thoigian_")
                          );

                          // Thêm tag mới vào danh sách
                          const newTags = [...filteredTags, tagValue];

                          // Cập nhật form và state
                          form.setFieldsValue({ tags: newTags });
                          setSelectedTags(newTags);
                        }}
                        className="flex-1"
                        marks={{
                          0: "0",
                          20: "20",
                          40: "40",
                          60: "60",
                          80: "80",
                          100: "100",
                        }}
                      />
                    </div>
                    <div className="flex items-center mb-2">
                      <span className="mr-2 w-16">Đêm:</span>
                      <Slider
                        min={0}
                        max={100}
                        step={10}
                        value={thoigianValues.dem}
                        onChange={(value) => {
                          // Cập nhật giá trị đêm
                          const newValues = {
                            ...thoigianValues,
                            dem: value,
                          };
                          setThoigianValues(newValues);

                          // Tạo tag mới
                          const tagValue = `thoigian_${newValues.ngay}_${newValues.dem}`;

                          // Lấy tất cả các tag hiện tại
                          const currentTags = form.getFieldValue("tags") || [];

                          // Lọc bỏ tag thoigian cũ nếu có
                          const filteredTags = currentTags.filter(
                            (tag) => !tag.startsWith("thoigian_")
                          );

                          // Thêm tag mới vào danh sách
                          const newTags = [...filteredTags, tagValue];

                          // Cập nhật form và state
                          form.setFieldsValue({ tags: newTags });
                          setSelectedTags(newTags);
                        }}
                        className="flex-1"
                        marks={{
                          0: "0",
                          20: "20",
                          40: "40",
                          60: "60",
                          80: "80",
                          100: "100",
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Chọn từ tags có sẵn */}
              {["nongdo", "gioitinh", "toahuong", "doluumui"].includes(
                groupKey
              ) ? (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {getTagsForGroup(groupKey).map((option) => {
                      const isSelected = selectedTags?.some(
                        (tag) => tag === option.value
                      );
                      return (
                        <Tag
                          key={option.value}
                          color={isSelected ? getTagColor(groupKey) : "default"}
                          style={{
                            cursor: "pointer",
                            borderColor: isSelected
                              ? getTagColor(groupKey)
                              : "#d9d9d9",
                            backgroundColor: isSelected ? undefined : "white",
                          }}
                          onClick={() => {
                            // Lấy tất cả các tag hiện tại
                            const allCurrentTags =
                              form.getFieldValue("tags") || [];

                            // Lọc ra các tag không thuộc nhóm hiện tại
                            const tagsFromOtherGroups = allCurrentTags.filter(
                              (tag) => !tag.startsWith(groupKey + "_")
                            );

                            // Thêm tag mới vào
                            const newTags = [
                              ...tagsFromOtherGroups,
                              option.value,
                            ];

                            // Cập nhật form và state
                            form.setFieldsValue({ tags: newTags });
                            setSelectedTags(newTags);
                          }}
                        >
                          {option.label}
                        </Tag>
                      );
                    })}
                  </div>
                </div>
              ) : groupKey === "mua" ? (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {getTagsForGroup(groupKey).map((option) => {
                      const isSelected = selectedTags?.some(
                        (tag) => tag === option.value
                      );
                      return (
                        <Tag
                          key={option.value}
                          color={isSelected ? getTagColor(groupKey) : "default"}
                          style={{
                            cursor: "pointer",
                            borderColor: isSelected
                              ? getTagColor(groupKey)
                              : "#d9d9d9",
                            backgroundColor: isSelected ? undefined : "white",
                          }}
                          onClick={() => {
                            // Lấy tất cả các tag hiện tại
                            const allCurrentTags =
                              form.getFieldValue("tags") || [];

                            // Tìm những tag đã chọn trong nhóm này
                            const selectedGroupTags = allCurrentTags.filter(
                              (tag) => tag.startsWith(groupKey + "_")
                            );

                            // Kiểm tra xem tag đã được chọn chưa
                            const isAlreadySelected =
                              selectedGroupTags.includes(option.value);

                            // Tạo danh sách mới
                            let newGroupTags;
                            if (isAlreadySelected) {
                              // Nếu đã chọn rồi thì bỏ chọn
                              newGroupTags = selectedGroupTags.filter(
                                (tag) => tag !== option.value
                              );
                            } else {
                              // Nếu chưa chọn thì thêm vào
                              newGroupTags = [
                                ...selectedGroupTags,
                                option.value,
                              ];
                            }

                            // Lọc ra các tag không thuộc nhóm hiện tại
                            const tagsFromOtherGroups = allCurrentTags.filter(
                              (tag) => !tag.startsWith(groupKey + "_")
                            );

                            // Kết hợp với các tag mới chọn
                            const newTags = [
                              ...tagsFromOtherGroups,
                              ...newGroupTags,
                            ];

                            // Cập nhật form và state
                            form.setFieldsValue({ tags: newTags });
                            setSelectedTags(newTags);
                          }}
                        >
                          {option.label}
                        </Tag>
                      );
                    })}
                  </div>
                </div>
              ) : ["khuyendung", "thoigian", "shadow"].includes(groupKey) ? (
                // Không hiển thị select cho khuyendung, thoigian và shadow
                <div></div>
              ) : (
                <Select
                  mode="multiple"
                  placeholder={`Chọn ${getTabLabel(groupKey).toLowerCase()}`}
                  style={{ width: "100%" }}
                  options={getTagsForGroup(groupKey)}
                  optionFilterProp="label"
                  showSearch
                  onChange={(value) => {
                    // Lấy tất cả các tag hiện tại
                    const allCurrentTags = form.getFieldValue("tags") || [];

                    // Lọc ra các tag không thuộc nhóm hiện tại
                    const tagsFromOtherGroups = allCurrentTags.filter(
                      (tag) => !tag.startsWith(groupKey + "_")
                    );

                    // Kết hợp với các tag mới chọn
                    const newTags = [...tagsFromOtherGroups, ...value];

                    // Cập nhật form và state
                    form.setFieldsValue({ tags: newTags });
                    setSelectedTags(newTags);
                  }}
                  value={
                    selectedTags?.filter((tag) =>
                      tag.startsWith(groupKey + "_")
                    ) || []
                  }
                  tagRender={(props) => {
                    const { label, closable, onClose } = props;
                    return (
                      <Tag
                        color={getTagColor(groupKey)}
                        closable={closable}
                        onClose={onClose}
                        style={{ marginRight: 3 }}
                      >
                        {label}
                      </Tag>
                    );
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Cột phải: Tags đã chọn */}
        <div
          ref={selectedTagsRef}
          className={`bg-white rounded-md transition-all duration-300 ease-in-out ${
            isTagsFixed
              ? "lg:fixed lg:top-20 lg:right-0 lg:overflow-y-auto shadow-lg max-h-[80vh]"
              : "w-full"
          } ${
            isTagsFixed && isTagsCollapsed
              ? "lg:w-[50px]"
              : isTagsFixed
              ? "lg:w-[44%]"
              : "w-full"
          }`}
          style={{
            zIndex: isTagsFixed ? 100 : "auto",
            border: "1px solid #e0e0e0",
          }}
        >
          <div className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-base font-medium">
                {(!isTagsFixed || !isTagsCollapsed) && "Tags đã chọn "}
                {(!isTagsFixed || !isTagsCollapsed) &&
                  selectedTags?.length > 0 &&
                  `(${selectedTags.length})`}
              </h3>

              {/* Toggle button - chỉ hiển thị khi fixed */}
              {isTagsFixed && (
                <button
                  className="bg-blue-500 text-white p-1 px-2 rounded-full shadow-md"
                  onClick={() => setIsTagsCollapsed(!isTagsCollapsed)}
                >
                  {isTagsCollapsed ? <LeftOutlined /> : <RightOutlined />}
                </button>
              )}
            </div>

            {/* Chỉ ẩn nội dung khi fixed và thu gọn */}
            {(!isTagsFixed || !isTagsCollapsed) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.keys(customTags).map((groupKey, index) => {
                  const tagsInGroup =
                    selectedTags?.filter((tag) =>
                      tag.startsWith(groupKey + "_")
                    ) || [];

                  if (tagsInGroup.length === 0) return null;

                  return (
                    <div key={groupKey} className="mb-4">
                      <div className="flex items-center mb-2">
                        <div className="mr-2">{getTabLabel(groupKey)}:</div>
                        <span className="text-xs text-gray-500">
                          ({tagsInGroup.length})
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {tagsInGroup.map((tag) => {
                          const label = tag.split("_").slice(1).join("_");

                          // Shadow tags
                          if (groupKey === "shadow") {
                            const [r, g, b] = label.split(" ").map(Number);
                            return (
                              <Tag
                                key={tag}
                                closable
                                color={getTagColor(groupKey)}
                                onClose={() => {
                                  const currentTags =
                                    form.getFieldValue("tags") || [];
                                  const newTags = currentTags.filter(
                                    (t) => t !== tag
                                  );
                                  form.setFieldsValue({ tags: newTags });
                                  setSelectedTags(newTags);
                                }}
                                style={{
                                  backgroundColor: `rgb(${r}, ${g}, ${b})`,
                                  color: isDarkColor(r, g, b)
                                    ? "white"
                                    : "black",
                                  borderColor: "transparent",
                                }}
                              >
                                RGB: {label}
                              </Tag>
                            );
                          }

                          // Khuyendung tags
                          if (groupKey === "khuyendung") {
                            const [xuan, ha, thu, dong] = label
                              .split("_")
                              .map(Number);
                            return (
                              <Tag
                                key={tag}
                                closable
                                color={getTagColor(groupKey)}
                                onClose={() => {
                                  const currentTags =
                                    form.getFieldValue("tags") || [];
                                  const newTags = currentTags.filter(
                                    (t) => t !== tag
                                  );
                                  form.setFieldsValue({ tags: newTags });
                                  setSelectedTags(newTags);
                                }}
                              >
                                Xuân: {xuan}% | Hạ: {ha}% | Thu: {thu}% | Đông:{" "}
                                {dong}%
                              </Tag>
                            );
                          }

                          // Thoigian tags
                          if (groupKey === "thoigian") {
                            const [ngay, dem] = label.split("_").map(Number);
                            return (
                              <Tag
                                key={tag}
                                closable
                                color={getTagColor(groupKey)}
                                onClose={() => {
                                  const currentTags =
                                    form.getFieldValue("tags") || [];
                                  const newTags = currentTags.filter(
                                    (t) => t !== tag
                                  );
                                  form.setFieldsValue({ tags: newTags });
                                  setSelectedTags(newTags);
                                }}
                              >
                                Ngày: {ngay}% | Đêm: {dem}%
                              </Tag>
                            );
                          }

                          // Default tags
                          return (
                            <Tag
                              key={tag}
                              closable
                              color={getTagColor(groupKey)}
                              onClose={() => {
                                const currentTags =
                                  form.getFieldValue("tags") || [];
                                const newTags = currentTags.filter(
                                  (t) => t !== tag
                                );
                                form.setFieldsValue({ tags: newTags });
                                setSelectedTags(newTags);
                              }}
                            >
                              {label}
                            </Tag>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {(!isTagsFixed || !isTagsCollapsed) &&
              selectedTags?.length === 0 && (
                <div className="text-gray-500 italic">
                  Chưa có tag nào được chọn
                </div>
              )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductTagsCard;
