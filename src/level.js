import Brick from "./brick.js";

export const buildLevel = (game, level) => {
    const bricks = [];

    level.forEach((row, rowIndex) => {
        row.forEach((brick, brickIndex) => {
            const position = {
                x: 80 * brickIndex,
                y: 20 + 24*rowIndex,
            }

            if(brick) {
                bricks.push(new Brick(game, position));
            }
        });
        
    });

    return bricks;
}

export const level1 = [
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
]