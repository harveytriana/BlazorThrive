/**
 * TracksPlotterTools 
 * 
 */
export var Skin = [
    {// 0: light
        Background: 'rgb(255,255,255)',
        Grid: 'rgb(216,216,216)',
        Ticks: 'rgb(182,182,182)',
        BackTitle: 'rgb(245,245,245)',
        Text: 'rgb(60,60,60)',
        Title: 'rgb(30,30,30)',
        Border: 'rgb(180,180,180)',
        Status: 'rgb(30,30,30)',
        Point: 'rgba(120,120,120,0.7)',
        IndexLine: 'rgb(220,220,220)',
        ScaleLebels: 'rgba(80,80,80,0.9)',
        MainTitle:'rgb(15,15,15)',
        Cursor: {// util: https:onlinepngtools.com/convert-png-to-base64 
            XY:
                'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAfUlEQVRYR+2Vyw0AIQhEtSWaoCYqoCaaoCU' +
                '3XDaGixrjYdfxym/yJhlr2Xhm1pi5bqwoW8MQAAIgAAL3ESCiNopdd19K16XmENAfyBbk+khs1CGgBsYZVN' +
                'EjIkVV3/b4ivv5XJ/ZCwu+R2Dk69EcyMfvi2IQAAEQAIFfEngA0qO5S+XiD+sAAAAASUVORK5CYII=',
            Document:
                'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAhUlEQVQ4T62TMQ4AIQgEpfVZfoz4J2ueZes' +
                'FEy+aQ5biLEXHYYlUShkJrNZayjmTdYwUICJmUS9oPQRg5o9JrXU+EALcuggDfjXovY8VGsroDdEz8EI2p7' +
                'AboBGHDCzIsoIGVgb73gTcNPUVCNB+LYA3hcMAhQQNIgA3RARA9esvRBdX/QEALowR+wEsGAAAAABJRU5Er' +
                'kJggg==',
            Index:
                'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAXklEQVRYR+2U0QoAIAgD88vFLy96j5ZFRHC' +
                '9Ltm8gVYeP3vsXwgAAQhA4C8C7l7V5YyI1FKpzz3AzEDpo/AEsJVeVe8nOhX8R0D1ffUOKPMdPVXBjoGaIQ' +
                'AEIAABCDROLjqdFg5uhgAAAABJRU5ErkJggg=='
        }
    },
    {// 1: dark
        Background: 'rgb(30,30,30)',
        Grid: 'rgb(42,42,42)',
        Ticks: 'rgb(62,62,62)',
        BackTitle: 'rgb(50,50,50)',
        Title: 'rgb(150,150,150)',
        Text: 'rgb(150,150,150)',
        Border: 'rgb(76,76,76)',
        Status: 'rgb(220,220,220)',
        Point: 'rgba(150,150,150,0.8)',
        IndexLine: 'rgb(59,59,59)',
        ScaleLebels: 'rgba(120,120,120,0.9)',
        MainTitle: 'rgb(182,182,182)',
        Cursor: {
            XY:
                'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAfUlEQVRYR+2UMQ4AIQgE4TfUPocH8hxrfuO' +
                'Fxlxo1BiLO9fOsMBmSJZp46lqMzPeGEFbzTAAAiAAAvcRKKW0UezWWpfSdUkcBt4L8glyfWQ26jDAgXEGVW' +
                'jcnUSky82MVLX/c31mLk7wPQKjux7Ngbz8vigGARAAARD4JYEHiZa3LgElgCwAAAAASUVORK5CYII=',
            Document:
                'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAYElEQVQ4T2OMior6z0AALFu2jBGXEkaQAfg' +
                'UEJKHG1BfX4/hksbGRoIWEFQw6gJCEczAQFQsYDMGFvVkxQJyzIANwOVQkC3YohHFAEK+HBwG4A1EQl4gJI' +
                '8zmxLSCJMHANZ2fBGi8Y57AAAAAElFTkSuQmCC',
            Index:
                'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAeklEQVRYR+2UQQrAIBAD19/s2efkgfscz/6' +
                'mxUM9lGJQKCLEm0RJnMgm27zSZn9TABEQARE4i0DO+WKTs5Qy9aipwy3AyIDpX+EVIAGgvT7oaq3m7p1kRB' +
                'iAvn/r7L80XRWcR4D1+uscYOYr+lQFKwbsjgKIgAiIgAjcExZDLo2PmAEAAAAASUVORK5CYII=',
        }
    },
];

