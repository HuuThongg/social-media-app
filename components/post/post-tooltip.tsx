'use client';
import { BookmarkIcon, BookmarkFilledIcon } from '@radix-ui/react-icons';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useTransition } from 'react';
import savePost from '@/actions/post/savePost';
import { toast } from 'sonner';
import {
  EllipsisHorizontalIcon,
  XMarkIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/outline';
import unfollow from '@/actions/unfollow';
import hiddenPost from '@/actions/post/hiddenPost';

export const PostToolTip = ({ postId }: { postId: number }) => {
  const [isPending, startTransition] = useTransition();
  const savePostSubmit = (postId: { postId: number }) => {
    startTransition(() => {
      savePost(postId).then((data) => {
        if (data.error) {
          toast.error(data.error);
        }

        if (data.success) {
          toast.success(data.success);
        }
      });
      // .catch(() => setError("Something went wrong!"));
    });
  };
  const unfollowTheAuthor = (postId: { postId: number }) => {
    startTransition(() => {
      unfollow(postId).then((data) => {
        if (data.error) {
          toast.error(data.error);
        }

        if (data.success) {
          toast.success(data.success);
        }
      });
      // .catch(() => setError("Something went wrong!"));
    });
  };
  const hideThePost = (postId: { postId: number }) => {
    startTransition(() => {
      hiddenPost(postId).then((data) => {
        if (data.error) {
          toast.error(data.error);
        }

        if (data.success) {
          toast.success(data.success);
        }
      });
      // .catch(() => setError("Something went wrong!"));
    });
  };
  return (
    <div className="flex items-center justify-center  gap-x-2 p-2">
      <Popover>
        <span className="aspect-square cursor-pointer overflow-hidden rounded-full  p-1 hover:bg-third-clr">
          <PopoverTrigger>
            <EllipsisHorizontalIcon className="h-6 w-6" />
          </PopoverTrigger>
        </span>
        <PopoverContent className="w-[344px] rounded-md border-transparent bg-secondary-clr p-0  drop-shadow-[rgba(0,0,0,0.2)_0px_0px_6px] ">
          <div className="relative flex min-h-0 shrink grow flex-col ">
            <ActionButton
              onClick={() => savePostSubmit({ postId })}
              icon={
                <BookmarkIcon className="h-5 w-5 stroke-white stroke-[0.5]" />
              }
              title="Save post"
              description="Add this to your saved items."
            />

            <ActionButton
              onClick={() => unfollowTheAuthor({ postId })}
              icon={
                <EyeSlashIcon className="h-5 w-5 stroke-white stroke-[0.5]" />
              }
              title="Unfollow The author"
              description="Stop seeing posts"
            />
          </div>
        </PopoverContent>
      </Popover>

      <button
        title="hidden the post"
        className="cursor-pointer overflow-hidden rounded-full p-1 hover:bg-third-clr"
        onClick={() => hideThePost({ postId })}
      >
        <XMarkIcon className="h-6 w-6" />
      </button>
    </div>
  );
};

interface ActionButtonProps {
  onClick: () => void;
  icon: JSX.Element;
  title: String;
  description: String;
}
const ActionButton = ({
  onClick,
  icon,
  title,
  description,
}: ActionButtonProps) => (
  <div
    className="m-2 flex shrink-0 cursor-pointer items-center rounded-sm px-2 hover:bg-hover-overlay"
    onClick={onClick}
  >
    <div className="mr-3 flex items-center justify-center">{icon}</div>
    <div className="flex min-w-0 grow select-none items-center justify-between">
      <div className="flex flex-col">
        <div>
          <span className="text-[15px] font-medium text-primary-text">
            {title}
          </span>
        </div>
        <div>
          <span className="text-xs text-secondary-text">{description}</span>
        </div>
      </div>
    </div>
  </div>
);
