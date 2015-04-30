var us_tab="1";
$(document).ready(function() {
	$('.tabs').click(function(){
		    us_tab=$(this).attr('id');
		});
});
function save(tur){
	console.log(us_tab);
	switch(tur){
        case 'kategori':
        	var cocuk=[];
        	if(us_tab=="1"){
	        	var kayitlar={  bolum:tur,
	                           
	             				kategori_adi    :$('#kategori_adi').val(),
	             				parent 			:{id:"",name:""},
	             				children        :cocuk,
	             				picture         :"",
	                            schema   		:'kategori'
	                    };
	        }
	        else{
	        	var kayitlar={  bolum:"alt_kategori",
	                           
	             				kategori_adi    :$('#alt_kategori').val(),
	             				parent          :{id:$('#kat_secim option:selected').attr('id'),name:$('#kat_secim').val()},
	             				children        :cocuk,
	             				picture         :"",
	                            schema   		:'kategori'
	                    };
	        }
        break;
        case 'role':
        	var kayitlar={  
        					bolum:tur,   
             				role_name      :$('#rol_name').val(),
             				permission     :us_izin, 
                            schema   	   :'role'
	                    };
        break;
    }
    console.log(kayitlar);
    postData('/ajax/save',{bilgi:kayitlar},function(retVal){
    	if(retVal.sonuc!=undefined){
    		if(tur=="kategori"){
	    		mesaj_gonder("KAYIT","Kategori Kaydetme İşlemi Başarılı","green");
	    		getList();
	    		$('#kategori_adi').val("");
	    	}
	    	else if(tur=="role"){
	    		mesaj_gonder("KAYIT","Rol Kaydetme İşlemi Başarılı","green");
	    		$('#rol_name').val("");
	    		getList();	
	    	}
    	}
    	else 
    		alert(retVal.hata);
    });
}
function sil(id,model,geridonus){
	onay_kutu("Silme","silmek istediğinizden emin misiniz?",function(sonuc){
		if(sonuc){
			postData('/ajax/sil',{model:model,id:id},function(retVal){
				if(retVal.status=="1"){
					mesaj_gonder("BİLGİ","Silme İşlemi Başarı İle Tamamlanmıştır","green");
					window[geridonus]();
				}
				else 
					mesaj_gonder("UYARI",retVal.status,"red");
			});
		}

	});
}
function update_alan(id,alan,model,geridonus){
	$('#genel').modal('hide');
	postData('/ajax/update_alan',{id:id,model:model,alan:alan,yeni_deger:$('#new_value').val()},function(retVal){
		if(retVal.status=="1")
			window[geridonus]();
		else 
			alert(retVal.status);
	});
}