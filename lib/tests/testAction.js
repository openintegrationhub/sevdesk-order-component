/**
 * Auto-generated test action file for "sevDesk Order API" API.
 * Generated at: 2022-03-08T13:33:17.901Z
 * Mass generator version: 1.0.0
 *
 * : sevdesk-order-component
 * Copyright © 2020,  AG
 *
 * All files of this connector are licensed under the Apache 2.0 License. For details
 * see the file LICENSE on the toplevel directory.
 *
 */

 const Swagger = require("swagger-client");
 const spec = require("../spec.json");
 const { mapFieldNames, getMetadata } = require("../utils/helpers");
 const componentJson = require("../../component.json");
 
 function processAction(msg, cfg, snapshot, incomingMessageHeaders, data) {
   var isVerbose = process.env.debug || cfg.verbose;
 
   console.log("data function:", data["function"]);
   console.log("msg:", msg);
   console.log("cfg:", cfg);
 
   if (isVerbose) {
     console.log(`---MSG: ${JSON.stringify(msg)}`);
     console.log(`---CFG: ${JSON.stringify(cfg)}`);
     console.log(`---ENV: ${JSON.stringify(process.env)}`);
   }
   const action = componentJson.actions[data["function"]];
   const { pathName, method, requestContentType } = action.callParams;
 
   const specPath = spec.paths[pathName];
   const specPathParameters = specPath[method].parameters.map(({ name }) => {
     return name;
   });
 
   const body = msg.data;
   mapFieldNames(body);
 
   let parameters = {};
   for (let param of specPathParameters) {
     parameters[param] = body[param];
   }
   
   let securities = {};
    securities['api_key'] = process.env.APIKEY ;
 
   if (cfg.otherServer) {
     if (!spec.servers) {
       spec.servers = [];
     }
     spec.servers.push({ url: cfg.otherServer });
   }
 
   let callParams = {
     spec: spec,
     operationId: data["function"],
     pathName: pathName,
     method: method,
     parameters: parameters,
     requestContentType: requestContentType,
     requestBody: body,
     securities: { authorized: securities },
     server: spec.servers[cfg.server] || cfg.otherServer,
   };
   if (callParams.method === "get") {
     delete callParams.requestBody;
   }
 
   if (isVerbose) {
     let out = Object.assign({}, callParams);
     out.spec = "[omitted]";
     console.log(`--SWAGGER CALL: ${JSON.stringify(out)}`);
   }
 
   // Call operation via Swagger client
   return Swagger.execute(callParams).then((data) => {
     // emit a single message with data
     console.log("Status Code: ",data.status);
     console.log("Status Text: ",data.statusText);
     console.log("Data Object: ",data.data)

    });
 }
 const ids = [];
 
 for (let i = 0; i < ids.length; i++ ) {
     const msg = {};
     const cfg = {};
     const data = {
         "function": ids[i] 
     };

     console.log(`Test for the operation ${ids[i]} !`)

     processAction(msg,cfg,{},{},data)
 }