/*
	date: 20140906
	name: EventUtil.js
	
	API：
		EventUtil对象 用于处理浏览器的差异；	
	方法：
		addHandler：	添加事件；
		removeHandler:	移除事件；
		getEvent:  取得event对象；
		getTarget:	返回事件的目标；
		preventDefault:	取消事件的默认行为；
		stopPropagation:	阻止事件流；
		getRelatedTarget:	获取相关元素；
		getButton:	获取鼠标事件；
		getClipboardTaxt:	从剪切板中获取数据；
		setClipboardText:	设置剪切板文本；
*/


	var EventUtil = {
		
		addHandler: function (element, type, handler) {
			if (element.addEventListener) {
				element.addEventListener(type, handler, false);	
			} else if (element.attachEvent) {
				element.attachEvent("on" + type, handler);
			} else {
				element["on" + type] = handler;	
			}
		}, 
		
		getEvent: function (event) {
			return event ? event : window.event;	
		},
		
		getTarget: function (event) {
			return event.target || event.srcElement;	
		},
		
		getRelatedTarget: function (event) {
			if (event.relatedTarget) {
				return event.relatedTarget;	
			} else if (event.toElement) {
				return event.toElement;	
			} else if (event.fromElement) {
				return event.fromElement;	
			} else {
				return null;	
			}
		},
		
		getButton: function (event) {
			if (document.implementation.hasFeature("MouseEvents", "2.0")) {
				return event.button;	
			} else {
				switch(event.button) {
					case 0:
					case 1:
					case 3: 
					case 5:
					case 7:
						return 0;
					case 2:
					case 6:
						return  2;
					case 4:
						return 1;
				}	
			}	
		},
		
		getClipboardText: function (event) {
			var clipboardData = (event.clipboardData || window.clipboardData);
			return clipboardData.getData("text");
		},
		
		setClipboardText: function (event) {
			if (event.clipboardData) {
				return event.clipboardData.setData("text/plain", value);
			} else if (window.clipboardData) {
				return window.clipboardData;	
			}
		},
		
		preventDefault: function (event) {
			if (event.preventDefault) {
				event.preventDefault();	
			} else {
				event.returnValue = false;	
			}
		},
		
		removeHandler: function (element, type, handler) {
			if (element.removeEventListenter) {
				element.removeEventListenter(type, hander, false);	
			}	else if (element.detachEvent) {
				element.detachEvent("on" + type, handler);	
			}	else {
				element["on" + type] = null;	
			}
		},
		
		stopPropagation: function () {
			if (event.stopPropagation) {
				event.stopPropagation();	
			} else {
				event.cancelBubble = ture;	
			}
		}
			
	};	
