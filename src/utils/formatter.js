/**
 * Định dạng ngày giờ
 * @param {string} dateString - Chuỗi ngày cần định dạng
 * @param {string} format - Định dạng mong muốn (mặc định là DD/MM/YYYY HH:MM)
 * @returns {string} - Chuỗi đã định dạng
 */
export const formatDate = (dateString, format = "datetime") => {
  if (!dateString) return "N/A";

  try {
    const date = new Date(dateString);

    // Kiểm tra ngày hợp lệ
    if (isNaN(date.getTime())) return "Invalid date";

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    switch (format) {
      case "date":
        return `${day}/${month}/${year}`;
      case "time":
        return `${hours}:${minutes}`;
      case "datetime":
      default:
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Error";
  }
};

/**
 * Lấy public_id từ URL Cloudinary
 * @param {string} url - URL của ảnh trên Cloudinary
 * @returns {string|null} - public_id hoặc null nếu không tìm thấy
 */
export const getPublicIdFromUrl = (url) => {
  try {
    if (!url) return null;

    // URL có dạng: https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/folder/filename.extension
    const regex = /\/v\d+\/(.+)(?:\.\w+)?$/;
    const match = url.match(regex);
    return match ? match[1] : null;
  } catch (error) {
    console.error("Error extracting public ID:", error);
    return null;
  }
};

/**
 * Rút gọn text nếu quá dài
 * @param {string} text - Text cần rút gọn
 * @param {number} maxLength - Độ dài tối đa
 * @returns {string} - Text đã rút gọn
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};
