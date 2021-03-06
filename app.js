var  express   = require('express')
    ,pjson     = require('./package.json')
    ,ajax      = require('./lib/ajaxfunctions.js')
    ,mongoose  = require('mongoose')
    ,uwebtools = require('uwebtools')
    ,models    = require('./lib/models')
    ,http      = require('http')
    ,nodekk    = require('nodekk')
    ,functions = require('./lib/functions')
    ,bodyParser= require('body-parser')
    ,cParser   = require('cookie-parser')
    ,session   = require('express-session')
    ,mo        = require('method-override')
    ,fs        = require('fs')
    ,mime       = require('mime')
    ,cookieParser = require('cookie-parser'),
    recaptcha = require('node-no-captcha')
    ;
var app        = express();
var uutils     = global.uutils = uwebtools.uutils.createObject();
var mdb        = global.mdb    = mongoose.createConnection();
var config     = global.config = require('./config').config;
secret = 'your_secret_key';
fs.mkdir(__dirname+'/data',function(){
  fs.mkdir(__dirname+'/data/gallery');
});

var admin_check=function(req,res,next){////////veri tabanında kullanıcıyı kontrol ediyor yoksa veri tabanındaki kayıt sayısını kontrol ediyor 
                                       ///////eğer kayıt sayısı 0 ise ilk kullanıcı için otomatik kayıt yapılıyor.0 dan büyükse başvuru için başvuru sayfasına yönlendiriliyor...
  mdb.model('user').findOne({kk_id:req.session.user._id},function(e,users){
    if(users!=null ){
      //req.session.user=users;
      next();
    }
    else
    {
      mdb.model('user').find({},function(e,users){
        if(users.length==0){
          console.log("veri tabanında kayıtlı hiç kullanıcı yok");
          console.log(req.session.user);
          var user_kayitmodel=mdb.model('user');
          var user           =new user_kayitmodel();
          user._id           =req.session.user._id;
          user.name          =req.session.user.firstname;
          user.surname       =req.session.user.lastname;
          user.email         =req.session.user.email;
          user.kk_id         =req.session.user._id;
          user.user_name     =req.session.user.email;
          user.password      = "1";
          user.role          =[{permission:["9"],role_name : "caylak"}];
          user.picture       =""; 
          user.day           = "Gün";
          user.month         = "Ay";
          user.year          = "Yıl"; 
          user.permission    =["0"];
          user.ban           =[];
          user.cevrimici     =[{user_name:null,ip:null}]
          user.save(function(err,sonuc){
            if(err)
              res.render('dashboard',{hata : err});
            else
              res.render('dashboard/dashboard',{user : req.session.user});
          });
        }
        else
          res.render('index',{user : JSON.stringify(req.session.user)}); 
      });
      
    }
  });
}


var user_check=function(req,res,next){////////veri tabanında kullanıcıyı kontrol ediyor yoksa veri tabanındaki kayıt sayısını kontrol ediyor 
                                       ///////eğer kayıt sayısı 0 ise ilk kullanıcı için otomatik kayıt yapılıyor.0 dan büyükse başvuru için başvuru sayfasına yönlendiriliyor...
  mdb.model('user').findOne({kk_id:req.session.user._id},function(e,users){
     if(users!=null ){

      res.render('profil',{user : JSON.stringify(users)}); 
      users.cevrimici = [{ip:req.connection.remoteAddress,user_name:req.session.user.email}];
      users.save(function(err,sonuc){
        if(err)
          res.render('kolaykimlik',{hata : err});
        else
          res.render('profil',{user : JSON.stringify(user)}); 
      }); 
     }
     else{
      var user_kayitmodel             =mdb.model('user');
      var user                        =new user_kayitmodel();
      user._id                        =req.session.user._id;
      user.user_name                  =req.session.user.email;
      user.name                       =req.session.user.firstname;
      user.surname                    =req.session.user.lastname;
      user.email                      =req.session.user.email;
      user.password                   = "1";
      user.day                        = "Gün";
      user.month                      = "Ay";
      user.year                       = "Yıl";
      user.role                       = [{permission:[0],role_name : "admin"}];
      user.cevrimici                  = [{ip:req.connection.remoteAddress,user_name:req.session.user.email}];    
      user.picture                    ="";
      user.ban                        =["54e31a3de6b1cbdc229fa7e7"];        
      user.kk_id                      =req.session.user._id;
      user.save(function(err,sonuc){
        if(err)
          res.render('kolaykimlik',{hata : err});
        else
          res.render('profil',{user : JSON.stringify(user)}); 
      }); 
     }  
  });
}

