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

function setup() {
  createCanvas(320, 320);
  cols = floor(width / w);
  rows = floor(height / w);
  grid = make2DArray(cols, rows);
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

// Cell class
class Cell {
  constructor(i, j, w) {
    this.i = i;
    this.j = j;
    this.w = w;
    this.is_painted = false; // Add a property to track if the cell is painted
  }

  // Method to draw the cell
  show() {
    var x = this.i * this.w;
    var y = this.j * this.w;
    stroke(0); // Set the border color to black
    if (this.is_painted) {
      fill(0); // Fill the rectangle with black if it's painted
    } else {
      noFill(); // Don't fill the rectangle if it's not painted
    }
    rect(x, y, this.w, this.w);
  }

  // Method to check if the mouse is inside the cell
  contains(x, y) {
    return (
      x > this.i * this.w &&
      x < this.i * this.w + this.w &&
      y > this.j * this.w &&
      y < this.j * this.w + this.w
    );
  }

  // Method to change the cell's color
  paint() {
    if (this.is_painted) {
        this.is_painted = false;
    } else {
    this.is_painted = true;
  }
}
}

function mousePressed() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (grid[i][j].contains(mouseX, mouseY)) {
        grid[i][j].paint();
      }
    }
  }
}