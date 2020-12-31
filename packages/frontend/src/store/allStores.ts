import { RootState } from '.'
import { UserState } from './modules/user'

export type AllStores = RootState & {
  user: UserState
}

export default AllStores
