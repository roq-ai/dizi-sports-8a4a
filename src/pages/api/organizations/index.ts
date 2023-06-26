import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { organizationValidationSchema } from 'validationSchema/organizations';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getOrganizations();
    case 'POST':
      return createOrganization();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getOrganizations() {
    const data = await prisma.organization
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'organization'));
    return res.status(200).json(data);
  }

  async function createOrganization() {
    await organizationValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.analyst?.length > 0) {
      const create_analyst = body.analyst;
      body.analyst = {
        create: create_analyst,
      };
    } else {
      delete body.analyst;
    }
    if (body?.blog?.length > 0) {
      const create_blog = body.blog;
      body.blog = {
        create: create_blog,
      };
    } else {
      delete body.blog;
    }
    if (body?.live_score?.length > 0) {
      const create_live_score = body.live_score;
      body.live_score = {
        create: create_live_score,
      };
    } else {
      delete body.live_score;
    }
    if (body?.youtube_stream?.length > 0) {
      const create_youtube_stream = body.youtube_stream;
      body.youtube_stream = {
        create: create_youtube_stream,
      };
    } else {
      delete body.youtube_stream;
    }
    const data = await prisma.organization.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
