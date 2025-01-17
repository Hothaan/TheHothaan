require('dotenv').config();
const axios = require('axios');
const apiKey = process.env.API_KEY_DEV;
const { assistantConfig } = require('../shared/assistantconfig.js');
const logger = require('../config/logger');
const mainValidator = require('./openAiResponseValidators/mainValidator.js');
const productListValidator = require('./openAiResponseValidators/productListValidator.js');
const validateProductDetail = require('./openAiResponseValidators/productDetailValidator.js');
const validateCartText = require('./openAiResponseValidators/cartValidator.js');

async function generateOpenAiText(
  service,
  serviceTitle,
  serviceDesc,
  depth1,
  depth2,
  component,
  structure,
  content,
  cnt,
) {
  try {
    let userPrompt;

    if (depth2 === '상품 목록' && cnt) {
      // 상품 목록용 프롬프트: cnt 개수만큼 카테고리 목록 생성
      userPrompt = `Generate ${cnt} categories, titles and descriptoins for the ${depth1} menu ${depth2} page on the '${component}' component of a ${service} website named ${serviceTitle}. 
        This website's purpose is: ${serviceDesc}. Follow this structure: ${JSON.stringify(structure)}. 
        
        Each category should fit the style and purpose of the website. Provide the response strictly in JSON format as follows:
        
        {
          "menu": "${depth1}",
          "feature": "${depth2}",
          "content": {
            "productListCategories": ["카테고리1", "카테고리2", ..., "카테고리${cnt}"]
            "productListProductTitle": ["상품이름1", "상품이름2", ..., "상품이름${cnt}"]
            "productListProductDesc": ["상품설명1", "상품설명2", ..., "상품설명${cnt}"]
          }
        }
        
        Do not add any additional text or explanation. Only include the specified fields in JSON format. Answer in Korean.`;
    } else if (depth2 === '장바구니') {
      // 장바구니에 담길 상품명 생성
      userPrompt = `For the '${depth1}' menu and '${depth2}' feature on the '${component}' component of a ${service} website titled '${serviceTitle}', generate a virtual product name that could be added to the shopping cart.
        The purpose of this feature is: ${serviceDesc}. 

        Follow this structure: ${JSON.stringify(structure)}.         
        Here is the expected format:
        
        {
          "menu": "${depth1}",
          "feature": "${depth2}",
          "content": {
            "cartTitle": "${content.cartTitle}"
          }
        }
        
        Replace "Generated Product Name" with a realistic and creative product name that aligns with the website's purpose and target audience. Provide the response strictly in JSON format without any additional text. Answer in Korean.`;
    } else {
      if (!structure || structure === '') {
        // structure가 빈 값일 때 content를 "none"으로 처리
        userPrompt = `For the '${depth1}' menu and '${depth2}' feature on the '${component}' component of a '${service}' website titled '${serviceTitle}', 
          the structure is undefined or empty. Provide the response strictly in JSON format as follows:
          
          {
            "menu": "${depth1}",
            "feature": "${depth2}",
            "content": "none"
          }
          
          Do not add any additional text or explanation. Only include the specified fields in JSON format.`;
      } else {
        // 일반적인 구조 (title과 desc가 있는 경우)
        userPrompt = `Please generate content for the '${depth1}' menu and '${depth2}' page in the '${component}' component of a '${service}' website titled '${serviceTitle}'. 
          
          This website's purpose is: ${serviceDesc}. Follow this structure: ${JSON.stringify(structure)}. 
    
          Here is an example of the expected JSON format:
    
          {
            "menu": "${depth1}",
            "feature": "${depth2}",
            "content": {
              "title": "${content.title}",
              "desc": "${content.desc}"
            }
          }
          
          Only include the specified fields in JSON format. Answer in Korean, without additional text.`;
      }
    }

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `${assistantConfig[service]}`,
          },
          {
            role: 'user',
            content: userPrompt,
          },
        ],
        temperature: 1,
        top_p: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      },
    );

    const contentResponse = response.data.choices[0].message.content;

    if (depth2 === '상품 상세') {
      console.log('Raw response content:', contentResponse);
      console.log('reponse type:', typeof contentResponse);
      console.log('parsed response:', JSON.parse(contentResponse));
    }

    let responseData;
    try {
      responseData = JSON.parse(contentResponse);
    } catch (parseError) {
      console.error('Failed to parse OpenAI response as JSON:', contentResponse);
      throw new Error('OpenAI API 응답이 JSON 형식이 아닙니다.');
    }

    // 유효성 검사: 상품 목록일 때 카테고리 배열 확인
    let isValidResponse = false;
    if (structure === null || (structure === '' && responseData.content === 'none')) {
      isValidResponse = true;
    } else if (depth2 === '상품 목록' && productListValidator(responseData, cnt)) {
      isValidResponse = true;
    } else if (
      responseData.menu &&
      responseData.feature &&
      responseData.content &&
      responseData.content.title &&
      responseData.content.desc
    ) {
      isValidResponse = true;
    } else if (depth2 === '메인' && mainValidator(responseData)) {
      isValidResponse = true;
    } else if (depth2 === '상품 상세' && validateProductDetail(responseData)) {
      isValidResponse = true;
    } else if (depth2 === '장바구니' && validateCartText(responseData)) {
      isValidResponse = true;
    }

    if (isValidResponse) {
      return responseData;
    } else {
      console.warn('응답이 예상한 JSON 구조와 일치하지 않습니다:', responseData);
      throw new Error('OpenAI API가 예상한 JSON 형식을 반환하지 않았습니다.');
    }
  } catch (error) {
    logger.error('OpenAI API 호출 중 오류 발생', error);
    throw error;
  }
}

module.exports = { generateOpenAiText };
