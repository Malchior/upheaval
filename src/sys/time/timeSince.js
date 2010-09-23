sys.time.timeSince = function (date) { // TODO: Make this nicer!
    var chunks = [
            [31536000, 'year'],
            [2592000, 'month'],
            [604800, 'week'],
            [86400, 'day'],
            [3600, 'hour'],
            [60, 'minute']
        ],
        since = sys.time.now() - date;
    for (var i = 0, j = chunks.length; i < j; i += 1) {
        var seconds = chunks[i][0],
        name = chunks[i][1],
        count = Math.floor(since / seconds);
        if (!!count) { break; }
    }
    return (count == 1) ?
        ['1 ', name, ','].join('') :
        [count, ' ', name, "s"].join('');
};
