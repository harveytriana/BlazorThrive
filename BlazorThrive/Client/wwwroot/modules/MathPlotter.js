/*
VISIONARY SAS
By: Luis Harvey Triana Vega
*/
'use strict';
import {
    Skin,
    SetCursor
} from './PlotterTools.js?v=1.2'

var _skin;

// Define class
export function MathPlotter(config) {
    // from module
    _skin = Skin[config.skin];

    // user defined properties
    this.canvas = document.getElementById(config.canvasId);
    this.minX = config.minX;
    this.minY = config.minY;
    this.maxX = config.maxX;
    this.maxY = config.maxY;
    this.unitsPerTick = config.unitsPerTick;
    // math relations
    this.context = this.canvas.getContext('2d');
    this.rangeX = this.maxX - this.minX;
    this.rangeY = this.maxY - this.minY;
    this.scaleX = this.canvas.width / this.rangeX;
    this.scaleY = this.canvas.height / this.rangeY;
    this.centerY = Math.round(Math.abs(this.minY / this.rangeY) * this.canvas.height);
    this.centerX = Math.round(Math.abs(this.minX / this.rangeX) * this.canvas.width);
    this.iteration = this.rangeX / 1000;
    this.canvas.style.cursor = SetCursor(_skin.Cursor.XY);
    this.DrawGrid();
    //
    if (config.plotInfoId) {
        var element = document.getElementById(config.plotInfoId);
        if (element) {
            var canvas = this.canvas,
                x1 = this.minX,
                y1 = this.minY,
                mx = this.rangeX / canvas.width,
                my = this.rangeY / canvas.height,
                floatPoint = {};

            var eventChange = new Event('change');

            canvas.addEventListener('mousemove', function (e) {
                var rect = canvas.getBoundingClientRect();
                var x = e.clientX - rect.left;
                var y = e.clientY - rect.top;
                if (x < 0) x = 0;
                if (y < 0) y = 0;
                if (x > canvas.clientWidth) x = canvas.clientWidth;
                if (y > canvas.clientHeight) y = canvas.clientHeight;
                // float values
                floatPoint = {
                    x: (mx * x + x1),
                    y: -(my * y + y1) // because y is inverted 
                }
                // for alpha, hex is not the curve color
                // var hex = S_rgba(ctx.getImageData(x, y, 1, 1).data);
                // display

                element.value = JSON.stringify(floatPoint);
                element.dispatchEvent(eventChange);
                // Use: Subscribe event, for example: $plotInfo.change(function () {...}

            }, false);
        }
    }
}

MathPlotter.prototype.DrawGrid = function () {
    var g = this.context;
    g.translate(0.5, 0.5);
    g.beginPath();
    g.fillStyle = _skin.Background;
    g.fillRect(0, 0, g.canvas.width, g.canvas.height);
    g.strokeStyle = _skin.Grid;
    // verticals
    var x = this.minX, posX;
    while (x < this.maxX) {
        x += this.unitsPerTick;
        posX = this.scaleX * (x - this.minX);
        g.moveTo(posX, 0);
        g.lineTo(posX, g.canvas.height);
    }
    // horizontals
    var y = this.minY, posY;
    while (y < this.maxY) {
        y += this.unitsPerTick;
        posY = this.scaleY * (y - this.minY);
        g.moveTo(0, posY);
        g.lineTo(g.canvas.width, posY);
    }
    g.stroke();

    g.beginPath();
    g.lineWidth = 1;
    g.strokeStyle = _skin.Ticks;
    // vertical
    g.moveTo(this.centerX, 0);
    g.lineTo(this.centerX, g.canvas.height + 0);
    g.stroke();
    // horizontal
    g.moveTo(0, this.centerY);
    g.lineTo(g.canvas.width, this.centerY);
    // outline frame
    g.rect(0, 0, g.canvas.width - 1.0, g.canvas.height - 1.0);
    g.stroke();

    // labels
    g.beginPath();
    g.font = 'italic 14pt Times-New-Roman';
    g.fillStyle = _skin.Title;
    g.textAlign = "left";
    g.textBaseline = "top";
    g.fillText("f(x)", this.centerX + 8, 4);
    g.fillText("x", 4, this.centerY);
};

MathPlotter.prototype.DrawEquation = function (equation, color, thickness) {
    let g = this.context;
    let _ = this;
    g.save();
    // move context to center of canvas
    g.translate(_.centerX, _.centerY);
    /*
     * stretch grid to fit the canvas window, and
     * invert the y scale so that that increments
     * as you move upwards
     */
    g.scale(_.scaleX, -_.scaleY);
    g.beginPath();
    g.moveTo(_.minX, equation(_.minX));

    for (let x = _.minX + _.iteration; x <= _.maxX; x += _.iteration) {
        g.lineTo(x, equation(x));
    }
    g.restore();
    g.lineJoin = 'round';
    g.lineWidth = thickness;
    g.strokeStyle = color;
    g.stroke();
};
