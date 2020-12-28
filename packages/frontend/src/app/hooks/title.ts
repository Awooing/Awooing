import store, { RootActions } from '@/store'
import { onMounted } from 'vue'

/**
 * Sets the Vuex title state
 * based on the title parameter
 *
 * @param title The title
 */
export const setPageTitle = (title: string): Promise<unknown> =>
  store.dispatch(RootActions.setTitle, title)

/**
 * Set Current Page Title
 * Sets the title based on the current Vuex state
 */
export const setCurrentPageTitle = (): Promise<unknown> =>
  store.dispatch(RootActions.setCurrentTitle)

/**
 * On Mounted Set Title
 * Set the title specified in param on component mount
 */
export const onMountedSetTitle = (title: string): unknown =>
  onMounted(() => setPageTitle(title))
