import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { RepoSearch } from '../helper/types'
import Modal from './Modal'
import Spinner from './Spinner'
import { ReactQueryDevtools } from "react-query/devtools"
const Marketplace = () => {
  const [page, setPage] = useState(0)
  const { data, isLoading, error } = useQuery<RepoSearch>({
    queryKey: ["themes", page],
    queryFn: async () => {
      const data = await (await fetch
        (`https://api.github.com/search/repositories?q=${encodeURIComponent("topic:spicetify")}&page=${page + 1}`)
      ).json()
      return data
    },
    keepPreviousData: true,
    // 15 minutes
    cacheTime: 900000,
    staleTime: 900000
  })

  return (
    <>
      <ReactQueryDevtools position='bottom-right' />
      {error ? "Error occured" : null}
      {isLoading ? <div className="grid place-items-center"><Spinner /><b className='mt-2'>Loading...</b></div> : null}

      <div className='grid' style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(24rem, 1fr))",
        gap: "2rem"
      }}>

        {data?.items?.map((repo, i) => <RepoItem repo={repo} key={i} />)}
      </div>
    </>
  )
}





const RepoItem = ({ repo }: {
  repo: RepoSearch["items"][0]
}) => {
  return (
    <div className="flex self-center justify-center">
      <div className="rounded-lg hover:scale-105 
    duration-300 
    transition-all shadow-lg hover:shadow-2xl bg-grey-900 max-w-sm">
        <img className="rounded-t-lg w-full object-contain
         aspect-square" src="https://placehold.co/300x300" alt="" />
        <div className="p-6">
          <h5 className="text-gray-900 text-xl font-medium mb-2">
            {repo.name}</h5>
          <p className="text-gray-700 text-base mb-4">
            {repo.description}
          </p>

        </div>
      </div>
    </div>
  )
}




export default Marketplace