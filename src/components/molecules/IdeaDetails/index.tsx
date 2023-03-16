import React from 'react'
interface Props {
  ideaId: any;
}

const IdeaDetails = (props: Props) => {
  return (
    <div>Idea{props?.ideaId}</div>
  )
}

export default IdeaDetails