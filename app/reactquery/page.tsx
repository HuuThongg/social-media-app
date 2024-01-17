'use client'
import { useQuery } from "@tanstack/react-query"
import React from "react"
import {
  useInfiniteQuery,
} from '@tanstack/react-query'
export default function TanstackQueryPage () {
  // const {data:posts, isLoading, isError} = useQuery<any>({
  //   queryKey:["posts"],
  //   queryFn: async  () =>{ 
  //     const response =  await fetch("/api/message")
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok')
  //     }
  //     return response.json()
  // }
  // })

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery({
    queryKey: ['projects'],
    queryFn: async ({ pageParam }) => {
      const res = await fetch('/api/notification?cursor=' + pageParam)
      return res.json();
    },
    initialPageParam: 0,
    getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
    getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    maxPages: 3,
  })
  // if(isLoading) return(
  //   <div>isLoading</div>
  // )
  // if (isError) return 
  return (
    <div>
      <div>
        {/* <h1>Tanstack Query Page</h1>
        <ul>
          {JSON.stringify(posts)}
        </ul> */}
      </div>
      <div>
        <h1>Infinite Query with max pages</h1>
        <h3>4 projects per page</h3>
        <h3>3 pages max</h3>
        {status === 'pending' ? (
          <p>Loading...</p>
        ) : status === 'error' ? (
          <span>Error: {error.message}</span>
        ) : (
          <>
            <div>
              <button
                onClick={() => fetchPreviousPage()}
                disabled={!hasPreviousPage || isFetchingPreviousPage}
              >
                {isFetchingPreviousPage
                  ? 'Loading more...'
                  : hasPreviousPage
                    ? 'Load Older'
                    : 'Nothing more to load'}
              </button>
            </div>
            {data.pages.map((page) => (
              <React.Fragment key={page.nextId}>
                {page.data.map((project) => (
                  <p
                    style={{
                      border: '1px solid gray',
                      borderRadius: '5px',
                      padding: '8px',
                      fontSize: '14px',
                      background: `hsla(${project.id * 30}, 60%, 80%, 1)`,
                    }}
                    key={project.id}
                  >
                    {project.name}
                  </p>
                ))}
              </React.Fragment>
            ))}
            <div>
              <button
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
              >
                {isFetchingNextPage
                  ? 'Loading more...'
                  : hasNextPage
                    ? 'Load Newer'
                    : 'Nothing more to load'}
              </button>
            </div>
            <div>
              {isFetching && !isFetchingNextPage
                ? 'Background Updating...'
                : null}
            </div>
          </>
        )}
        <hr />
      </div>
    </div>
  )
}