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
      // headless: false,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    // 페이지의 넓이를 고정하기 위해 뷰포트를 설정
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(url, { waitUntil: "networkidle0" });

    // 템플릿 URL로 이동
    console.log("Waiting for 5 seconds before navigation...");
    // 1. URL 이동 전에 5초 대기
    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log(`Navigating to ${url}...`);
    await page.goto(url, { waitUntil: "networkidle2" });

    console.log("Checking for .templateImage...");
    let elementFound = false;
    let retries = 0;

    // 2. 발견될 때까지 반복 확인 (최대 5번 시도, 각 시도 후 5초 대기)
    while (!elementFound && retries < 5) {
      elementFound = await page.evaluate(() => {
        const element = document.querySelector(".templateImage");
        return element !== null;
      });

      if (!elementFound) {
        retries++;
        console.log(`.templateImage not found, retrying... (${retries}/5)`);
        await new Promise((resolve) => setTimeout(resolve, 5000)); // 5초 대기
      }
    }

    if (!elementFound) {
      throw new Error(".templateImage not found after multiple retries.");
    }

    console.log(".templateImage found! Proceeding to capture...");

    // 3. 캡처 진행
    // 전체 페이지를 캡처
    const imageBuffer = await page.screenshot({ fullPage: true });

    // .env에 설정된 IMAGE_DIRECTORY 경로 사용
    const imageName = `image-${Date.now()}.png`;
    const imagePath = path.join(process.env.IMAGE_DIRECTORY, imageName);

    if (!fs.existsSync(path.dirname(imagePath))) {
      fs.mkdirSync(path.dirname(imagePath), { recursive: true });
    }

    fs.writeFileSync(imagePath, imageBuffer);

    console.log(`${imageName} Screenshot saved`);

    await browser.close();

    // 이미지가 저장된 서버 URL 생성
    const imageUrl = `http://dolllpitoxic3.mycafe24.com/images/${imageName}`;

    res.status(200).json({
      message: "Image saved successfully",
      path: imagePath,
      url: imageUrl,
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
