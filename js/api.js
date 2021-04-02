'use strict';

(function () {
  const Method = {
    GET: `GET`,
    PUT: `PUT`,
    POST: `POST`,
    DELETE: `DELETE`
  };
  const SuccessHTTPStatusRange = {
    MIN: 200,
    MAX: 299
  };

  function template({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers()
  }) {

    return fetch(
        `${url}`,
        {method, body, headers}
    )
      .then((response) => {
        if (
          response.status < SuccessHTTPStatusRange.MIN ||
          response.status > SuccessHTTPStatusRange.MAX
        ) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }

        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  window.api = {
    template
  };
})();
