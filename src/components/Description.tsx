import React from 'react';
import './Description.css';
// temp data this should come from the backend
import configData from '../data/config'

export default function Description() {
  const description = configData.description
  return(
    <div className="description--area">
      <p>{description}</p>
      <hr/>
    </div>
  )
}