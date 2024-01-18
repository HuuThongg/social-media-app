'use client';
import { SocketProvider } from './socket-provider';
import { TanstackProvider } from './tanstack-provider';

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <TanstackProvider>
      <SocketProvider>{children}</SocketProvider>
    </TanstackProvider>
  );
}
