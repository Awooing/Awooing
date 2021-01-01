// eslint-disable-next-line
// @ts-ignore
import topbar from 'topbar'
import { TOPBAR_SETTINGS } from './utils/constants'

export interface TopbarSettings {
  autoRun?: boolean
  barThickness?: number
  barColors?: {
    [key: string]: string
  }
  shadowBlur?: number
  shadowColor?: string
  className?: string
}

/**
 * Class wrapper for the topbar library
 *
 * This wrapper is in place as the library does not have
 * any TypeScript definitions, and this is way easier than writing own declaration file.
 *
 * This also allows us to easily add custom functions for manipulation with the topbar.
 */
export class Topbar {
  topbar: typeof topbar

  constructor(settings: TopbarSettings = TOPBAR_SETTINGS) {
    topbar.config(settings)
  }

  /**
   * Show the topbar
   */
  show(): void {
    return topbar.show()
  }

  /**
   * Hide the topbar
   */
  hide(): void {
    return topbar.hide()
  }

  /**
   * Progress
   *
   * Returns the topbar progress status.
   * Additionally, the status can be changed by passing a number
   * (or a string that can be casted to a number) to the "to" parameter.
   *
   * @param {string | number} to Set progress status
   */
  progress(to?: string | number): number {
    return topbar.progress(to)
  }

  /**
   * Promised Topbar
   *
   * This is useful for eg. data fetching,
   * when this function is called, the topbar appears and
   * hides upon resolving of the promise passed in the "promise" parameter.
   *
   * @param {Promise<any>} promise Promise to toggle Topbar upon
   */
  promised<TPromise extends Promise<unknown> = Promise<unknown>>(
    promise: TPromise
  ): TPromise {
    this.show()
    promise.then(this.hide)
    promise.catch(this.hide)
    return promise
  }
}

/**
 * The default instance of Topbar,
 * created on page load.
 */
export const awooBar = new Topbar()

/**
 * Shorthand for the awooBar constant.
 */
export const bar = awooBar

export default Topbar
