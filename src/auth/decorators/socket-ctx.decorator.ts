import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { Socket } from 'socket.io';

import { AuthenticationContext } from '../types';

export const SocketCtx = createParamDecorator(
  (field: keyof Partial<AuthenticationContext> | undefined, context: ExecutionContext) => {
    const { handshake }: Socket = context.switchToHttp().getRequest();

    if (field === undefined) {
      return handshake.auth.id;
    }

    return field ? handshake.auth[field] : handshake.auth;
  },
);
