/*!build time : 2013-12-30 3:18:47 PM*/
KISSY.add("gallery/touchCrop/1.01/index",function(a,b,c,d,e){function f(a){var b=this;f.superclass.constructor.call(b,a),b._init()}var g=a.all,h=["image/jpeg","image/png"],i=['<div class="{{cls}}-container">','<div class="J_touchContainer">',"<img>","</div>","</div>",'<canvas style="display:none;"></canvas>','<a class="{{cls}}-upload J_touchUploader">',"<span>{{name}}</span>",'<input type="file">',"</a>","<button>\u63d0\u4ea4</button>"].join("");return a.augment(f,a.EventTarget),a.extend(f,a.Base,{_init:function(){var a=this;a.set({el:g(a.get("el")),width:a.get("width")||0,height:a.get("height")||0,url:a.get("url")||"",data:a.get("data")||{},frameWidth:a.get("frameWidth")||500,frameHeight:a.get("frameHeight")||500,file:null,image:null,fileData:a.get("fileData")||"Filedata",cls:a.get("cls")||"ks-TCrop"}),a.get("el").addClass(a.get("cls")),a._initCropArea(),a._initUploader(),a._inifSubmit()},_initCropArea:function(){var a=this,b=a.get("el"),c=new e(i);b.html(c.render({cls:a.get("cls"),name:"\u6dfb\u52a0\u56fe\u7247"}));var d={container:b.all(".J_touchContainer"),touch:b.all("img"),canvas:b.all("canvas")[0],file:b.all("input"),submit:b.all("button"),context:b.all("canvas")[0].getContext("2d"),upload:b.all(".J_touchUploader"),width:0,height:0};a.set("touches",d),d.container.parent().css({width:a.get("frameWidth"),height:a.get("frameHeight")})},_initUploader:function(){var a=this,b=a.get("touches");b.file.on("change",function(){var b=this.files[0];return h.indexOf(b.type)>-1?(a._loadFile(b),!0):(a._showDialog("\u8bf7\u4e0a\u4f20\u6b63\u786e\u7684\u56fe\u7247","error"),void 0)})},_loadFile:function(a){var b=new FileReader,c=this,d=c.get("touches"),e=!1;c.set("file",a),b.readAsDataURL(a),b.addEventListener("load",function(){var a=new Image;a.src=this.result,a.addEventListener("load",function(){return a.width<c.get("width")||a.height<c.get("height")?(c._showDialog("\u5c3a\u5bf8\u8fc7\u5c0f\uff0c\u65e0\u6cd5\u4e0a\u4f20","error"),!1):(d.width=a.width,d.height=a.height,d.touch[0].src=a.src,e||c._initCrop(),c.set("image",a),e=!0,void 0)})})},getAbsScale:function(){var a=this;return a.get("width")>a.get("height")?a.get("frameWidth")/a.get("width"):a.get("frameHeight")/a.get("height")},_initCrop:function(){var a=this,b=a.get("touches"),c=b.container;b.touch;var d={overflow:"hidden",width:a.get("width"),height:a.get("height"),position:"absolute"},e=function(){return a.get("width")>a.get("height")?a.get("frameWidth")/a.get("width"):a.get("frameHeight")/a.get("height")};b.touch.css({position:"absolute",width:b.touch.width()*e()}),a.get("width")<a.get("height")?(d.height=a.get("frameHeight"),d.width=a.get("width")*a.get("frameHeight")/a.get("height")):(d.width=a.get("frameWidth"),d.height=a.get("height")*a.get("frameWidth")/a.get("width")),d.width<a.get("frameWidth")&&(d.left=(a.get("frameWidth")-d.width)/2),d.height<a.get("frameWidth")&&(d.top=(a.get("frameHeight")-d.height)/2),c.css(d);var f,g=!1,h=!1,i=!1,j=1,k=function(){return a.get("width")/a.get("height")<=b.width/b.height?a.get("height")<a.get("frameHeight")?a.get("frameHeight")/b.height/e():a.get("height")/b.height/e():a.get("height")<a.get("frameHeight")?a.get("frameWidth")/b.width/e():a.get("width")/b.width/e()},l=3,m={x0:0,y0:0,x1:0,y1:0},n=null;b.touch.css("-webkit-transform","scale("+j+")");var o=function(a){a.preventDefault(),b.touch.css("-webkit-transform","scale("+a.scale*j+")")},p=function(){h=!0,i=!0,b.touch[0].style.webkitTransition=""},q=function(a){a.preventDefault(),j=+b.touch[0].style.webkitTransform.replace("scale(","").replace(")",""),j<k()&&(j=k()),j>l&&(j=l),b.touch.css({"-webkit-transform":"scale("+j+")"}),h=!1,i=!1,u()},r=function(a){g=!0,m.x0=a.pageX,m.y0=a.pageY},s=function(a){return a.preventDefault(),i?!1:(m.x1=a.pageX,m.y1=a.pageY,g&&b.touch.css({left:+b.touch.css("left").replace("px","")+(m.x1-m.x0),top:+b.touch.css("top").replace("px","")+(m.y1-m.y0)}),m.x0=a.pageX,m.y0=a.pageY,void 0)},t=function(a){g=!1,m.x0=a.pageX,m.y0=a.pageY,u()};c[0].removeEventListener("gesturechange",o),c[0].removeEventListener("gesturestart",p),c[0].removeEventListener("gestureend",q),c[0].removeEventListener("touchstart",r),c[0].removeEventListener("touchmove",s),c[0].removeEventListener("touchend",t),c[0].addEventListener("gesturechange",o),c[0].addEventListener("gesturestart",p),c[0].addEventListener("gestureend",q),c[0].addEventListener("touchstart",r),c[0].addEventListener("touchmove",s),c[0].addEventListener("touchend",t);var u=function(){clearTimeout(n),f={ax:b.touch.offset().left,ay:b.touch.offset().top,bx:c.offset().left,by:c.offset().top,dx:c.innerWidth(),dy:c.innerHeight(),sx:b.touch.width(),sy:b.touch.height(),r:j};var a=f.ax-f.bx,d=f.dx-a-f.r*f.sx,e=f.ay-f.by,g=f.dy-e-f.r*f.sy,h={"-webkit-transition":"all 0.2s ease-out"};0>a&&0>d&&0>e&&0>g||(a>=0&&(h.left=f.ax-f.bx+(f.r-1)/2*f.sx-a),d>=0&&(h.left=f.ax-f.bx+(f.r-1)/2*f.sx+d),e>=0&&(h.top=f.ay-f.by+(f.r-1)/2*f.sy-e),g>=0&&(h.top=f.ay-f.by+(f.r-1)/2*f.sy+g)),b.touch.css(h),n=setTimeout(function(){b.touch[0].style.webkitTransition=""},300)};u(),b.upload.hide()},_getCoords:function(){var a=this,b=a.get("touches"),c=b.container,d=b.touch,e=+d[0].style.webkitTransform.replace("scale(","").replace(")",""),f=function(){return a.get("frameWidth")*a.get("frameHeight")<a.get("width")*a.get("height")?a.get("width")>a.get("height")?a.get("frameWidth")/a.get("width"):a.get("frameHeight")/a.get("height"):1}(),g={ax:d.offset().left,ay:d.offset().top,bx:c.offset().left,by:c.offset().top,dx:c.innerWidth(),dy:c.innerHeight(),sx:d.width(),sy:d.height(),r:e};return{x:(g.ax-g.bx)/g.r/f,y:(g.ay-g.by)/g.r/f,width:g.dx/g.r/f,height:g.dy/g.r/f}},_inifSubmit:function(){var a=this,b=a.get("touches");b.submit.on("click",function(){a.submitFile(a._getCoords())})},submitFile:function(b){var c=this,d=c.get("touches"),e=new FormData,f=new XMLHttpRequest;d.context.clearRect(0,0,b.width,b.height),d.canvas.width=d.width,d.canvas.height=d.height,d.context.drawImage(c.get("image"),0,0,d.canvas.width,d.canvas.height);var g=d.context.getImageData(-b.x,-b.y,c.get("width"),c.get("height"));d.canvas.width=c.get("width"),d.canvas.height=c.get("height"),d.context.putImageData(g,0,0);var h=d.canvas.toDataURL(c.get("file").type),i=c._dataURLToBlob(h);for(var j in c.get("data"))e.append(j,c.get("data")[j]);e.append(c.get("fileData"),i,c.get("file").name),f.onreadystatechange=function(){var b=this;0==b.readyState?c.fire("error",{code:b.readyState}):1==b.readyState?c.fire("start",{code:b.readyState}):4==b.readyState&&(200==b.status?c.fire("success",{code:b.readyState,result:a.JSON.parse(b.responseText)}):c.fire("fail",{code:b.readyState,status:b.status}))},f.open("POST",c.get("url")),f.send(e)},_showDialog:function(a){alert(a)},_dataURLToBlob:function(a){var b=";base64,";if(-1==a.indexOf(b)){var c=a.split(","),d=c[0].split(":")[1],e=c[1];return new Blob([e],{type:d})}for(var c=a.split(b),d=c[0].split(":")[1],e=window.atob(c[1]),f=e.length,g=new ArrayBuffer(f),h=new Uint8Array(g),i=0;f>i;++i)h[i]=e.charCodeAt(i);return new Blob([h.buffer],{type:d})}}),f},{requires:["node","base","event","xtemplate","json"]});