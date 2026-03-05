let slider;
const SCALE = 50;
let offsetX = 0;
let offsetY = 0;
let zoom = 1;


function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(255);

  let expr = document.getElementById("formula").value;

  // движение графика мышью
  if (mouseIsPressed &&
    mouseX >= 0 && mouseX <= width &&
    mouseY >= 0 && mouseY <= height) {
  offsetX += (mouseX - pmouseX) / SCALE;
  offsetY -= (mouseY - pmouseY) / SCALE;
 }
 

  push();

  //Сдвинули координаты
  translate(width / 2, height / 2);
  
  //Оси
  stroke(200);
  line(-width / 2, 0, width / 2, 0);
  line(0, -height / 2, 0, height / 2);

  //Сетка
  stroke(220);
  for (let x = -width / 2; x <= width / 2; x += SCALE) {
  line(x, -height / 2, x, height / 2);
  }

  for (let y = -height / 2; y <= height / 2; y += SCALE) {
  line(-width / 2, y, width / 2, y);
  }

  //Числа на графике
  fill(0);
  noStroke();
  textSize(11);

  for (let x = -width / 2; x <= width / 2; x += SCALE) {
  text(x / SCALE, x - 10, 15);
  }

  for (let y = -height / 2; y <= height / 2; y += SCALE) {
  text(-y / SCALE, 5, y);
  }

  //Крестик посередине
  stroke(0);
  line(-5, 0, 5, 0);
  line(0, -5, 0, 5);

  //Риски
  for (let x = -width / 2; x <= width / 2; x += SCALE) {
  line(x, -5, x, 5);
  }

  for (let y = -height / 2; y <= height / 2; y += SCALE) {
  line(-5, y, 5, y);
  }

  //Названия осей
  fill(0);
  noStroke();
  textSize(14);

  text("X", width / 2 - 15, 20);
  text("Y", 10, -height / 2 + 20);

  scale(1, -1);

  stroke(0);
  noFill();
  beginShape();

  for (let x = -width / 2; x < width / 2; x += 0.5) {

  let unit = SCALE * zoom;

  let xCoord = (x / unit) - offsetX;
  let yCoord = evaluateFormula(expr, xCoord) + offsetY;

  let y = yCoord * unit;

  vertex(x, y);
  }

  endShape();

  pop();

  fill(0);
  noStroke();
  textSize(14);

if (mouseX >= 0 && mouseX <= width &&
    mouseY >= 0 && mouseY <= height) {

  let unit = SCALE * zoom;

  let mouseXCoord = (mouseX - width / 2) / unit;
  let mouseYCoord = (height / 2 - mouseY) / unit;

  text(`x = ${mouseXCoord.toFixed(2)}`, 10, 20);
  text(`y = ${mouseYCoord.toFixed(2)}`, 10, 40);
}

}

function keyPressed() {
  if ((key === 'q' || key === 'й') &&
      (keyIsDown(CONTROL) || keyIsDown(17))) {
    offsetX = 0;
    offsetY = 0;
  }
}

function mouseWheel(event) {
  if (event.delta > 0) {
    zoom *= 0.9;
  } else {
    zoom *= 1.1;
  }

  // лимиты
  zoom = constrain(zoom, 0.2, 5);

  return false; // чтобы браузер не прокручивал страницу
}

function evaluateFormula(expr, x) {
  return eval(expr);
}