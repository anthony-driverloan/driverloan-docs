'use strict';

var _ = require('lodash');
var Document = require('./document.model');
var fs = require('fs');
var cloudinary = require('cloudinary').v2;


// set your env variable CLOUDINARY_URL or set the following configuration
cloudinary.config({
  cloud_name: 'driverloan',
  api_key: '517719321696586',
  api_secret: 'cN22Opggfr8rM5xOKDWzQzx2lFk'
});

// Get list of documents
exports.index = function(req, res) {
  Document.find(function (err, documents) {
    if(err) { return handleError(res, err); }
    return res.json(200, documents);
  });
};

// Get a single document
exports.show = function(req, res) {
  Document.findById(req.params.id, function (err, document) {
    if(err) { return handleError(res, err); }
    if(!document) { return res.send(404); }
    return res.json(document);
  });
};

// Creates a new document in the DB.
exports.create = function(req, res) {


console.log( "** ** ** ** ** ** ** ** ** Uploads ** ** ** ** ** ** ** ** ** **");

// File upload
cloudinary.uploader.upload(req.files.file.path,{tags:'av02azj'},function(err,image){
  console.log();
  console.log("** File Upload");
  if (err){ console.warn(err);}
  res.send(200,image.url);
});



};

// Updates an existing document in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Document.findById(req.params.id, function (err, document) {
    if (err) { return handleError(res, err); }
    if(!document) { return res.send(404); }
    var updated = _.merge(document, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, document);
    });
  });
};

// Deletes a document from the DB.
exports.destroy = function(req, res) {
  Document.findById(req.params.id, function (err, document) {
    if(err) { return handleError(res, err); }
    if(!document) { return res.send(404); }
    document.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
