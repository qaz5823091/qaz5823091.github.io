class Snack
{
    constructor(config)
    {
        this.x = 0;
        this.y = 0;
        this.w = config.w;
        this.h = config.h;
        this.start_x = config.x;
        this.start_y = config.y;
        this.color = config.snack_color;
        this.side_length = config.side_length;
        this.create();
    }

    create()
    {
        this.x = int(random(this.w));
        this.y = int(random(this.h));
    }

    draw()
    {
        fill(this.color);
        circle(this.start_x + (this.x + 0.5) * this.side_length,
                this.start_y + (this.y + 0.5) * this.side_length, 20);
    }

    print()
    {
        console.log(this.x, this.y);
    }
}
