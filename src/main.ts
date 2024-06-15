import { input } from './lib/util/input';
import { println } from './lib/util/print';
import { yellow } from './lib/util/style';
import GptService from './gpt.service';
import path from 'node:path';
import os from 'node:os';
import dotenv from 'dotenv';

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

async function main() {
  const apiKey = process.env.OPENAPI_API_KEY;
  const baseURL = process.env.OPENAI_BASE_URL;
  const gptService = await GptService.createInstance({
    apiKey,
    baseURL,
    maxRetries: 5,
    model: 'gpt-3.5-turbo',
  });

  const initialResponse = await gptService.sendMessage({
    role: 'system',
    content: `
      Act as an assistant AI that is willing to answer any topic. 
      Make your answers humanly as possible, straightforward, and short. 
      My first statement is "Hi there"
    `.trim(),
  });

  println(yellow(initialResponse));

  while (true) {
    const message = await input('> ');
    if (!message) continue;
    const response = await gptService.sendMessage({
      role: 'user',
      content: message,
    });
    println(os.EOL, yellow(response));
  }
}

void main();
