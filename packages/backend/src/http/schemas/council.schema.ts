import { RouteGenericInterface } from 'fastify/types/route'

export interface Create extends RouteGenericInterface {
  Body: {
    name: string
    description: string
    role: string
  }
}