export function SetCursor(base64) {
    return 'url(data:image/png;base64,{0}) 15 15, auto'.format(base64);
}

export function LogarithmicSerie(x1, x2, elementWidth) {
    let logStart = Math.log10(x1);
    let logStop = Math.log10(x2);
    let f2p = elementWidth / (logStop - logStart);
    //
    let builder = buildLogSerie(x1, x2);
    let logSerie = builder.logSerie;
    let logSerieCount = builder.logSerieCount;
    let cycles = builder.cycles;
    let serie = [];
    let v = 0.0;

    for (let i = 0; i < logSerieCount; i++) {
        v = logSerie[i];
        serie.push({
            value: v,
            pixel: getPixel(v),
            isCycle: isCycle(v) || closely(v, x1) || closely(v, x2),
            toE: function (x) {
                if (x < 0.001 || x > 1000) {
                    return x.toExponential(0).toUpperCase();
                }
                return x.toString();
            }
        });
    }
    return {
        logStart: logStart,
        logStop: logStop,
        cycles: cycles,
        f2p: f2p,
        serie: serie,
        toPixel: function (x) {
            if (x <= 0) {// unexpected
                return 0.0;
            }
            return this.f2p * (Math.log10(x) - this.logStart);
        },
        fromPixel: function (p) {
            let e = p / this.f2p + this.logStart;
            return Math.pow(10, e);
        }
    };

    function getPixel(value) {
        if (value <= 0) {// unexpected
            return 0.0;
        }
        return f2p * (Math.log10(value) - logStart);
    }

    function isCycle(x) {
        if (x === 0) {
            return false;
        }
        return Math.pow(10, Math.floor(Math.log10(x))) === x;
    }

    function closely(a, builder) {
        return Math.abs(a - builder) < 0.000000001;
    }

    function buildLogSerie(x1, x2) {
        x1 = Number(x1);
        x2 = Number(x2);

        let t;
        let low;
        let iv = x2 < x1;
        let cycles = getCycles(x1, x2);
        let a = [10 * cycles];
        let n = 0;
        if (iv) {// swap
            t = x1;
            x1 = x2;
            x2 = t;
        }
        let x = x1;
        while (x <= x2) {
            a[n++] = x;
            low = lowerCycle(x);
            x = EvenRound(x + low, Math.floor(Math.abs(Math.log10(low))));
        }
        if (iv) {// invert array
            for (let i = 0; i < n / 2; i++) {
                t = a[i];
                a[i] = a[n - i - 1];
                a[n - i - 1] = t;
            }
        }
        return {
            cycles: cycles,
            logSerie: a,
            logSerieCount: n
        };

        function lowerCycle(x) {
            let t = Math.floor(Math.log10(x));
            let r = x >= 1 ? Math.pow(10, t) : 1 / Math.pow(10, Math.abs(t));
            return r;
        }

        function upperCycle(x) {
            let t = Math.ceil(Math.log10(x));
            let r = x >= 1 ? Math.pow(10, t) : 1 / Math.pow(10, Math.abs(t));
            return r;
        }

        function getCycles(x1, x2) {
            if (x1 < x2) {
                return Math.abs(Math.log10(upperCycle(x2)) - Math.log10(lowerCycle(x1)));
            } else {
                return Math.abs(Math.log10(upperCycle(x1)) - Math.log10(lowerCycle(x2)));
            }
        }
    }
}

export function BezierCurveY(ctx, color, lineWidth, serie, f = 0.3, t = 0.6) {
    // f = 0, will be straight line
    // t suppose to be 1, but changing the value can control the smoothness too
    let s = serie;

    ctx.beginPath();
    ctx.imageSmoothingQuality = "high";
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.moveTo(s[0][1], s[0][0]);

    let m = 0;
    let dx1 = 0;
    let dy1 = 0;
    let pre = s[0];
    let cur;
    let nex;
    let dx2;
    let dy2;
    let a = new Array(5);

    for (let i = 1; i < s.length; i++) {
        cur = s[i];
        nex = s[i + 1];
        if (nex) {
            m = slope(pre, nex);
            dx2 = (nex[0] - cur[0]) * -f;
            dy2 = dx2 * m * t;
        } else {
            dx2 = 0;
            dy2 = 0;
        }
        a[0] = pre[0] - dx1;
        a[1] = pre[1] - dy1;
        a[2] = cur[0] + dx2;
        a[3] = cur[1] + dy2;
        a[4] = cur[0];
        a[5] = cur[1];
        ctx.bezierCurveTo(a[1], a[0], a[3], a[2], a[5], a[4]);
        dx1 = dx2;
        dy1 = dy2;
        pre = cur;
    }
    ctx.stroke();

    function slope(a, b) {
        return (b[1] - a[1]) / (b[0] - a[0]);
    }
}

