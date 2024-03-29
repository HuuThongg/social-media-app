// 'use client'
import Image from 'next/image';
import { Earth } from '@/components/icon';
import Link from 'next/link';
import Engagement from './Engagement';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocal from 'dayjs/plugin/updateLocale';
import dayjs from 'dayjs';
dayjs().format();
import { User, PostLikes, PostToImg, Comments } from '@/drizzle/schema';

import ImageSection from './ImageSection';
import { Posts } from '@/drizzle/schema';

import { PostToolTip } from './post-tooltip';

dayjs.extend(relativeTime);
dayjs.extend(updateLocal);

dayjs.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s',
    s: '1m',
    m: '1m',
    mm: '%dm',
    h: '1h',
    hh: '%dh',
    d: '1d',
    dd: '%dd',
    M: '1M',
    MM: '%dM',
    y: '1y',
    yy: '%dy',
  },
});
type PostProps = {
  post: Posts & {
    comments: Comments[];
    postLikes: PostLikes[];
    author: User | null;
    postToImg: PostToImg[] | null;
  };
};

// this is how i past data to Post;
export default function Post({ post }: PostProps) {
  const content = post.content;
  const postId = post.id;
  // const content = postInfo.post.content;
  const authorAvatar = post.author?.image;
  const authorName = post.author?.name;
  const time = post.createdAt!;
  const imageUrl = post.postToImg?.[0]?.imgUrl;

  return (
    <div className="relative z-0 mb-4 w-full">
      <div className="relative z-0 w-full overflow-hidden rounded-lg bg-secondary-clr text-primary-text">
        {/* head */}
        <div className="flex items-start  px-4 pt-3">
          {/* avatar */}
          <div className="mr-2">
            <Link
              href={'/d'}
              className=" m-0 flex h-[40px] w-[40px] cursor-pointer overflow-hidden rounded-full p-0"
            >
              <Image src={authorAvatar!} alt="avatar " width={40} height={40} />
            </Link>
          </div>
          <div className="-mt-1 flex grow flex-col">
            <div className="my-1">
              <span className="block min-w-0 max-w-full break-words text-left text-xs font-semibold">
                <h4 className="mt-1 text-left">
                  <Link href={'/'} className="cursor-pointer hover:underline">
                    {authorName}
                  </Link>
                </h4>
              </span>
            </div>
            <div className="-my-1">
              <span className="block min-w-0 max-w-full break-words text-left text-xs font-normal">
                <span className="flex">
                  <span>
                    {' '}
                    {dayjs(time).fromNow()} · {'  '}
                  </span>
                  <Earth className=" ml-[3px] mt-[1px]" />
                </span>
              </span>
            </div>
          </div>
          <PostToolTip postId={postId} />
        </div>
        {/* actual content */}
        <div>
          {/* text */}
          <div className="p-4 pt-1">
            <div className="-mb-[5px] flex flex-col">
              <span className="min-w-0 max-w-full break-words ">{content}</span>
            </div>
          </div>
          {/* image/video */}
          {imageUrl && <ImageSection postId={postId} imageUrl={imageUrl} />}
        </div>
        {/* comment */}
        <Engagement
          comments={post.comments}
          postLikes={post.postLikes}
          author={post.author!}
          postId={post.id}
        />
      </div>
    </div>
  );
}
