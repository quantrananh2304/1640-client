import React from 'react'
import { useParams } from 'react-router-dom';
import IdeaDetails from '~/components/molecules/IdeaDetails';

const IdeaDetail = () => {
  const { id } = useParams();
  return (
    <IdeaDetails ideaId={id}/>
  );
}

export default IdeaDetail