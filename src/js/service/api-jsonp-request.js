'use strict';

const fetchJSONP = (unique => url =>
  new Promise(rs => {
    const script = document.createElement('script');
    const name = `_jsonp_${unique++}`;
    
    if (url.match(/\?/)) {
      url += `&callback=${name}`;
    } else {
      url += `?callback=${name}`;
    }
    
    console.log("url = ", url);
    
    script.src = url;
    window[name] = json => {
      console.log("should resolve() name = ", name)
      rs(new Response(JSON.stringify(json)));
      script.remove();
      delete window[name];
    };
    
    document.body.appendChild(script);
  }))(0);

export default fetchJSONP;
