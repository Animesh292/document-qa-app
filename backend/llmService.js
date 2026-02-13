const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);


async function checkLLMConnection() {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const result = await model.generateContent('Hello');
    return true;
  } catch (error) {
    console.error('LLM connection check failed:', error.message);
    return false;
  }
}

/**
 * Ask a question based on uploaded documents
 * @param {string} question - The user's question
 * @param {Array} documentContents - Array of {filename, content}
 * @returns {Object} - {answer, source, relevantText}
 */

async function askQuestion(question, documentContents) {
  try { 
    let context = '';
    documentContents.forEach((doc, index) => {
      context += `\n\n--- Document ${index + 1}: ${doc.filename} ---\n${doc.content}`;
    });

    const prompt = `You are a helpful assistant that answers questions based on provided documents.

Below are the documents:
${context}

Question: ${question}

Instructions:
1. Answer the question based ONLY on the information in the documents above
2. Identify which document contains the answer
3. Quote the relevant text from that document
4. If the answer is not in the documents, say "I cannot find the answer in the provided documents"

Respond in the following JSON format:
{
  "answer": "your answer here",
  "source": "filename of the document",
  "relevantText": "exact quote from the document that supports your answer"
}`;

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();
    
    // Try to parse JSON response
    let parsedResponse;
    try {
      // Remove markdown code blocks if present
      const cleanedResponse = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      parsedResponse = JSON.parse(cleanedResponse);
    } catch (parseError) {
      // If JSON parsing fails, return a formatted response
      parsedResponse = {
        answer: responseText,
        source: 'Unable to determine',
        relevantText: 'Unable to extract specific text'
      };
    }

    return {
      answer: parsedResponse.answer || responseText,
      source: parsedResponse.source || 'Unknown',
      relevantText: parsedResponse.relevantText || ''
    };

  } catch (error) {
    console.error('Error in askQuestion:', error);
    throw new Error(`Failed to get answer from LLM: ${error.message}`);
  }
}

module.exports = {
  checkLLMConnection,
  askQuestion
};
