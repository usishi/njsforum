var fs        = require('fs'),
	functions = require('./functions'),
	mongoose  = require('mongoose'),
	uuid 	  = require('node-uuid'),
	http      = require('http'),
	nodemailer =require('nodemailer'),
	 uuid     = require('node-uuid');


var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "resit.yilmaz@usishi.com",
        pass: "76307630"
    }
});

exports.ask = function(req,res){
	var question=req.params.question;
	console.log('\033[40m\033[33m---- question: '+question+'\033[0m');
	switch(question){
		case 'save':
			if(req.body.bilgi.bolum=="kategori"){
   				req.body.bilgi.ekleyen_id = req.session.user._id;
   				functions.genel_kayit(req.body.bilgi,function(result){
   					uutils.sendReturn(res,result);
   				});
			}
			else if(req.body.bilgi.bolum=="alt_kategori"){
				req.body.bilgi.ekleyen_id = req.session.user._id;
   				functions.genel_kayit(req.body.bilgi,function(result){
   						if(result.sonuc!=undefined){
   							mdb.model("kategori").findOne({_id:req.body.bilgi.parent.id},function(e,veri){
   								console.log(veri);
   								var child=veri.children;
   								child.push({id:result.sonuc._id,name:result.sonuc.kategori_adi});
   								console.log(child);
	   							mdb.model('kategori').findByIdAndUpdate(req.body.bilgi.parent.id,{children:child},function(e,guncelleme){
	   								if(e!=null)
	   									uutils.sendReturn(res,e);
	   								else 
	   									uutils.sendReturn(res,result);
	   							});
	   						});
   						}
   						else
   							uutils.sendReturn(res,result);
   				});
			}
			else if(req.body.bilgi.bolum=="role"){
				req.body.bilgi.ekleyen={"name":req.session.user.firstname,"surname":req.session.user.lastname,"id":req.session.user._id};
				functions.genel_kayit(req.body.bilgi,function(result){
					uutils.sendReturn(res,result);
				});
			}else if(req.body.bilgi.bolum=="yorum"){
				functions.genel_kayit(req.body.bilgi,function(result){
   					uutils.sendReturn(res,result);
   				});
			}
			else if(req.body.bilgi.bolum=="konu"){
				req.body.bilgi.ekleyen ={"name":JSON.parse(req.session.user).user_name,"id":JSON.parse(req.session.user)._id};
				console.log(req.session.user);
				req.body.bilgi.ekleyen_id = JSON.parse(req.session.user)._id;
				functions.genel_kayit(req.body.bilgi,function(result){
   					uutils.sendReturn(res,result);
   				});
			}

		break;
		case 'getList':
			var toplu_sonuc={},us=0;
        	req.body.model_list.forEach(function(kayit){
        		mdb.model(kayit).find({},function(e,genel_liste){
        			us++;
        			toplu_sonuc[kayit]=genel_liste;
        			if(us==req.body.model_list.length){
        				uutils.sendReturn(res,toplu_sonuc);
        			}
        		});
        	});
		break;
		case 'get_konuList':
			var kategoriler,toplu_sonuc={},us_parentname,us=0;
			mdb.model("kategori").find({},function(e,kategori){
				kategoriler=kategori;			
			});
			req.body.id_list.forEach(function(id){
				console.log(id);
				mdb.model("konu").find({kategori_id:id},function(e,sonuc){
					//////////hangi kategoriye ait olduğunu buluyoruz////////////
					kategoriler.forEach(function(kayit){
						us++;
						if(kayit.id==id){
							toplu_sonuc[kayit._id]=sonuc;
							console.log(toplu_sonuc);
						}
						else{
							if(kayit.children.length>0){
								//console.log("paren adi kayıt edildi :"+kayit._id);
								if(kayit.parent.id=="")
									us_parentname=kayit._id;
								cocuk_bulucu(kayit.children);
							}
							else {
								console.log("bu adamın çocuğu yok "+kayit.kategori_adi);
							}
						}
						////////////////////////////////////
						function cocuk_bulucu(children){
							children.forEach(function(cocuk){
								kategoriler.forEach(function(kategoriler){
									if(cocuk.id==kategoriler._id){
										if(cocuk.id==id){
											toplu_sonuc[us_parentname]=sonuc;
										}
										else
											cocuk_bulucu(kategoriler.children);
									}	
								});
							});
							
						}
						if(us==(req.body.id_list.length*kategoriler.length))
							uutils.sendReturn(res,toplu_sonuc);
					});
					//////////////////////////////////////////////////////////////
				});
			
			
			});
		break;
		case 'sil':
			mdb.model(req.body.model).findOne({_id:req.body.id},function(e,kayit1){

				if(req.body.model=="kategori"){
					if(kayit1.parent.id!=undefined && kayit1.parent.id!=""){
						mdb.model(req.body.model).findOne({_id:kayit1.parent.id},function(e,kayit){
							console.log(kayit);
							var us=kayit.children,sayac=0;
							kayit.children.forEach(function(record){
								sayac++;
								if(record.id==req.body.id){
									us.splice(sayac-1,1);
								}
							});
							mdb.model(req.body.model).findByIdAndUpdate(kayit1.parent.id,{children:us},function(e,guncelleme){
								kayit1.remove(function(err,sonuc){
									if(err!=null)
										uutils.sendReturn(res,{status:err});
									else
										uutils.sendReturn(res,{status:"1"});		
								});
							});
						});
					}
					else
					{
						kayit1.remove(function(err,sonuc){
									if(err!=null)
										uutils.sendReturn(res,{status:err});
									else
										uutils.sendReturn(res,{status:"1"});		
								});
					}
				}
				else if(req.body.model=="role"){
					var us=[];
					kayit1.eklenen_kisiler.forEach(function(kayit){
						mdb.model("user").findByIdAndUpdate(kayit,{role:us},function(e,sonuc){
							if(e!=null)
								console.log(e);
						});

					});
					kayit1.remove(function(err,sonuc){
									if(err!=null)
										uutils.sendReturn(res,{status:err});
									else
										uutils.sendReturn(res,{status:"1"});		
								});
				}
				else if(req.body.model=="user"){
					var us=[];
					
					mdb.model('role').findOne({_id:kayit1.role[0].id},function(err,role){
						var ekli_kisi=role.eklenen_kisiler;
						ekli_kisi.splice(ekli_kisi.indexOf(kayit1._id),1);
						var alan1={$set:{}};
			        	alan1.$set["eklenen_kisiler"]=ekli_kisi;
						functions.guncelle("role",role._id,alan1,function(sonuc){
							console.log(sonuc);
						});
					})
					kayit1.remove(function(err,sonuc){
									if(err!=null)
										uutils.sendReturn(res,{status:err});
									else
										uutils.sendReturn(res,{status:"1"});		
								});
				}
				else{
					kayit1.remove(function(err,sonuc){
						if(err!=null)
							uutils.sendReturn(res,{status:err});
						else
							uutils.sendReturn(res,{status:"1"});		
					});
				}
			});
		break;
		case 'mail':
	
			 mdb.model('user').findOne({email:req.body.email},function(e,sonuclar){
			 	
			 	console.log(sonuclar);
			 	var mailOptions = {
			          from: "forum<resit.yilmaz@usishi.com>", // sender address
			          to: sonuclar.email,
			          subject: "Kullanıcı Şifreniz",
			          html: "<html><body><p><b>FORUM</b></p>" +
				            "<p><b>Kullanıcı Adınız :</b> "+sonuclar.user_name+"</p>" +
				            "<p><b>Şifreniz :</b>"+sonuclar.password+"</p>" +
				            "</body></html>"
			         
			      }
			      smtpTransport.sendMail(mailOptions, function(error, response){
			        if(error){
			        	console.log(error);
			       		uutils.sendReturn(res,"Mesaj gönderilirken bir hata oluştu,Lütfen tekrar deneyiniz.");
			        }else{
			          console.log("deneme ");
			          console.log("Message sent: " + response.message);
			         	uutils.sendReturn(res,"Mesajınız başarılı bir şekilde gönderilmiştir.");
			        }
			      });
			 
			 });
				 
	    break;
		case 'update_alan':
			var alan1={$set:{}};
        	alan1.$set[req.body.alan]=req.body.yeni_deger;
        	mdb.model(req.body.model).findByIdAndUpdate(req.body.id,alan1,function(e,guncelleme){
    		if(e!=null){  
    			uutils.sendReturn(res,{status:e});
    		}
    		else{
    			console.log(guncelleme);
    			uutils.sendReturn(res,{status:"1"});
    			}
    		});
    		
		break;
		case 'user_role_update':
			mdb.model(req.body.model).findOne({_id:req.body.id},function(e,user){
				if(user.role.length>0){
					//ekli olan roleden adamın idsi çıkarılsın ve update edilsin
					mdb.model('role').findOne({_id:user.role[0].id},function(e,role){
						//console.log(role.eklenen_kisiler);
						var ekli_kisi=role.eklenen_kisiler;
						ekli_kisi.splice(ekli_kisi.indexOf(req.body.id),1);
						var alan1={$set:{}};
			        	alan1.$set["eklenen_kisiler"]=ekli_kisi;
			        	functions.guncelle("role",role._id,alan1,function(sonuc){
			        		console.log(sonuc);
			        	});
					});
					//yeni eklenen role adamon idsi eklensin ve update edilsin
					mdb.model('role').findOne({_id:req.body.yeni_deger.id},function(e,sonuc){
	    				var ekli_kisiler=sonuc.eklenen_kisiler==null?[]:sonuc.eklenen_kisiler;
	    				ekli_kisiler.push(req.body.id);
	    				var alan1={$set:{}};
			        	alan1.$set["eklenen_kisiler"]=ekli_kisiler;
			        	functions.guncelle("role",sonuc._id,alan1,function(sonuc){
			        		console.log(sonuc);
			        	});
	    			});
					//adamın rolü update edilsin
					var alan1={$set:{}};
        			alan1.$set[req.body.alan]=req.body.yeni_deger;
        			functions.guncelle(req.body.model,req.body.id,alan1,function(sonuc){
        				console.log(sonuc);
        			});
				}
				else{
					//yeni eklenen role adamon idsi eklensin ve update edilsin
					mdb.model('role').findOne({_id:req.body.yeni_deger.id},function(e,sonuc){
						var ekli_kisiler=[];
	    				ekli_kisiler.push(req.body.id);
	    				var alan1={$set:{}};
			        	alan1.$set["eklenen_kisiler"]=ekli_kisiler;
			        	functions.guncelle("role",sonuc._id,alan1,function(sonuc){
			        		console.log(sonuc);
			        	});
	    			});
					//adamın rolü update edilsin
					var alan1={$set:{}};
        			alan1.$set[req.body.alan]=req.body.yeni_deger;
        			functions.guncelle(req.body.model,req.body.id,alan1,function(sonuc){
        				console.log(sonuc);
        			});
				} 
			});
		break;
		case 'update_parent':
			//ana kategorisi varsa 
			mdb.model(req.body.model).findOne({_id:req.body.id},function(e,retVal){
				var us=0;
				if(retVal.parent.name!=""){
					/////////////////eskiden child çıkartılıyor////////////////////////
					mdb.model(req.body.model).findOne({_id:retVal.parent.id},function(e,eski_parent){
						var child=eski_parent.children;
						child.remove(req.body.id);
						var alan1={$set:{}};
		        		alan1.$set["children"]=child;
		        		functions.guncelle(req.body.model,eski_parent._id,alan1,function(sonuc){
			        		us++;
			        		if(us==3)
			        			uutils.sendReturn(res,sonuc);
			        	});
					});
					///////////////////////////////////////////////////////////////////
				}
				//////////////////////kendisine yeni parent ekleniyor/////////////////////
				var alan1={$set:{}};
	        	alan1.$set[req.body.alan]={id:req.body.new_p_id,name:req.body.new_p_name};
	        	functions.guncelle(req.body.model,req.body.id,alan1,function(sonuc){
	        		us++;
	        		if(us==3)
	        			uutils.sendReturn(res,sonuc);
	        	});
	        	////////////////////////////////////////////////////////////////////
	        	//////////////////////yenisine child ekleniyor////////////////////////
	        	mdb.model(req.body.model).findOne({_id:req.body.new_p_id},function(e,new_parent){
						var child=new_parent.children;
						child.push({id:req.body.id,name:retVal.kategori_adi});
						var alan1={$set:{}};
		        		alan1.$set["children"]=child;
		        		functions.guncelle(req.body.model,new_parent._id,alan1,function(sonuc){
			        		us++;
			        		if(us==3)
			        			uutils.sendReturn(res,sonuc);
			        	});
					});
	        	///////////////////////////////////////////////////////////////////////////
			});
				
		break;
		case 'update_resim':
			/*fs.mkdir('././data',function(){
				fs.mkdir('././data/gallery');
			});*/
			var imgid   =uuid.v4();
        	var pos		=req.body.img.indexOf(';');
			var imgtype =req.body.img.substring(11,pos);
			var buf 	= new Buffer(req.body.img.replace(/^data:image\/(png|gif|jpeg|jpg);base64,/,''), 'base64');
			var fname	='././data/gallery/'+imgid+'.jpeg';
			var tname	='././data/gallery/t'+imgid+'.jpeg';
			fs.writeFileSync(fname,buf);
			
			/////////hangi kategori için resim eklendiyse resmin ismi update edilsin
			var alan1={$set:{}};
		    alan1.$set["picture"]=imgid;
		    console.log(req.body.kategori_id);
		    functions.guncelle('kategori',req.body.kategori_id,alan1,function(sonuc){
		    	console.log(sonuc);
		    	uutils.sendReturn(res,"ok");
		    });
		break;
		case 'update_user_resim':
			/*fs.mkdir('././data',function(){
				fs.mkdir('././data/gallery');
			});*/
			var imgid   =uuid.v4();
        	var pos		=req.body.img.indexOf(';');
			var imgtype =req.body.img.substring(11,pos);
			var buf 	= new Buffer(req.body.img.replace(/^data:image\/(png|gif|jpeg|jpg);base64,/,''), 'base64');
			var fname	='././data/gallery/'+imgid+'.jpeg';
			var tname	='././data/gallery/t'+imgid+'.jpeg';
			fs.writeFileSync(fname,buf);
			
			/////////hangi kategori için resim eklendiyse resmin ismi update edilsin
			var alan1={$set:{}};
		    alan1.$set["picture"]=imgid;
		    console.log(req.body.user_id);
		    functions.guncelle('user',req.body.user_id,alan1,function(sonuc){
		    	console.log(sonuc);
		    	uutils.sendReturn(res,"ok");
		    });
		break;
		case 'saveuser':
	        var text ="";
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
				for( var i=0; i < 24; i++ ){
	   				 text += possible.charAt(Math.floor(Math.random() * possible.length));
		  		}
	  			console.log(text);
		   var  dt   =new Date();
		   var tarih = dt.toLocaleString();

			var usrmodel 					= mdb.model('user'); 
			var usr 	 					= new usrmodel();
			usr.user_name 	 				= req.body.veri.kullanici_adi;			
			usr.name   						= req.body.veri.adi;
			usr.surname   					= req.body.veri.soyadi;
			usr.email  						= req.body.veri.email;
			usr.password					= req.body.veri.sifre;
			usr.day							= req.body.veri.gun;
			usr.month						= req.body.veri.ay;
			usr.year						= req.body.veri.yıl;
			usr.cinsiyet					= req.body.veri.cinsiyet;
			usr.aktivasyon					=text;
			usr.girisDurum					="0";
			usr.cevrimici					=[{user_name:null,ip:null}];
			usr.role                        = [{role_name:'caylak',permission:['9']}];
			usr.picture						="";
			usr.ban  						=["54e31a3de6b1cbdc229fa7e7"];
			//usr.yorum                     =["qqqqqqqqqqqqqqqqqqqq","wwwwwwwwwwwwwwwwwwwwwww","ttttttttttttttttt"];
		    usr.save(function(e){
				console.log(usr);
				if(e)
					console.log(e);
				else
					var mailOptions = {
                      from: "info@usishi.com", // sender address
                      to: req.body.veri.email,
                      subject: "Mesaj İletisi ",
                      html: "<html><body><h1><b>Aktivasyon Kodu</b></h1><br>" +
                            "<p><b>Link   : </b> <a href='http://localhost:8080/pg/aktivasyon/"+usr.aktivasyon+"' target='_blank'>Aktivasyon Kodu</a> </p>" +                            
                            "<p><b>Tarih  </b>&nbsp;&nbsp;"+tarih+" </p>" +
                            "</body></html>"
	                  }
		                smtpTransport.sendMail(mailOptions, function(error, response){
		                    if(error){
		                        uutils.sendReturn(res,"Mesaj gönderilirken bir hata oluştu,Lütfen tekrar deneyiniz.");
		                    }else{
		                       
		                       console.log("Message sent: " + response.message);
		                       uutils.sendReturn(res,true);
		                    }
		                });
			});
		break;

		case 'savemesaj':
		    var d = new Date();
		    var dtarih =d.toLocaleString();
		    var alici = req.body.veri.alıcı;
			var msjmodel 				= mdb.model('mesaj'); 
			var msj 	 				= new msjmodel();
			msj.title 	 				= req.body.veri.title;			
			msj.mesaj_icerik   			= req.body.veri.mesaj;
			msj.sender   				= req.body.veri.gonderen;
			msj.received  				= req.body.veri.alici;
			msj.durum                   =1;
			msjreceived_durum           =1;
			msj.gonderme_tarih			= dtarih;
			msj.save(function(e){
				console.log(msj);
				if(e){
					console.log(e);
				}else{
		
				    mdb.model("user").findOne({user_name:req.body.veri.alici},function(e,cvp){
				  		var mailOptions = {
	                      from: "resit.yilmaz@usishi.com", // sender address
	                      to: cvp.email,
	                      subject: "Mesaj İletisi ",
	                      html: "<html><body><p><b>İletiniz</b></p>" +
	                            "<p><b>Konu</b>    "+req.body.veri.title+" </p>" +
	                            "<p><b>Mesaj </b>  "+req.body.veri.mesaj+" </p>" +
	                            "<p><b>Tarih  </b>&nbsp;&nbsp;"+dtarih+" </p>" +
	                            "</body></html>"
	                  }
		                smtpTransport.sendMail(mailOptions, function(error, response){
		                    if(error){
		                        uutils.sendReturn(res,"hata");
		                    }else{
		                       uutils.sendReturn(res,"okey");
		                    }
		                });
				    });
				}
			});
				
		break;
		
		case 'kbul':
		    mdb.model('user').findOne({user_name:req.body.user_name,password:req.body.password},function(e,kayit){
		    	if(kayit !=null){
		    		console.log("-----------");
			    	if(kayit.girisDurum ==1 ){
			    		console.log("*************");
			    		var  data ={   
			    					user_name: kayit.user_name,
			    					ip       : req.connection.remoteAddress
			    					}
			    		var alan1 ={$set:{}};
						alan1.$set['cevrimici'] = data;
						mdb.model('user').findByIdAndUpdate(kayit._id,alan1,function(err,result){
					   			var durum=kayit==null?false:true;
				    			req.session.user=JSON.stringify(kayit);			    
				    			uutils.sendReturn(res,{status:durum});
						})  

			    	}else{
			    		uutils.sendReturn(res,{status:'hata'});
			    	}
			    }
			    else{ 
				    uutils.sendReturn(res,{status:'hata1'});
				}		    		
				
			});
		 break;

		 case 'kisibul':
		    mdb.model(req.body.model).findOne({user_name:req.body.user_name},function(e,kayit){
		    	console.log(kayit);
		    	uutils.sendReturn(res,kayit);	
				
			});
		 break;
		 case 'control':
		    mdb.model(req.body.model).findOne({user_name:req.body.user_name},function(e,kayit){
		    	console.log(kayit);
		    	var durum=kayit==null?false:true;
		    	uutils.sendReturn(res,{status:durum});	
				
			});
		 break;
		  case 'bul':
				mdb.model(req.body.model).find({$or:[{ kategori_id: { $regex : req.body.id, $options: 'i' } }] },function(e,sonuclar){  
					uutils.sendReturn(res,sonuclar);

			    });
		 break;
		 case 'konuBul':
			 mdb.model(req.body.model).find({_id:req.body.id},function(e,sonuclar){
			 	uutils.sendReturn(res,sonuclar);
			 });
		 break;
		 case 'toplu_konuGetir':
		 	var toplu_sonuc={},sayac=0;
		 	req.body.idler.forEach(function(kayit){		 		
		 		mdb.model(req.body.model).find({kategori_id:kayit},function(e,sonuclar){
		 			sayac++;
			 		toplu_sonuc[kayit]=sonuclar;
			 		if(sayac==req.body.idler.length)
			 			uutils.sendReturn(res,toplu_sonuc);
				});
		 	});
		 	
		 break;
		 case 'findSome':
		 	if(req.body.kk_id){
		 		 mdb.model(req.body.model).findOne({kk_id:req.body.kk_id},function(e,sonuclar){
				 	uutils.sendReturn(res,sonuclar);
				 });
		 	}
		 	else{
		 		mdb.model(req.body.model).findOne({_id:req.body.id},function(e,sonuclar){
				 	uutils.sendReturn(res,sonuclar);
				});	
		 	}
		 break;
		 case 'yorumBul':
		 	 mdb.model(req.body.model).find({konu_id:req.body.id},function(e,sonuclar){

			 	uutils.sendReturn(res,sonuclar);
			 });
		 break;
		 case 'konuidBul':
		 var dizi=[];
			 mdb.model(req.body.model).find({},function(e,sonuclar){
			 	console.log(sonuclar);
			 	var us=0;
			 	sonuclar.forEach(function(kayit){
			 		us++;
			 		if(kayit.ekleyen.id==req.body.ekleyen_id){
			 			//sonuclar.splice(us-1,1);
			 			dizi.push(kayit);
			 		}
			 		if(us==sonuclar.length)
			 			uutils.sendReturn(res,dizi);
			 	});
			 });
		 break;
		 case 'logout':
		 	req.session.destroy();
		 	var alan1={$set:{}};
		 	var data ={ 
		 				user_name:null,
		 				ip       :null
		 			}
 			alan1.$set['cevrimici'] = data;
			mdb.model('user').findByIdAndUpdate(req.body.id,alan1,function(err,result){
   				uutils.sendReturn(res,"ok");
			});  
		 	
		 break;
		 case 'silme':	
		 	 	mdb.model(req.body.model).remove({_id:req.body.id},function(sonuclar){
		 	 		uutils.sendReturn(res,true);
		 	 	});
		 break;
		 case 'duzeltme':
		 	console.log("deneme deneme ");
		 	var data = req.body.bilgi;
    		var urunler ={$set:{}};
			veri = data;
			mdb.model(req.body.bilgi.schema).findByIdAndUpdate(req.body.bilgi.id,veri,function(err,result){
		   		uutils.sendReturn(res,"okey");
			})
		 	
		 break;
		 case 'sonYorum':
			if(req.body.bilgi=="konu"){
				var q= mdb.model(req.body.model).find({konu_id:req.body.id},function(e,cvp){
					  	q.sort({ekleme_tarihi:'desc'}).limit(1).exec(function(err,sonuc2){
					  		uutils.sendReturn(res,sonuc2);
		        		});				  	
				  });
			}else if(req.body.bilgi =='anasayfa'){
				var toplu = [],sayac=0;
				req.body.id.forEach(function(child){
					 mdb.model(req.body.model).find({kategori_id:child},function(e,sonuclar){
					 	sayac++;
					 	sonuclar.forEach(function(veriler){
					 		toplu.push(veriler);
					 	});	
						if(sayac==req.body.id.length){
						 	var sonuc = toplu.sort({ekleme_tarihi:'desc'});
						 	var call= sonuc.slice(0,1);
						 	uutils.sendReturn(res,call);
						} 		 
					});			 
				});
			}else if(req.body.bilgi='total'){
				 var t = mdb.model(req.body.model).find({konu_id:req.body.id},function(e,veri){
				 	    t.count().exec(function(e,cvp){
				 	    	var sonuc=cvp.toString();
				 	    	uutils.sendReturn(res,sonuc);
				 	    });

				 });
			}
		 break;	
		 case 'sayac':
	 	    var total=[],say=0;
		 	req.body.id.forEach(function(deger){
	  			var t1=mdb.model('konu').find({kategori_id:deger},function(e,sonuc){
	  				say++;
	  			   	sonuc.forEach(function(kayit){
	  			   		total.push(kayit);
	  			   	});
	  			   	if(say==req.body.id.length ){	
			        	var data=total.length.toString();
			        	uutils.sendReturn(res,data);
	 				}
	 			});
		  		  		    
	 		});				 	
		 break;
		 case 'totalYorum':  
		  var total=[],say=0;
		 	req.body.id.forEach(function(deger){
	  			var t1=mdb.model('yorum').find({kategori_id:deger},function(e,sonuc){
	  				say++;
	  			   	sonuc.forEach(function(kayit){
	  			   		total.push(kayit);
	  			   	});
	  			   	if(say==req.body.id.length ){	
			        	var data=total.length.toString();
			        	uutils.sendReturn(res,data);
	 				}
	 			});		  		  		    
	 		});		
		 break;
		 case 'popularKonular':
		    var sayac= 0,eleman=[];
		    var t = mdb.model('konu').find({},function(e,sonuc){
		      	 
		      	 sonuc.forEach(function(retVal){
		      	 	 sayac++;
		      	 	eleman.push(retVal);
		      	 })
		      	  console.log(sayac);
		      	  console.log(sonuc.length);	
		      	  if(sayac== sonuc.length){
		      	  	 var veri = eleman.sort({sayi:'desc'});
		      	  	 var data =veri.slice(0,6);

		      	  	 uutils.sendReturn(res,data);
		      	   }		  
			  })
		 break;
		 case 'mesajListesi':
		    var sayac= 0,eleman=[];
		    var t = mdb.model('yorum').find({},function(e,sonuc){
		      	 
		      	 sonuc.forEach(function(retVal){
		      	 	 sayac++;
		      	 	eleman.push(retVal);
		      	 })
		      	  console.log(sayac);
		      	  console.log(sonuc.length);	
		      	  if(sayac== sonuc.length){
		      	  	 var veri = eleman.sort({ekleme_zamani:'desc'});
		      	  	 var data =veri.slice(0,6);

		      	  	 uutils.sendReturn(res,data);
		      	   }		  
			  })
		 break;
		 case 'search':
			    var sayac= 0;		   
		    	mdb.model('konu').find({$or:[{ icerik: { $regex : req.body.kelime, $options: 'i' } },{ konu_baslik: { $regex : req.body.kelime , $options: 'i'} }]} ,function(e,kisiler){  
		    		var search_result={konu:kisiler};
		    		mdb.model('kategori').find({$or:[{ kategori_adi: { $regex : req.body.kelime, $options: 'i' } }]} ,function(e,veri){  
						search_result.kategori=veri;
						mdb.model('yorum').find({$or:[{ yorum: { $regex : req.body.kelime, $options: 'i' } }]} ,function(e,cvp){  
									search_result.yorum=cvp;
								mdb.model('user').find({$or:[{ user_name: { $regex : req.body.kelime, $options: 'i' } }]} ,function(e,kadi){  
									search_result.member=kadi;
									uutils.sendReturn(res,search_result);
				       			});
				        });
				    });				
				});	   
		 break;
		 case 'sonOnline':
		     var  date      = new Date();
		     var  tarih      =date.getDay()+"."+date.getMonth()+"."+date.getFullYear();
		     var eleman =[] ,sayac =0;
		     mdb.model('cevrimici').find({},function(e,sonuclar){
	           sonuclar.forEach(function(cvp){
	           	 sayac++;	           	
	           		if(cvp.ekleme_tarihi == tarih){
	           			eleman.push(cvp);	           			
	           			if(sayac == sonuclar.length)
	           				uutils.sendReturn(res,eleman);
	           		}else{
	           	 		console.log("kullanıcı yokk.");
	           		} 
	           });
		     });
		 break;
		 case 'mesajGonder':
		
		  mdb.model('user').find({email:req.body.email},function(e,veri){
		  	console.log(veri.length);
		  	 if(veri.length > 0){
		  		veri.forEach(function(retVal){
		  			console.log(retVal.email);
			  	 	var mailOptions = {
	                      from: "info@usishiforum.com", // sender address
	                      to: retVal.email,
	                      subject: "Şifre Hatırlatma ",
	                      html: "<html><body><p><b>Bilgileriniz</b></p>" +
	                            "<p><b>E-posta   </b>"+retVal.email+" </p>" +
	                            "<p><b>Şifre     </b>"+retVal.password+" </p>" +
	                            "</body></html>"
	                  }
	                smtpTransport.sendMail(mailOptions, function(error, response){
	                    if(error){
	                    	
	                        uutils.sendReturn(res,"Mesaj gönderilirken bir hata oluştu,Lütfen tekrar deneyiniz.");
	                    }else{
	                     
	                       console.log("Message sent: " + response.message);
	                       uutils.sendReturn(res,"Mesajınız başarılı bir şekilde gönderilmiştir.");
	                    }
	                });
	            });
		  	 }else{
		  	 	uutils.sendReturn(res,"hata");
		  	 }
		  });
		 break;
		 case 'bildirimEposta':
		 if(req.body.bilgi == "konu"){		 		
				mdb.model('konu').findOne({_id:req.body.veri.sonuc.konu_id},function(e,sonuclar){
					console.log(sonuclar);
					
						var bildirimodel 				= mdb.model('bildiri'); 
						var msj 	 				    = new bildirimodel();
						msj.konu_id	 				    = req.body.veri.sonuc.konu_id;
						msj.konu_baslik 				= sonuclar.konu_baslik;			
						msj.bildiri_yapan   			= req.body.veri.sonuc.ekleyen;
						msj.kime_bildiri   				= sonuclar.ekleyen;
						msj.bildiri_durumu 				= req.body.durum;
						msj.save(function(e){
							console.log(msj);
							if(e)
								console.log(e);
							else
								uutils.sendReturn(res,true);
						});
				})	 		

	
		 }else if(req.body.bilgi=="liste"){
		 	var eleman=[],us=0;
		 	    mdb.model('bildiri').find({},function(e,sonuclar){
	 				sonuclar.forEach(function(cvp){
	 					us++;
	 					if(req.body.id == cvp.kime_bildiri.id){		 						
	 						eleman.push(sonuclar);		 					    
	 					}
		 		    });
		 			if(sonuclar.length == us){
	 					uutils.sendReturn(res,eleman);			 				  
	 				}		
		 	    });
		 }else if(req.body.bilgi =="bildimListe"){
		 	
		 	
		 }
		break;
		case 'bildirimUpdate':
			var alan1={$set:{}};
			var durum =false;
	        alan1.$set['durum']=durum;
	 		console.log(req.body.id);
			mdb.model(req.body.model).findByIdAndUpdate(req.body.id,alan1,function(e,guncelleme){
			 	if(e!=null){  
    				uutils.sendReturn(res,{status:e});
	    		}
	    		else{
	    			console.log(guncelleme);
	    			uutils.sendReturn(res,{status:"1"});
	    		}
			})
		break;
		case 'alintiBul':
			var eleman=[],us=0;;
			mdb.model(req.body.model).find({},function(e,veri){	
				veri.forEach(function(cvp){
				   us++;
				   if(req.body.id == cvp.alinan_kisi.id){
				   		eleman.push(cvp);
				   }				 	   
				});	
				if(veri.length == us){
		 	    	uutils.sendReturn(res,eleman);	
		 	    }	 	
		 	});
		break;
		case 'bildiriSayisi':
		  var us=0,total=[];
		  mdb.model('bildiri').find({durum:"true"},function(e,veri){		  
		  		veri.forEach(function(kayit){
		  			us++;
		  			if(req.body.id == kayit.kime_bildiri.id){
		  				total.push(kayit);
		  			}
		  			if(veri.length == us){
		  				var toplam =total.length.toString();
		  				uutils.sendReturn(res,toplam);
		  			}
		  		});
		  });
		break;
		case 'konuSil':
		 console.log("konu Silme yeri----------------");
		  	mdb.model(req.body.model).remove({_id:req.body.id},function(sonuclar){
		 	 		uutils.sendReturn(res,true);
		 	});
		break;
		case 'onayKodu':
			console.log("Üye Kayit oldukdan sonra  email postasına gonderilen  ")
			mdb.model('user').find({aktivasyon:req.body.param},function(e,result){
				mdb.model('user').findByIdAndUpdate(result[0]._id, { $set: { girisDurum: '1' }},function(err,veri){
				 	uutils.sendReturn(res,veri);
				});
			});
		break;

		 case 'findSome1':
		 	 mdb.model(req.body.model).findOne({user_name:req.body.user},function(e,sonuclar){

			 	uutils.sendReturn(res,sonuclar);
			 });
		 break;
		case 'alintiKaydet':
				
	        var alintimodel 				= mdb.model('alinti'); 
			var msj 	 				    = new alintimodel();
			msj.konu_id	 				    = req.body.veri.konu;	
			msj.yorum_id					= req.body.veri.yorumID;	
			msj.alinan_kisi   			    = req.body.veri.alinan_kisi;
			msj.ekleyen_kisi   				= req.body.veri.ekleyen_kisi;
			msj.ekleme_tarih 				= req.body.veri.ekleme_tarih;
			
			msj.save(function(e){
				console.log(msj);
				if(e){
					console.log(e);
				}
				else{
					mdb.model('user').find({_id:req.body.veri.alinan_kisi.id},function(e,veri){
					  	console.log(veri.length);
					  	 if(veri.length > 0){
					  		veri.forEach(function(retVal){
					  			console.log("********************************************************************************");
		    					console.log(req.body.veri.alinan_kisi.id);	
					  			console.log(retVal.email);
					  			console.log("-------------------------------------------------------------------------------");
						  	 	var mailOptions = {
				                      from: "info@usishiforum.com", // sender address
				                      to: retVal.email,
				                      subject: "Usishi forum  Bildirim formu ",
				                      html: "<html><p><b>Sayın üyemiz yazdığınız mesaj  yorum Yapıldi..</b></p>" +
				                            "<p><b></b><a href='localhost:3000/pg/konudetay/"+req.body.veri.konu+"' target='_blank'>konu git</a> </p>" +
				                            "<p><b> </b><a href='localhost:3000/pg/profil/"+req.body.veri.ekleyen_kisi.id+"' target='_blank' >Profil</a> </p>" +
				                            "</body></html>"
				                  }
				                smtpTransport.sendMail(mailOptions, function(error, response){
				                    if(error){
				                    	console.log("hataa");
				                       // uutils.sendReturn(res,"Mesaj gönderilirken bir hata oluştu,Lütfen tekrar deneyiniz.");
				                    }else{
				                        console.log("okeyyy");
				                       //console.log("Message sent: " + response.message);
				                       //uutils.sendReturn(res,"Mesajınız başarılı bir şekilde gönderilmiştir.");
				                    }
				                });
				            });
						}
					});	
				}
			});			 		
		break;
		case 'user_ban_update':
			mdb.model('user').findOne({_id:req.body.id},function(e,sonuc){				
				var alan1={$set:{}};
        		alan1.$set['ban']=req.body.yeni_deger;
        		mdb.model('user').findByIdAndUpdate(req.body.id,alan1,function(e,guncelleme){
        			console.log("**********************************");
				 	console.log(guncelleme+"*******");
				});
			})
		break;
		case 'altMesaj':
		    var d = new Date();
		    var dtarih =d.toLocaleString()
		
				mdb.model('mesaj').findOne({_id:req.body.bilgi.id},function(e,retVal){
					console.log(retVal);

					var altmesajmodel 				= mdb.model('alt_mesaj'); 
					var msj 	 				    = new altmesajmodel();
					msj.ust_id						=req.body.bilgi.id;
					msj.mesaj_icerik                =req.body.bilgi.mesaj_icerik;
					msj.durum                       =1;
					msj.received_durum              =1;
					msj.sender                      =retVal.sender;
					msj.received                    =retVal.received;
					msj.gonderme_tarih              =dtarih;
					msj.save(function(e){
						console.log(msj);
						if(e)
							console.log(e);
						else
							uutils.sendReturn(res,true);
					});
				})

		break;
		case'cevapBul':
		 mdb.model('alt_mesaj').find({ust_id:req.body.id},function(e,result){
		 	console.log(result);

		 })
		break;
	

	}
}
