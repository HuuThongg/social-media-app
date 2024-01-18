'use client';
import React, { useId, useState } from 'react';
import {
  ChevronDownIcon,
  FaceSmileIcon,
  PhotoIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';
import TextareaAutosize from 'react-textarea-autosize';
import commentFn from '@/actions/post/commentFn';
import { useCurrentUser } from '@/hooks/use-current-user';
import { UserButton } from '@/components/auth/user-button';

interface TypeCommentProps {
  postId: number;
  parentId?: number | null;
}

const TypeComment = ({ postId, parentId }: TypeCommentProps) => {
  const user = useCurrentUser();
  const [text, setText] = useState('');
  const [isWritingCommentOpen, setIsWritingCommentOpen] = useState(false);
  const avatarId = useId();
  const onChangeInputText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  const scrollStyle =
    'scrollbar-thumb-fifth-clr scrollbar-track-transparent hover:scrollbar-track-[#2c2d2f]  scrollbar   scrollbar-w-2 scrollbar-thumb-rounded-md';
  async function onCreateComment(formData: FormData) {
    console.log('pppp' + parentId);
    await commentFn(formData);
    setText('');
    setIsWritingCommentOpen(!isWritingCommentOpen);
    // form.reset();
    // setSelectedFile([]);
    // setIsModalOpen(!isModalOpen);
    // router.refresh();
  }
  return (
    <div>
      <div className="my-1 px-4">
        <div className="relative flex items-start  ">
          {/* avatar */}
          <div className="mr-[6px] mt-[2px]">
            <button
              className="relative m-0 inline-flex min-h-0 min-w-0 rounded-full p-0"
              tabIndex={-1}
              aria-hidden="true"
            >
              <div className="relative flex h-[32px] w-[32px] items-stretch">
                <UserButton className="h-8 w-8" />

                <div className="absolute  bottom-[5px] right-[5px]  z-[2]  translate-x-1/2 translate-y-1/2   overflow-hidden rounded-full  bg-third-clr ">
                  <div className="rounded-full p-[2px]">
                    <span>
                      <ChevronDownIcon className="h-3 w-3 stroke-secondary-text stroke-2" />
                    </span>
                  </div>
                </div>
              </div>
            </button>
          </div>
          <div className="flex flex-1 flex-col overflow-hidden">
            <form
              action={onCreateComment}
              className="relative  m-0 flex grow flex-wrap justify-between  rounded-2xl  bg-third-clr p-0   text-xs"
            >
              {/* type here */}
              <input
                className=" sr-only"
                type="number"
                name="postId"
                readOnly
                value={postId}
              />
              <input
                className="sr-only"
                type="number"
                name="parentId"
                value={parentId !== null ? parentId : undefined}
                readOnly
              />

              <TextareaAutosize
                minRows={1}
                maxRows={6}
                name="comment"
                placeholder="Write a comment..."
                value={text}
                style={{ height: 45 }}
                className={`grow   resize-none bg-transparent px-3 py-2 text-primary-text ${scrollStyle}`}
                onChange={onChangeInputText}
                onFocus={() => setIsWritingCommentOpen(true)}
              />
              {!isWritingCommentOpen && (
                <div className="flex shrink-0 grow-0 ">
                  <div className=" flex flex-wrap items-center  justify-end px-2">
                    <ul className="-ml-1 flex h-[36px] items-center p-1 text-xs">
                      <li className="-mx-[3px]  flex h-full w-[32px] items-center justify-center rounded-full hover:bg-fourth-clr">
                        <span>
                          <FaceSmileIcon className="h-4 w-4 stroke-secondary-text stroke-2" />
                        </span>
                      </li>
                      <li className="-mx-[3px]  flex h-full w-[32px] items-center justify-center rounded-full hover:bg-fourth-clr">
                        <span>
                          <PhotoIcon className="h-4 w-4 stroke-secondary-text stroke-2" />
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
              {/*  icons, gift , images */}
              {isWritingCommentOpen && (
                <div className="flex w-full pb-[6px]">
                  <div className=" flex w-full flex-wrap items-center justify-between px-2 ">
                    <ul className="-ml-1 flex h-[36px] items-center p-1 text-xs">
                      <li className="-mx-[3px]  flex h-full w-[32px] items-center justify-center rounded-full hover:bg-fourth-clr">
                        <span>
                          <FaceSmileIcon className="h-4 w-4 stroke-secondary-text stroke-2" />
                        </span>
                      </li>
                      <li className="-mx-[3px]  flex h-full w-[32px] items-center justify-center rounded-full hover:bg-fourth-clr">
                        <span>
                          <PhotoIcon className="h-4 w-4 stroke-secondary-text stroke-2" />
                        </span>
                      </li>
                    </ul>
                    <button
                      type="submit"
                      title="Post Comment"
                      className="flex cursor-pointer items-center justify-center rounded-full p-2 transition-colors hover:bg-gray-500 "
                    >
                      <span>
                        <PaperAirplaneIcon className="h-4 w-4 stroke-secondary-text stroke-2" />
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypeComment;