var ekran_sayisi=function(req,res,next){ 
    mdb.model('konu').findOne({_id:req.params.deger},function(e,veri){
        if(veri==null){
          next();
        }else{
           //console.log("erka"+veri.sayi);
           var toplam = veri.sayi+1;
           mdb.model('konu').findByIdAndUpdate(veri._id,{sayi:toplam},function(e,sonuc){
              console.log(sonuc);
           });
        }
    });
    next();
}
app.set('port',process.env.PORT || config.port);
//app.use(express.favicon());
app.use('/static',express.static(__dirname + '/static'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(cParser('Forum'));
app.use(bodyParser({keepExtensions: true,limit: '50mb'}));
app.use(mo());
app.use(session({cookie:{ maxAge:60000*60*24*7 }}));
app.use(bodyParser());
app.use(cookieParser());
app.use(session({ secret: 'some-secret' }));
//app.use('/captcha.jpg', captcha.generate());
//app.use(app.router);
app.use(nodekk.kolaykimlik({
    consumer_key: config.consumer_key,
    consumer_secret: config.consumer_secret,
    baseurl:config.kk_url//your url
}));

/*app.post('/', captcha.check, function (req,res,next) {  
    uutils.sendReturn(res,req.session.captcha.valid);
});*/

app.get('/pg/kolaykimlik',nodekk.ozelbolge,user_check,function(req, res){
  res.render("index",{usr:req.session.user});
});

app.get('/',function(req, res){
  if(req.session.logincallbackurl != undefined)
    res.render('index',{user : JSON.stringify(req.session.user)});
  else
    res.render('index',{user : req.session.user});
});

app.get('/pg/:page/:deger/:deger1',function(req, res){
  if(req.session.logincallbackurl != undefined)
    res.render(req.params.page,{param:req.params.deger,param1:req.params.deger1,user : JSON.stringify(req.session.user)});
  else
    res.render(req.params.page,{param:req.params.deger,param1:req.params.deger1,user : req.session.user});
  
});

app.get('/pg/:page/:deger',ekran_sayisi,function(req, res){
   if(req.session.logincallbackurl != undefined)
    res.render(req.params.page,{param:req.params.deger,user : JSON.stringify(req.session.user)});
  else
    res.render(req.params.page,{param:req.params.deger,user : req.session.user});
  
});

app.get('/adm/:page',nodekk.ozelbolge,admin_check,function(req,res){
  var user = req.session.user;

  mdb.model('user').find({kk_id:user._id},function(e,adm){
    if((adm != undefined) && (adm[0].role[0].role_name == "admin")){
      if(req.session.logincallbackurl != undefined)
        res.render('dashboard/'+req.params.page,{user : JSON.stringify(user)});
      else
        res.render('dashboard/'+req.params.page,{user : user});
    }
    else {
      if(req.session.logincallbackurl != undefined)
        res.render('index',{user : JSON.stringify(req.session.user)});
      else
        res.redirect('/');
    }  
    
  });  
});

app.get('/pg/:page',function(req,res){
  var user_session=req.session.user==undefined ? "":req.session.user;
  if(req.session.logincallbackurl != undefined)
    res.render(req.params.page,{user :JSON.stringify(user_session)});
  else
    res.render(req.params.page,{user : user_session});
  
 
  
 /*if(req.params.page=="register"){
    var form = recaptcha.verify(secret);
    res.render('register',{captcha:form,user:user_session});
  }
  else if(req.params.page=="hatirlat"){
     var form = recaptcha.verify(secret);
    res.render('hatirlat',{captcha:form,user:user_session});
  }
  else if(req.params.page=="login"){
    if(req.session.user!=undefined){
      res.render('profil',{user:req.session.user});
      res.render('index',{user:user_session});
    }  
    else 
      res.render(req.params.page);
  }
  else 
    res.render(req.params.page,{user :user_session});
  */
});

app.all('/ajax/:question',ajax.ask);
app.get('/getimg/:imgname',function(req,res){
  var file = __dirname+'/data/gallery/'+req.params.imgname;
  fs.stat(file, function (err, stat) {
    if(err!=null){
      console.log(err);
    }
    else{
      var img = fs.readFileSync(file);
      res.contentType = mime.lookup(file);
      res.contentLength = stat.size;
      res.end(img, 'binary');
    }
  });
});

var listenHttp = function(){
  http.createServer(app).listen(app.get('port'), function(){
    var date= new Date();
    console.log("\033[41m\033[33m >> "+date+" : "+pjson.name+'_'+pjson.version+" listening on port " + app.get('port')+"\033[0m");
  });  
}
mdb.open(config.DBConnection,function(e){
  if (e) {
    mdb=null;
    console.log("---------------------------------------------------------------------------");
    console.log("||-----------------VERİ TABANI BAĞLANTI HATASI   ---------------------------------||");
    console.log("|| "+e+" ||");
    console.log("---------------------------------------------------------------------------");
  } else {
      console.log("Veritabanına bağlandı");
      models.defineModels(function(){        
        listenHttp();
      });
    }
}); //definemodels
