this.$ = this.jQuery = require('jquery');
var glob = require("glob");

var from = getUserHome() + "/Downloads/"; 
var fs = require("fs");
var path = require("path");
var tasks = require("tasks");
var React = require('react');

function getUserHome() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

var map = {
  "get" : tasks.getFiles,
  "rotate" : tasks.rotate
}

$(document).ready(function(){

        var holder = document.getElementById('holder');
      holder.ondragover = function () {
        return false;
      };
      holder.ondragleave = holder.ondragend = function () {
        return false;
      };
      holder.ondrop = function (e) {
        e.preventDefault();
        var file = e.dataTransfer.files[0];
        from = file.path;
        return false;
    };

    console.log("core.js");
    $("#move").click(function(){
        var dir = getUserHome() + "/Downloads/Images/";
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        tasks.getFiles(getUserHome()+"/Downloads/ResTest/" , "*.+(jpg|png)" , function(files){
            tasks.copy(files  , getUserHome() + "/Downloads/MorePics/" , function(cfiles){
              tasks.rotate(cfiles);
            });
        });
    });
});

