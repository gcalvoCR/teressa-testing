import React, {useState} from 'react';
import { compareAndGenerateCSV } from '../utils/util';
import './PayloadForm.css';
import Results from './Results';

export default function PayloadForm(){
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [text, setText] = useState([''])

  const handleClear = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault(); 
    setText1('');
    setText2('');
    setText(['']);
  }

  const handleSubmit = (event: any) => {
    event.preventDefault(); 

    const initialParams = Object.fromEntries(new URLSearchParams(text1))
    const finalParams = Object.fromEntries(new URLSearchParams(text2))

    const resp = compareAndGenerateCSV(initialParams, finalParams);
    const lines = resp.text.split('\n')

    setText(lines);

  };
  return (
    <>
      <div className="payloadform">
        <form onSubmit={handleSubmit}>
          <div className="payloadform__textareas">
            <div>
              <label className="payloadform__label--1">Payload 1  (ENSIGHTEN)</label>
              <textarea 
                name="text1" 
                rows={20} 
                className="payloadform__textarea--1" 
                id="inputText1" 
                placeholder="Paste one version of a payload here." 
                value={text1}
                onChange={event => setText1(event.target.value)}
                >
              </textarea>
            </div>
            <div>
              <label className="payloadform__label--1">Payload 2 (LAUNCH)</label>
              <textarea 
                name="text2" 
                rows={20} 
                className="payloadform__textarea--2" 
                id="inputText2" 
                placeholder="Paste the other version of a payload here."
                value={text2}
                onChange={event => setText2(event.target.value)}
                >
              </textarea>
            </div>
          </div>
          <div className="payloadform__buttons">
            <button className="payloadform__button--1" type="submit">Compare payload</button>
            <button className="payloadform__button--2" onClick={handleClear}>Clear</button>
          </div>
        </form>
      </div>
      <Results results={text}/>
    </>
  )
}