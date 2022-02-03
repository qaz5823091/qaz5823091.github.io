class Node
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
        this.next = null;
    }
}

class Snake
{
    constructor(config)
    {
        this.x = 1;
        this.y = 1;
        this.w = config.w;
        this.h = config.h;
        this.start_x = config.x;
        this.start_y = config.y;
        // t r b l 0 1 2 3
        this.direction = [1, 0];
        this.color = config.snake_color;
        this.move_distence = config.side_length;

        this.head = new Node(this.x, this.y);
        this.length = 1;
    }

    setDirection(key_code)
    {
        switch (key_code) {
            case UP_ARROW:
                if (this.direction != [0, 1]) {
                    this.direction = [0, -1];
                }
                break;
            case RIGHT_ARROW:
                if (this.direction != [-1, 0]) {
                    this.direction = [1, 0];
                }
                break;
            case DOWN_ARROW:
                if (this.direction != [0, -1]) {
                    this.direction = [0, 1];
                }
                break;
            case LEFT_ARROW:
                if (this.direction != [1, 0]) {
                    this.direction = [-1, 0];
                }
                break;
         }
    }

    move()
    {
        this.offset();

        this.head.x += this.direction[0];
        this.head.y += this.direction[1];

        if (this.head.x >= this.w) {
            this.head.x = 0;
        }
        if (this.head.x < 0) {
            this.head.x = this.w - 1;
        }
        if (this.head.y >= this.h) {
            this.head.y = 0;
        }
        if (this.head.y < 0) {
            this.head.y = this.h - 1;
        }
    }

    offset()
    {
        this.insert(this.head.x, this.head.y);
        this.remove();
    }

    insert(x, y)
    {
        let newHead = new Node(x, y);
        newHead.next = this.head;
        this.head = newHead;
        ++this.length;
    }

    remove()
    {
        let index = 0;
        let now = this.head;
        let previous = this.head;
        while (index < this.length - 1) {
            previous = now;
            now = now.next;
            ++index;
        }
        previous.next = null;
        --this.length;
    }

    draw()
    {
        let now = this.head;
        while (now !== null)
        {
            fill(this.color);
            circle(this.start_x + (now.x + 0.5) * this.move_distence,
                    this.start_y + (now.y + 0.5) * this.move_distence, 20);

            now = now.next;
        }
    }

    isCollide()
    {
        let temp = this.head;
        let now = this.head;
        now = now.next;
        while (now !== null) {
            if (temp.x == now.x && temp.y == now.y) {
                return true;
            }
            now = now.next;
        }

        return false;
    }

    print()
    {
        console.log(this.length);
    }
}
