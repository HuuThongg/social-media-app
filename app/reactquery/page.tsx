'use client'

import { useQuery } from "@tanstack/react-query"

export default function TanstackQueryPage () {
  const {data:posts, isLoading, isError} = useQuery<any>({
    queryKey:["posts"],
    queryFn: async  () =>{ 
      const response =  await fetch("/api/message")
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
  }
  })
  if(isLoading) return(
    <div>isLoading</div>
  )
  if (isError) return 
  return (
    <div>
      <h1>Tanstack Query Page</h1>
      <ul>
        {JSON.stringify(posts)}
      </ul>
    </div>
  )
}