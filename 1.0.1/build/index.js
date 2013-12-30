/*
combined files : 

gallery/touchCrop/1.0.1/index

*/
/**
 * @fileoverview 
 * @author wb-majun<wb-majun@taobao.com>
 * @module touchCrop
 **/
 KISSY.add('gallery/touchCrop/1.0.1/index',function(S, Node, Base, Event, XTemplate){
    var $ = S.all,
        typeFilter = ['image/jpeg', 'image/png'];

    /* DOM结构 */
    var cropHtml = [
        '<div class="{{cls}}-container">',
            '<div class="J_touchContainer">',
                '<img>',
            '</div>',
        '</div>',
        '<canvas style="display:none;"></canvas>',
        '<a class="{{cls}}-upload J_touchUploader">',
            '<span>{{name}}</span>',
            '<input type="file">',
        '</a>',
        '<button>提交</button>'
    ].join('');

    function TouchCrop(config){
        var self = this;
        TouchCrop.superclass.constructor.call(self, config);
        self._init();
    }
    S.augment(TouchCrop, S.EventTarget);
    S.extend(TouchCrop, S.Base, {
        _init: function(){
            var self = this;
            /* 初始化参数 */
            self.set({
                el:             $(self.get('el')),                  // 容器对象
                width:          self.get('width') || 0,             // 输出宽
                height:         self.get('height') || 0,            // 输出高
                url:            self.get('url') || '',              // 上传路径 
                data:           self.get('data') || {},             // fileData参数
                frameWidth:     self.get('frameWidth') || 500,      // 容器宽度
                frameHeight:    self.get('frameHeight') || 500,     // 容器高度
                file:           null,                               // 文件对象
                image:          null,                               // 图片对象
                fileData:       self.get('fileData') || 'Filedata', // 上传名字
                cls:            self.get('cls') || 'ks-TCrop'       // 自定义样式前缀
            });

            self.get('el').addClass(self.get('cls'));

            self._initCropArea();   // 渲染切割区域
            self._initUploader();   // 渲染载入图片
            self._inifSubmit();     // 初始化上传图片
        },

        /* 渲染切割区DOM结构 */
        _initCropArea: function(){
            var self = this, el = self.get('el');
            var temp = new XTemplate(cropHtml);
            
            el.html(temp.render({cls:self.get('cls'), name:'添加图片'}));

            /* 获取元素 */
            var touches = {
                container:  el.all('.J_touchContainer'),
                touch:      el.all('img'),
                canvas:     el.all('canvas')[0],
                file:       el.all('input'),
                submit:     el.all('button'),
                context:    el.all('canvas')[0].getContext('2d'),
                upload:     el.all('.J_touchUploader'),
                width:      0,  // 图像原始宽
                height:     0,  // 图像原始高
            };
            self.set('touches', touches);

            touches.container.parent().css({
                width: self.get('frameWidth'),
                height: self.get('frameHeight')
            });
        },

        /* 初始化载入照片 */
        _initUploader: function(){
            var self = this, touches = self.get('touches');
            
            touches.file.on('change', function(ev){
                var file = this.files[0];
                
                if(typeFilter.indexOf(file.type) > -1){
                    self._loadFile(file);
                    return true;
                } 

                self._showDialog('请上传正确的图片', 'error');
            });
        },

        /* 加载图片成dataUrl */
        _loadFile: function(file){
            var fileReader = new FileReader(), 
                self = this, 
                touches = self.get('touches'),
                hasFile = false;

            self.set('file', file);

            fileReader.readAsDataURL(file);
            fileReader.addEventListener('load', function(ev){
                
                var imgObj = new Image();
                imgObj.src = this.result;
                imgObj.addEventListener('load', function(){
                    /* 检查图片尺寸是否符合要求 */
                    if( imgObj.width < self.get('width') || imgObj.height < self.get('height') ){
                        self._showDialog('尺寸过小，无法上传', 'error');
                        return false;
                    }
                    touches.width        = imgObj.width;
                    touches.height       = imgObj.height;
                    touches.touch[0].src = imgObj.src;
                    if(!hasFile){
                        self._initCrop();
                    }
                    self.set('image', imgObj);
                    hasFile = true;
                });
                
            });
        },

        /* 获取绝对伸缩率 */
        getAbsScale: function(){
            var self = this;
            if(self.get('width') > self.get('height')){
                return self.get('frameWidth') / self.get('width');
            } else {
                return self.get('frameHeight') / self.get('height');
            }
        },

        /* 加载切割区域，并监听拖放手势等 */
        _initCrop: function(){
            var self = this, 
                touches = self.get('touches'),
                touchContainer = touches.container,
                touchObj = touches.touch;

            /* 容器样式 */
            var containerCss = {
                overflow : 'hidden',
                width : self.get('width'),
                height : self.get('height'),
                position : 'absolute'
            };

            /* 输出大小对于边框的缩放值 
             * 若输出图片尺寸过大，则被缩放至边框大小
             */
            var absScale = function(){ 
                //if(self.get('frameWidth') * self.get('frameHeight') < self.get('width') * self.get('height')){
                if(self.get('width') > self.get('height')){
                    return self.get('frameWidth') / self.get('width');
                } else {
                    return self.get('frameHeight') / self.get('height');
                }
          
            }

            /* 同比缩放图片 */
            touches.touch.css({
                position : 'absolute',
                width: touches.touch.width() * absScale(),
            });
            
            
            if(self.get('width') < self.get('height')){
                containerCss.height = self.get('frameHeight');
                containerCss.width = self.get('width') * self.get('frameHeight') / self.get('height');
            } else {
                containerCss.width = self.get('frameWidth');
                containerCss.height = self.get('height') * self.get('frameWidth') / self.get('width');
            }
            
            if(containerCss.width < self.get('frameWidth')){
                containerCss.left = (self.get('frameWidth') - containerCss.width) / 2;
            }

            if(containerCss.height < self.get('frameWidth')){
                containerCss.top = (self.get('frameHeight') - containerCss.height) / 2;
            }

            touchContainer.css(containerCss);

            var dragFlag = false,       // 移动标志
                scaleFlag = false,      // 伸缩标志
                gestureFlag = false,    // 手势标志

                scale = 1,              // 初始伸缩率

                minScale = function(){ // 最小伸缩率
                    if( self.get('width') / self.get('height') <=  touches.width / touches.height ){
                        if(self.get('height') < self.get('frameHeight')){
                            return self.get('frameHeight') / touches.height / absScale();    
                        }
                        return self.get('height') / touches.height / absScale();
                    } else {
                        if(self.get('height') < self.get('frameHeight')){
                            return self.get('frameWidth') / touches.width / absScale();    
                        }
                        return self.get('width') / touches.width / absScale();
                    }
                },

                maxScale = 3;           // 最大伸缩率
            
            /* 手势坐标 */
            var finger = {
                x0: 0, // X起点
                y0: 0, // Y起点
                x1: 0, // X终点
                y1: 0  // Y终点
            };
            var tomeout = null;
            var coords;     // 坐标对象

            /* 设置初始缩放值 */
            touches.touch.css('-webkit-transform','scale(' + scale + ')');

            /* 缩放手势 */
            

            var gesturechange = function(ev){
                ev.preventDefault();
                touches.touch.css('-webkit-transform','scale(' + ev.scale * scale + ')');
            }

            var gesturestart = function(ev){
                scaleFlag = true;
                gestureFlag = true;

                touches.touch[0].style.webkitTransition = '';
            }

            var gestureend = function(ev){
                ev.preventDefault();

                scale = +touches.touch[0].style.webkitTransform.replace('scale\(','').replace('\)','');

                if(scale < minScale()){
                    scale = minScale();
                } 
                if(scale > maxScale){
                    scale = maxScale;
                }
                touches.touch.css({'-webkit-transform':'scale(' + scale + ')'});
                scaleFlag = false;
                gestureFlag = false;
                replaceCoords();
            }

            var touchstart = function(ev){
                dragFlag = true;

                finger.x0 = ev.pageX;
                finger.y0 = ev.pageY;
            }

            var touchmove = function(ev){
                ev.preventDefault();
                var _this = this;
                
                //ev.halt();
                if(gestureFlag){
                    return false;
                }
                
                finger.x1 = ev.pageX;
                finger.y1 = ev.pageY;

                

                if(dragFlag){

                    touches.touch.css({
                        left: +touches.touch.css('left').replace('px','') + (finger.x1 - finger.x0), 
                        top: +touches.touch.css('top').replace('px','') + (finger.y1 - finger.y0)
                    });
                }

                finger.x0 = ev.pageX;
                finger.y0 = ev.pageY;
            }

            var touchend = function(ev){
                dragFlag = false;

                finger.x0 = ev.pageX;
                finger.y0 = ev.pageY;

                replaceCoords();
            }

            touchContainer[0].removeEventListener('gesturechange', gesturechange);
            touchContainer[0].removeEventListener('gesturestart', gesturestart);
            touchContainer[0].removeEventListener('gestureend', gestureend);

            /* 移动手势 */
            touchContainer[0].removeEventListener('touchstart', touchstart);         
            touchContainer[0].removeEventListener('touchmove', touchmove);
            touchContainer[0].removeEventListener('touchend', touchend);

            /* 伸缩手势 */
            touchContainer[0].addEventListener('gesturechange', gesturechange);
            touchContainer[0].addEventListener('gesturestart', gesturestart);
            touchContainer[0].addEventListener('gestureend', gestureend);

            /* 移动手势 */
            touchContainer[0].addEventListener('touchstart', touchstart);         
            touchContainer[0].addEventListener('touchmove', touchmove);
            touchContainer[0].addEventListener('touchend', touchend);

            /* 获取坐标
             * 若图片超出边界则缩放回默认值
             */
            var replaceCoords = function(){

                clearTimeout(tomeout);
                coords = {
                    ax: touches.touch.offset().left,
                    ay: touches.touch.offset().top,
                    bx: touchContainer.offset().left,
                    by: touchContainer.offset().top,
                    dx: touchContainer.innerWidth(),
                    dy: touchContainer.innerHeight(),
                    sx: touches.touch.width(),
                    sy: touches.touch.height(),
                    r: scale
                }

                /* a左 b右 c上 d下 
                 * Qa~Qd是图片到各个边界的距离
                 */
                var Qa = coords.ax - coords.bx,
                    Qb = coords.dx - Qa - coords.r * coords.sx,
                    Qc = coords.ay - coords.by,
                    Qd = coords.dy - Qc - coords.r * coords.sy;

                
                var ocss = {
                    '-webkit-transition' : 'all 0.2s ease-out'
                }

                /* 若图片出界，则让图片吸回边界 */
                if( !( (Qa < 0) && (Qb < 0) && (Qc < 0) && (Qd < 0) ) ){
                    if(Qa >= 0){
                        ocss['left'] = ( coords.ax - coords.bx + (coords.r - 1) / 2 * coords.sx) - Qa;
                    }

                    if(Qb >= 0){
                        ocss['left'] = ( coords.ax - coords.bx + (coords.r - 1) / 2 * coords.sx) + Qb;
                    }

                    if(Qc >= 0){
                        ocss['top'] = ( coords.ay - coords.by + (coords.r - 1) / 2 * coords.sy) - Qc;
                    }

                    if(Qd >= 0){
                        ocss['top'] = ( coords.ay - coords.by + (coords.r - 1) / 2 * coords.sy) + Qd;
                    }
                }

                touches.touch.css(ocss);

                tomeout = setTimeout(function(){
                    touches.touch[0].style.webkitTransition = '';
                }, 300);
            }
            replaceCoords();

            touches.upload.hide();
        },

        /* 获取坐标 */
        _getCoords: function(){
            var self = this, 
                touches = self.get('touches'),
                touchContainer = touches.container,
                touchObj = touches.touch;
            var scale = +touchObj[0].style.webkitTransform.replace('scale\(','').replace('\)',''),
                absScale = (function(){ // 绝对缩放值
                    //if(self.get('frameWidth') * self.get('frameHeight') < self.get('width') * self.get('height')){
                        if(self.get('width') > self.get('height')){
                            return self.get('frameWidth') / self.get('width');
                        } else {
                            return self.get('frameHeight') / self.get('height');
                        }
                    //} 
                    //return 1;
                })();
            
            var coords = {
                    ax: touchObj.offset().left,
                    ay: touchObj.offset().top,
                    bx: touchContainer.offset().left,
                    by: touchContainer.offset().top,
                    dx: touchContainer.innerWidth(),
                    dy: touchContainer.innerHeight(),
                    sx: touchObj.width(),
                    sy: touchObj.height(),
                    r: scale
                };
            
            return {
                x:      (coords.ax - coords.bx ) / coords.r / absScale,
                y:      (coords.ay - coords.by ) / coords.r / absScale,
                width:  coords.dx / coords.r / absScale,
                height: coords.dy / coords.r / absScale
            };  
        },

        /* 初始化提交表单 */
        _inifSubmit: function(){
            var self = this, touches = self.get('touches');
            touches.submit.on('click', function(){
                self.submitFile(self._getCoords());
            });
        },

        /* 通过坐标切割图片并上传 */
        submitFile: function(coords){
            
            var self = this, touches = self.get('touches');
            var form = new FormData(), http = new XMLHttpRequest();

            touches.context.clearRect(0,0,coords.width,coords.height);

            touches.canvas.width = touches.width;
            touches.canvas.height = touches.height;

            // 插入画布
            touches.context.drawImage(self.get('image'), 0, 0, touches.canvas.width, touches.canvas.height);

            // 获取元素
            var imgData = touches.context.getImageData(-coords.x, -coords.y, self.get('width') , self.get('height'));
            
            // 清空画布
            
            touches.canvas.width = self.get('width');
            touches.canvas.height = self.get('height');
            
            touches.context.putImageData(imgData, 0, 0);

            var dataUrl = touches.canvas.toDataURL(self.get('file').type),
                fileBlob = self._dataURLToBlob(dataUrl);

            for(var name in self.get('data')){
                form.append(name, self.get('data')[name]);
            }

            form.append(self.get('fileData'), fileBlob, self.get('file').name);

            http.onreadystatechange = function(){
                // switch(http.readyState){
                //  case "0": self.fire('fail', {code: http.readyState}); break; // 请求未初始化
                //  case "1": self.fire('start', {code: http.readyState}); break; // 服务器连接已建立
                //  case "4": self.fire('complete', {code: http.readyState}); break; // 请求已完成，且响应已就绪
                // }
                var _this = this;

                // 请求未初始化
                if(_this.readyState == 0){
                    self.fire('error', { code: _this.readyState });
                } 
                // 服务器连接已建立
                else if(_this.readyState == 1){
                    self.fire('start', { code: _this.readyState });
                } 
                // 请求已完成，且响应已就绪
                else if(_this.readyState == 4){
                    if(_this.status == 200){
                        self.fire('success', { code: _this.readyState, result: S.JSON.parse(_this.responseText) });
                    } else {
                        self.fire('fail', { code: _this.readyState, status: _this.status });
                    }
                }

            }
            http.open("POST", self.get('url'));
            http.send(form);
        },

        _showDialog: function(msg, type){
            alert(msg);
        },

        /* from https://github.com/blueimp/JavaScript-Canvas-to-Blob 
         * 将base64转成二进制对象
         */
        _dataURLToBlob: function(dataURL) {
            var BASE64_MARKER = ';base64,';
            if (dataURL.indexOf(BASE64_MARKER) == -1) {
                var parts = dataURL.split(',');
                var contentType = parts[0].split(':')[1];
                var raw = parts[1];

                return new Blob([raw], {type: contentType});
            }

            var parts = dataURL.split(BASE64_MARKER);
            var contentType = parts[0].split(':')[1];
            var raw = window.atob(parts[1]);
            var rawLength = raw.length;
            var arrayBuffer = new ArrayBuffer(rawLength);
            var uInt8Array = new Uint8Array(arrayBuffer);

            for (var i = 0; i < rawLength; ++i) {
                uInt8Array[i] = raw.charCodeAt(i);
            }
            //In Safari you need to use the 'buffer' property on the TypedArray, i.e. this:
            return new Blob([uInt8Array.buffer], {type: contentType});
        },

    });

    return TouchCrop;
},{
    requires: ['node', 'base', 'event', 'xtemplate', 'json']
});
