import multer from 'multer';
import path from 'path';

// Set storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../frontend/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Check file type
const checkFileTypes = (file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Error: Images Only!'));
    }
};

// Init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 },
    fileFilter: (req, file, cb) => {
        checkFileTypes(file, cb);
    }
}).single('image');

export default upload;
