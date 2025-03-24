// 2025/3/24 19:30:48
(function() {
    (function() {
        if (Atarabi.isDynamicLink()) {
            return;
        }
        Atarabi.register.hookCommand(2767, function() {
            main();
        });
        function main() {
            var comp = app.project.activeItem;
            if (!(comp instanceof CompItem)) {
                return;
            }
            try {
                app.beginUndoGroup("New: Null");
                var _a = function() {
                    var layers = comp.selectedLayers.slice();
                    if (!layers.length) {
                        return [ null, false ];
                    }
                    layers.sort(function(lhs, rhs) {
                        return lhs.index - rhs.index;
                    });
                    return [ layers[0], layers.length === 1 ];
                }(), topLayer = _a[0], single = _a[1];
                var nullLayer = addNull(comp);
                if (topLayer) {
                    nullLayer.moveBefore(topLayer);
                    if (single) {
                        nullLayer.startTime = topLayer.inPoint;
                        nullLayer.outPoint = topLayer.outPoint;
                    }
                }
            } catch (e) {
                alert(e);
            } finally {
                app.endUndoGroup();
            }
        }
        var SCRIPT_NAME = "@hook_null";
        function addNull(comp) {
            var layerName = function(name) {
                var layerNames = {};
                for (var i = 1; i <= comp.numLayers; i++) {
                    layerNames[comp.layer(i).name] = true;
                }
                for (var j = 1; ;j++) {
                    var newName = "".concat(name, " ").concat(j);
                    if (!layerNames[newName]) {
                        return newName;
                    }
                }
            }("Null");
            var nullLayer = function() {
                var proj = app.project;
                var solidName = "Null";
                for (var i = 1, l = proj.numItems; i <= l; i++) {
                    var item = proj.item(i);
                    if (item instanceof FootageItem && item.mainSource instanceof SolidSource && item.name === solidName && item.width === 100 && item.height === 100) {
                        return comp.layers.add(item);
                    }
                }
                return comp.layers.addSolid([ 1, 1, 1 ], solidName, 100, 100, 1);
            }();
            nullLayer.name = layerName;
            nullLayer.transform.opacity.setValue(0);
            {
                nullLayer.transform.anchorPoint.setValue([ 0, 0 ]);
            }
            Atarabi.layer.setNull(nullLayer, true);
            return nullLayer;
        }
        if (Atarabi.API) {
            Atarabi.API.add(SCRIPT_NAME, "addNull", addNull);
        }
    })();
}).call(this);
