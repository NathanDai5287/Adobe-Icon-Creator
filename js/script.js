String.prototype.toRGB = function() {
  let rgb = this.split(',');

  let r = parseInt(rgb[0].substring(4)).toString(16).padStart(2, '0');
  let g = parseInt(rgb[1]).toString(16).padStart(2, '0');
  let b = parseInt(rgb[2]).toString(16).padStart(2, '0');

	return [r, g, b];
}


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
	document.getElementById('icon-background').style.fill = background;
	document.getElementById('icon-text').style.fill = foreground;
}

function setPosition(dx, dy) {
	let x = 21.671 + Number(dx);
	let y = 95.052 + Number(dy);

	let text = document.getElementById('icon-text');
	text.setAttribute('transform', 'translate(' + x + ',' + y + ')')
}

function setFontSize(fontsize) {
	document.getElementById('icon-text').style.fontSize = fontsize + 'px';
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

// ░▄███▄░░▄███▄░░██░░░░▄███▄░░████▄
// ██▀░▀▀░██▀░▀██░██░░░██▀░▀██░██░██
// ██▄░▄▄░██▄░▄██░██░░░██▄░▄██░████▀
// ░▀███▀░░▀███▀░░████░░▀███▀░░██░██

function getColors() {
	dfd.readCSV('data/colors.csv').then((df) => {
		df['$data'].pop(df['$data'].length);

		addColorpalettes(df);
	});
}

function addColorpalettes(df) {
	let container = document.getElementById('color-palettes');
	for (let i = 0; i < df['$data'].length; i++) {
		let background = df['$data'][i][1];
		let foreground = df['$data'][i][2];

		let palette = document.createElement('div')
			palette.setAttribute('class', 'p-2');
		let button = document.createElement('button');
			button.setAttribute('class', 'color-button');
			button.setAttribute('style', 'border: 1em solid #' + background + '; background-color: #' + foreground + ';');
			button.onclick = setColorPalette;

		palette.appendChild(button);
		container.appendChild(palette);
	}
}

function setColorPalette() {
	let background = this.style.borderColor.toRGB();
	let foreground = this.style.backgroundColor.toRGB();

	background = '#' + background[0] + background[1] + background[2];
	foreground = '#' + foreground[0] + foreground[1] + foreground[2];

	document.getElementById('background-color').value = background;
	document.getElementById('foreground-color').value = foreground;
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
getColors();
