'use client'
import { BookmarkIcon, BookmarkFilledIcon } from '@radix-ui/react-icons'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useTransition } from 'react';
import savePost from '@/actions/post/savePost';
import { toast } from 'sonner';
import { EllipsisHorizontalIcon, XMarkIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import unfollow from '@/actions/unfollow';
import hiddenPost from '@/actions/post/hiddenPost';

export const PostToolTip = ({postId}:{postId:number}) => {
  const [isPending, startTransition] = useTransition();
  const  savePostSubmit= (postId: {postId:number}) =>{
    startTransition(() => {
      savePost(postId)
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }

          if (data.success) {
            toast.success(data.success);
          }
        })
        // .catch(() => setError("Something went wrong!"));
    });
  }
  const unfollowTheAuthor = (postId: { postId: number }) => {
    startTransition(() => {
      unfollow(postId)
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }

          if (data.success) {
            toast.success(data.success);
          }
        })
      // .catch(() => setError("Something went wrong!"));
    });
  }
  const hideThePost = (postId: { postId: number }) => {
    startTransition(() => {
      hiddenPost(postId)
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }

          if (data.success) {
            toast.success(data.success);
          }
        })
      // .catch(() => setError("Something went wrong!"));
    });
  }
  return (
    <div className="flex items-center justify-center  gap-x-2 p-2">
      <Popover >
        <span className="aspect-square cursor-pointer overflow-hidden rounded-full  hover:bg-third-clr p-1">
          <PopoverTrigger>
            <EllipsisHorizontalIcon className="h-6 w-6" />
          </PopoverTrigger>
        </span>
        <PopoverContent className='w-[344px] p-0 rounded-md bg-secondary-clr border-transparent  drop-shadow-[rgba(0,0,0,0.2)_0px_0px_6px] '>
          <div className='flex flex-col grow shrink min-h-0 relative '>
            <ActionButton
              onClick={() => savePostSubmit({ postId })}
              icon={<BookmarkIcon className='w-5 h-5 stroke-white stroke-[0.5]' />}
              title="Save post"
              description="Add this to your saved items."
            />

            <ActionButton
              onClick={() => unfollowTheAuthor({ postId })}
              icon={<EyeSlashIcon className='w-5 h-5 stroke-white stroke-[0.5]' />}
              title="Unfollow The author"
              description="Stop seeing posts"
            />
          </div>
        </PopoverContent>

      </Popover>
      
      <button title="hidden the post" className="cursor-pointer overflow-hidden rounded-full p-1 hover:bg-third-clr"
        onClick={() => hideThePost({postId})}
      >
        <XMarkIcon className="h-6 w-6" />
      </button>
    </div>
  );
};

interface ActionButtonProps{
  onClick: () => void;
  icon: JSX.Element;
  title: String;
  description: String;
}
const ActionButton = ({ onClick, icon, title, description }: ActionButtonProps) => (
  <div className='px-2 m-2 rounded-sm flex shrink-0 items-center hover:bg-hover-overlay cursor-pointer'
    onClick={onClick}
  >
    <div className='mr-3 flex items-center justify-center'>
      {icon}
    </div>
    <div className='flex items-center justify-between min-w-0 grow select-none'>
      <div className='flex flex-col'>
        <div>
          <span className='text-primary-text text-[15px] font-medium'>{title}</span>
        </div>
        <div>
          <span className='text-secondary-text text-xs'>{description}</span>
        </div>
      </div>
    </div>
  </div>
);