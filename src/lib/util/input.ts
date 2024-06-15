import readline from 'node:readline';

export async function input(question: string = ''): Promise<string> {
  const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const data = await new Promise<string>((resolve) => {
    readlineInterface.question(question, resolve);
  });

  readlineInterface.close();

  return data;
}
