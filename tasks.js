function move(files , destination){
	 $.each(files , function(i,v){
                fs.rename(v , destination+"/" + path.basename(v) , function(){});
     });
}

function getFiles(directory , fileFormat){
	glob(directory+"/"+"fileFormat", undefined, function (er, files) {
       return files;
    });
}

module.exports = {
	move : move ,
	getFiles : getFiles
}