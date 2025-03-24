// 2025/3/24 19:30:48
(function() {
    (function() {
        if (Atarabi.isDynamicLink()) {
            return;
        }
        Atarabi.register.insertCommand("Layer", "AtTop", "Set Null", function() {
            var comp = app.project.activeItem;
            if (!(comp instanceof CompItem)) {
                return;
            }
            try {
                app.beginUndoGroup("Set Null");
                for (var _i = 0, _a = comp.selectedLayers; _i < _a.length; _i++) {
                    var layer = _a[_i];
                    if (layer instanceof ShapeLayer || layer instanceof TextLayer || layer instanceof AVLayer) {
                        Atarabi.layer.setNull(layer, true);
                    }
                }
            } catch (e) {} finally {
                app.endUndoGroup();
            }
        }, "LayerSelected");
    })();
}).call(this);
