var mongoose = require('mongoose')
   ,Schema   = mongoose.Schema;

var user=new Schema({
	user_name       :{type:String},
	name            :{type:String},
	surname    		:{type:String},
	email      		:{type:String},
	password        :{type:String},
	cinsiyet	    :{type:String},
	day				:{type:String},
	month			:{type:String},
	year            :{type:String},
	kk_id      		:{type:String},
	about           :{type:String},
	aktivasyon      :{type:String},
	girisDurum      :{type:String},
	role			:{type:[]},
	ban 			:{type:[]},
	//yorum			:{type:[]},
	picture			:{type:String},
	cevrimici       :{type:[]}

});
var mesaj = new Schema({
	title 			:{type:String},
	mesaj_icerik	:{type:String},
	sender			:{type:String},
	gonderme_tarih  :{type:String},
	received        :{type:[]},
	durum           :{type:String},
	received_durum   :{type:String}
});
var alt_mesaj = new Schema({
	ust_id  		:{type:String},
	mesaj_icerik	:{type:String},
	gonderme_tarih  :{type:String},
	durum           :{type:String},
	received_durum  :{type:String},
	sender			:{type:String},
	received        :{type:[]}


});
var kategori=new Schema({
	kategori_adi    :{type:String},
	parent          :{type:{}},
	children        :{type:[]},
	picture         :{type:String},
	ekleyen_id      :{type:String},
	status  		:{type:Boolean,default:true},
	eklenme_tarihi  :{type: Date, default: Date.now}
});


var role=new Schema({
	role_name      :{type: String},
	permission 	   :{type: []},
	ekleyen 	   :{type:{}},
	eklenen_kisiler:{type:[]},
	ekleme_tarihi  :{type: Date,default:Date.now}
});
var konu = new Schema({
	kategori_adi    :{type:String},
	kategori_id     :{type:String},
	konu_baslik     :{type:String},
	icerik	        :{type:String},
	ekleme_zamani   :{type:String},
	eklenme_tarihi  :{type:Date,default:Date.now},
	sayi			:{type:Number},
	show 			:{type:Boolean,default:true},
	ekleyen         :{type:{}}		
});
var yorum =new Schema({
		kategori_id     :{type:String},
		konu_id 		:{type:String},
		yorum		    :{type:String},
		ekleme_zamani	:{type:String},
		ekleme_tarihi	:{type:Date,default:Date.now},
		ekleyen         :{type:{}}
	});
var online =new  Schema ({
	ip            :{type:String},
	zaman         :{type:String},
	ekleme_tarihi :{type:Date,default:Date.now},
	user 		  :{type:{}}
});
var bildiri = new Schema({
  konu_id 		:{type:String},
  bildiri_yapan :{type:{}},
  kime_bildiri  :{type:{}},
  bildiri_durumu:{type:String},
  konu_baslik   :{type:String},
  durum			:{type:Boolean,default:true},
  ekleme_zamani :{type:Date,default:Date.now}
});
var alinti = new Schema({
	  konu_id 		:{type:String},
	  yorum_id		:{type:String},
	  alinan_kisi   :{type:{}},
	  ekleyen_kisi  :{type:{}},
	  durum			:{type:Boolean,default:true},
	  ekleme_tarih 	:{type:String},
	  ekleme_zamani :{type:Date,default:Date.now}
});
var cevrimici =new  Schema ({
	ip            :{type:String},
	user_name     :{type:String},
	ekleme_tarihi :{type:String},
	saat          :{type:String}
});

exports.defineModels=function(cb) {
	mdb.model('user'     ,user);
	mdb.model('mesaj'    ,mesaj);
	mdb.model('kategori' ,kategori);
	mdb.model('role'     ,role);
	mdb.model('konu'     ,konu);
	mdb.model('yorum'    ,yorum);
	mdb.model('online'   ,online);
	mdb.model('cevrimici'   ,cevrimici);
	mdb.model('bildiri'   ,bildiri);
	mdb.model('alinti'   ,alinti);
	mdb.model('alt_mesaj'   ,alt_mesaj);
	console.log("sys Models registered");
	if (cb) { cb(); }
};
