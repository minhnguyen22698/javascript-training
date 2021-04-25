export default class Node {
    constructor() {
        this._initElement();
        this._x = 0;
        this._y = 0;
        this._width = 0;
        this._height = 0;
        this._active = true;
        this._scaleX = 1;
        this._scale = 1;
        this.children = [];
        this._opacity = 1;
        this._zIndex = 10;
        this._isClicked = 0;
        this._backGroundImage = ''
        this._alignitem = ''
        this._border=''
    }
    _initElement() {
        this.ele = document.createElement('div');
        this.ele.style.position = 'absolute'
    }
    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
        this.ele.style.left = this._x + 'px';
    }
    get y() {
        return this._y;
    }
    set y(value) {
        this._y = value
        this.ele.style.top = this._y + 'px'
    }
    get width() {
        return this._width;
    }
    set width(value) {
        this._width = value
        this.ele.style.width = this._width + 'px'
    }
    get height() {
        return this._height;
    }
    set height(value) {
        this._height = value;
        this.ele.style.height = this._height + 'px';
    }
    get active() {
        return this._active;
    }

    set active(value) {
        this._active = value;
        this.ele.style.display = this._active ? "block" : "none";
    }
    get zIndex() {
        return this._zIndex
    }
    set zIndex(val) {
        this._zIndex = val
        this.ele.style.zIndex = this._zIndex
    }
    get scaleX() {
        return this._scaleX;
    }
    set scaleX(value) {
        this._scaleX = value;
        this.ele.style.transform = `scaleX(${this._scaleX})`
    }

    get scale() {
        return this._scaleX;
    }
    set scale(value) {
        this._scale = value;
        this.ele.style.transform = `scale(${this._scale})`;
    }

    get opacity() {
        return this._opacity
    }
    set opacity(val) {
        this._opacity = val;
        this.ele.style.opacity = this._opacity
    }
    
    get isClicked() {
        return this._isClicked
    }
    set isClicked(val) {
        this._isClicked = val
    }
    get background() {
        return this._backGroundImage
    }
    set background(val) {
        this._backGroundImage = val
        this.ele.style.backgroundImage = `url(${this._backGroundImage})`
    }
    get alignItem() {
        return this._alignitem
    }
    set alignItem(val) {
        this._alignitem = val
        this.ele.style.display='flex'
        this.ele.style.alignItems = this._alignitem
        this.ele.style.justifyContent = this._alignitem
    }
    get border(){
        return this._border
    }
    set border(val){
        this._border=val
        this.ele.style.border=this._border
    }
    addChild(node) {
        this.ele.appendChild(node.ele)
        this.children.push(node)
    }
    on(evt, listener) {
        this.ele.addEventListener(evt, listener)
    }
}