export function QuadraticCurveY(ctx, color, lineWidth, serie) {
    let s = serie;
    let xc, yc, i;
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    // looks like predictive curve!
    ctx.moveTo(s[0][1], s[0][0]);
    for (i = 1; i < s.length - 2; i++) {
        xc = (s[i][1] + s[i + 1][1]) / 2;
        yc = (s[i][0] + s[i + 1][0]) / 2;
        ctx.quadraticCurveTo(s[i][1], s[i][0], xc, yc);
    }
    // curve through the last two points
    ctx.quadraticCurveTo(s[i][1], s[i][0], s[i + 1][1], s[i + 1][0]);
    ctx.stroke();
}

export function DrawPoints(ctx, serie, color, radious) {
    let s = serie;
    let x, y, i;
    ctx.lineWidth = 1;
    for (i = 0; i < s.length; i++) {
        ctx.beginPath();
        x = s[i][1]; // yAxis
        y = s[i][0]; // xAxis
        ctx.arc(x, y, radious, 0, Math.PI * 2);
        ctx.strokeStyle = color;
        ctx.stroke();
    }
}

export function EvenRound(num, decimalPlaces) {
    let d = decimalPlaces || 0;
    let m = Math.pow(10, d);
    let n = +(d ? num * m : num).toFixed(8); // Avoid rounding errors
    let i = Math.floor(n),
        f = n - i;
    let e = 1e-8; // Allow for rounding errors in f
    let r = (f > 0.5 - e && f < 0.5 + e) ?
        ((i % 2 == 0) ? i : i + 1) : Math.round(n);
    return d ? r / m : r;
}

export function CenterText(element, text, color, font) {
    let canvas = document.getElementById(element);
    let g = canvas.getContext("2d");
    g.fillStyle = color;
    g.font = font;
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillText(text, g.canvas.width / 2, g.canvas.height / 2);
};

export function CenterRotatedText(element, text, color, font) {
    let canvas = document.getElementById(element);
    let g = canvas.getContext("2d");
    g.save();
    g.fillStyle = color;
    g.font = font;
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.translate(g.canvas.clientWidth / 2, g.canvas.clientHeight / 2);
    g.rotate(-0.5 * Math.PI);
    g.fillText(text, 0, 0);
    g.restore();
};

export function ColorToHex(color) {
    if (color.startsWith('#')) {
        return color;
    }
    if (color.startsWith('rgb') == false) {
        return GetHexColorFromName(color);
    }
    let a = color
        .toLowerCase()
        .replace('rgb', '')
        .replace('rgba', '')
        .replace('(', '')
        .replace(')', '')
        .split(',');
    let r = parseInt(a[0]);
    let g = parseInt(a[1]);
    let b = parseInt(a[2]);
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// i.g. getHexColor('red') then returns #ff0000
export function GetHexColorFromName(name) {
    let a = document.createElement('div');
    a.style.color = name;
    let colors = window.getComputedStyle(document.body.appendChild(a)).color.match(/\d+/g).map(function (a) {
        return parseInt(a, 10);
    });
    document.body.removeChild(a);
    return (colors.length >= 3) ? '#' + (((1 << 24) + (colors[0] << 16) + (colors[1] << 8) + colors[2]).toString(16).substr(1)) : false;
}

// Lighten or Darken a color. Supports hex, name, rgb, rgba. amount -200 (dark) to ~200 (light)
export function DerivateColor(color, amount) {
    let c = ColorToHex(color);
    return '#' + c
        .replace(/^#/, '')
        .replace(/../g, c => ('0' + Math.min(255, Math.max(0, parseInt(c, 16) + amount)).toString(16)).substr(-2));
}