import Node from '../lib/Node.js'
import { Sprite } from '../lib/Sprite.js'
import { Card } from './Card.js'
import {Label} from '../lib/Label.js'

var cardHolder = [
    {
        img: './img/trucxanh0.jpg',
        value: 1,
        available: 2,
    },
    {
        img: './img/trucxanh1.jpg',
        value: 2,
        available: 2,
    },
    {
        img: './img/trucxanh2.jpg',
        value: 3,
        available: 2,
    },
    {
        img: './img/trucxanh3.jpg',
        value: 4,
        available: 2,
    },
    {
        img: './img/trucxanh4.jpg',
        value: 5,
        available: 2,
    },
    {
        img: './img/trucxanh5.jpg',
        value: 6,
        available: 2,
    },
    {
        img: './img/trucxanh6.jpg',
        value: 7,
        available: 2,
    },
    {
        img: './img/trucxanh7.jpg',
        value: 8,
        available: 2,
    },
    {
        img: './img/trucxanh8.jpg',
        value: 9,
        available: 2,
    },
    {
        img: './img/trucxanh9.jpg',
        value: 10,
        available: 2,
    },
]

export class Game extends Node {
    init() {
        this._initBackGround()
        this._initCard()
        this.initLabel()
        // var btn =document.createElement('button')
        // btn.innerHTML='Play again'
        // btn.addEventListener('click',()=>{location.reload()})
        // btn.style.zIndex='99'
        // btn.style.position='relative'
        // document.body.appendChild(btn)
    }
    initLabel(){
        var label=new Label('Score: ',50,'red')
        this.addChild(label)
        var score = new Label(10000,50)
        score.x=150
        score.ele.id="score"
        this.addChild(score)
    }
    _initBackGround() {
        var bg = new Sprite('./img/trucxanh_bg.jpg')
        bg.width = window.innerWidth;
        bg.height = window.innerHeight;
        this.addChild(bg)
    }
    _initCard() {
        var index=0
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 5; j++) {
                index++;
                do {
                    var randCard = Math.floor(Math.random() * cardHolder.length);
                } while (cardHolder[randCard].available == 0&&cardHolder[randCard].value!==undefined);
                cardHolder[randCard].available--;
                console.log('Shuffle card value'+index+': '+cardHolder[randCard].value)
                var card = new Card(cardHolder[randCard].img,index,cardHolder[randCard].value);
                card.x = j * 100;
                card.y = i * 100;
                card.ele.id=cardHolder[randCard].value
                this.addChild(card);
            }
        }
    }
}