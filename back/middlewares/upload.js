import path from 'path';
import multer from 'multer';
import SharpMulter from 'sharp-multer';

const storage = SharpMulter({
  destination: (req, file, callback) => callback(null, './public/uploads'),
  imageOptions: {
    fileFormat: 'webp',
    quality: 70,
    resize: { width: 450, height: 300 },
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single('file');

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images only! (jpeg, jpg, png, gif, webp)');
  }
}

export { upload };
