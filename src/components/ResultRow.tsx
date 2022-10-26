import React from 'react';
import './ResultRow.css';

interface ResultRowProps {
  information: string
}

export default function ResultRow({information, ...props}:ResultRowProps): React.ReactElement{

  const rows = information.split(',')
  const columns = rows.map((item: string) => {
    return <td className={item === 'passed' ? 'passed': item === 'failed' ? 'failed': ''}>{item}</td>
  })

  return (
    <tr>
      {columns}
    </tr>
  )
}