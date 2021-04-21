import Node from './Node.js'

export class Sprite extends Node{
    constructor(path){
        super();
        this._path='';
        if(path)this.path=path;
    }
    _initElement(){
        this.ele=document.createElement('img');
        this.ele.style.position='absolute';
    }
    get path(){
        return this._path;
    }
    set path(value){
        this._path=value
        this.ele.src=this._path
    }
    setImage(path){
        this.path=path
    }
}