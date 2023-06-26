import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { cricketStatValidationSchema } from 'validationSchema/cricket-stats';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.cricket_stat
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getCricketStatById();
    case 'PUT':
      return updateCricketStatById();
    case 'DELETE':
      return deleteCricketStatById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getCricketStatById() {
    const data = await prisma.cricket_stat.findFirst(convertQueryToPrismaUtil(req.query, 'cricket_stat'));
    return res.status(200).json(data);
  }

  async function updateCricketStatById() {
    await cricketStatValidationSchema.validate(req.body);
    const data = await prisma.cricket_stat.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteCricketStatById() {
    const data = await prisma.cricket_stat.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
