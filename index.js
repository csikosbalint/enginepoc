exports.handler = (event, context, callback) => {
  const cheerio = require('cheerio');
  const https = require('https');
  const encodeUrl = require('encodeurl');
  
  https.get('https://thepiratebay.org/search/'+ encodeUrl(event.key) + '/0/99/0', (resp) => {
    let data = '';
   
    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });
   
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      const html = cheerio.load(data);
      for ( let i = 0; i < html('#searchResult').find('.detLink').toArray().length; i++) {
        console.log('https://thepiratebay.org' + html('#searchResult').find('.detLink').toArray()[i].attribs.href);
        console.log(html('#searchResult').find('.detLink').toArray()[i].children[0].data);
      }
      
    });
   
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });

};