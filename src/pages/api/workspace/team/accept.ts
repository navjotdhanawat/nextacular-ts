import { InvitationStatus } from '@prisma/client';
import { updateStatus } from '@/prisma/services/membership';

import { validateSession } from '@/config/api-validation';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === 'PUT') {
    await validateSession(req, res);
    const { memberId } = req.body;
    await updateStatus(memberId, InvitationStatus.ACCEPTED);
    res.status(200).json({ data: { updatedAt: new Date() } });
  } else {
    res
      .status(405)
      .json({ errors: { error: { msg: `${method} method unsupported` } } });
  }
};

export default handler;