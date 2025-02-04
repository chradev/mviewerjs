/*
    Edwin Josué Brenes Cambronero (EdwinJosue16) project for drawing of Koch curves
    https://github.com/EdwinJosue16/von-koch-fractal-js
*/

function trisection(p1,p2, r){
    return {
        x: (p1.x+r*p2.x)/(1+r),
        y: (p1.y+r*p2.y)/(1+r)
    }
}

function rotate(p, center, angle){
    const translation = {
        x: p.x - center.x,
        y: p.y - center.y
    }
    const theta = Math.atan2(translation.y, translation.x)
    const r = Math.sqrt((translation.x * translation.x + translation.y * translation.y ))
    return {
        x: r * Math.cos(theta + angle) + center.x,
        y: r * Math.sin(theta + angle) + center.y
    }
}

var result;

function recursiveKock(p0,p4, level){
    if(level<=0){
         result += ' ' + Math.round(p4.x) + ' ' + Math.round(p4.y);
    } 
    else{
        const p1 = trisection(p0,p4,1/2);
        const p3 = trisection(p0,p4,2);
        const p2 = rotate(p3,p1,Math.PI/3);
        let points = [p0, p1, p2, p3, p4]; 
        for(let i=0; i<4;i++) {
            recursiveKock(points[i],points[i+1], level-1);
        }
    }
}

function getKockCurve (path) {
    result = 'M' + Math.round(path.start.x) + ' ' + Math.round(path.start.y);
    recursiveKock(path.start, path.end, path.level);
    path.result = result;
    return result;
}
