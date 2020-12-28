import chalk from 'chalk'

export const frmt = (...strings: unknown[]): string =>
  chalk.hex('#8f53ee')('[Awooing]', chalk.hex('#67dbf0')(strings.join(' ')))

export const mdb = (): string => chalk.magenta('[MongoDB]')
export const cdn = (): string => chalk.magentaBright('[Cdn]')
export const dc = (): string => chalk.blueBright('[Discord]')

export const err = (...strings: unknown[]): string =>
  chalk.red(strings.join(' '))
