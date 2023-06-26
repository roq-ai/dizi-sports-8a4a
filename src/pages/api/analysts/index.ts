import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { analystValidationSchema } from 'validationSchema/analysts';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getAnalysts();
    case 'POST':
      return createAnalyst();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getAnalysts() {
    const data = await prisma.analyst
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'analyst'));
    return res.status(200).json(data);
  }

  async function createAnalyst() {
    await analystValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.cricket_stat?.length > 0) {
      const create_cricket_stat = body.cricket_stat;
      body.cricket_stat = {
        create: create_cricket_stat,
      };
    } else {
      delete body.cricket_stat;
    }
    const data = await prisma.analyst.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
