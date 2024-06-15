import type { Input } from './print';

export enum STYLE {
  Reset = '\x1b[0m',
  Bold = '\x1b[1m',
  Italic = '\x1b[3m',
  Underline = '\x1b[4m',
  Inverse = '\x1b[7m',
  Strikethrough = '\x1b[9m',
  Black = '\x1b[30m',
  Red = '\x1b[31m',
  Green = '\x1b[32m',
  Yellow = '\x1b[33m',
  Blue = '\x1b[34m',
  Magenta = '\x1b[35m',
  Cyan = '\x1b[36m',
  White = '\x1b[37m',
  BgBlack = '\x1b[40m',
  BgRed = '\x1b[41m',
  BgGreen = '\x1b[42m',
  BgYellow = '\x1b[43m',
  BgBlue = '\x1b[44m',
  BgMagenta = '\x1b[45m',
  BgCyan = '\x1b[46m',
  BgWhite = '\x1b[47m',
}

interface CreateStyleReturnType {
  (...input: Array<Input>): string;
}

export function createStyle(...styles: STYLE[]): CreateStyleReturnType {
  return (...input) => styles.join('') + input.join('') + STYLE.Reset;
}

export const reset = createStyle(STYLE.Reset);

export const bold = createStyle(STYLE.Bold);

export const italic = createStyle(STYLE.Italic);

export const underline = createStyle(STYLE.Underline);

export const inverse = createStyle(STYLE.Inverse);

export const strikethrough = createStyle(STYLE.Strikethrough);

export const black = createStyle(STYLE.Black);

export const red = createStyle(STYLE.Red);

export const green = createStyle(STYLE.Green);

export const yellow = createStyle(STYLE.Yellow);

export const blue = createStyle(STYLE.Blue);

export const magenta = createStyle(STYLE.Magenta);

export const cyan = createStyle(STYLE.Cyan);

export const white = createStyle(STYLE.White);

export const bgBlack = createStyle(STYLE.BgBlack);

export const bgRed = createStyle(STYLE.BgRed);

export const bgGreen = createStyle(STYLE.BgGreen);

export const bgYellow = createStyle(STYLE.BgYellow);

export const bgBlue = createStyle(STYLE.BgBlue);

export const bgMagenta = createStyle(STYLE.BgMagenta);

export const bgCyan = createStyle(STYLE.BgCyan);

export const bgWhite = createStyle(STYLE.BgWhite);
