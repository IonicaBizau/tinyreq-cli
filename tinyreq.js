#!/usr/bin/env node

"use strict";

// Dependencies
const tinyreq = require("tinyreq")
    , clp = require("clp")
    , logger = require("bug-killer")
    , ul = require("ul")
    , pack = require("./package")
    ;

// CLP Parser
let urlOpt = new clp.Option(["u", "url"], "The request url.", "url")
  , methOpt = new clp.Option(["m", "method"], "The request method.", "method")
  , dataOpt = new clp.Option(["d", "data"], "The request data.", "data")
  , fieldsOpt = new clp.Option(["f", "fields"], "Other fields to merge in the request object.", "fields")
  ;

new clp({
    name: "tinyreq"
  , exe: pack.name
  , version: pack.version
  , docs_url: pack.homepage
  , process: true
  , examples: [
        "tinyreq -u http://ionicabizau.net"
    ]
}, [urlOpt, methOpt, dataOpt, fieldsOpt]);

// Merge the options
let options = ul.merge({
    method: methOpt.value || undefined
  , url: urlOpt.value || undefined
  , data: dataOpt.value || undefined
}, {
    method: "GET"
});

if (!options.url) {
    return logger.log("Missing the request url.", "error");
}

if (options.data && options.method === "GET") {
    logger.log("Making a POST request since you send data.", "warn");
    options.method = "POST";
}

// Make the request
logger.log(options.method + " " + options.url, "info");
tinyreq(options, function (err, body) {
    if (err) {
        return logger.log(err, "error");
    }
    console.log(body);
});
