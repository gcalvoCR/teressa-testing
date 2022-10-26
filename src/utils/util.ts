import { ignore, ignoreListMap, ignoreValue, listsOfVariablesOnlyPresent, variableOnlyPresent, VAR_DICTIONARY } from "./variables";

export interface Resp {
  eVars: Array<string>,
  eVarsMissing: Array<string>,
  eVarsExtra: Array<string>,
  props: Array<string>,
  propsMissing: Array<string>,
  propsExtra: Array<string>,
  events: Array<string>,
  eventsMissing: Array<string>,
  eventsExtra: Array<string>,
  text: string
}

export function compareAndGenerateCSV(obj1: Record<string, string>,obj2: Record<string, string>): Resp {

  const resp:Resp  = {
    eVars: [],
    eVarsMissing: [],
    eVarsExtra: [],
    props: [],
    propsMissing: [],
    propsExtra: [],
    events: [],
    eventsMissing: [],
    eventsExtra: [],
    text: ''
  }

  let text = `PARAMETER,VARIABLE,VALUE_1,VALUE_2,STATUS,COMMENTS\n`;

  for (const [key, value] of Object.entries(obj1)) {
    const variable: string = VAR_DICTIONARY[key] !== undefined ? VAR_DICTIONARY[key] : ' ';
    const reason: string = ignoreListMap[key] !== undefined ? ignoreListMap[key] : ' ';
    if (key in obj2) {
      let firstValue = value
      if (value.includes(',')){
        firstValue = value.replace(/,/g,' ');
      }
      let secondValue = obj2[key];
      if (obj2[key].includes(',')){
        secondValue = obj2[key].replace(/,/g,' ');
      }
      
      text += `${key},${variable},${firstValue},${secondValue},`;

      // Grabbing list of props and eVars
      if(variable.includes('eVar')) resp.eVars.push(variable);
      if(variable.includes('prop')) resp.props.push(variable);

      // ignore certain values
      if (ignore(key, variable)) {
        text += `ignored,${reason}\n`;
      } else {
        if (Object.keys(listsOfVariablesOnlyPresent).includes(key)) { // case 'events and l1'
          let eventsStatus = `passed,All variables are present\n`;
          let listOfEvents1: Array<string>  = [];
          let listOfEvents2: Array<string>  = [];
          
          // Get the list of ensighten events
          const events1 = value.split(listsOfVariablesOnlyPresent[key]);
          listOfEvents1 = events1.map(val => val.split('=')[0])

          // Get the list of launch events
          const events2 = obj2[key].split(listsOfVariablesOnlyPresent[key]);
          listOfEvents2 = events2.map(val => val.split('=')[0])
          

          
          // Get the list of additional params
          const extraEnsightenParams = listOfEvents1.filter(f => !listOfEvents2.includes(f) && f!=='');
          const extraLaunchParams = listOfEvents2.filter(f => !listOfEvents1.includes(f) && f!=='');

          if(key==='events'){
            // Adding this show list of events
            resp.eventsMissing = extraEnsightenParams.sort()
            resp.eventsExtra = extraLaunchParams.sort()
            resp.events = listOfEvents1.filter(f => listOfEvents2.includes(f));
          }

          if(extraEnsightenParams.length > 0) eventsStatus = `failed,Missing in Launch --> ${extraEnsightenParams.join("; ")}\n`;
          if(extraLaunchParams.length > 0) eventsStatus = `failed,Launch has extra params --> ${extraLaunchParams.join("; ")} \n`;
          
          text += eventsStatus;
         
        } else if (key ==='g'){ // case g
          if (new URL(firstValue).pathname === new URL(secondValue).pathname) { 
            text += `passed,Leaving out the query params\n`;
          } else {
            text += `failed,pathnames don't match\n`;
          }
        } else if (key ==='r'){ // case r
        if (new URL(firstValue).host === new URL(secondValue).host) { 
          text += `passed,Just validating the hostname\n`;
        } else {
          text += `failed,The hostname is different\n`;
        }
      }
        else if (variableOnlyPresent.includes(key) && firstValue !== '' && secondValue!== '') {
          text += `passed,Only comparing variables are present\n`;
        } else if (ignoreValue(variable) || value.trim() === obj2[key].trim()) {
          text += `passed,-\n`;
        } else if (value.toLowerCase().trim() === obj2[key].toLowerCase().trim()) {
          text += `failed,Case sensitive failing\n`;
        } else {
          text += `failed,Not equal\n`;
        }
      }
    } else {

      // Grabbing list of props and eVars
      if(variable.includes('eVar')) resp.eVarsMissing.push(variable);
      if(variable.includes('prop')) resp.propsMissing.push(variable);

      // case values only in first object
      if (ignore(key, variable)) {
        text += `${key},${variable},${value}, ,ignored,${reason}\n`;
      } else {
        text += `${key},${variable},${value}, ,failed,Not showing in Launch\n`;
      }
    }
  }
  for (const [key, value] of Object.entries(obj2)) {
    if(Object.entries(obj2).length === 0) break; // this case makes sure we have both analytics requests
    
    // case values only
    const variable: string = VAR_DICTIONARY[key] !== undefined ? VAR_DICTIONARY[key] : ' ';
    const reason: string = ignoreListMap[key] !== undefined ? ignoreListMap[key] : ' ';

    if (!(key in obj1)) {
      // Grabbing list of props and eVars
      if(variable.includes('eVar')) resp.eVarsExtra.push(variable);
      if(variable.includes('prop')) resp.propsExtra.push(variable);

      if (ignore(key, variable)) {
        text += `${key},${variable}, ,${value},ignored,${reason}\n`;
      } else {
        text += `${key},${variable}, ,${value},new,-\n`;
      }
    }
  }
  
  resp.text = text;
  return resp;
}