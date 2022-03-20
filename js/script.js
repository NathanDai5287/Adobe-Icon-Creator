function updatePreview() {
	var text, background, foreground, dx, dy;

	text = getText();
	[background, foreground] = getColor();
	[dx, dy] = getPosition();

	setText(text);
	setColor(background, foreground);
	setPosition(dx, dy);
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
	let content = document.getElementById('preview-div').innerHTML;
	let text = getText();
	download(text + '.svg', content);
}

// ██▄░▄██░░▄███▄░░██░██▄░██
// ██▀█▀██░██▀░▀██░██░███▄██
// ██░░░██░███████░██░██▀███
// ██░░░██░██░░░██░██░██░░██

document.getElementById('export-button').onclick = toFile;
var main = setInterval(updatePreview, 10);
