/**
 * Auto-generated action file for "sevDesk Order API" API.
 *
 * Generated at: 2021-06-01T11:53:41.091Z
 * Mass generator version: 1.0.0
 *
 * : order
 * Copyright © 2020,  AG
 *
 * All files of this connector are licensed under the Apache 2.0 License. For details
 * see the file LICENSE on the toplevel directory.
 *
 *
 * Operation: 'createOrder'
 * Endpoint Path: '/Order'
 * Method: 'post'
 *
 */



 // how to pass the transformation function... no need
 // pass the meta data 
 // create a new Object 
 // emit the message with the new emit function 

 // securities and auth methods   
 // check how to make the new ferryman and its transform functions functional // no need

const Swagger = require('swagger-client');
const spec = require('../spec.json');

// this wrapers offers a simplified emitData(data) function
module.exports = {process: processAction};

// parameter names for this call
const PARAMETERS = [];

// mappings from connector field names to API field names
const FIELD_MAP = {
    "id": "id",
    "objectName": "objectName",
    "create": "create",
    "update": "update",
    "orderNumber": "orderNumber",
    "contact": "contact",
    "orderDate": "orderDate",
    "status": "status",
    "header": "header",
    "headText": "headText",
    "footText": "footText",
    "addressName": "addressName",
    "addressStreet": "addressStreet",
    "addressZip": "addressZip",
    "addressCity": "addressCity",
    "addressCountry": "addressCountry",
    "createUser": "createUser",
    "sevClient": "sevClient",
    "deliveryTerms": "deliveryTerms",
    "paymentTerms": "paymentTerms",
    "origin": "origin",
    "version": "version",
    "smallSettlement": "smallSettlement",
    "contactPerson": "contactPerson",
    "taxRate": "taxRate",
    "taxSet": "taxSet",
    "taxText": "taxText",
    "addressParentName": "addressParentName",
    "addressContactRef": "addressContactRef",
    "taxType": "taxType",
    "orderType": "orderType",
    "sendDate": "sendDate",
    "addressParentName2": "addressParentName2",
    "addressName2": "addressName2",
    "addressGender": "addressGender",
    "address": "address",
    "currency": "currency",
    "sumNet": "sumNet",
    "sumTax": "sumTax",
    "sumGross": "sumGross",
    "sumDiscounts": "sumDiscounts",
    "sumNetForeignCurrency": "sumNetForeignCurrency",
    "sumTaxForeignCurrency": "sumTaxForeignCurrency",
    "sumGrossForeignCurrency": "sumGrossForeignCurrency",
    "sumDiscountsForeignCurrency": "sumDiscountsForeignCurrency",
    "weight": "weight",
    "entryType": "entryType",
    "customerInternalNote": "customerInternalNote",
    "showNet": "showNet",
    "sendType": "sendType",
    "requestBody": "requestBody"
};

function processAction(msg, cfg) {
    var isVerbose = process.env.debug || cfg.verbose;

    console.log("msg:",msg);
    console.log("cfg:",cfg)

    if (isVerbose) {
        console.log(`---MSG: ${JSON.stringify(msg)}`);
        console.log(`---CFG: ${JSON.stringify(cfg)}`);
        console.log(`---ENV: ${JSON.stringify(process.env)}`);
    }

    const contentType = 'json';

    const body = msg.data;
    mapFieldNames(body);

    let parameters = {};
    for(let param of PARAMETERS) {
        parameters[param] = body[param];
    }

    const oihUid = msg.metadata !== undefined && msg.metadata.oihUid !== undefined
    ? msg.metadata.oihUid
    : 'oihUid not set yet';
  const recordUid = msg.metadata !== undefined && msg.metadata.recordUid !== undefined
    ? msg.metadata.recordUid
    : undefined;
  const applicationUid = msg.metadata !== undefined && msg.metadata.applicationUid !== undefined
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
    securities['api_key'] = cfg['auth_api_key'];

    if(cfg.otherServer){
        if(!spec.servers){
            spec.servers = [];
        }
        spec.servers.push({"url":cfg.otherServer})
    }
    
    
    let callParams = {
        spec: spec,
        operationId: 'createOrder',
        pathName: '/Order',
        method: 'post',
        parameters: parameters,
        requestContentType: contentType,
        requestBody: body,
        securities: {authorized: securities},
        server: spec.servers[cfg.server] || cfg.otherServer,
    };
        if(callParams.method === 'get'){
            delete callParams.requestBody;
        }
    

    if (isVerbose) {
        let out = Object.assign({}, callParams);
        out.spec = '[omitted]';
        console.log(`--SWAGGER CALL: ${JSON.stringify(out)}`);
    }

    // Call operation via Swagger client
    return Swagger.execute(callParams).then(data => {
        // emit a single message with data
        // console.log("swagger data:",data);
        delete data.uid;
        newElement.metadata = oihMeta;
        newElement.data = data.data
        this.emit("data",newElement);

        // if the response contains an array of entities, you can emit them one by one:

        // data.obj.someItems.forEach((item) => {
        //     this.emitData(item);
        // }
    });
}

function mapFieldNames(obj) {
    if(Array.isArray(obj)) {
        obj.forEach(mapFieldNames);
    }
    else if(typeof obj === 'object' && obj) {
        Object.keys(obj).forEach(key => {
            mapFieldNames(obj[key]);

            let goodKey = FIELD_MAP[key];
            if(goodKey && goodKey !== key) {
                obj[goodKey] = obj[key];
                delete obj[key];
            }
        });
    }
}