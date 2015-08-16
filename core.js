this.$ = this.jQuery = require('jquery');
var glob = require("glob");

var from = getUserHome() + "/Downloads/"; 
var fs = require("fs");
var path = require("path");
var tasks = require("tasks");
//var React = require('react');
var dialog = require("remote").require("dialog");

function getUserHome() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

var workflow = {
    files : []
};

var commands = [
  {
      task : "copy",
      options : {
        context : workflow,
        destination : getUserHome() + "/Downloads/f1/"
      }
  },
  {
      task: "rotate",
      options : {
        context : workflow
      }
  },
  {
      task: "resize",
      options : {
        context : workflow,
        width:400,
        height:400
      }
  },
  {
      task : "move",
      options:{
        context : workflow,
        destination : getUserHome() + "/Downloads/f3"
      }
  }
];

var fmap = {
  "copy" : tasks.copy,
  "rotate" : tasks.rotate,
  "resize" : tasks.resize,
  "move" : tasks.move,
};

function execute(tasks , i){
    if(i > tasks.length -1) return;
    var task = tasks[i];
    fmap[task.task](task.options , function(files){
      workflow.files = files;
      execute(tasks , i+1);
    });
}

console.log("starting");
tasks.getFiles(getUserHome()+"/Downloads/f0/" , "*.+(jpg|png)" , function(files){
  workflow.files = files;
  execute(commands , 0);
});
console.log("finishing");

$(document).ready(function(){

      $("#open").click(function(){
        dialog = require("remote").require("dialog");
        console.log(window);
          dialog.showOpenDialog( window ,{ properties: [ 'openFile', 'openDirectory', 'multiSelections' ]});
      });

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

