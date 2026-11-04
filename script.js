// Функция для обратного прочтения строки (str[::-1])
function reverse(s){
    return s.split("").reverse().join("");
}


// Функция для поиска неупорядоченных n-ок без повторений(itertools.combinations)
function comb(array) {
    var result = [];
    for (let counter1 = 0; counter1 < array.length; counter1++) {
        for (let counter2 = counter1 + 1; counter2 < array.length; counter2++) {
            result.push([array[counter1], array[counter2]]);
        };
    };
    return result;
};

// Перевести все буквы в верхний регистр
function uppercase(a)
{
    var output="";
    for(var x=0;x<a.length;x++)
            output+=String.fromCharCode(a.charCodeAt(x)>96 && a.charCodeAt(x)<123 ? a.charCodeAt(x)-32: a.charCodeAt(x))
    return output;
}

const combinations = comb([1, 2, 3, 4, 5, 6, 7, 8])
var dict = new Map();

for (let i = 0; i < 26; i++) {
    var letter = String.fromCharCode(65 + i);
    dict.set(letter, combinations[i]);
};

document.addEventListener("DOMContentLoaded", (event) => {

    const menu_btn = document.getElementById("menu_btn");

    menu_btn.addEventListener("click", () => {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('active');
    });

    const paper = document.getElementById("paper");

    sceneWidth = paper.offsetWidth;
    sceneHeight = paper.offsetHeight

    const stage = new Konva.Stage({
        container: 'paper',
        width: sceneWidth,
        height: sceneHeight,
    });

    const layer = new Konva.Layer();
    stage.add(layer);

    function drawArc (symbol, ind, length_phrase) {
        var pair = dict.get(symbol);
        if (Math.abs(pair[0] - pair[1]) > 4) {
            var angle = Math.abs(pair[0] - pair[1]) * 45;
        } else {
            var angle = 360 - Math.abs(pair[0] - pair[1]) * 45;
        };
        if (Math.abs(pair[0] - pair[1]) > 4) {
            var rotation = - (pair[1] - 1) * 45;
        } else {
            var rotation = - (pair[0] - 1) * 45;
        };
        var arc = new Konva.Arc({
            x: stage.width() / 2,
            y: stage.height() / 2,
            innerRadius: 0,  // Внутренний радиус
            outerRadius: radius * (length_phrase - ind + 1), // Внешний радиус
            rotation: rotation,
            angle: angle,       
            fill: 'white',
            stroke: 'black',
            strokeWidth: 4,
            clockwise: true,
        });
        layer.add(arc);
    };


    const textarea = document.getElementById("input_text");
    var radius = 25;

    function drawPie() {
        var mytext = textarea.value; 
        var clean_text = mytext.replace(/[^a-zA-z\s]/gi, "");
        console.log(clean_text);
        var uppercase_text = uppercase(clean_text);
        var min_parameter = Math.min(stage.width(), stage.height());
        var length  = Math.max(5, uppercase_text.length);
        radius = min_parameter / (2 * length + 2);
        console.log(radius);
        var reversed_phrase = reverse(uppercase_text);
        console.log(reversed_phrase);
        for (let q = 0; q < reversed_phrase.length; q++) {
            if (reversed_phrase[q] === " ") {
                var circle = new Konva.Circle({
                    x: stage.width() / 2,
                    y: stage.height() / 2,
                    radius: radius * (reversed_phrase.length - q + 1),
                    stroke: 'black',
                    fill: 'white',
                    strokeWidth: 4
                });
                layer.add(circle);
            } else {
                drawArc(reversed_phrase[q], q, reversed_phrase.length)
            };
        };
        var innerCircle = new Konva.Circle({
            x: stage.width() / 2,
            y: stage.height() / 2,
            radius: radius,
            stroke: 'black',
            fill: 'white',
            strokeWidth: 4
        });
        layer.add(innerCircle);
        stage.draw();
    };

    drawPie();

    const button = document.getElementById("submit");

    button.addEventListener("click", (event) => {
        layer.destroyChildren();
        layer.batchDraw();
        
        drawPie()
    });
});
