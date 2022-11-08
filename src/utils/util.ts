import { ignore, IGNORE_LIST_MAP, validateArrayKeys, validateOnlyPresent, VAR_DICTIONARY } from "./variables";

export interface ResultsResponse {
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

// need to find a better name for this

export type Method = 'equals' | 'present' | 'array' | 'domain' | 'pathname'| 'ignored' | 'not defined';
export type Status = 'passed' | 'failed' | 'ignored' | 'not processed' | 'pending';

export interface Param {
  key: string,
  variable: string
  value1: string,
  value2: string,
}

export interface ValidatedParam {
  param: Param,
  method: Method, // equals, present, array
  status: Status, // passed, failed, ignored
  comments: string,
}

export function validatePayloads(list: Array<Param>) {
  const params: Array<ValidatedParam> = []

  for (const [,item] of Object.entries(list)) {
    // new param
    const param: ValidatedParam  = { 
      param: item, 
      method:'not defined', 
      status:'not processed', 
      comments: '',
    };
    
    // validate ignore list
    if (ignore(item.key, item.variable)) {
      param.method = 'ignored'
      param.status = 'ignored'
      param.comments = IGNORE_LIST_MAP[item.key] ? IGNORE_LIST_MAP[item.key] : '';
      params.push(param)
      continue;
    } 
      
    // validate case only present
    if (Object.keys(validateOnlyPresent).includes(item.key)) { 
      param.method = 'present'
      param.status='passed'
      param.comments = 'Validated all variables are present'
      params.push(param)
      continue;
    }

    // validate case variables with array
    if (Object.keys(validateArrayKeys).includes(item.key)) {
      param.method = 'array' 
      param.status='pending'
      param.status='pending'
      params.push(param)
      continue;
    }
        
    // validate special case g (pathname)
    if (item.key === 'g'){ // case g
      param.method='pathname'
      console.log(item)
      if (!item.value1 || !item.value2) {
        param.status='failed'
        param.comments='missing "g" value'; 
        params.push(param)
        continue;
      } 
      if (new URL(item.value1).pathname === new URL(item.value2).pathname) { 
        param.status='passed'
        param.comments='Leaving out the query params'  
      } else {
        param.status='failed'
        param.comments='Pathnames don\'t match'  
      }
      params.push(param)
      continue;
    }
      
    // validate special case r
    if (item.key ==='r'){ // case r
      param.method='domain'
      if (!item.value1 || !item.value2) {
        param.status='failed'
        param.comments='missing "r" value'; 
        params.push(param)
        continue;
      } 
      if (new URL(item.value1).host === new URL(item.value2).host) { 
        param.status='passed'
        param.comments='Just validating the hostname'
      } else {
        param.status='failed'
        param.comments='The hostname is different'
      }
      params.push(param)
      continue;
    }

    // validate no 2nd value
    if (!item.value2) {
      param.method = 'present'
      param.status='failed';
      param.comments='Values not showing in 2nd payload'
      params.push(param)
      continue;
    }

    // validate no 1st value
    if (!item.value1) {
      param.method = 'present'
      param.status='ignored';
      param.comments='Values not showing in 1st payload'
      params.push(param)
      continue;
    }

    // validate validate equals
    if (item.value1.trim() === item.value2.trim()) {
      param.method = 'equals'
      param.status='passed'
      param.comments='The values are equal'
    } else {
      param.method = 'equals'
      param.status='failed'
      param.comments='The values are NOT equal'
    }
    params.push(param)
    continue;
  }
  return params;
}

export function getVariables(obj1: Record<string, string>,obj2: Record<string, string>): Array<Param> {

  const params: Array<Param> = []

  for (const [key, value] of Object.entries(obj1)) {
    // new param
    const param: Param  = { 
      key, 
      variable: VAR_DICTIONARY[key] ? VAR_DICTIONARY[key] : '', 
      value1: '', 
      value2: '', 
    };
    
    if (key in obj2) {
      param.value1 = value;
      param.value2 = obj2[key];
    } else {
      param.value1 = value;
      param.value2 = '';
    }
    params.push(param);
  }
  for (const [key, value] of Object.entries(obj2)) {
    if(Object.entries(obj2).length === 0) break; // this case makes sure we have both analytics requests
    
    // new param
    if (!(key in obj1)) {
      const param: Param  = { 
        key, 
        variable: VAR_DICTIONARY[key] ? VAR_DICTIONARY[key] : '',
        value1:'',
        value2: value, 
      }
      params.push(param)
    }
    // make the list shorter
    delete obj2[key];
  }
  
  return params;
}