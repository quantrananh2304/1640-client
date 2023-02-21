import React from 'react'
import loadable from '~/utils/loadable';

const IdeasList = loadable(() => import('~/components//molecules/IdeasList'));

const Ideas = () => {
  return (
    <>
      <IdeasList/>
    </>
  )
}

export default Ideas