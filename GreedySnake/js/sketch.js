const WIDTH = 19;
const HEIGHT = 19;

let config = {
    'game_name': 'GreedySnake',

    'x': 500,
    'y': 50,
    'w': WIDTH,
    'h': HEIGHT,
    'snake_color': 'red',
    'snack_color': 'yellow',
    'side_length': 30,
    'snack_cool_down': 5,

    'frame_time': 500
};

let board;
let snake;
let snack;

function setup()
{
    createCanvas(1500, 750);
    board = new Board(config);
    snake = new Snake(config);
    snack = new Snack(config);
    setInterval(timer, config.frame_time);
}

function draw()
{
    background(220);
    board.draw();
    snack.draw();
    snake.draw();
}

function timer()
{
    if (snake.isCollide()) {
        window.location.replace("/" + config.game_name);
    }

    if (isCollide()) {
        snake.insert(snack.x, snack.y);
        cool_down = snake.length + 1;
        snack.create();
        snake.move();
    }

    snake.move();
}

function keyPressed()
{
    snake.setDirection(keyCode);
}

function mousePressed(event)
{
    console.log(event.value);
}

function isCollide()
{
    return (snake.head.x == snack.x && snake.head.y == snack.y);
}
