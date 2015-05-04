exports.config=
{
	kk_url		 :"http://localhost:8080",
	port 		 :"8080",
	SiteName	 :"njsforum",
	DBConnection :"localhost:27017/davet",
	izinler 	 : [
						{"name": "Admin"				  ,"url":""		        ,"pagename":""  ,"permission": "0"},
						{"name": "Kategori İşlemleri"     ,"url":"Kategori"     ,"pagename":""  ,"permission": "2"},
						{"name": "Rol islemleri"          ,"url":"role"         ,"pagename":""  ,"permission": "3"},
						{"name": "Kullanıcı İşlemleri"    ,"url":"user"         ,"pagename":""  ,"permission": "5"},
						{"name": "Konu Düzenleme"         ,"url":""             ,"pagename":""  ,"permission": "7"},
						{"name": "caylak"                 ,"url":""             ,"pagename":""  ,"permission": "9"}


					],
	consumer_key:'536cd5b5c33a4f0c19907f0c',
    consumer_secret:'Reg/8/PyNatHnt8GcyNuPitAiud2mx27EstzmR64xng=',

    user : "resit.yilmaz@usishi.com",
    pass: "76307630"  
}
