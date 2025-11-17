import { createServer } from "https";
import { parse } from "url";
import next from "next";
import { readFileSync } from "fs";
import { IncomingMessage, ServerResponse } from "http";

// set up server options 
const port = 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// read the ssl cert & key we created
const httpsOptions = {
    key: readFileSync('./localhost-key.pem'),
    cert: readFileSync('./localhost.pem')
};

// prepare & run web server
app.prepare()
.then(() => {
    // run server
    createServer(httpsOptions, (req: IncomingMessage, res: ServerResponse) => {
      // handle https request / response model
      const parsedUrl = parse(req.url!, true);
      handle(req, res, parsedUrl);  
    })
    .listen(port, () => { console.log('HTTPS server running on port 3000') });
})