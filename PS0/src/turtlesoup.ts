import { Turtle, SimpleTurtle, Point, Color } from "./turtle";
import * as fs from "fs";
import { execSync } from "child_process";

export function drawSquare(turtle: Turtle, sideLength: number): void {
  for (let i = 0; i < 4; i++) {
    turtle.forward(sideLength);
    turtle.turn(90);
  }
}

export function chordLength(radius: number, angleInDegrees: number): number {
  const angleInRadians = (angleInDegrees * Math.PI) / 180;
  return Number((2 * radius * Math.sin(angleInRadians / 2)).toFixed(10));
}

export function drawApproximateCircle(
  turtle: Turtle,
  radius: number,
  numSides: number
): void {
  const angle = 360 / numSides;
  const stepLength = chordLength(radius, angle);
  
  for (let i = 0; i < numSides; i++) {
    turtle.forward(stepLength);
    turtle.turn(angle);
  }
}

export function distance(p1: Point, p2: Point): number {
  return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
}

export function findPath(turtle: Turtle, points: Point[]): string[] {
  let instructions: string[] = [];
  let currentPosition = turtle.getPosition();
  let currentHeading = turtle.getHeading();

  for (const target of points) {
    const dx = target.x - currentPosition.x;
    const dy = target.y - currentPosition.y;
    const targetAngle = (Math.atan2(dy, dx) * 180) / Math.PI;
    const turnAngle = ((targetAngle - currentHeading + 360) % 360);

    instructions.push(`turn ${turnAngle.toFixed(2)}`);
    instructions.push(`forward ${distance(currentPosition, target).toFixed(2)}`);

    currentPosition = target;
    currentHeading = targetAngle;
  }

  return instructions;
}

export function drawPersonalArt(turtle: Turtle): void {
turtle.color("blue");
turtle.forward(120);
turtle.turn(45);
turtle.color("red");
turtle.forward(20);
turtle.turn(30);
turtle.color("green");
turtle.forward(55);
turtle.turn(60);
turtle.color("purple");
turtle.forward(10);
turtle.turn(75);
turtle.color("yellow");
turtle.forward(20);
turtle.turn(20);
turtle.color("cyan");
turtle.forward(30);
turtle.turn(90);
turtle.color("orange");
turtle.forward(100);
turtle.turn(50);
turtle.color("black");
turtle.forward(25);
turtle.turn(35);
turtle.color("blue");
turtle.forward(20);
turtle.turn(45);
turtle.color("red");
turtle.forward(80);
turtle.turn(30);
turtle.color("green");
turtle.forward(95);
turtle.turn(60);
turtle.color("purple");
turtle.forward(110);
turtle.turn(75);
turtle.color("yellow");
turtle.forward(70);
turtle.turn(20);
turtle.color("cyan");
turtle.forward(130);
turtle.turn(90);
turtle.color("orange");
turtle.forward(100);
turtle.turn(50);
turtle.color("black");
turtle.forward(85);
turtle.turn(35);

}

function generateHTML(
  pathData: { start: Point; end: Point; color: Color }[]
): string {
  const canvasWidth = 500;
  const canvasHeight = 500;
  const scale = 1;
  const offsetX = canvasWidth / 2;
  const offsetY = canvasHeight / 2;

  let pathStrings = "";
  for (const segment of pathData) {
    const x1 = segment.start.x * scale + offsetX;
    const y1 = segment.start.y * scale + offsetY;
    const x2 = segment.end.x * scale + offsetX;
    const y2 = segment.end.y * scale + offsetY;
    pathStrings += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${segment.color}" stroke-width="2"/>`;
  }

  return `<!DOCTYPE html>
<html>
<head>
    <title>Turtle Graphics Output</title>
    <style>
        body { margin: 0; }
        canvas { display: block; }
    </style>
</head>
<body>
    <svg width="${canvasWidth}" height="${canvasHeight}" style="background-color:#f0f0f0;">
        ${pathStrings}
    </svg>
</body>
</html>`;
}

function saveHTMLToFile(
  htmlContent: string,
  filename: string = "output.html"
): void {
  fs.writeFileSync(filename, htmlContent);
  console.log(`Drawing saved to ${filename}`);
}

function openHTML(filename: string = "output.html"): void {
  try {
    execSync(`open ${filename}`);
  } catch {
    try {
      execSync(`start ${filename}`);
    } catch {
      try {
        execSync(`xdg-open ${filename}`);
      } catch {
        console.log("Could not open the file automatically");
      }
    }
  }
}

export function main(): void {
  const turtle = new SimpleTurtle();

  // drawSquare(turtle, 100);

  // console.log("Chord length for radius 5, angle 60 degrees:", chordLength(5, 60));

  // drawApproximateCircle(turtle, 50, 360);

  // console.log("Distance between (1,2) and (4,6):", distance({ x: 1, y: 2 }, { x: 4, y: 6 }));

  // const pointsToVisit: Point[] = [{ x: 20, y: 20 }, { x: 80, y: 20 }, { x: 80, y: 80 }];
  // console.log("Path instructions:", findPath(turtle, pointsToVisit));

  drawPersonalArt(turtle);

  const htmlContent = generateHTML((turtle as SimpleTurtle).getPath());
  saveHTMLToFile(htmlContent);
  openHTML();
}

if (require.main === module) {
  main();
}
