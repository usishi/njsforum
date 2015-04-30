function pad(val, len) {
  val = String(val);
  len = len || 2;
  while (val.length < len) val = "0" + val;
  return val;
};

Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
}

function TurkceTarih(_date,mode){
   // Günler
   var weekday = new Array(7);
   weekday[1] = 'Pazar';
   weekday[2] = 'Pazartesi';
   weekday[3] = 'Salı';
   weekday[4] = 'Çarşamba';
   weekday[5] = 'Perşembe';
   weekday[6] = 'Cuma';
   weekday[7] = 'Cumartesi';
   // Aylar
   var month = new Array(12);
   month[1] = 'Ocak';
   month[2] = 'Şubat';
   month[3] = 'Mart';
   month[4] = 'Nisan';
   month[5] = 'Mayıs';
   month[6] = 'Haziran';
   month[7] = 'Temmuz';
   month[8] = 'Ağustos';
   month[9] = 'Eylül';
   month[10] = 'Ekim';
   month[11] = 'Kasım';
   month[12] = 'Aralık';

   yr_st = " 19";
   yr = _date.getYear();
   if ( yr > 99 )
   {
   yr_st =" ";
   if ( yr < 2000 ) yr += 1900;
   }
   
  switch(mode){
    case 'tarih' : return _date.getDate() + ' ' + month[_date.getMonth()+1] + ' ' + yr_st+ yr;
    case 'saat' : return pad(_date.getHours(),2) + ":" + pad(_date.getMinutes(),2) + ":" + pad(_date.getSeconds(),2);
    default : return _date.getDate() + ' ' 
          + month[_date.getMonth()+1] + ' ' 
          + yr_st+ yr + ' ' 
          + pad(_date.getHours(),2) + ":" + pad(_date.getMinutes(),2) + ":" + pad(_date.getSeconds(),2);
  }
}


function getOValue(objname) {
  var obj = document.getElementById(objname);
  if (obj){
    if (obj.type=='checkbox'){
      if (obj.checked) { return 'on';  } else { return 'off'; }
    } else {
      return document.getElementById(objname).value;   
    }
  } else {
    return null;
  }
}


function getRadioValue(radioname){
  var sonuc=$('input[name='+radioname+']:checked').val();
  return sonuc; 
}

function postData(url,data,callback,timeoutms) {
  
  var reqopts = { type: 'POST',
           contentType: 'application/json',
              dataType:'json',
                  data: JSON.stringify(data),
                 cache:false
      ,success: function(data, textStatus, jqXHR) {
        callback(jQuery.parseJSON(jqXHR.responseText));

      }
      ,error  : function(e) {
        if (e.readyState==4 && e.statusText=="OK"){
          callback(e.responseText);
        } else if ((e.readyState==0) && (e.statusText=="timeout")) {
          callback("timeout");
        } else {
          callback("bad response : "+JSON.stringify(e)+'\n\n'+e.statusText);
        }
      }
  };
  
  if (timeoutms){ reqopts.timeout=timeoutms };
  $.ajax(url,reqopts);
}

function setActiveMenu(id){  
  if (id%100!=0){
    var anamenu = (Math.floor(id/100)*100);
      $('li').removeClass('active');
      $('#menu'+anamenu).addClass('active open');
      $('#menu'+id).addClass('active');
      $('#menu'+anamenu+'>  a >  b > em').removeClass('fa-plus-square-o');
      $('#menu'+anamenu+'>  ul').css('display','block');
      $('#menu'+anamenu+'>  a >  b > em').addClass('fa-minus-square-o');
  
     $('.breadcrumb').html('').append('<li>Userp</li><li>'+$('#menu'+anamenu+'> a').attr("name")+'</li>'+'<li>'+$('#menu'+id+' a').attr('name')+'</li>');

  } else {
    $('#menu'+id).addClass('active');
    $('.breadcrumb').html('').append('<li>Userp</li><li>'+$('#menu'+id+'> a').attr("name")+'</li>');
  }
 
    
  
}

function getRandomString(charCount){
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for( var i=0; i < charCount; i++ )
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}


function bytesToSize(bytes, precision)
{  
    var kilobyte = 1024;
    var megabyte = kilobyte * 1024;
    var gigabyte = megabyte * 1024;
    var terabyte = gigabyte * 1024;
   
    if ((bytes >= 0) && (bytes < kilobyte)) {
        return bytes + ' B';
 
    } else if ((bytes >= kilobyte) && (bytes < megabyte)) {
        return (bytes / kilobyte).toFixed(precision) + ' KiB';
 
    } else if ((bytes >= megabyte) && (bytes < gigabyte)) {
        return (bytes / megabyte).toFixed(precision) + ' MiB';
 
    } else if ((bytes >= gigabyte) && (bytes < terabyte)) {
        return (bytes / gigabyte).toFixed(precision) + ' GiB';
 
    } else if (bytes >= terabyte) {
        return (bytes / terabyte).toFixed(precision) + ' TeB';
 
    } else {
        return bytes + ' Bi';
    }
}

