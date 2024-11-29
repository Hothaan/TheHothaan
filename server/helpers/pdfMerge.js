const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

// PDF 병합
const mergePdfs = async (pdfPaths) => {
    const pdfDoc = await PDFDocument.create();
  
    // 각 PDF 파일을 병합
    for (const pdfPath of pdfPaths) {
        const pdfBytes = fs.readFileSync(pdfPath);
        const mergedPdf = await PDFDocument.load(pdfBytes);

        // 모든 페이지를 복사하여 병합
        const pages = await pdfDoc.copyPages(mergedPdf, mergedPdf.getPageIndices());
        pages.forEach(page => {
            pdfDoc.addPage(page);
        });
    }
  
    // 병합된 PDF 파일을 저장
    const mergedPdfBytes = await pdfDoc.save();
    return mergedPdfBytes;
};
  
  module.exports = { mergePdfs };