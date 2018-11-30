class MessageBox {
	constructor(element) {
		Graphics.checkElement(element);
		MessageBox.element = element;
	}
	
	static clear() {
		MessageBox.element.innerHTML = '';
	}
	
	static addMsg(msg, important=false) {
		if (typeof important !== typeof true) {
			throw 'important must be true of false';
		}
		if (msg !== '') {
			var divId = important ? 'important_msg' : 'normal_msg';
			MessageBox.element.innerHTML = '<div id="' + divId + '"> ' + msg + '</div>' + MessageBox.element.innerHTML;
		}
	}
}