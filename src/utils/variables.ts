
// ----------------------- Variable definition ----------------------- //
const paramVariableMap = {
  aamlh : 'None',
  aamb: 'None',
  aid: 'None',
  AQB: 'BEGINNING',
  AQE: 'END',
  bh: 'None',
  bw: 'None',
  c: 'None',
  'c.': 'contextData',
  '.c': 'contextData',
  cc: 'currencyCode',
  cdp: 'cookieDomainPeriods',
  ce: 'charSet',
  cl: 'cookieLifetime',
  ch: 'channel',
  cp: 'None',
  ct: 'None',
  D: 'dynamicVariablePrefix',
  ev: 'events',
  events: 'events',
  g: 'pageURL',
  '-g': 'pageURL',
  gn: 'pageName',
  gt: 'pageType',
  h1: 'hier1',
  h2: 'hier2',
  h3: 'hier3',
  h4: 'hier4',
  h5: 'hier5',
  hp: 'None',
  j: 'None',
  k: 'None',
  l1: 'list1',
  l2: 'list2',
  l3: 'list3',
  lrt: 'None',
  mid: 'None',
  ndh: 'None',
  ns: 'visitorNameSpace',
  oid: 's_objectID',
  ot: 'None',
  p: 'None',
  pageName: 'pageName',
  pageType: 'pageType',
  pccr: 'None',
  pe: 'tl()',
  pev1: 'None',
  pev2: 'tl()',
  pev3: 'None',
  pf: 'None',
  pid: 'None',
  pidt: 'None',
  pl: 'products',
  products: 'products',
  purchaseID: 'purchaseID',
  r: 'referrer',
  s: 'None',
  server: 'server',
  sv: 'server',
  state: 'state',
  t: 'None',
  ts: 'timestamp',
  v: 'None',
  v0: 'campaign',
  vid: 'visitorID',
  vmk: 'vmk',
  vvp: 'variableProvider',
  xact: 'transactionID',
  zip: 'zip'
}

const props: Record<string, string> = {};  
for (let i = 1; i <= 75; i++) {
  props[`c${i}`] = `prop${i}`;
}

const eVars: Record<string, string> = {};
for (let i = 1; i <= 250; i++) {
  eVars[`v${i}`] = `eVar${i}`;
}

export const VAR_DICTIONARY = Object.assign(paramVariableMap, props, eVars);

// ----------------------- Variable definition ----------------------- //


// ----------------------- Ignore List ----------------------- //
export const IGNORE_LIST_MAP: Record<string, string> = {
  'pid':'Used in previous versions of Activity Map',
  'pidt':'Used in previous versions of Activity Map',
  'ot':'Used in previous versions of Activity Map',
  'v51': '',
  'v31': '',
  'evar31': 'See SC evar list documentation',
  'data_elements_missing': 'This is implemented differently in Launch',
  'bh': 'Browser height automatically populated by Adobe Analytics js',
  'bw': 'Browser width automatically populated by Adobe Analytics js',
  't': '',
  'sdid': '',
  'AQB': 'Indicates the beginning of the image request query string.',
  'AQE': 'Indicates the end of the image request',
  'c.': 'Context Variable - Start',
  '.c': 'Context Variable - End',
  'ns': 'Deprecated',
  'callback': 'Audience Manager - not implemented',
  'et': 'Audience Manager - not implemented',
  'nsid': 'Audience Manager - not implemented',
  'jsonv': 'Audience Manager - not implemented',
  'eVar39': 'not required - using default implementation',
  'prop': 'not required',
  'prop51': 'captured in event67',
  'c51': 'captured in event67',
  'eVar112': 'irrelevant',
  'eVar130': 'not required',
  'getPreviousValue': '',
  'getValOnce': '',
  'eVar60': 'dynamic variable',
  'eVar66': 'dynamic variable',
  'mcorgid': 'Added in later version of AppMeasurement',  //https://experienceleague.adobe.com/docs/analytics/implementation/appmeasurement-updates.html?lang=en#version-2.1.0
  'dfa_qe': 'DoubleClick integration - not implemented',
  'hier2': 'Duplicates hier1',
  'hier3': 'Duplicates hier1',
  'v111': 'Time Prior to Event'
};

export const ignore = function(key: string, variable: string) {
  return key.includes('.') ||
  Object.keys(IGNORE_LIST_MAP).includes(key) ||
  Object.keys(IGNORE_LIST_MAP).includes(variable)
}
// ----------------------- Ignore List ----------------------- //


// ----------------------- Validation  ----------------------- //

/* 
We have 3 ways of validation:
- equals: Validate the the 2 values are equal
- present: Validate only that the variable is there
- array: Validate that each array has all the keys
**/

// We just validate that the variables are present, we don't care about their values
export const validateOnlyPresent = [
  'eVar1',
  'mid',
]

// case we are comparing only that both lists contain the same keys
export const validateArrayKeys: Record<string, string> = {
  'events': ',', // what we need to split for
  'l1': '|'
}


