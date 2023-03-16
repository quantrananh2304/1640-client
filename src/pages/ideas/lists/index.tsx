import React from 'react'
import loadable from '~/utils/loadable';
import { Authorization } from '~/wrapper/Authorization';

const IdeasList = loadable(() => import('~/components//molecules/IdeasList'));

const Ideas = () => {
  return (
    <>
      <IdeasList/>
    </>
  )
}

export default Ideas