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


					]  
}