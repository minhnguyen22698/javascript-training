import Node from '../lib/Node.js'
import { Sprite } from '../lib/Sprite.js';
import { Label } from '../lib/Label.js'
export class Card extends Node {
    constructor(src, index, value) {
        super()
        this._src = ''
        if (src) this.src = src
        this._index = '';
        this._value = '';
        if (index) this.index = index
        if (value) this.value = value
        this._width = 50;
        this._height = 50;
        this._initImage(src)
        this._initCover(index)
    }
    get src() {
        return this._src
    }
    set src(val) {
        this._src = val
    }
    get index() {
        return this._index
    }
    set index(val) {
        this._index = val
    }
    get value() {
        return this._value
    }
    set value(val) {
        this._value = val
        this.ele.value = val
    }
    _initCover(index) {
        var cover = new Node()
        cover.background = './img/cover.jpg';
        cover.width = 150;
        cover.height = 150;
        this.addChild(cover);
        var label = new Label(this.index)
        label.text = index;
        label.fontColor = 'white'
        label.fontSize = 30
        label.x = cover.width / 2 - 10;
        label.y = cover.width / 2 - 10;
        cover.addChild(label)
    }
    _initImage(src) {
        var img = new Sprite(src)
        img.width = 150;
        img.height = 150;
        img.scaleX = 0;
        this.addChild(img);
    }
}