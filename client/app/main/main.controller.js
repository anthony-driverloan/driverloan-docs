'use strict';

angular.module('driverloanDocsV1App')
  .controller('MainCtrl', function ($scope, $http, Upload) {

    var docThumbnails = [];

    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];


                //------RESIZE Image--------//

                // var img = new Image();
                // img.src = file.name;
                //
                // var canvas = document.createElement('canvas');
                // var ctx = canvas.getContext("2d");
                // ctx.drawImage(img, 0, 0);
                // var dataURL = canvas.toDataURL("image/png");




                // Upload function

                Upload.upload({
                    url: 'api/documents',
                    file: file
                }).progress(function (evt) {
                }).success(function (data, status, headers, config) {
                    console.log(data);
                    docThumbnails.push(data);
                    $scope.thumbnailOneLoaded = true;
                    $scope.thumbnailOne = docThumbnails[0];


                });
            }
        }
    };




  });
