'use client';
import { startTransition } from 'react';
import { addFriend } from '@/actions/addFriend';

export const SubmitButton = ({
  userId1,
  userId2,
}: {
  userId1: string;
  userId2: string;
}) => {
  return (
    <button
      type="submit"
      onClick={async () => {
        startTransition(() => {
          addFriend(userId1, userId2);
        });
        alert('success!');
      }}
    >
      Add Friend
    </button>
  );
};
