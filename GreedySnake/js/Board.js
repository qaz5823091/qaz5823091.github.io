const START_X = 500;
const START_Y = 50;
const BOX_SIZE = 30;

class Board
{
    constructor(config)
    {
        this.start_x = config.x;
        this.start_y = config.y;
        this.w = config.w;
        this.h = config.h;
    }

    draw()
    {
        for (var i=0;i<this.w;i++) {
            for (var j=0;j<this.h;j++) {
                fill('white');
                square(this.start_x + BOX_SIZE * i, this.start_y + BOX_SIZE * j, BOX_SIZE);
            }
        }
    }
}
