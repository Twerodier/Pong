const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const speed = 5

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    dx: (Math.random() > .5) ? speed : -speed,
    dy: Math.random() - .5,
    
    draw(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = 'black'
        c.fill()
    },
    update(){

        if(this.x - this.radius < player1.x + player1.width && this.y > player1.y && this.y < player1.y + player1.height){
            this.dy += ((this.y - player1.y) / player1.height - .5) * 5
            this.dx = -this.dx * 1.1
        }

        if(this.x + this.radius > player2.x && this.y > player2.y && this.y < player2.y + player2.height){
            this.dy += ((this.y - player2.y) / player2.height - .5) * 5
            this.dx = -this.dx * 1.1
        }
        if(this.y < 0 + this.radius || this.y > canvas.height - this.radius){
            this.dy = -this.dy
        }
        this.x += this.dx;
        this.y += this.dy;
        
        if(this.x - this.radius < 0){
            player2.score++
            restart();
        }
        if( this.x > canvas.width - this.radius){
            player1.score++
            restart();
        }
        this.draw();
    }
};


class Player{
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.direction = 0;
        this.speed = speed;
        this.score = 0;
    }
    draw(){
        c.fillStyle = 'black';
        c.fillRect(this.x, this.y, this.width, this.height);
    }
    update(){
        this.y += this.direction;
        if(this.y < 0){
            this.y = 0
        }
        if(this.y + this.height > canvas.height){
            this.y = canvas.height - this.height
        }
        this.draw();
    }
}
const player1 = new Player(0, 0, 10, 200);
const player2 = new Player(canvas.width - 10, 0, 10, 200);

//get keyinput
{
addEventListener('keydown', event =>{
    getKey(event.code, true)
})
addEventListener('keyup', event =>{
    getKey(event.code, false)
})
const keys = {
    keyW: false,
    keyS: false,
    keyUp: false,
    keyDown: false,
};
function getKey(key,keyDown){
    if(keyDown){
        switch(key){
            case "KeyW":
                keys.keyW = true;
                break;
            case "KeyS":
                keys.keyS = true;
                break;
            case "ArrowUp":
                keys.keyUp = true;
                break;
            case "ArrowDown":
                keys.keyDown = true;
                break;
            default:
        }
    }
    else if(!keyDown){
        switch(key){
            case "KeyW":
                keys.keyW = false;
                break;
            case "KeyS":
                keys.keyS = false;
                break;
            case "ArrowUp":
                keys.keyUp = false;
                break;
            case "ArrowDown":
                keys.keyDown = false;
                break;
            default:
    }
}
}
function checkInput(){
    let p1 = 0;
    let p2 = 0;
    let speed1 = player1.speed
    let speed2 = player2.speed
    if(keys.keyW){
        p1 += -speed1
    }
    if(keys.keyS){
        p1 += speed1
    }
    if(keys.keyUp){
        p2 += -speed2
    }
    if(keys.keyDown){
        p2 += speed2
    }
    player1.direction = p1;
    player2.direction = p2;
}
}
function drawScore(){
    c.fillStyle = 'black'
    c.textAlign = "center"
    c.font = "40px Comic Sans MS"
    c.fillText(`${player1.score}|${player2.score}`, canvas.width / 2 , 50)
}

function restart(){
    player1.y = 0
    player2.y = 0
    player2.x = canvas.width - player2.width
    ball.x = canvas.width / 2
    ball.y = canvas.height / 2
    ball.dx = 0
    ball.dy = 0
    setTimeout(() => {
        ball.dx = (Math.random() > .5) ? speed : -speed
        ball.dy = Math.random() - .5
    }, 1000);
}

function init() {
    canvas.height = innerHeight;
    canvas.width = innerWidth;
    player1.score = 0;
    player2.score = 0;
    restart();
}
addEventListener("resize", init);

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, window.innerWidth, window.innerHeight)
    checkInput();
    player1.update();
    player2.update();
    ball.update();
    drawScore();
}
init();
animate();