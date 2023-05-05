const multer = require("multer");
const { v1: uuidv1 } = require("uuid");

const MIME_TYPE_MAP = {
  "application/pdf": "pdf",
};

const pdfUpload = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      console.log("\n\n");
      cb(null, "uploads/documents/external_exams");
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, uuidv1() + "." + ext);
    },
  }),
});

module.exports = pdfUpload;
