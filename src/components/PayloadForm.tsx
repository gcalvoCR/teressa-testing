import React, {useEffect, useState} from 'react';
import { getVariables, ValidatedParam, validatePayloads } from '../utils/util';
import './PayloadForm.css';
import Results from './Results';


interface FormData {
  text1: string;
  text2: string;
}
export default function PayloadForm(){
  const [formData, setFormData] = useState<FormData>(initialFormData());
  const [results, setResults] = useState<Array<ValidatedParam>>([])

  function initialFormData(): FormData {
    const data = localStorage.getItem('formData')
    if (data) {
      try {
        return JSON.parse(data);
      } catch (err) {
        return {text1: '', text2: ''}
      }
    }
    else {
      return {text1: '', text2: ''}
    }
  }
  const handleClear = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault(); 
    setFormData({text1: '', text2: ''});
    setResults([]);
    localStorage.setItem('formData', JSON.stringify({text1: '', text2: ''}))
  }

  useEffect(() =>{
    localStorage.setItem('formData', JSON.stringify(formData))
  },[formData])
  
  const handleChange = (event: any) => {
    // name --> the name we give to the input
    // value --> what the user types in
    // type --> text, email, password, etc
    // checked --> "checkbox values"
    const {name, value, type, checked} = event.target
    setFormData(prevData => ({ ...prevData, [name]: type ==='checkbox'? !checked : value }))
  }

  // This is for testing purposes
  console.log(
    { text1:'AQB=1&ndh=1&pf=1&callback=s_c_il[1].doPostbacks&et=1&t=19%2F6%2F2022%2010%3A35%3A5%202%20300&cid.&ihgCRM.&id=160111844&as=1&.ihgCRM&pcr_id.&id=160111844&as=1&.pcr_id&.cid&d.&nsid=0&jsonv=1&.d&sdid=16026AF3999023E9-7AEC4706E32EC3FE&mid=90606602450619182162576916166220949838&aamlh=7&ce=UTF-8&ns=ihg&pageName=6C%3A%20ACCOUNT%20%3A%20HOME&g=https%3A%2F%2Fqap.www.ihg.com%2Frewardsclub%2Fus%2Fen%2Faccount-mgmt%2Fhome&r=https%3A%2F%2Fqap.www.ihg.com%2Frewardsclub%2Fus%2Fen%2Faccount-mgmt%2Fhome&c.&data_elements_missing=%2Frewardsclub%2Fus%2Fen%2Faccount-mgmt%2Fhome%28pageview%29%20-%20%20pageview%20%7Chas%20base%7Chas%20complete%7Chas%20basic%7Chas%20booking%7Chas%20confirmation%7Chas%20profile&cm.&ssf=1&.cm&opt.&dmp=N&sell=N&.opt&.c&cc=USD&events=event50%2Cevent67%3D6.43&aamb=RKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y&v1=large%3Alandscape&l1=OSMGL-6C-EN-BPG%7C&v3=6C%3A%20HOME&v4=6C&v7=EXPLICIT&v30=qap.www.ihg.com%2Frewardsclub%2Fus%2Fen%2Faccount-mgmt%2Fhome&v39=D%3DUser-Agent&v41=D%3DpageName&v49=D%3Dv4&c51=6.45&c61=undefined_home&c68=virtual_page_view&v75=160111844&v82=CLUB--&v111=2219&v112=spaprod&v130=%7B%22creditCard.form%22%3A%221.0.0%22%2C%22services.availabilityV2%22%3A%220.1.0%22%2C%22services.reservationsV2%22%3A%220.1.0%22%7D&s=1792x1120&c=30&j=1.6&v=N&k=Y&bw=1237&bh=929&mcorgid=8EAD67C25245B1870A490D4C%40AdobeOrg&AQE=1', 
      text2: 'AQB=1&ndh=1&pf=1&t=19%2F6%2F2022%2010%3A44%3A50%202%20300&sdid=7089D2683828EEB7-6A44DF5C35B86780&mid=90606602450619182162576916166220949838&aamlh=7&ce=UTF-8&pageName=6C%3A%20ACCOUNT%20%3A%20HOME&g=https%3A%2F%2Fqap.www.ihg.com%2Frewardsclub%2Fus%2Fen%2Faccount-mgmt%2Fhome&r=https%3A%2F%2Fqap.www.ihg.com%2Frewardsclub%2Fus%2Fen%2Faccount-mgmt%2Fmemberbenefits&c.&cm.&ssf=1&.cm&opt.&dmp=N&sell=N&.opt&.c&cc=USD&events=event20%2Cevent24%2Cevent50%2Cevent67%3D0.00&aamb=RKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y&v1=large%3Alandscape&h1=6C%7CUS%7CEN&l1=OSMGL-US-EN-MAN-Footer-AppDownload%7COSMGL-6C-EN-BPG&v3=6C%3A%20REWARDSCLUB%20%3A%20MEMBERBENEFITS&v4=6C&v7=EXPLICIT&v30=qap.www.ihg.com%2Frewardsclub%2Fus%2Fen%2Faccount-mgmt%2Fhome&v41=D%3DpageName&v48=D%3Dg&v49=D%3Dv4&v60=D%3Dv13&c61=6c_home&v66=D%3Dv37&c68=virtual_page_view&v75=160111844&v82=CLUB&v111=10&v112=spa&s=1792x1120&c=30&j=1.6&v=N&k=Y&bw=1237&bh=929&mcorgid=8EAD67C25245B1870A490D4C%40AdobeOrg&AQE=1'})

  const handleSubmit = (event: any) => {
    event.preventDefault(); 

    const initialParams = Object.fromEntries(new URLSearchParams(formData.text1))
    const finalParams = Object.fromEntries(new URLSearchParams(formData.text2))

    const variables = getVariables(initialParams, finalParams);
    console.log(variables);

    setResults(validatePayloads(variables));

  };
  return (
    <>
      <div className="payloadform">
        <form onSubmit={handleSubmit}>
          <div className="payloadform__textareas">
            <div>
              <label className="payloadform__label--1" htmlFor="text1">Payload 1  (ENSIGHTEN)</label>
              <textarea 
                name="text1" 
                rows={20} 
                className="payloadform__textarea--1" 
                placeholder="Paste one version of a payload here." 
                value={formData.text1}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="payloadform__label--1" htmlFor='text2'>Payload 2 (LAUNCH)</label>
              <textarea 
                name="text2" 
                rows={20} 
                className="payloadform__textarea--2" 
                placeholder="Paste the other version of a payload here."
                value={formData.text2}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="payloadform__buttons">
            <button className="payloadform__button--1" type="submit">Compare payload</button>
            <button className="payloadform__button--2" type="button" onClick={handleClear}>Clear</button>
          </div>
        </form>
      </div>
      <Results results={results}/>
    </>
  )
}