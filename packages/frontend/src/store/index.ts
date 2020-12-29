import { createStore, ActionTree, GetterTree, MutationTree } from 'vuex'
import vuexUser from './modules/user'

/**
 * Default RootState
 */
export const state = () => ({
  title: 'default'
})

/**
 * TypeScript declarations
 */

export type RootState = ReturnType<typeof state>

export enum RootActions {
  setTitle = 'app_setTitle',
  setCurrentTitle = 'app_setCurrentTitle'
}

const defaultTitle = 'The Awooing Place'

/**
 * Mutations
 */
const mutations: MutationTree<RootState> = {
  [RootActions.setTitle]: (state, value) => {
    document.title =
      value === defaultTitle ? 'Awooing.moe' : `${value} | Awooing.moe`
    state.title = value
  },
  [RootActions.setCurrentTitle]: state =>
    (document.title =
      state.title === defaultTitle
        ? 'Awooing.moe'
        : `${state.title} | Awooing.moe`)
}

/**
 * Actions
 */
const actions: ActionTree<RootState, RootState> = {
  [RootActions.setTitle]: ({ commit }, value) =>
    commit(RootActions.setTitle, value),
  [RootActions.setCurrentTitle]: ({ commit }) =>
    commit(RootActions.setCurrentTitle)
}

/**
 * Getters
 */
const getters: GetterTree<RootState, RootState> = {
  getTitle: state => state.title
}

/**
 * Vuex RootStore
 */
const RootStore = createStore({
  state,
  mutations,
  actions,
  modules: {
    user: vuexUser
  },
  getters
})

export default RootStore
