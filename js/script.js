// import { Canvg } from 'canvg';

function updatePreview() {
	let text, background, foreground, dx, dy, fontsize;

	text = getText();
	[background, foreground] = getColor();
	[dx, dy] = getPosition();
	fontsize = getFontSize();

	setText(text);
	setColor(background, foreground);
	setPosition(dx, dy);
	setFontSize(fontsize);
}

// ░▄███▄░████░████
// ██▀░▀▀░██▄░░░██░
// ██▄▀██░██▀░░░██░
// ░▀███▀░████░░██░

function getText() {
	let text = document.getElementById('text').value;
	return text;
}

function getColor() {
	let background = document.getElementById('background-color').value;
	let foreground = document.getElementById('foreground-color').value;

	return [background, foreground];
}

function getPosition() {
	let x = document.getElementById('x-position').value;
	let y = document.getElementById('y-position').value;

	return [x, y];
}

function getFontSize() {
	let fontsize = document.getElementById('font-size').value;
	return fontsize;
}

// ▄███▄░████░████
// ▀█▄▀▀░██▄░░░██░
// ▄▄▀█▄░██▀░░░██░
// ▀███▀░████░░██░

function setText(text) {
	document.getElementById('icon-text').textContent = text;
}

function setColor(background, foreground) {
	document.getElementById('icon-background').setAttribute('style', 'fill: ' + background);
	document.getElementById('icon-text').setAttribute('style', 'fill: ' + foreground);
}

function setPosition(dx, dy) {
	let x = 21.671 + Number(dx);
	let y = 95.052 + Number(dy);

	let text = document.getElementById('icon-text');
	text.setAttribute('transform', 'translate(' + x + ',' + y + ')')
}

function setFontSize(fontsize) {
	document.getElementById('icon-text').setAttribute('style', 'font-size: ' + fontsize + 'px');
}

// ████▄░████░▄███▄░████░████
// ██░██░██▄░░▀█▄▀▀░██▄░░░██░
// ████▀░██▀░░▄▄▀█▄░██▀░░░██░
// ██░██░████░▀███▀░████░░██░

function resetPosition() {
	document.getElementById('x-position').value = 0;
	document.getElementById('y-position').value = 0;
}

function resetFontSize() {
	document.getElementById('font-size').value = 91.332;
}

// ████░██▄░▄██░████▄░░▄███▄░░████▄░████
// ██▄░░░▀███▀░░██░██░██▀░▀██░██░██░░██░
// ██▀░░░▄███▄░░████▀░██▄░▄██░████▀░░██░
// ████░██▀░▀██░██░░░░░▀███▀░░██░██░░██░

function download(filename, text) {
	var pom = document.createElement('a');
	pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	pom.setAttribute('download', filename);

	if (document.createEvent) {
		var event = document.createEvent('MouseEvents');
		event.initEvent('click', true, true);
		pom.dispatchEvent(event);
	}
	else {
		pom.click();
	}
}

function toFile() {
	// let filetype = getFileType();
	let content = document.getElementById('preview-div').innerHTML;
	let text = getText();
	download(text + '.svg', content);
}

function getFileType() {
	let select = document.getElementById('filetype');
	return select.value;
}

// ██░██░░▄███▄░░██▄░██░████▄░░██░░░████░████▄░▄███▄
// ██▄██░██▀░▀██░███▄██░██░▀██░██░░░██▄░░██░██░▀█▄▀▀
// ██▀██░███████░██▀███░██░▄██░██░░░██▀░░████▀░▄▄▀█▄
// ██░██░██░░░██░██░░██░████▀░░████░████░██░██░▀███▀

document.getElementById('export-button').onclick = toFile;
document.getElementById('reset-position').onclick = resetPosition;
document.getElementById('reset-fontsize').onclick = resetFontSize;

// ██▄░▄██░░▄███▄░░██░██▄░██
// ██▀█▀██░██▀░▀██░██░███▄██
// ██░░░██░███████░██░██▀███
// ██░░░██░██░░░██░██░██░░██

var main = setInterval(updatePreview, 10);
