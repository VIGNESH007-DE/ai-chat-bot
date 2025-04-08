// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const PORT = 5000;

// Configure your OpenAI API key here
const configuration = new Configuration({
  apiKey: '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', // Replace this
});
const openai = new OpenAIApi(configuration);

app.use(cors());
app.use(bodyParser.json());

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo', // or gpt-4 if you have access
      messages: [{ role: 'user', content: userMessage }],
    });

    const response = completion.data.choices[0].message.content;
    res.json({ reply: response });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Something went wrong');
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
