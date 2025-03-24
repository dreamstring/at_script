// 2025/3/24 19:30:48
(function() {
    (function() {
        if (Atarabi.isDynamicLink()) {
            return;
        }
        Atarabi.keyboard.hook({
            code: "S",
            altKey: true
        }, function(ctx) {
            var comp = Atarabi.comp.getMostRecentlyUsedComp();
            if (comp) {
                var file = new File("".concat(Folder.desktop.absoluteURI, "/").concat(comp.name.replace(/\//g, "-"), "_").concat(Date.now(), ".png"));
                Atarabi.comp.saveFrameToPng(comp, file);
            }
            return true;
        });
    })();
}).call(this);
