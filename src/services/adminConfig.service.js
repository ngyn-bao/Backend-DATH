import prisma from "../common/prisma/prisma.init.js";
import { BadRequestError, NotFoundError } from "../helpers/handleError.js";

export const adminConfigService = {
  create: async function (req) {
    const { config_name, config_value, admin_id } = req.body;

    if (!config_name || !config_value)
      throw new BadRequestError("Thiếu thông tin cấu hình");

    if (!admin_id) throw new BadRequestError("Thiếu ID admin");

    const admin = await prisma.user.findUnique({ where: { ID: +admin_id } });

    if (!admin) throw new BadRequestError("Không tồn tại admin này");

    const config = await prisma.system_config.create({
      data: { config_name, config_value },
    });

    const manage_config = await prisma.manage_config.create({
      data: {
        action: "CREATE_CONFIG",
        description: `Admin #${admin_id} tạo cấu hình mới: ${config_name}`,
        config_id: config.ID,
        admin_id,
      },
    });

    return { config, manage_config };
  },

  getAll: async function (req) {
    const configs = await prisma.system_config.findMany({
      include: { manage_config: true },
      orderBy: { ID: "asc" },
    });

    return { configs: configs.length === 0 ? [] : configs };
  },

  // findOne: async function (req) {
  //   return `This action returns a entity with id: ${req.params.id}`;
  // },

  update: async function (req) {
    const configId = +req.params.id;
    const { config_value, admin_id } = req.body;

    if (!admin_id) throw new BadRequestError("Thiếu ID admin");

    const admin = await prisma.user.findUnique({ where: { ID: +admin_id } });

    if (!admin) throw new BadRequestError("Không tồn tại admin này");

    if (!configId || !config_value)
      throw new BadRequestError("Thiếu dữ liệu cập nhật");

    const existing = await prisma.system_config.findUnique({
      where: { ID: configId },
    });
    if (!existing) throw new NotFoundError("Không tìm thấy cấu hình");

    const updated = await prisma.system_config.update({
      where: { ID: configId },
      data: { config_value },
    });

    const manage_config = await prisma.manage_config.create({
      data: {
        action: "UPDATE_CONFIG",
        description: `Admin #${admin_id} cập nhật cấu hình: ${existing.config_name}`,
        config_id: configId,
        admin_id,
      },
    });

    return { updated, manage_config };
  },

  // remove: async function (req) {
  //   return `This action removes a entity with id: ${req.params.id}`;
  // },
};
