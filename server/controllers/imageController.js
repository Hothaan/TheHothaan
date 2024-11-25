const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const saveImageFromURL = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ message: "URL is required" });
  }

  try {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    // 뷰포트 설정
    await page.setViewport({ width: 1920, height: 1080 });

    // 페이지 이동
    console.log(`Navigating to ${url}...`);
    await page.goto(url, { waitUntil: "networkidle2" });

    console.log("Waiting for .templateImage...");
    // .templateImage 요소가 로드될 때까지 대기
    await page.waitForSelector(".templateImage", { timeout: 5000 });

    console.log(".templateImage found! Proceeding to capture...");

    // 전체 페이지 캡처
    const imageBuffer = await page.screenshot({ fullPage: true });

    // 이미지 저장 경로 설정
    const imageName = `image-${Date.now()}.png`;
    const imageDir = process.env.IMAGE_DIRECTORY || path.join(__dirname, "../images");
    const imagePath = path.join(imageDir, imageName);

    if (!fs.existsSync(imageDir)) {
      fs.mkdirSync(imageDir, { recursive: true });
    }

    fs.writeFileSync(imagePath, imageBuffer);
    console.log(`${imageName} Screenshot saved`);

    await browser.close();

    // 이미지 URL 생성
    const imageUrl = `http://dolllpitoxic3.mycafe24.com/images/${imageName}`;

    res.status(200).json({
      message: "Image saved successfully",
      path: imagePath,
      url: imageUrl,
      imageName: imageName,
    });
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
