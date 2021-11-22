const multer = require("multer");
const path = require("path");
const createError = require("http-errors");

function uploader(subfolder, allowed_file_types, max_file_size, error_message) {
  const UPLOADS_FOLDER = `${__dirname}/../public/uploads/${subfolder}`;
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, UPLOADS_FOLDER);
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);
      const fileName =
        file.originalname
          .replace(fileExt, "")
          .toLowerCase()
          .split(" ")
          .join("-") +
        "-" +
        Date.now();

      cb(null, fileName+fileExt);
    },
  });

  const upload = multer({
      storage: storage,
      limits: { fileSize: max_file_size },
        fileFilter: (req, file, cb) => {
            if(allowed_file_types.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(createError(error_message));
            }
        }
  })
  return upload;
}

module.exports = uploader;
