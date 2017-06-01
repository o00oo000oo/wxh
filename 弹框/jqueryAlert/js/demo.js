//(内容, 标题, 弹框类型, 弹框后操作, 弹框按钮)
function MyAlert(str, title, type, func, buttons) {
	buttons = buttons || (
		(type == 'alert' && ['知道了']) ||
		(type == 'confirm' && ['确定', '取消']) ||
		[]
	);
	type = type.toLowerCase();
	(//根据弹框类型
		(type == 'simple' && function(){
			webToast(str, "middle", 1500);
			if(func) {
				var s = setInterval(function(){
					func('ok');//simple弹框无按钮，所以默认就当是点击了确定
					clearInterval(s);
				}, 1500);
			}
		}) ||
		(type == 'alert' && function(){
			if(func) popTipShow.alert(title, str, buttons, function(){func('ok'); this.hide();});
			else popTipShow.alert(title, str, buttons, function(){this.hide();});
		}) ||
		(type == 'confirm' && function(){
			popTipShow.confirm(
				title,
				str,
				buttons,//ok cancel
				function (e){
				  //callback 处理按钮事件		  
				  var button = $(e.target).attr('class');
				  func && func(button);	//按下确定按钮执行的操作
				  this.hide();
				}
			);
		})
	)();
}
function MyAjax(url, method, req_data, success_func){
	method = method || 'POST';
	req_data = req_data || {};
	$.ajax({
		type: method,
		url: url,
		dataType: "text",
		data:req_data,
		success: success_func || function(data){
			var obj = '';
			try {
			 obj = eval("("+data+")");
			} catch(e){alert('返回值错误!');return;}

			if(success_func) success_func();
			else {
				var empty_func = function(){};
				MyAlert(obj.text, '提示', obj.type, (
						obj.cmd ? (
							(obj.cmd == 'goto_url' && function(btn){
								if(btn == 'ok') location.href = obj.url;
							}) || empty_func
						) : empty_func
					)
				);
			}
		}
	});
}
function autoR(selector) {
	selector = selector || '.autoR';
	$(selector).each(function(index, el){
		var node = el.attributes['url'];
		if(node) {
			var url = node.nodeValue.replace(/(\{[a-zA-Z0-9_]+\})/ig, function(match_str){
				//正则模式替换
				match_str = match_str.replace(/\{|\}/ig, '');
				var obj = document.getElementById(match_str);
				return obj ? obj.value : '{' + match_str + '}';
			}), el_ = $(el);
			el_.data('url', url);
			if(el.href) el.href = 'javascript:;';
			el.onclick = function() {
				node = el.attributes['confirm'];
				if(node && !/^\s*$/ig.test(node.nodeValue)) {
					MyAlert(node.nodeValue, '提示', 'confirm', function(btn){
						if(btn == 'ok') {
							var s = setInterval(function(){
								MyAjax(el_.data('url'), 'GET');
								clearInterval(s);
							}, 300);
						}
					});
				} else MyAjax(el_.data('url'), 'GET');
			};
		}
	});
}
$(document).ready(function(e) {
	autoR('.aysnc');
});