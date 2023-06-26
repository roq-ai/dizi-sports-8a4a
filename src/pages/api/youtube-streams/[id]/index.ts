import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { youtubeStreamValidationSchema } from 'validationSchema/youtube-streams';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.youtube_stream
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getYoutubeStreamById();
    case 'PUT':
      return updateYoutubeStreamById();
    case 'DELETE':
      return deleteYoutubeStreamById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getYoutubeStreamById() {
    const data = await prisma.youtube_stream.findFirst(convertQueryToPrismaUtil(req.query, 'youtube_stream'));
    return res.status(200).json(data);
  }

  async function updateYoutubeStreamById() {
    await youtubeStreamValidationSchema.validate(req.body);
    const data = await prisma.youtube_stream.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteYoutubeStreamById() {
    const data = await prisma.youtube_stream.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
