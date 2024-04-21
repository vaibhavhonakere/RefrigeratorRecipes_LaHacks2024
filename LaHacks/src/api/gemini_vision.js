const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyAsKBGP2QrjC9qU7BT_RZYoIUhBrpqThfQ");

// Converts local file information to a GoogleGenerativeAI.Part object.
function fileToGenerativePart(base64, mimeType) {
  return {
    inlineData: {
      data: base64,
      mimeType
    },
  };
}

export async function getGeminiVisionRes(base64) {
  
  // For text-and-image input (multimodal), use the gemini-pro-vision model
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

  const prompt = "Give me a Javascript string array of the name of all the food ingrediants found in the photo. Only return the Javascript string array in your response, do not return anything else.";

  const imageParts = [
    fileToGenerativePart(base64, "image/png")
  ];

  const result = await model.generateContent([prompt, ...imageParts]);
  const response = await result.response;
  const text = response.text();
  return text;
}
