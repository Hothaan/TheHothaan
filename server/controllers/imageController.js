const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const projectModel = require('../models/project');
const logger = require('../config/logger');
require('dotenv').config();

// 단순 URL - 이미지 저장
const saveImageFromURL = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ message: 'URL is required' });
  }

  let browser;
  try {
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
    });
    const page = await browser.newPage();

    // Set user agent and viewport size
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    );
    await page.setViewport({ width: 1920, height: 1080 });

    console.log(`Navigating to ${url}...`);
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });

    let imageBuffer;

    // Wait for .templateImage or full page screenshot
    try {
      await page.waitForSelector('.templateImage', { timeout: 120000 });

      // Check if element exists and has non-zero dimensions
      const element = await page.$('.templateImage');
      const boundingBox = await element.boundingBox();

      if (boundingBox && boundingBox.width > 0 && boundingBox.height > 0) {
        console.log('.templateImage found! Capturing screenshot...');
        imageBuffer = await element.screenshot();
      } else {
        console.warn('`.templateImage` found but has zero size. Capturing full page screenshot...');
        imageBuffer = await page.screenshot({ fullPage: true });
      }
    } catch (err) {
      console.warn('`.templateImage` not found or has issues. Capturing full page screenshot...');
      imageBuffer = await page.screenshot({ fullPage: true });
    }

    // Save image to disk
    const imageName = `image-${Date.now()}.png`;
    const imageDir = process.env.IMAGE_DIRECTORY || path.resolve(__dirname, '../images');
    const imagePath = path.join(imageDir, imageName);

    if (!fs.existsSync(imageDir)) {
      fs.mkdirSync(imageDir, { recursive: true });
    }

    fs.writeFileSync(imagePath, imageBuffer);

    // Construct URL for the saved image
    const imageUrl = `http://dolllpitoxic3.mycafe24.com/images/${imageName}`;

    res.status(200).json({
      message: 'Image saved successfully',
      path: imagePath,
      url: imageUrl,
      imageName: imageName,
    });
  } catch (error) {
    console.error('Error generating image from URL:', error.message);
    res.status(500).json({ message: 'Error generating image from URL' });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

// 이미지 & DB 저장
const saveImageToDatabase = async (req, res) => {
  const { url, project_id, feature_id, feature } = req.body;
  const isProductDetail = url.includes('쇼핑몰-상품상세');

  if (!url || !project_id || !feature_id) {
    return res.status(400).json({ message: 'URL, project_id, and feature_id are required' });
  }

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    );
    await page.setViewport({ width: 1920, height: 1080 });

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForSelector('.templateImage', { timeout: 30000 });

    let imageBuffer;
    const element = await page.$('.templateImage');
    if (element) {
      const boundingBox = await element.boundingBox();
      if (boundingBox && boundingBox.width > 0 && boundingBox.height > 0) {
        imageBuffer = await element.screenshot();
      } else {
        imageBuffer = await page.screenshot({ fullPage: true });
      }
    } else {
      imageBuffer = await page.screenshot({ fullPage: true });
    }

    const imageName = `image-${Date.now()}.png`;
    const imageDir = process.env.IMAGE_DIRECTORY || path.resolve(__dirname, '../images');
    const imagePath = path.join(imageDir, imageName);

    if (!fs.existsSync(imageDir)) fs.mkdirSync(imageDir, { recursive: true });
    fs.writeFileSync(imagePath, imageBuffer);

    const imageUrl = `http://dolllpitoxic3.mycafe24.com/images/${imageName}`;
    const existingFile = await projectModel.getFileByProjectAndFeature(project_id, feature_id);
    let fileId;
    if (existingFile) {
      await projectModel.updateFileRecord(project_id, feature_id, 'image', url, imagePath, imageUrl);
      fileId = existingFile.file_id;
    } else {
      fileId = await projectModel.addFileRecord(project_id, feature_id, 'image', url, imagePath, imageUrl);
    }

    res.status(200).json({
      message: 'Image saved successfully',
      project_id,
      feature_id,
      file_id: fileId.toString(),
      path: imagePath,
      url: imageUrl,
      imageName: imageName,
      feature: feature ?? '',
    });
  } catch (error) {
    logger.error('Error generating image from URL:', error.message);
    res.status(500).json({ message: 'Error generating image from URL', feature: feature ?? '' });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

module.exports = { saveImageFromURL, saveImageToDatabase };
