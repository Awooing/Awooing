import { HookNextFunction } from 'mongoose'
import { hash } from 'argon2'
import { prop, getModelForClass, pre } from '@typegoose/typegoose'
import slugify from 'slugify'

export type UserRole = 'User' | 'Admin'

@pre<User>('save', async function (next: HookNextFunction) {
  this.password = await hash(this.password)
  if (!this.sluggedUsername) this.sluggedUsername = slugify(this.username)
  next()
})
export class User {
  @prop({ required: true, unique: true })
  username!: string

  @prop({ required: false })
  sluggedUsername!: string

  @prop({ required: true })
  password!: string

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  @prop({ required: false, default: 'unset' })
  showAs: string = 'unset'

  @prop({ type: String, required: true, default: 'User' })
  role: UserRole = 'User'

  @prop({ required: false, default: '' })
  discordId?: string

  @prop({ required: true, default: new Date() })
  joinDate: Date = new Date()
}

export default getModelForClass(User)
