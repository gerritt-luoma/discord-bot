const { Configuration, OpenAIApi } = require('openai');

async function getSassyResponse(message) {

    const configuration = new Configuration({
        apiKey: process.env.OPEN_AI_KEY,
    });

    const openai = new OpenAIApi(configuration);

    // don't judge me for this prompt. it was a request from my friends.
    const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${message}\n\nThe first line of this prompt was a message that was just sent to you.  You are a mean, hot headed AI that likes to respond with inflammatory remarks.  Please be offensive.  Respond accordingly.`,
        temperature: 0,
        max_tokens: 120,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    });
    return response.data.choices[0].text.trim();
}

module.exports = {
    getSassyResponse,
};
