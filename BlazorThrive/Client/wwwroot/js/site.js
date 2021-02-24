// ***** SHARED LIBRARY *****

// When publishing to IIS, for example, Default Site, there
// is conflict with relative paths.This approach solves it.
// .. for IDE
// const __SITE = location.port.length > 0 ? '..' : '/BlazorThrive';
// Smarter
const __SITE = '..';

_log("*_getSiteName: " + _getSiteName());

// Emulates C# s.Format(...)
// First, checks if it isn't implemented yet.
// sample: template.format('x','y');
if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] !== 'undefined'
                ? args[number]
                : match;
        });
    };
}

// browser support
Math.log10 = Math.log10 || function (x) {
    return Math.log(x) * Math.LOG10E;
}

function randomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}
// -------------------------------------
function _toText(object, name = 'JSON OBJECT', ident = true) {
    if (ident) {
        console.log('\n{0}:\n{1}'.format(name, JSON.stringify(object, null, 2)));
    } else {
        console.log('\n{0}:\n{1}'.format(name, JSON.stringify(object)));
    }
}
// shortcut for this...
function _log(message) {
    console.log('\n' + message);
}

//----- TIME -----
//
// usage
//=> 3..padLeft() => '03'
//=> 3..padLeft(100,'-') => '--3' 
Number.prototype.padLeft = function (base, chr) {
    var len = (String(base || 10).length - String(this).length) + 1;
    return len > 0 ? new Array(len).join(chr || '0') + this : this;
}

function _formatDateTime(d) {
    return _formatDate(d) + ' ' + _formatTime(d);
}

function _formatDate(d) {
    return [d.getFullYear(), (d.getMonth() + 1).padLeft(), d.getDate().padLeft()].join('-');
}

function _formatTime(d) {
    // HH:MM:SS GMT-0500 (hora estándar de Colombia)
    return d.toTimeString().split(' ')[0];
    // other option:
    // return [d.getHours().padLeft(), d.getMinutes().padLeft(), d.getSeconds().padLeft()].join(':');
}

function _getLocalTime() {
    var time = new Date();
    var result =
        ('0' + time.getHours()).slice(-2) + ':' +
        ('0' + time.getMinutes()).slice(-2) + ':' +
        ('0' + time.getSeconds()).slice(-2);
    return result;
}
//----- END TIME -----

function _newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function _getSiteName() {
    return window.location.href.replace(window.location.pathname, '');
}

