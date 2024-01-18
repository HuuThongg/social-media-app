import { useInfiniteQuery } from '@tanstack/react-query';
import qs from 'query-string';

interface NotiQueryProps {
  queryKey: string;
  apiUrl: string;
  paramKey: 'channelId' | 'conversationId';
  paramValue: string;
}
export const useNotiQuery = ({ queryKey, apiUrl }: NotiQueryProps) => {
  const fetchNotifications = async ({ pageParam = undefined }) => {
    const url = qs.stringifyUrl(
      {
        url: apiUrl,
        query: {
          cursor: pageParam,
          // [paramKey]: paramValue,
        },
      },
      { skipNull: true },
    );

    const res = await fetch(url);
    return res.json();
  };
  // const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
  //   useInfiniteQuery({
  //     queryKey: queryKey,
  //     queryFn: fetchNotifications,
  //     getNextPageParam: (lastPage) => lastPage?.nextCursor,
  //     refetchInterval: isConnected ? false : 1000,
  //   });
};
