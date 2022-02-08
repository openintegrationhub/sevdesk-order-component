/**
 * Auto-generated trigger file for "sevDesk Order API" API.
 *
 * Generated at: 2022-02-07T11:41:05.353Z
 * Mass generator version: 1.0.0
 *
 * : sevdesk-order-component
 * Copyright © 2020,  AG
 *
 * All files of this connector are licensed under the Apache 2.0 License. For details
 * see the file LICENSE on the toplevel directory.
 *
 *
 * Operation: 'getOrders'
 * Endpoint Path: '/Order'
 * Method: 'get'
 *
 */

const Swagger = require('swagger-client');
const spec = require('../spec.json');
const {
  isSecondDateAfter,
  mapFieldNames
} = require('../utils/helpers');

// parameter names for this call
const PARAMETERS = [
    "status",
    "orderNumber",
    "startDate",
    "endDate",
    "contact[id]",
    "contact[objectName]"
];

// mappings from connector field names to API field names
const FIELD_MAP = {
    "status": "status",
    "orderNumber": "orderNumber",
    "startDate": "startDate",
    "endDate": "endDate",
    "contact_id_": "contact[id]",
    "contact_objectName_": "contact[objectName]"
};

function processTrigger(msg, cfg, snapshot = {}) {
  var isVerbose = process.env.debug || cfg.verbose;
  snapshot.lastUpdated = snapshot.lastUpdated || new Date(0).getTime();

  console.log('msg:', msg);
  console.log('cfg:', cfg);
  const { snapshotKey, arraySplittingKey, syncParam } = cfg.nodeSettings;

  if (isVerbose) {
    console.log(`---MSG: ${JSON.stringify(msg)}`);
    console.log(`---CFG: ${JSON.stringify(cfg)}`);
    console.log(`---ENV: ${JSON.stringify(process.env)}`);
  }

  const contentType = undefined;

  const body = msg.data;
  mapFieldNames(body);

  let parameters = {};
  for (let param of PARAMETERS) {
    parameters[param] = body[param];
  }
  if(syncParam) {
    parameters[syncParam] = snapshot.lastUpdated;
  }

  const oihUid =
    msg.metadata !== undefined && msg.metadata.oihUid !== undefined
      ? msg.metadata.oihUid
      : 'oihUid not set yet';
  const recordUid =
    msg.metadata !== undefined && msg.metadata.recordUid !== undefined
      ? msg.metadata.recordUid
      : undefined;
  const applicationUid =
    msg.metadata !== undefined && msg.metadata.applicationUid !== undefined
      ? msg.metadata.applicationUid
      : undefined;

  const newElement = {};
  const oihMeta = {
    applicationUid,
    oihUid,
    recordUid,
  };

  // credentials for this operation
  let securities = {};
    securities['api_key'] = cfg['key'];

  if (cfg.otherServer) {
    if (!spec.servers) {
      spec.servers = [];
    }
    spec.servers.push({ "url": cfg.otherServer });
  }

  let callParams = {
    spec: spec,
    operationId: 'getOrders',
    pathName: '/Order',
    method: 'get',
    parameters: parameters,
    requestInterceptor: (req) =>  { 
      req.headers["Content-Type"] = "application/json"; 
      return req; 
    },
    requestContentType: contentType,
    requestBody: body,
    securities: { authorized: securities },
    server: spec.servers[cfg.server] || cfg.otherServer,
  };
  if (callParams.method === 'get') {
    delete callParams.requestBody;
  }

  if (isVerbose) {
    let out = Object.assign({}, callParams);
    out.spec = '[omitted]';
    console.log(`--SWAGGER CALL: ${JSON.stringify(out)}`);
  }

  // Call operation via Swagger client
  return Swagger.execute(callParams).then((data) => {
    delete data.uid;
    newElement.metadata = oihMeta;
    const response = JSON.parse(data.data);

    if (!arraySplittingKey) {
      newElement.data = response;
    } else {
      newElement.data = arraySplittingKey
        .split('.')
        .reduce((p, c) => (p && p[c]) || null, response);
    };
    if (Array.isArray(newElement.data)) {
      let lastElement = 0;
      for (let i = 0; i < newElement.data.length; i++) {
        const newObject = { ...newElement, data: newElement.data[i] };
        const currentObjectDate = newObject.data[snapshotKey]
          ? newObject.data[snapshotKey]
          : newObject.data['update'];
        if (snapshot.lastUpdated === 0) {
          if (isSecondDateAfter(currentObjectDate, lastElement)) {
            lastElement = snapshotKey
              ? newElement.data[snapshotKey]
              : newElement.data['update'];
          }
          this.emit('data', newObject);
        } else {
          if (isSecondDateAfter(currentObjectDate, snapshot.lastUpdated)) {
            if (isSecondDateAfter(currentObjectDate, lastElement)) {
              lastElement = currentObjectDate;
            }
            this.emit('data', newObject);
          }
        }
      }
      snapshot.lastUpdated =
        lastElement !== 0 ? lastElement : snapshot.lastUpdated;
      console.log('returned a snapshot 1', snapshot);

      this.emit('snapshot', snapshot);
      console.log('returned a snapshot');
    } else {
      this.emit('data', newElement);
    };
  });
}

// this wrapers offers a simplified emitData(data) function
module.exports = { process: processTrigger };