/// Events 
$.fn.onEnterKey = function( cb ) {
  $(this).keypress(
    function( event ) {
        code = event.keyCode ? event.keyCode : event.which;
        if ( code == 13 ) {
            cb();
            return false;
        }
    } );
}

function usencode(str){
  return window.btoa(unescape(encodeURIComponent(str)));
}

function usdecode(str){
  return decodeURIComponent(escape(window.atob( str )));
}
function menu_izinleri(){
  console.log(izin);
  ////////////////Miy start ////////////////////
  if(izin.indexOf("17")<0 && izin.indexOf("89")<0 && izin.indexOf("0")<0)
    $('#menu500').remove();
  else{
    if(izin.indexOf("17")<0 && izin.indexOf("0")<0)
      $('#menu510').remove();
    if(izin.indexOf("89")<0 && izin.indexOf("0")<0)
      $('#menu520').remove();
  }
  /////////////////Miy finish//////////////////////
  ////////////////firma start ////////////////////
  if(izin.indexOf("3")<0 && izin.indexOf("0")<0)
    $('#menu600').remove();
  else{
  }
  ////////////////////firma finish//////////////////////
  ////////////////departman start ////////////////////
  if(izin.indexOf("5")<0 && izin.indexOf("0")<0)
    $('#menu700').remove();
  else{
  }
  /////////////////departman finish//////////////////////
  ////////////////Kullanıcılar start ////////////////////
  if(izin.indexOf("13")<0 && izin.indexOf("11")<0 && izin.indexOf("0")<0)
    $('#menu800').remove();
  else{
    if(izin.indexOf("13")<0 && izin.indexOf("0")<0)
      $('#menu810').remove();
    if(izin.indexOf("11")<0 && izin.indexOf("0")<0)
      $('#menu820').remove();
  }
  /////////////////Kullanıcılar finish//////////////////////
  ////////////////Ürün Kartları start ////////////////////
  if(izin.indexOf("73")<0 && izin.indexOf("79")<0 && izin.indexOf("0")<0)
    $('#menu900').remove();
  else{
    if(izin.indexOf("73")<0 && izin.indexOf("0")<0)
      $('#menu910').remove();
    if(izin.indexOf("79")<0 && izin.indexOf("0")<0)
      $('#menu920').remove();
  }
  /////////////////Ürün Kartları finish//////////////////////
  ////////////////Fatura İrsaliye  start ////////////////////
  if(izin.indexOf("47")<0 && izin.indexOf("19")<0 && izin.indexOf("23")<0 && izin.indexOf("0")<0)
    $('#menu1000').remove();
  else{
    if(izin.indexOf("47")<0 && izin.indexOf("0")<0)
      $('#menu1010').remove();
    if(izin.indexOf("19")<0 && izin.indexOf("0")<0)
      $('#menu1020').remove();
    if(izin.indexOf("23")<0 && izin.indexOf("0")<0)
      $('#menu1030').remove();
  }
  /////////////////Fatura İrsaliye  finish//////////////////////
  ////////////////Sms start ////////////////////
  if(izin.indexOf("83")<0 && izin.indexOf("0")<0)
    $('#menu1100').remove();
  else{
  }
  /////////////////Sms finish//////////////////////
}

//////////////////////////////////////para miktarını yazıya çevrilmesi sağlanıyor//////////////////
var sonuc="";
var kusur="";
function intTofont(veri){
  sonuc="";kusur="";
  var ara_yazi=["","Bin","Milyon","Milyar","Trilyon","Katrilyon"];
  var data=veri.substring(0,veri.indexOf("."));
  var kusurat=veri.substring(veri.indexOf(".")+1);
  var basamak_sayisi=data.length;
  for (var i = 0; i < basamak_sayisi; i++) {
    yazi_ver(data[i],basamak_sayisi-i,"on");
    if((basamak_sayisi-i-1)%3==0){
      sonuc=sonuc+(ara_yazi[(basamak_sayisi-i-1)/3])+" ";
    }
  }
  for (var k = 0; k<2 ; k++) {
    yazi_ver(kusurat[k],2-k,"arka");
  };
  return (sonuc+"TL "+kusur+" Kr");
}
function yazi_ver(veri,basamak1,yer){
  var basamak=[
                [0,"Sıfır","","","bin",""],
                [1,"Bir","On","Yüz"],
                [2,"İki","Yirmi","İki Yüz"],
                [3,"Üç","Otuz","Üç Yüz"],
                [4,"Dört","Krk","Dört Yüz"],
                [5,"Beş","Elli","Beş Yüz"],
                [6,"Altı","Altmış","Altı Yüz"],
                [7,"Yedi","Yetmiş","Yedi Yüz"],
                [8,"Sekiz","Seksen","Sekiz Yüz"],
                [9,"Dokuz","Doksan","Dokuz Yüz"]
              ];
  var deger=basamak1%3==0?3:basamak1%3;
  if(veri!="0"){
    if(yer=="on")
      sonuc=sonuc+(basamak[veri][deger])+" ";
    else 
      kusur=kusur+(basamak[veri][deger])+" ";
  }
}
//////////////////////////////yazıya çevirme bitiş/////////////////////////////////