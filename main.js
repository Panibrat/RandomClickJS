var blocks = [];

loadLocalStorageBlockList();
if(loadLocalStorageBlockList()){
    blocks = loadLocalStorageBlockList();
    restoreBlocks(blocks);
};

var MAX_HEIGHT = window.innerHeight/2;
var MAX_WIDTH = window.innerWidth/2;
var MAX_TOP = window.innerHeight/2 - 30;
var MAX_RIGTH = window.innerWidth/2;

function randomInteger(max) {
    var rand = Math.random() * (max)
    rand = Math.round(rand);
    return rand;
};
function changeColor(event) {
    var colorR = randomInteger(255);
    var colorG = randomInteger(255);
    var colorB = randomInteger(255);
    event.target.style.backgroundColor = "rgb(" + colorR + "," + colorG + "," + colorB + ")";
};
function createBlock(){
    var widthOfBlock = randomInteger(MAX_WIDTH);
    var heightOfBlock = randomInteger(MAX_HEIGHT);
    var posTop = randomInteger(MAX_TOP) + 30;
    var posRight = randomInteger(MAX_RIGTH);
    var colorR = randomInteger(255);
    var colorG = randomInteger(255);
    var colorB = randomInteger(255);
    var newDiv = document.createElement('div');
    newDiv.setAttribute("style",
        "background-color: rgb(" + colorR + "," + colorG + "," + colorB + ");" +
        "position:absolute;" +
        "top: " + posTop + "px;" +
        "right: " + posRight + "px;" +
        "width: " + widthOfBlock + "px;" +
        "height: " + heightOfBlock +"px;"
    );
    newDiv.setAttribute("onclick", "changeColor(event)");
    newDiv.setAttribute("class", "singleDiv");
    content.appendChild(newDiv);
};
function saveDivs() {
    var allDivs = document.getElementsByClassName('singleDiv');
    for(var i=0; i<allDivs.length; i++){
        var color =  allDivs[i].style.backgroundColor;
        var top =  allDivs[i].style.top;
        var right =  allDivs[i].style.right;
        var width =  allDivs[i].style.width;
        var height =  allDivs[i].style.height;
        var appendedBlock = {
            color: color,
            top: top,
            right: right,
            width: width,
            height: height
        };
        blocks.push(appendedBlock);
    };
    //console.log("blocks ", blocks);
    updateLocalStorage();
};
function restoreBlocks(blocks){
    for(var i=0; i<blocks.length; i++){
        var div = blocks[i];
        var newDiv = document.createElement('div');
        newDiv.setAttribute("style",
            "background-color: " + div.color + ";" +
            "position:absolute;" +
            "top: " + div.top + ";" +
            "right: " + div.right + ";" +
            "width: " + div.width + ";" +
            "height: " + div.height +";"
        );
        newDiv.setAttribute("onclick", "changeColor(event)");
        newDiv.setAttribute("class", "singleDiv");
        content.appendChild(newDiv);
    }
};
function updateLocalStorage() {
    localStorage.clear();
    var upBlocksList = JSON.stringify(blocks);
    localStorage.setItem('blocksList', upBlocksList);
};
function clearDivs() {
    localStorage.clear();
    location.reload();
}
function loadLocalStorageBlockList() {
    var blockList = JSON.parse(localStorage.getItem('blocksList'));
    return blockList;
}