## 综述

touchCrop是一款支持移动端手势的切图工具。能够实现浏览器端的图片切割，并上传至服务器。支持ios5.0以上的设备。
支持1.3.0及以上版本的kissy。

* 版本：1.0
* 作者：wb-majun
* 标签：
* demo：[http://gallery.kissyui.com/touchCrop/1.0/demo/index.html](http://gallery.kissyui.com/touchCrop/1.0/demo/index.html)

## 初始化组件

    S.use('gallery/touchCrop/1.0/index', function (S, TouchCrop) {
		var touchCrop = new TouchCrop({
			el: '#J_touch',			// 加载控件的节点
			width: 300,				// 图像最小输出宽度
			height: 400,			// 图像最小输出高度
			frameWidth: 500,		// 预览区域宽度
			frameHeight: 500,		// 预览区域高度
			url: 'upload.do',		// 上传接口
			fileData: 'Filedata', 	// 文件对象name 默认'Filedata'
			cls: 'ks-TCrop',		// 自定义样式名 默认ks-TCrop
			data: {}				// 自定义参数
		});

		// 监听提交图片后的事件
		touchCrop.on('success', function(ev){
			alert('图片上传成功')
		});
    })

## API说明
#### 参数
<table>
	<tr><th>字段</th><th>类型</th><th>说明</th></tr>
	<tr><td>el</td><td>String</td><td>加载控件的DOM节点</td></tr>
	<tr><td>width</td><td>Number</td><td>图像最小输出宽度</td></tr>
	<tr><td>height</td><td>Number</td><td>图像最小输出高度</td></tr>
	<tr><td>frameWidth</td><td>Number</td><td>预览区域宽度</td></tr>
	<tr><td>frameHeight</td><td>Number</td><td>预览区域高度</td></tr>
	<tr><td>url</td><td>String</td><td>上传接口</td></tr>
	<tr><td>fileData</td><td> Object</td><td>文件对象name 默认'Filedata'</td></tr>
	<tr><td>cls</td><td>String</td><td>自定义样式名 默认ks-TCrop</td></tr>
	<tr><td>data</td><td>Object</td><td>自定义参</td></tr>
</table>

#### 事件

<table>
	<tr><td>success</td><td>图片切割完毕上传到服务器之后返回的事件 返回值data{Object}。</td></tr>
</table>