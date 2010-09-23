sys.time = new ModuleProto();
sys.time.now = function () {
    return Math.round(new Date().getTime() / 1000);
};
