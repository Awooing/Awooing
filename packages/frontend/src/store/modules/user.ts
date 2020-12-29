import UserDto from '@awooing/backend/src/dto/db/UserDto'
import { createStore, ActionTree, GetterTree, MutationTree } from 'vuex'

/**
 * Default UserState
 */
export const state = () => ({
  authenticated: false,
  user: null as UserDto | null
})

/**
 * TypeScript declarations
 */

export type UserState = ReturnType<typeof state>

export enum UserActions {
  setAuthenticated = 'app_auth_setAuthenticated',
  setUser = 'app_auth_setUser'
}

/**
 * Mutations
 */
const mutations: MutationTree<UserState> = {
  [UserActions.setAuthenticated]: (
    state,
    value: UserState['authenticated']
  ) => {
    state.authenticated = value
  },
  [UserActions.setUser]: (state, value: UserState['user']) =>
    (state.user = value)
}

/**
 * Actions
 */
const actions: ActionTree<UserState, UserState> = {
  [UserActions.setAuthenticated]: (
    { commit },
    value: UserState['authenticated']
  ) => commit(UserActions.setAuthenticated, value),
  [UserActions.setUser]: ({ commit }, value: UserState['user']) =>
    commit(UserActions.setUser, value)
}

/**
 * Getters
 */
const getters: GetterTree<UserState, UserState> = {
  getUser: state => () => state.user,
  isAuthenticated: state => () => state.authenticated
}
/**
 * Vuex UserStore
 */
const UserStore = createStore({
  state,
  mutations,
  actions,
  getters
})

export default UserStore
