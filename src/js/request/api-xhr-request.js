'use strict';

const REQUEST_METHOD_GET = 'GET';

/**
 * @param {Object} request
 * @return {Promise}
 */
export function makeRequest(request) {
  /**
   * @param {Function} resolve
   * @param {Function} reject
   */
  const executor = (resolve, reject) => {
    let xhr = new XMLHttpRequest();

    xhr.open(request.method || REQUEST_METHOD_GET, request.url);

    if (request.headers) {
      Object.keys(request.headers).forEach(key => {
        xhr.setRequestHeader(key, request.headers[key]);
      });
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
      } else {
        reject(xhr.statusText);
      }
    };

    xhr.onerror = () => reject(xhr.statusText);
    xhr.send(request.body);
  };

  return new Promise(executor);
}
