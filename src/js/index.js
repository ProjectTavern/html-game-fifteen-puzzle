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

        /**
         * @date 2019-04-26
         * @author winterguard
         * @class FifteenPuzzle
         * @description 15퍼즐 객체를 생성합니다.
         * @param {object} options
         * @param {number} options.MAPSIZE - 사용할 맵의 가로세로의 크기를 정합니다. 가로세로가 동일해야 하므로 하나의 숫자만을 입력받습니다.
         */
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
         * @instance init
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
         * @instance shuffle
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

                this.startTime = new Date();
                this.moveCount = 0;
        }


        /**
         * @date 2019-04-26
         * @author winterguard
         * @instance move
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

        /**
         * @date 2019-04-26
         * @author winterguard
         * @instance isDone
         * @description 현재 맵 상태를 초기 맵 상태를 비교하여 동일한 값을 가지는지 판별한다. 그 결과를 반환합니다.
         * @return {boolean}
         */
        isDone() {
                for (let index = 0; index < this.MAPSIZE; index++) {
                        for (let innerIndex = 0; innerIndex < this.MAPSIZE; innerIndex++) {
                                if (this.map[index][innerIndex] !== index * this.MAPSIZE + innerIndex + 1) {
                                        console.log('what', (index === this.MAPSIZE - 1) && (innerIndex === this.MAPSIZE - 1));
                                        return (index === this.MAPSIZE - 1) && (innerIndex === this.MAPSIZE - 1);
                                }
                        }
                }

                return true;
        }

        display() {
                console.log(this.map);
        }

        playPuzzle() {
                this.init();
                this.display();

                console.log("퍼즐이 초기화 되었습니다.");
                this.shuffle(100);
                const startTime = new Date();

                const currentTime = new Date();
                const elapsedTime = currentTime - startTime;
                console.time('Elapsed Puzzle Time');

                console.timeEnd('Elapsed Puzzle Time');
        }

}


const fifteenPuzzle = new FifteenPuzzle();
fifteenPuzzle.playPuzzle();
