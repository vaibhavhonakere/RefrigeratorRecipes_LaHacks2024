const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyAsKBGP2QrjC9qU7BT_RZYoIUhBrpqThfQ");

function fileToGenerativePart(base64, mimeType) {
    return {
        inlineData: {
            data: base64,
            mimeType
        },
    };
}

export async function getGeminiRecipe(dishName) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Give me a list of steps for making ${dishName} as an array of steps. 
    Return the result as an object
    Example:
    {
    "summary": "100 words max",
    "ingredients" : ["a", "b", "c"], 
    "steps" : [
        "Instructions", 
         "Instructions", 
         "Instructions"
    ]
   }`;

    const result = await model.generateContent([prompt]);
    const response = await result.response;
    const text = response.text();
    return text;
}


