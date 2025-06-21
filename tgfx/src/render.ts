export type Instruction = { advance: number } | { rotate: number };

export type Instructions = Record<string, Instruction>;
export type Point = { x: number; y: number };
const X = 0;
const Y = 1;

export function* render(
  sequence: Iterable<string>,
  instructions: Instructions,
  origin?: Point,
  heading?: number,
): Iterable<Point> {
  heading ??= 0;
  let current = origin ?? { x: 0, y: 0 };
  yield current;

  for (const character of sequence) {
    const instruction = instructions[character];
    if ("advance" in instruction) {
      const radians = (heading * Math.PI) / 180;
      current.x += instruction.advance * Math.cos(radians);
      current.y += instruction.advance * Math.sin(radians);

      yield current;
    } else if ("rotate" in instruction) {
      heading += instruction.rotate;
    } else {
      instruction satisfies never;
    }
  }
  return "";
}

function inBounds(
  point: Point,
  bbox: { x: number; y: number; width: number; height: number },
) {
  return (
    point.x >= bbox.x &&
    point.x <= bbox.x + bbox.width &&
    point.y >= bbox.y &&
    point.y <= bbox.y + bbox.height
  );
}
//TODO: test this
// yield series of points if there is a continious segment inside window
export function* window(
  points: Iterable<Point>,
  bbox: { x: number; y: number; width: number; height: number },
): Iterable<[Point, Point]> {
  const first = points[Symbol.iterator]().next();
  if (first.done) return [];
  let current = first.value;
  for (let point of points) {
    if (inBounds(point, bbox) || inBounds(current, bbox))
      yield [current, point];
    current = point;
  }
}

/**
 * Creates an SVG path string from a list of [x,y] coordinates
 * @param coordinates Array of [x,y] coordinate pairs
 * @param closed Whether to close the path (connect last point to first)
 * @returns SVG path string
 */
export function coordinatesToSVGPath(
  coordinates: Iterable<Point>,
  closed = false,
) {
  let minX = null;
  let minY = null;
  let maxX = null;
  let maxY = null;
  let path = "";
  for (let c of coordinates) {
    if (minX === null || c.x < minX) minX = c.x;
    if (minY === null || c.y < minY) minY = c.y;
    if (maxX === null || c.x > maxX) maxX = c.x;
    if (maxY === null || c.y > maxY) maxY = c.y;

    if (path === "") {
      path += `M ${c.x} ${c.y}`;
    } else {
      path += ` L ${c.x} ${c.y}`;
    }
  }
  if (path !== "" && closed) {
    // Close the path if requested
    path += " Z";
  }

  let w = (maxX ?? 0) - (minX ?? 0);
  let h = (maxY ?? 0) - (minY ?? 0);
  let viewBox = `${minX ?? 0} ${minY ?? 0} ${w} ${h}`;
  return { path, viewBox, w, h };
}
