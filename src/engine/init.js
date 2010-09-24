var engine = new ModuleProto();
engine.do_it = function (x) {
    sys.builder.build({
        'tag': 'div',
        'attrs':{'class': 'row'}
    }, function (row) {
        sys.builder.factory([{
            'tag': 'div',
            'attrs': {'class': 'tile'}
        }], x, function (el) {
            $(el).appendTo(row);
            $(row).appendTo('#playSurface');
        });
    });
};
