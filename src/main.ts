import { input } from './lib/util/input';
import { println } from './lib/util/print';
import { yellow } from './lib/util/style';
import { OPENAI_BASE_URL, OPENAPI_API_KEY } from './lib/env';
import os from 'node:os';
import GptService from './gpt.service';

async function main() {
  const gptService = await GptService.createInstance({
    apiKey: OPENAPI_API_KEY,
    baseURL: OPENAI_BASE_URL,
    model: 'gpt-3.5-turbo',
  });

  const initialResponse = await gptService.send({
    role: 'system',
    content: `
      Act as an assistant AI that is willing to answer any topic. 
      Make your answers humanly as possible, straightforward, and short. 
      My first statement is "Hi there."
    `.trim(),
  });

  println(yellow(initialResponse));

  while (true) {
    const message = (await input('> ')).trim();
    if (!message) continue;
    if (message === 'exit') process.exit(0);
    try {
      const response = await gptService.send({
        role: 'user',
        content: message,
      });
      println(os.EOL, yellow(response));
    } catch (error: unknown) {
      if (error instanceof Error) {
        println(os.EOL, yellow(error.message));
      }
    }
  }
}

console.clear();
void main();
