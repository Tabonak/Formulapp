let slider;

function setup() {
  createCanvas(600, 400);
  slider = document.getElementById("slider");
}

function draw() {
  background(255);

  let a = parseFloat(slider.value);

  //Сдвинули координаты
  translate(width / 2, height / 2);
  
  //Оси
  stroke(200);
  line(-width / 2, 0, width / 2, 0);
  line(0, -height / 2, 0, height / 2);

  //Сетка
  stroke(220);
  for (let x = -width / 2; x <= width / 2; x += 50) {
  line(x, -height / 2, x, height / 2);
  }

  for (let y = -height / 2; y <= height / 2; y += 50) {
  line(-width / 2, y, width / 2, y);
  }

  //Числа на графике
  fill(0);
  noStroke();
  textSize(11);

  for (let x = -width / 2; x <= width / 2; x += 50) {
  text(x, x - 10, 18);
  }

  for (let y = -height / 2; y <= height / 2; y += 50) {
  text(-y, 8, y);
  }

  //Крестик посередине
  stroke(0);
  line(-5, 0, 5, 0);
  line(0, -5, 0, 5);

  //Риски
  for (let x = -width / 2; x <= width / 2; x += 50) {
  line(x, -5, x, 5);
  }

  for (let y = -height / 2; y <= height / 2; y += 50) {
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

  for (let x = -300; x < 300; x += 1) {
    let y = a * (x * x) / 100;
    vertex(x, y);
  }

  endShape();
}