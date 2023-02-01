import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()
const configuration = new Configuration({
  // apiKey: "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",
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from Crypken!'
  })
})

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      // model: "davinci:ft-personal-2023-01-31-15-00-00",
      // prompt: `${prompt}\n\n###\n\n`,
      prompt: `${prompt}`,
      // temperature: 0, // Higher values means the model will take more risks.
      // max_tokens: 1000,
      // top_p: 1, // alternative to sampling with temperature, called nucleus sampling
      // frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
      // presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.

      max_tokens: 100,
      temperature: 0,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: [" #END#"]
    });

    res.status(200).send({
      bot: response.data.choices[0].text
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

app.listen(5000, () => console.log('AI server started on http://localhost:5000'))