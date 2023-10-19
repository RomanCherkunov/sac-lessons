const { Op } = require("sequelize");
const { document, media } = require("@models");
const { checkVal, getMediaPath } = require("@utils");
const XLSX = require("xlsx");

const get = (req, res) => {
  const { id, search, limit, offset } = req.query;

  const where = search ? { caption: { [Op.getLike()]: `%${search}%` } } : null;

  if (id) {
    document
      .findOne({ include: [{ model: media, as: "media" }], where: { id } })
      .then((data) => {
        if (data) {
          const { media } = data.toJSON();
          const { fileId } = media;

          const workbook = XLSX.read(`${getMediaPath()}${fileId}`, {
            type: "file",
          });
          const sheets = workbook.SheetNames;

          const jsonData = XLSX.utils.sheet_to_json(
            workbook.Sheets[sheets[0]],
            { header: "A" }
          );

          return { ...data.toJSON(), excelData: jsonData };
        }
        return null;
      })
      .defAnswer(res);
    return;
  }

  document
    .findAndCountAll({
      where,
      ...(limit ? { limit } : {}),
      ...(offset ? { offset } : {}),
    })
    .defAnswer(res);
};

const post = async (req, res) => {
  const files = Object.keys(req.files);
  const { caption, description } = req.body;
  if (req.files[files[0]]) {
    const item = req.files[files[0]];

    media
      .create({
        name: item.name,
        size: item.size,
        mimeType: item.mimetype,
        fileId: item.md5,
      })
      .then(async (media) => {
        const documentData = await document.create({
          caption,
          description,
          mediaId: media?.id,
        });
        item.mv(`${getMediaPath()}${item.md5}`);
        return documentData.toJSON();
      })
      .defAnswer(res);
    return;
  }
  res.status(500).send({ error: "file not found" });
};

module.exports = (router) => {
  router.get("/", get);
  router.post("/", post);

  return true;
};
