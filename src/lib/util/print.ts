import os from 'node:os';

export function print(...input: Array<Input>): void {
  process.stdout.write(input.join(''));
}

export function println(...input: Array<Input>): void {
  print(...input, os.EOL);
}

export type Input = string | number;
