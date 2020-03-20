var animDur = 2000;
var secondOffset = 25;
var frames = 60;

function mutate(start, end, p){
    if(p==0) return start;
    if(p==1) return end;
    var l1 = start.length;
    var l2 = end.length;
    var length = Math.round(l1 + (l2 - l1)*p);
    var out='';
    var middleDist = 1-2*Math.abs(0.5-p);
    for(var i=0;i<length;i++){
        //either select the correct char from start/end, or a random letter.
        var oob = p<0.5 ? i>=l1 : i>=l2;
        var prob = oob ? 1 : middleDist * 0.5; //bit of damping for effect
        if(Math.random() < prob)
            out+='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz     '[Math.floor(Math.random() * 57)];
        else
            out+= p<0.5 ? start[i] : end[i];
    }
    return out;
}

function setText(start, end, element, percentage){
    var t = mutate(start, end, percentage);
    element.innerText = t;
}

function animTo(element, target) {
    start = element.innerText;
    for (var i = 0; i < frames; i++) {
        var p = i/frames;
        setTimeout(setText.bind(this, start, target, element, p), p * animDur);
    }
    setTimeout(function(){setText(start, target, element, 1)}, animDur);
}

function animToDur(element, target, duration) {
    start = element.innerText;
    for (var i = 0; i < frames; i++) {
        var p = i/frames;
        setTimeout(setText.bind(this, start, target, element, p), p * duration);
    }
    setTimeout(function(){setText(start, target, element, 1)}, duration);
}
