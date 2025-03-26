import React from "react";
import { Card, Form, Input, Switch } from "antd";

const { TextArea } = Input;

const BasicInfoCard = ({ form }) => {
  return (
    <Card title="Thông tin cơ bản">
      <Form.Item
        name="name"
        label="Tên sản phẩm"
        rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
      >
        <Input placeholder="Nhập tên sản phẩm" />
      </Form.Item>

      <Form.Item name="description" label="Mô tả sản phẩm">
        <TextArea
          placeholder="Nhập mô tả sản phẩm"
          autoSize={{ minRows: 3, maxRows: 6 }}
        />
      </Form.Item>

      <Form.Item
        name="available"
        label="Trạng thái sản phẩm"
        valuePropName="checked"
        tooltip="Bật/tắt để hiển thị sản phẩm trên website"
      >
        <Switch checkedChildren="Có sẵn" unCheckedChildren="Hết hàng" />
      </Form.Item>
    </Card>
  );
};

export default BasicInfoCard;
