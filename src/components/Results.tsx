import React from 'react'
import ResultRow from './ResultRow';
import './Results.css';


interface ResultsProps {
  results: Array<string>;
}

export function Results({results, ...props}:ResultsProps): React.ReactElement{
  const rows = results.map((line: string) => <ResultRow information={line} />)
  return (
    <div className="results--section">
        <h3>Output:</h3>
        <table className="results--table">
          {rows}
        </table>
      </div>
  )
}

export default Results;