const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const util = require('../utils');

const saveImageFromURL = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ message: "URL is required" });
  }

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // 페이지의 넓이를 고정하기 위해 뷰포트를 설정
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(url, { waitUntil: "load" });

    // 전체 페이지를 캡처
    const imageBuffer = await page.screenshot({ fullPage: true });

    const imagePath = path.join(__dirname, "../images", `image-${Date.now()}.png`);

    if (!fs.existsSync(path.dirname(imagePath))) {
      fs.mkdirSync(path.dirname(imagePath), { recursive: true });
    }

    fs.writeFileSync(imagePath, imageBuffer);

    await browser.close();

    res.status(200).json({ message: "Image saved successfully", path: imagePath });
  } catch (error) {
    console.error("Error generating image from URL:", error);
    res.status(500).json({ message: "Error generating image from URL" });
  }
};


// const saveImageFromHTML = async (req, res) => {
//     const { htmlContent } = req.body;

//     if (!htmlContent) {
//       return res.status(400).json({ message: "HTML content is required" });
//     }

//     try {
//       const browser = await puppeteer.launch();
//       const page = await browser.newPage();

//       await page.setContent(htmlContent, { waitUntil: "load" });

//       const imageBuffer = await page.screenshot({ fullPage: true });

//       const imagePath = path.join(__dirname, "../images", `image-${Date.now()}.png`);

//       if (!fs.existsSync(path.dirname(imagePath))) {
//         fs.mkdirSync(path.dirname(imagePath), { recursive: true });
//       }

//       fs.writeFileSync(imagePath, imageBuffer);

//       await browser.close();

//       res.status(200).json({ message: "Image saved successfully", path: imagePath });
//     } catch (error) {
//       console.error("Error generating image:", error);
//       res.status(500).json({ message: "Error generating image" });
//     }
//   };

module.exports = { saveImageFromURL };
