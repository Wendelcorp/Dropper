const electron = require('electron');
const clipboard = electron.clipboard;
const remote = electron.remote;
const notifier = require('node-notifier');
const path = require('path');

let robot = require('robotjs');

document.querySelector('body').addEventListener('click', () => {
	samplePixel();
});
document.querySelector('body').addEventListener('mousemove', () => {
	let mouse = robot.getMousePos();
	let color = robot.getPixelColor(mouse.x, mouse.y)
	document.getElementById('coords').innerHTML = `${mouse.x} ${mouse.y}`
	// document.getElementById('color').innerHTML = `${color}`
	document.getElementById('color').style.backgroundColor = `#${color}`
	document.getElementById('color').style.left = `${mouse.x - 10}px`
	document.getElementById('color').style.top = `${mouse.y - 60}px`

});


function samplePixel() {
	let mouse = robot.getMousePos();
	console.log("Mouse is at x:" + mouse.x + " y:" + mouse.y);
	let color = robot.getPixelColor(mouse.x, mouse.y)

	console.log("Colour sampled: " + color);
	clipboard.writeText('#' + color);

	notifier.notify({
		title: 'Eye Dropper',
		message: '#' + color + " has been copied to your clipboard",
		sound: false,
	});

	remote.getCurrentWindow().close();
}
