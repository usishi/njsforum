var fs        = require('fs'),
	functions = require('./functions'),
	mongoose  = require('mongoose'),
	http      = require('http');
exports.genel_kayit=function(veri,cb){
	console.log(veri);
	var genel_kayitmodel=mdb.model(veri.schema);
	var genel_kayit=new genel_kayitmodel(veri);
	genel_kayit.save();
	genel_kayit.save(function(err,sonuc){
		if(err)
			cb({"hata":err});
		else{
			cb({"sonuc":sonuc});
			//console.log(sonuc);
		}
	});
}
exports.guncelle=function(model,id,alan1,cb){
	mdb.model(model).findByIdAndUpdate(id,alan1,function(e,guncelleme){
		if(e!=null){  
			cb(e)
		}
		else{
			cb({status:"1"});
		}
	});
}
exports.makeid= function()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}