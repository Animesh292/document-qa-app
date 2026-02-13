require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function testConnection() {
    console.log('Testing Gemini API connection...');
    console.log('API Key:', process.env.GOOGLE_API_KEY ? 'Set (length: ' + process.env.GOOGLE_API_KEY.length + ')' : 'NOT SET');

    try {
        // Try gemini-2.5-flash first
        console.log('\nTrying model: gemini-2.5-flash');
        const model1 = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
        const result1 = await model1.generateContent('Hello');
        console.log('✅ SUCCESS with gemini-2.5-flash');
        console.log('Response:', result1.response.text());
    } catch (error) {
        console.log('❌ FAILED with gemini-2.5-flash');
        console.log('Error:', error.message);

        // Try gemini-1.5-flash as fallback
        try {
            console.log('\nTrying fallback model: gemini-1.5-flash');
            const model2 = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
            const result2 = await model2.generateContent('Hello');
            console.log('✅ SUCCESS with gemini-1.5-flash');
            console.log('Response:', result2.response.text());
        } catch (error2) {
            console.log('❌ FAILED with gemini-1.5-flash');
            console.log('Error:', error2.message);

            // Try gemini-pro as last resort
            try {
                console.log('\nTrying fallback model: gemini-pro');
                const model3 = genAI.getGenerativeModel({ model: 'gemini-pro' });
                const result3 = await model3.generateContent('Hello');
                console.log('✅ SUCCESS with gemini-pro');
                console.log('Response:', result3.response.text());
            } catch (error3) {
                console.log('❌ FAILED with gemini-pro');
                console.log('Error:', error3.message);
            }
        }
    }
}

testConnection();
