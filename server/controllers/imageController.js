const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const saveImageFromURL = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ message: "URL is required" });
  }

  let browser;
  try {
    // Puppeteer 브라우저 실행
    browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    // 뷰포트 설정
    await page.setViewport({ width: 1920, height: 1080 });

    // 페이지 이동 및 요소 확인
    console.log(`Navigating to ${url}...`);
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForSelector(".templateImage", { timeout: 10000 });

    const element = await page.$(".templateImage");
    if (!element) {
      console.warn(".templateImage not found, capturing full page screenshot...");
    }

    // 페이지 또는 요소 캡처
    console.log(".templateImage found! Capturing screenshot...");
    const imageBuffer = element
      ? await element.screenshot()
      : await page.screenshot({ fullPage: true });

    // 이미지 저장 경로 설정
    const imageName = `image-${Date.now()}.png`;
    const imageDir =
      process.env.IMAGE_DIRECTORY || path.resolve(__dirname, "../images");
    const imagePath = path.join(imageDir, imageName);

    if (!fs.existsSync(imageDir)) {
      try {
        fs.mkdirSync(imageDir, { recursive: true });
      } catch (err) {
        console.error("Error creating image directory:", err);
        return res
          .status(500)
          .json({ message: "Failed to create image directory" });
      }
    }

    fs.writeFileSync(imagePath, imageBuffer);
    console.log(`${imageName} Screenshot saved`);

    // 이미지 URL 생성
    const imageUrl = `http://dolllpitoxic3.mycafe24.com/images/${imageName}`;

    res.status(200).json({
      message: "Image saved successfully",
      path: imagePath,
      url: imageUrl,
      imageName: imageName,
    });
  } catch (error) {
    console.error("Error generating image from URL:", error.message);
    console.error(error.stack);
    res.status(500).json({ message: "Error generating image from URL" });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

module.exports = { saveImageFromURL };
