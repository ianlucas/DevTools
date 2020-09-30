import customLocale from './custom/locale'

const locale = {
  termFile: 'File',
  termDebug: 'Debug',
  termToggleDevTools: 'Toogle Developer Tools',
  termNewTab: 'New Tab',
  termOpenedTab: 'Opened Tab',
  termChangeTitle: 'Change tab title',
  termServiceLogApp: 'Service Log App',
  termFetching: 'Fetching...',
  termRun: 'Run',
  termInterface: 'Inteface',
  termEndpoint: 'Endpoint',
  termDate: 'Date',
  termRequest: 'Request',
  termResponse: 'Response',
  termHeader: 'Header',
  termMessage: 'Message',
  termEmail: 'E-mail',
  termMock: 'Mock',
  termDownload: 'Download',
  termCancel: 'Cancel',
  termOk: 'Ok',
  requestHeader: '%s: %s\n%s: %s\n%s: %s %s-%s',
  requestMessage: '%s\n\n[%s]\n\n%s\n\n[%s]\n\n%s',
  requestEmail: '<p>%s</p><p><table style="border-collapse: collapse; white-space: pre; border: 1px solid #000;"><tr><td style="vertical-align: top; border: 1px solid #000; padding: 4px;">%s</td><td style="vertical-align: top; border: 1px solid #000; padding: 4px;">%s</td></tr></table></p>'
}

export default Object.assign(locale, customLocale)
