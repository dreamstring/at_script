// 2025/3/24 19:30:48
(function() {
    (function() {
        if (Atarabi.isDynamicLink()) {
            return;
        }
        Atarabi.keyboard.hook({
            code: "]"
        }, function(ctx) {
            var comp = Atarabi.comp.getMostRecentlyUsedComp();
            if (!comp) {
                return false;
            }
            var layers = comp.selectedLayers;
            if (!layers.length) {
                return false;
            }
            try {
                app.beginUndoGroup("]");
                for (var _i = 0, layers_1 = layers; _i < layers_1.length; _i++) {
                    var layer = layers_1[_i];
                    var delta = comp.time - layer.outPoint;
                    layer.startTime += delta;
                }
            } catch (e) {} finally {
                app.endUndoGroup();
            }
            return true;
        });
        Atarabi.keyboard.hook({
            code: "]",
            altKey: true
        }, function(ctx) {
            var comp = Atarabi.comp.getMostRecentlyUsedComp();
            if (!comp) {
                return false;
            }
            var layers = comp.selectedLayers;
            if (!layers.length) {
                return false;
            }
            try {
                app.beginUndoGroup("]");
                for (var _i = 0, layers_2 = layers; _i < layers_2.length; _i++) {
                    var layer = layers_2[_i];
                    layer.outPoint = comp.time;
                }
            } catch (e) {} finally {
                app.endUndoGroup();
            }
            return true;
        });
    })();
}).call(this);
