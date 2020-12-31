import CouncilMember from '../../db/entity/CouncilMember'
import { Fasteer as F } from '@fasteerjs/fasteer'
import { successRes } from '../helpers/response.helper'
import CouncilMemberDto from '../../dto/db/CouncilMemberDto'
import { useUserContext } from '../context/user.context'
import * as CS from '../schemas/council.schema'

export const routePrefix = '/council'

export const CouncilController: F.FCtrl = async fastify => {
  fastify.get('/', async (req, res) => {
    const members = await CouncilMember.find()
    return successRes(
      { members: await CouncilMemberDto.fromMembers(members) },
      res
    )
  })

  fastify.put<CS.Create>(
    '/create',
    {
      schema: {
        body: {
          type: 'object',
          required: ['name', 'description', 'role'],
          properties: {
            name: {
              type: 'string',
            },
            description: {
              type: 'string',
            },
            role: {
              type: 'string',
            },
          },
        },
      },
    },
    async (req, res) => {
      const ctx = await useUserContext(req, 'Admin')
      if (!ctx.success) return res.send(ctx)

      const article = await CouncilMember.create({
        name: req.body.name,
        position: req.body.role,
        about: req.body.description,
        discordId: '0',
      })

      return successRes(
        {
          message: 'Created',
          article: await CouncilMemberDto.fromMember(article, false),
        },
        res
      )
    }
  )
}

export default CouncilController

// async function createMemberObject(member: ICouncilMember) {
//   const avatar = await discordRepo.getAvatarUrlById(member.discordId)
//   return {
//     councilId: member._id,
//     name: member.name,
//     position: member.position,
//     about: member.about,
//     discord: {
//       id: member.discordId,
//       avatar: avatar,
//     },
//   }
// }
