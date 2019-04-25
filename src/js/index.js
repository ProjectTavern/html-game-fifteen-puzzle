const Direction = {
    Right: 1,
    Left: 2,
    Up: 3,
    Down: 4,
    properties: {
        1: "Right",
        2: "Left",
        3: "Up",
        4: "Down",
    },
};

class FifteenPuzzle {
    constructor(options) {
        this.MAPSIZE = 4;
        this.map = null;
        this.startTime = null;
        this.endTime = null;
        this.moveCount = 0;
        this.position = {
            x: 0,
            y: 0
        };
    }


    /**
     * @date 2019-04-26
     * @author winterguard
     * @function init
     * @description 15퍼즐을 초기화한다. 정렬된 퍼즐의 형태로 변경한다.
     */
    init() {
        let itemIndex = 0;
        this.map = (new Array(this.MAPSIZE)).fill([]).map(item => {
            item = new Array(this.MAPSIZE).fill(0).map(() => ++itemIndex);
            return item;
        });
        this.map[this.MAPSIZE - 1][this.MAPSIZE - 1] = 0;
        this.position.x = this.MAPSIZE - 1;
        this.position.y = this.MAPSIZE - 1;

        this.startTime = new Date();
        this.moveCount = 0;
    }

    /**
     * @date 2019-04-26
     * @author winterguard
     * @function shuffle
     * @description 맵을 섞는다. 얼마나 섞을지에 대한 횟수는 조절이 가능하다. 섞고 나서 화면을 보여준다.
     * @param {number} shuffleCount
     */
    shuffle(shuffleCount) {
        for (let index = 0; index < shuffleCount; index++) {
            const targetDirection = Math.floor(Math.random() * 4 + 1);
            const key = Direction.properties[targetDirection];
            console.log(key);
            if (!this.move(key)) {
                index--;
                continue;
            }
            this.display();
        }
    }


    /**
     * @date 2019-04-26
     * @author winterguard
     * @function move
     * @description 위치값을 받아서 그 위치대로 맵을 이동시킨다. 이동시키지 못하는 조건인 경우 false 를 반환한다.
     * @param {string} direction
     * @return {boolean}
     */
    move(direction) {
        if (direction === "Right" && this.position.x > 0) {
            this.map[this.position.y][this.position.x] = this.map[this.position.y][this.position.x - 1];
            this.map[this.position.y][--this.position.x] = 0;
        } else if (direction === "Left" && this.position.x < this.MAPSIZE - 1) {
            this.map[this.position.y][this.position.x] = this.map[this.position.y][this.position.x + 1];
            this.map[this.position.y][++this.position.x] = 0;
        } else if (direction === "Up" && this.position.y < this.MAPSIZE - 1) {
            this.map[this.position.y][this.position.x] = this.map[this.position.y + 1][this.position.x];
            this.map[++this.position.y][this.position.x] = 0;
        } else if (direction === "Down" && this.position.y > 0) {
            this.map[this.position.y][this.position.x] = this.map[this.position.y - 1][this.position.x];
            this.map[--this.position.y][this.position.x] = 0;
        } else {
            return false;
        }

        return true;
    }

    isDone() {
        for (let index = 0; index < this.MAPSIZE; index++) {
            for (let innerIndex = 0; innerIndex < this.MAPSIZE; innerIndex++) {
                if (map[index][innerIndex] !== index * this.MAPSIZE + innerIndex + 1) {
                    return (index === this.MAPSIZE - 1) && (innerIndex === this.MAPSIZE - 1);
                }
            }
        }
    }

    display() {
        console.log(this.map);
    }

}




const fifteenPuzzle = new FifteenPuzzle();
fifteenPuzzle.init();
fifteenPuzzle.shuffle(100);
