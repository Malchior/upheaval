var api = new ModuleProto();
api['version'] = {
    'api': '0.1pre',
    'engine': meta.version
};
api['timeSince'] = sys.time.timeSince;
