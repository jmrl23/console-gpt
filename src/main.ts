import os from 'node:os';
import GptService from './gpt.service';
import { input } from './lib/util/input';
import { println } from './lib/util/print';
import { yellow } from './lib/util/style';

async function main() {
  await import('./lib/env');
  const gptService = await GptService.createInstance({
    model: 'gpt-3.5-turbo',
    initialPrompt: `
      Act as an assistant AI that is willing to answer any topic. 
      Make your answers humanly as possible, straightforward, and short. 
    `.trim(),
  });

  println(yellow('You may now start asking'));

  while (true) {
    const message = (await input('> ')).trim();
    if (!message) continue;
    if (message === 'exit') process.exit(0);
    const response = await gptService.send({
      role: 'user',
      content: message,
    });
    println(os.EOL, yellow(response));
  }
}

console.clear();
void main();
