
const multer  = require('multer');
const path = require('path');
//const upload = multer({ dest: 'uploads/' });

const storage = multer.diskStorage({
  destination: './server/public/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage: storage, limits: { fileSize: 1000000 } });
module.exports = upload;

//https://www.npmjs.com/package/multer