function generateShoppingMallPrompt(serviceDetails) {
  const { service, serviceTitle, serviceDesc, depth1, depth2, component, structure, content, cnt } = serviceDetails;

  if (depth2 === '상품 목록') {
    const categoryCnt = cnt ?? 5;
    return `Generate ${categoryCnt} categories, titles and descriptoins for the ${depth1} menu ${depth2} page on the '${component}' component of a ${service} website named ${serviceTitle}. 
      This website's purpose is: ${serviceDesc}. Follow this structure: ${JSON.stringify(structure)}. 
      
      Each category should fit the style and purpose of the website. Provide the response strictly in JSON format as follows:
      
      {
        "menu": "${depth1}",
        "feature": "${depth2}",
        "content": [
          {
            "productListCategories": "상품카테고리명"
            "productListProductTitle": "상품이름"
            "productListProductDesc": "상품설명"
          }
        ]        
      }
      
      Do not add any additional text or explanation. Only include the specified fields in JSON format. Answer in Korean.`;
  } else if (depth2 === '장바구니') {
    return `For the '${depth1}' menu and '${depth2}' feature on the '${component}' component of a ${service} website titled '${serviceTitle}', generate a virtual product name that could be added to the shopping cart.
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
    return `Please generate content for the '${depth1}' menu and '${depth2}' page in the '${component}' component of a '${service}' website titled '${serviceTitle}'. 
            
            This website's purpose is: ${serviceDesc}. Follow this structure: ${JSON.stringify(structure)}. 
      
            Here is an example of the expected JSON format:
      
            {
              "menu": "${depth1}",
              "feature": "${depth2}",
              "content": ${content},
            }
            
            Only include the specified fields in JSON format. Answer in Korean, without additional text.`;
  }
}

module.exports = generateShoppingMallPrompt;
