const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mammoth = require('mammoth');
const PDFDocument = require('pdfkit');

const router = express.Router();

// Set up Multer for file uploads
const upload = multer({
  dest: './uploads',
  fileFilter: (req, file, cb) => {
    const extname = path.extname(file.originalname).toLowerCase();
    if (extname === '.docx') {
      cb(null, true);
    } else {
      cb(new Error('Only .docx files are allowed'));
    }
  },
});

router.get('/', (req, res) => {
  res.render('upload-docx');
});

router.post('/upload-docx', upload.single('docxFile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }

    const docxPath = req.file.path; 
    const pdfPath = path.join(__dirname, `../uploads/${Date.now()}_converted.pdf`); // Path for the converted .pdf

    const { value: docxText } = await mammoth.extractRawText({ path: docxPath });

    const pdfDoc = new PDFDocument();
    const pdfStream = fs.createWriteStream(pdfPath);
    pdfDoc.pipe(pdfStream);
    pdfDoc.text(docxText);
    pdfDoc.end();

    pdfStream.on('finish', () => {
      res.download(pdfPath, (err) => {
        if (err) {
          console.error('Error downloading the file:', err);
        }
        fs.unlinkSync(docxPath);
        fs.unlinkSync(pdfPath);
      });
    });
  } catch (error) {
    console.error('Error during file conversion:', error);
    res.status(500).send('An error occurred during file conversion.');
  }
});

module.exports = router;

