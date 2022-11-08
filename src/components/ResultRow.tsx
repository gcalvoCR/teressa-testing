import React from 'react';
import { ValidatedParam } from '../utils/util';
import './ResultRow.css';

interface ResultRowProps {
  item: ValidatedParam
}

export default function ResultRow({item, ...props}:ResultRowProps): React.ReactElement{
  return (
    <tr className={item.status === 'passed' ? 'passed': item.status === 'failed' ? 'failed': ''}>
      <td>{item.param.key}</td>
      <td>{item.param.variable}</td>
      <td>{item.param.value1}</td>
      <td>{item.param.value2}</td>
      <td>{item.method}</td>
      <td>{item.status}</td>
      <td>{item.comments}</td>
    </tr>
    )
  
}