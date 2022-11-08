import React from 'react'
import { ValidatedParam } from '../utils/util';
import ResultRow from './ResultRow';
import './Results.css';


interface ResultsProps {
  results: Array<ValidatedParam>;
}

export function Results({results}:ResultsProps): React.ReactElement{
  const rows = results.map((parameter: ValidatedParam, index: number) => <ResultRow item={parameter}  key={`row-${index}`}/>)
  return (rows.length ? 
    <div className="results--section">
      <table className="results--table">
        <thead>
          <tr>
            <th>Param</th>
            <th>Variable</th>
            <th>1st value</th>
            <th>2nd value</th>
            <th>method used to compare</th>
            <th>Status</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>        
      </table>
    </div> 
    : <></>      
  )
}

export default Results;