## 综述

touchCrop是用kissy实现的一款iPad上进行图片切割的插件。目前支持kissy1.3+和iOS 6.0+。  
目前用于淘宝“找麻豆”项目的后台。  

* 版本：1.0.1
* 作者：wb-majun
* 标签：
* demo：[http://gallery.kissyui.com/touchCrop/1.0.1/demo/index.html](http://gallery.kissyui.com/touchCrop/1.0.1/demo/index.html)

## changelog

### V1.0

[1] 2013-12-25 修复图片加载后不居中显示的BUG  
[2] 2013-12-26 修复输入尺寸小于框尺寸图像无法等比放大的BUG  
[3] 2013-12-30 修复生成图片大小与设定不一致的问题  
[4] 2013-12-31 修复生成的图片有黑边的问题  


## 初始化组件

    S.use('gallery/touchCrop/1.0.1/index', function (S, TouchCrop) {
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
    
组件生成默认HTML节点，用户根据该结构自定义样式

	<div id="J_touch" class="ks-TCrop">
		<div class="ks-TCrop-container">
			<div class="J_touchContainer">
				<img>
			</div>
		</div>
		<canvas style="display:none;"></canvas>
		<a class="ks-TCrop-upload">
			<span>添加图片</span>
			<input type="file">
		</a>
		<button>提交</button>
	</div>

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
