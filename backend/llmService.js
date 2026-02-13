const Groq = require('groq-sdk');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

async function checkLLMConnection() {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: 'Hello' }],
      model: 'llama-3.3-70b-versatile',
      max_tokens: 10
    });
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

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.3,
      max_tokens: 1024
    });

    const responseText = chatCompletion.choices[0]?.message?.content?.trim() || '';

    let parsedResponse;
    try {
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
