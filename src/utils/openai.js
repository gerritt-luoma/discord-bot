const { Configuration, OpenAIApi } = require('openai');

const prompts = {
    lamar: 'Please generate your response to the prompt in the form of Lamar Davis from Grand Theft Auto 5.  He is rude and has no chill.',
};

async function getResponse(message, key = null) {

    // Moving client into function because the environment variable wasn't being loaded
    const configuration = new Configuration({
        apiKey: process.env.OPEN_AI_KEY,
    });

    const openai = new OpenAIApi(configuration);

    // I moved the default prompt to my environment variables to allow easy switching
    const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${message}\n\nThe first line of this prompt was a message that was just sent to you.  You are a bot named Jeff.  ${prompts[key] ? prompts[key] : process.env.MENTIONED_PROMPT}  Respond accordingly.`,
        temperature: 0,
        max_tokens: 120,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    });
    return response.data.choices[0].text.trim();
}

module.exports = {
    getResponse,
};
