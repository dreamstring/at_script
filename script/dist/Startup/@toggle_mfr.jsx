// 2025/3/24 19:30:48
(function() {
    (function() {
        if (Atarabi.isDynamicLink()) {
            return;
        }
        var MFR_SECTION = "Concurrent Frame Rendering";
        var MFR_KEY = "Enable Concurrent Frame Renders";
        Atarabi.keyboard.hook({
            code: "M",
            altKey: true
        }, function(ctx) {
            var now = app.preferences.getPrefAsBool(MFR_SECTION, MFR_KEY);
            app.preferences.savePrefAsBool(MFR_SECTION, MFR_KEY, !now);
            writeLn("MFR: ".concat(!now));
            return true;
        });
        var CACHE_SECTION = "Speculative Preview Preference Section";
        var CACHE_KEY = "Cache Frames When Idle";
        Atarabi.keyboard.hook({
            code: "M",
            altKey: true,
            ctrlKey: true
        }, function(ctx) {
            var now = app.preferences.getPrefAsBool(CACHE_SECTION, CACHE_KEY, PREFType.PREF_Type_MACHINE_INDEPENDENT);
            app.preferences.savePrefAsBool(CACHE_SECTION, CACHE_KEY, !now, PREFType.PREF_Type_MACHINE_INDEPENDENT);
            writeLn("Cache Frames When Idle: ".concat(!now));
            return true;
        });
    })();
}).call(this);
