var util = {},

    SPLITER = /[\/]+/,
    IS_URL = /^(?:[a-z]+:)?\/\//i,
    NORMALIZE_URL = /(^(?:[a-z]+:)?\/\/)(.*)/i,

    toString = Object.prototype.toString;


util.isString = function(obj) {
    return toString.call(obj) === "[object String]";
};

util.dirname = function(path) {
    path = path.substring(0, path.lastIndexOf("/") + 1);
    return path ? path.substr(0, path.length - 1) : ".";
};

util.extname = function(path) {
    var index = path.lastIndexOf(".");
    return index > -1 ? path.substring(index) : "";
};

util.normalize = function(path) {
    var paths = NORMALIZE_URL.exec(path),
        isUrl = paths ? !!paths[1] : false,
        isAbs = isUrl || path.charAt(0) === "/",
        trailingSlash = path[path.length - 1] === "/",
        segments = isUrl ? paths[2].split(SPLITER) : path.split(SPLITER),
        nonEmptySegments = [],
        i;

    for (i = 0; i < segments.length; i++) {
        if (segments[i]) nonEmptySegments.push(segments[i]);
    }
    path = util.normalizeArray(nonEmptySegments, !isAbs).join("/");

    if (!path && !isAbs) path = ".";
    if (path && trailingSlash) path += "/";

    return (isAbs ? (isUrl ? paths[1] : "/") : "") + path;
};

util.normalizeArray = function(parts, allowAboveRoot) {
    var i = parts.length,
        up = 0,
        last;

    while (i--) {
        last = parts[i];

        if (last === ".") {
            parts.splice(i, 1);
        } else if (last === "..") {
            parts.splice(i, 1);
            up++;
        } else if (up) {
            parts.splice(i, 1);
            up--;
        }
    }

    if (allowAboveRoot) {
        while (up--) parts.unshift("..");
    }

    return parts;
};

util.join = function() {
    var path = "",
        segment,
        i, il;

    for (i = 0, il = arguments.length; i < il; i++) {
        segment = arguments[i];

        if (!util.isString(segment)) {
            throw new TypeError("Arguments to join must be strings");
        }
        if (segment) {
            if (!path) {
                path += segment;
            } else {
                path += "/" + segment;
            }
        }
    }

    return util.normalize(path);
};

util.isURL = function(str) {
    return IS_URL.test(str);
};


module.exports = util;
