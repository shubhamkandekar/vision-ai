import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const router = express.Router();


const openai = new OpenAI({
  apiKey: process.env.OpenAI_API_KEY,
});

router.route('/').get((req, res) => {
  res.status(200).json({ 'message': 'Hello from VisionAI!' });
});


router.route('/').post(async (req,res) => {

  const { prompt } = req.body;

  const aiResponse = await openai.images.generate({
    prompt,
    n: 1,
    size: '1024x1024',
    response_format: 'b64_json',
  });

  console.log("Unable to genertae image: ", aiResponse);


  res.status(200).json({ photo: aiResponse })
  
});


export default router;