// Copyright (c) 2018 ml5
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Style Transfer Image Example using p5.js
This uses a pre-trained model of The Great Wave off Kanagawa and Udnie (Young American Girl, The Dance)
=== */

let style;
let video;
let resultImg;
let inputImg;

function preload() {
  inputImg = loadImage("images/style.jpg")
}

function setup() {
  createCanvas(640, 480).parent('canvasContainer');

  video = createCapture(VIDEO);
  video.hide();

  // The results image from the style transfer
  resultImg = createImg("images/style.jpg");
  resultImg.hide();

  // Create a new Style Transfer method with a defined style.
  // We give the video as the second argument
  style = ml5.styleTransfer('models/subwayart-model', video, modelLoaded);
}

function draw(){
  image(resultImg, 0, 0, 640, 480);
}

// A function to call when the model has been loaded.
function modelLoaded() {
  select('#status').html('Model Loaded');
  style.transfer(gotResult);
}

// When we get the results, update the result image src
function gotResult(err, img) {
  resultImg.attribute('src', img.src);
  style.transfer(gotResult);
}
