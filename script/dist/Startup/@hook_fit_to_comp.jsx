// 2025/3/24 19:30:48
(function() {
    (function() {
        if (Atarabi.isDynamicLink()) {
            return;
        }
        Atarabi.register.hookCommand(2156, function() {
            main();
        });
        function isAVLayer(layer) {
            return layer instanceof AVLayer || layer instanceof ShapeLayer || layer instanceof TextLayer;
        }
        function selectLayers(layers, selected) {
            for (var _i = 0, layers_1 = layers; _i < layers_1.length; _i++) {
                var layer = layers_1[_i];
                layer.selected = selected;
            }
        }
        function main() {
            var comp = app.project.activeItem;
            if (!(comp instanceof CompItem)) {
                return;
            }
            var layers = comp.selectedLayers.slice();
            selectLayers(layers, false);
            var done = false;
            try {
                for (var _i = 0, layers_2 = layers; _i < layers_2.length; _i++) {
                    var layer = layers_2[_i];
                    if (isAVLayer(layer)) {
                        if (!done) {
                            done = true;
                            app.beginUndoGroup("Fit to Comp");
                        }
                        layer.selected = true;
                        var rect = layer.sourceRectAtTime(comp.time, true);
                        if (rect.width / comp.width > rect.height / comp.height) {
                            app.executeCommand(2732);
                        } else {
                            app.executeCommand(2733);
                        }
                        layer.selected = false;
                    }
                }
            } catch (e) {
                alert(e);
            } finally {
                selectLayers(layers, true);
                if (done) {
                    app.endUndoGroup();
                }
            }
        }
    })();
}).call(this);
