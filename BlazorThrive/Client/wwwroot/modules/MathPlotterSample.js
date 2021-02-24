//
export async function Sample(args) {

    _toText(args);
    _log('import:' + __SITE + '/modules/MathPlotter.js' + '?v=' + args['appendVersion'])

    let { MathPlotter } = await import(__SITE + '/modules/MathPlotter.js' + '?v=' + args['AppendVersion']);

    var config = {
        canvasId: 'placeholder',
        minX: -10,
        minY: -10,
        maxX: 10,
        maxY: 10,
        unitsPerTick: 1,
        plotInfoId: 'plot-info',
        skin: args['skinNumber'],
    };

    var plot = new MathPlotter(config);

    plot.DrawEquation(fn__1, 'rgba(120,200,40,0.5)', 2);
    plot.DrawEquation(fn__2, 'rgb(180, 100, 20)', 2);
    plot.DrawEquation(fn__3, 'rgba(80, 100, 20, 0.5)', 2);

    function fn__1(x) { return 5 * Math.cos(x); }
    function fn__2(x) { return 5 * Math.sin(x); }
    function fn__3(x) { return x * x; }

    const plotInfo = document.getElementById('plot-info');
    const result = document.getElementById('result');
    const legend = 'f({0}) = {1}\ng({0}) = {2}\nh({0}) = {3}\n\n(x, y) = ({0}, {4})';
    var floatPoint = {};

    plotInfo.addEventListener('change', function () {
        floatPoint = JSON.parse(plotInfo.value);
        result.textContent = legend.format(
            floatPoint.x.toFixed(2),
            fn__1(floatPoint.x).toFixed(6),
            fn__2(floatPoint.x).toFixed(6),
            fn__3(floatPoint.x).toFixed(6),
            floatPoint.y.toFixed(2));
    });
    result.textContent = legend.format(0, 0, 0, 0, 0);
}