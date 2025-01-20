function generateIntermediaryMatchPrompt(serviceDetails) {
  const { service, serviceTitle, serviceDesc, depth1, depth2, component, structure, content, cnt } = serviceDetails;

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
module.exports = generateIntermediaryMatchPrompt;
