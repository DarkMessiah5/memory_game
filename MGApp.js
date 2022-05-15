

const App = PIXI.Application;

const app = new App({
    width: innerWidth,
    height: innerHeight,
    transparent: true,
    antialias: true});

app.renderer.view.style.position = 'absolute';

document.body.appendChild(app.view);

const applePic = PIXI.Texture.from('./sprites/apple.jpg')
const orangePic = PIXI.Texture.from('./sprites/orange.jpg')
const cherryPic = PIXI.Texture.from('./sprites/cherry.jpg')
const grapePic = PIXI.Texture.from('./sprites/grape.jpg')
const greenApplePic = PIXI.Texture.from('./sprites/green_apple.jpg')
const pearPic = PIXI.Texture.from('./sprites/pear.jpg')
const pineapplePic = PIXI.Texture.from('./sprites/pineapple.jpg')
const bananaPic = PIXI.Texture.from('./sprites/banana.jpg')
const cardShirtPic = PIXI.Texture.from('./sprites/card_shirt.jpg')

const sprites = [];

var cardShirts = [];

var cardsNum = [];
    
var randOrderCards = [];
var randOrderCardsNum = [];


function placeCards() {
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 8; j++) {
            cardsNum.push(j);
            cardShirts.push(new PIXI.Sprite(cardShirtPic));
        }
            
        sprites.push(new PIXI.Sprite(applePic))
        sprites.push(new PIXI.Sprite(orangePic))
        sprites.push(new PIXI.Sprite(cherryPic))
        sprites.push(new PIXI.Sprite(grapePic))
        sprites.push(new PIXI.Sprite(greenApplePic))
        sprites.push(new PIXI.Sprite(pearPic))
        sprites.push(new PIXI.Sprite(pineapplePic))
        sprites.push(new PIXI.Sprite(bananaPic))
    }
    
    let order;
    
    for (let i = 0; i < 16; i++) {
        order = Math.floor(Math.random() * sprites.length);
        console.log(order);
        randOrderCards.push(sprites[order]);
        randOrderCardsNum.push(cardsNum[order]);
        sprites.splice(order, 1);
        cardsNum.splice(order, 1);
    }
    
    console.log(randOrderCards)
    
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            randOrderCards[(i) * 4 + j].width = 120;
            randOrderCards[(i) * 4 + j].height = 150;
            randOrderCards[(i) * 4 + j].x = 120 * j;
            randOrderCards[(i) * 4 + j].y = 150 * i;
            
            
    
            cardShirts[(i) * 4 + j].width = 120;
            cardShirts[(i) * 4 + j].height = 150;
            cardShirts[(i) * 4 + j].x = 120 * j;
            cardShirts[(i) * 4 + j].y = 150 * i;
            app.stage.addChild(cardShirts[(i) * 4 + j]);
            app.stage.addChild(randOrderCards[(i) * 4 + j]);

            randOrderCards[(i) * 4 + j].interactive = true;
            cardShirts[(i) * 4 + j].interactive = true;
            randOrderCards[(i) * 4 + j].visible = true;
        }
    }
}




function makeInteractive(arr, isInteractive) {
    for (let i = 0; i < 16; i++)
        arr[i].interactive = isInteractive;
}

function hide() {
    console.log('Must hide!!!');
    makeInteractive(randOrderCards, true);
    for (let i = 0; i < 16; i++ )
        randOrderCards[i].visible = false;
    start_sound.play();
}

function setGameLogic() {
    console.log('Setting a game logic')
    for (let i = 0; i < 16; i++ ) {
        cardShirts[i].on('pointerdown', function() {
            console.log('click');
            click_sound.play();
            randOrderCards[i].visible = true;

            if (previousCardIndex === -1) {
                
                previousCardIndex = i;
                previousCardType = randOrderCardsNum[i];

            } else {
                
                if (previousCardIndex != i && previousCardType === randOrderCardsNum[i]) {
                    previousCardIndex = -1;
                    pairs--;

                    if (pairs == 0) {
                        win_sound.play();
                        game();
                    }

                } else {
                    for (let j = 0; j < 16; j++) {
                        randOrderCards[j].interactive = false;
                        cardShirts[j].interactive = false;
                    }

                    setTimeout(() => {

                        for (let j = 0; j < 16; j++) {
                            randOrderCards[j].interactive = true;
                            cardShirts[j].interactive = true;
                        }

                        randOrderCards[previousCardIndex].visible = false;
                        randOrderCards[i].visible = false;

                        previousCardIndex = -1;
                    }, 500)
                    
                    
                }

            }
        })



    //randOrderCards[i].interactive = true;
    //randOrderCards[i].visible = false;

    randOrderCards[i].on('pointerdown', function() {
        if (previousCardIndex === i)
            randOrderCards[i].visible = false;
    })
    }
}

var pairs = 8;
var previousCardIndex = -1;
var previousCardType = -1;

const click_sound = new Howl({
    src: ['./audio/click.wav'] 
});

const start_sound = new Howl({
    src: ['./audio/start.wav'] 
});

const win_sound = new Howl({
    src: ['./audio/win.wav'] 
});


function game() {

    previousCardIndex = -1;
    previousCardType = -1;

        
    placeCards();

    setGameLogic();

    console.log('The game begins!');

    setTimeout(() => hide(), 5000);

}



game();