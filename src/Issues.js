// 設定値
var API_URL = '' // https://example.com
var API_KEY = ''

/**
 * issueを発行
 * @param {*} issueJsonData 
 */
function createIssue (issueJsonData) {
  const METHOD = 'POST'
  const PATH = '/issues.json'
  var options = {
    'payload': JSON.stringify(issueJsonData)
  }

  var result = send_(METHOD, PATH, options)
  Logger.log(JSON.parse(result.getContentText()))

  return result
}

// function fileUpload (issueJsonData) {
//  const METHOD = 'POST'
//  const PATH = '/uploads.json'
//  var options = {
//     'headers': { 
//      'Content-type': 'application/json',
//    }
//    'payload': JSON.stringify(issueJsonData)
//  }
//
//  var result = send_(METHOD, PATH, options)
//  Logger.log(JSON.parse(result.getContentText()))
//  
//  return result
// }

/**
 * issueを取得
 * @param {*} issueId 
 */
function getIssue (issueId, include) {
  const METHOD = 'GET'
  const PATH = '/issues/' + issueId + '.json?include=' + include

  var result = send_(METHOD, PATH, {})
  Logger.log(JSON.parse(result.getContentText()))

  return result
}

/**
 * issueリストを取得
 */
function getIssueList (params) {
  const METHOD = 'GET'

  var paramString = '?'
  if (params) {
    for(var key in params) {
      var sep = paramString == '?' ? '' : '&'
      paramString += (sep + key + '=' + params[key])
    }
  } else {
    paramString = ''
  }

  const PATH = '/issues.json' + paramString

  var result = send_(METHOD, PATH, {})
  Logger.log(JSON.parse(result.getContentText()))

  return result
}

/**
 * 工数リストを取得
 */
function getTimeEntriesList (params) {
  const METHOD = 'GET'

  var paramString = '?'
  if (params) {
    for(var key in params) {
      var sep = paramString == '?' ? '' : '&'
      paramString += (sep + key + '=' + params[key])
    }
  } else {
    paramString = ''
  }

  const PATH = '/time_entries.json' + paramString

  var result = send_(METHOD, PATH, {})
  Logger.log(JSON.parse(result.getContentText()))

  return result
}


/**
 * バージョンリストを取得
 */
function getVersionList (versionId, params) {
  const METHOD = 'GET'

  var paramString = '?'
  if (params) {
    for(var key in params) {
      var sep = paramString == '?' ? '' : '&'
      paramString += (sep + key + '=' + params[key])
    }
  } else {
    paramString = ''
  }

  const PATH = '/projects/' + versionId + '/versions.json' + paramString

  var result = send_(METHOD, PATH, {})
  Logger.log(JSON.parse(result.getContentText()))

  return result
}

/**
 * APIを叩く 共通処理
 * @param {*} method 
 * @param {*} path 
 * @param {*} methodOptions 
 */
function send_ (method, path, methodOptions) {
  var options = {
    'method': method,
    'headers': {
      'Content-type': 'application/json',
      'X-Redmine-API-Key': API_KEY
    }
  }

  // 追加オプションがあれば入れる
  if ('payload' in methodOptions) {
    options.payload = methodOptions.payload
  }
  if ('headers' in methodOptions) {
    if ('Content-type' in methodOptions.headers) {
      options.headers['Content-type'] = methodOptions.headers['Content-type']
    }
  }

  // APIKeyの確認
  if (API_URL == '') {
    throw new Error('API_URL is not set')
  }

  // APIKeyの確認
  if (API_KEY == '') {
    throw new Error('API_KEY is not set')
  }

  Logger.log('endpoint: ' + API_URL + path)
  Logger.log('Option: ')
  Logger.log(options)

  return UrlFetchApp.fetch(API_URL + path, options)
}

// ----------

/**
 * API URLをセット
 * @param {*} apiUrl 
 */
function setApiUrl (apiUrl) {
  API_URL = apiUrl
}

/**
 * API Keyをセット
 * @param {*} apiKey 
 */
function setApiKey (apiKey) {
  API_KEY = apiKey
}
