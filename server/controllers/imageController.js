const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const util = require('../utils');

const saveImageFromHTML = async (req, res) => {
    const { htmlContent } = req.body;
  
    if (!htmlContent) {
      return res.status(400).json({ message: "HTML content is required" });
    }
  
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
  
      await page.setContent(htmlContent, { waitUntil: "load" });
  
      const imageBuffer = await page.screenshot({ fullPage: true });
  
      const imagePath = path.join(__dirname, "../images", `image-${Date.now()}.png`);
  
      if (!fs.existsSync(path.dirname(imagePath))) {
        fs.mkdirSync(path.dirname(imagePath), { recursive: true });
      }
  
      fs.writeFileSync(imagePath, imageBuffer);
  
      await browser.close();
  
      res.status(200).json({ message: "Image saved successfully", path: imagePath });
    } catch (error) {
      console.error("Error generating image:", error);
      res.status(500).json({ message: "Error generating image" });
    }
  };

module.exports = { saveImageFromHTML };
