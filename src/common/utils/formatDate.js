import { BadRequestError } from "../../helpers/handleError.js";

export default function sqlDateFormat(dateStr) {
  if (!dateStr || typeof dateStr !== "string")
    throw new BadRequestError(
      "Lỗi định dạng ngày (YYYY-MM-DD hoặc DD-MM-YYYY)",
    );

  // Kiểm tra định dạng YMD bằng regex: YYYY-MM-DD
  const ymdRegex = /^\d{4}-\d{1,2}-\d{1,2}$/;
  if (ymdRegex.test(dateStr)) {
    return dateStr; // Đã đúng định dạng YYYY-MM-DD
  }

  // Kiểm tra định dạng DMY: DD-MM-YYYY
  const dmyRegex = /^\d{1,2}-\d{1,2}-\d{4}$/;
  if (dmyRegex.test(dateStr)) {
    const [day, month, year] = dateStr.split("-");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }

  // Không đúng định dạng mong muốn
  return null;
}
