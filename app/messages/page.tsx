import React from 'react';
import { PaperPlaneIcon } from '@radix-ui/react-icons';
export default function MessagesPage() {
  return (
    <div className="flex min-w-0 max-w-full shrink  grow flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div>
          <PaperPlaneIcon className="h-10 w-10 stroke-white " />
        </div>
        <span className="font-sans text-xl font-medium text-primary-text">
          No chats selected
        </span>
      </div>
    </div>
  );
}
