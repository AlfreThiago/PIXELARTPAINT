function make2DArray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

var grid;
var cols;
var rows;
var w = 20;
var currentColor;

function setup() {
  createCanvas(320, 320);
  cols = floor(width / w);
  rows = floor(height / w);
  grid = make2DArray(cols, rows);

  const colorPicker = document.getElementById('colorPicker');
  if (colorPicker) {
    currentColor = colorPicker.value; 
    colorPicker.addEventListener('change', () => {
    currentColor = colorPicker.value;
    });
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j, w);
    }
  }
}

function draw() {
  background(255);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
}

class Cell {
  constructor(i, j, w) {
    this.i = i;
    this.j = j;
    this.w = w;
    this.color = null; 
  }

  show() {
    var x = this.i * this.w;
    var y = this.j * this.w;
    stroke(0);

    if (this.color) {
      fill(this.color);
    } else {
      noFill();
    }
    rect(x, y, this.w, this.w);
  }

  contains(x, y) {
    return (
      x > this.i * this.w &&
      x < this.i * this.w + this.w &&
      y > this.j * this.w &&
      y < this.j * this.w + this.w
    );
  }

  paint(newColor) {
  if (this.color !== newColor) {
    this.color = newColor;
  }
}
}

function mousePressed() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (grid[i][j].contains(mouseX, mouseY)) {
        grid[i][j].paint(currentColor); 
      }
    }
  }
}