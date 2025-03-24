// 2025/3/24 19:30:48
(function() {
    (function() {
        if (Atarabi.isDynamicLink()) {
            return;
        }
        Atarabi.register.hookCommand(2279, function() {
            main();
        });
        function main() {
            var comp = app.project.activeItem;
            if (!(comp instanceof CompItem)) {
                return;
            }
            var _a = function() {
                var layers = comp.selectedLayers;
                if (!layers.length) {
                    return [ false, null, 0, comp.duration ];
                }
                var topLayer = null;
                var index = -1;
                var inPoint = Number.MAX_VALUE;
                var outPoint = -Number.MAX_VALUE;
                for (var _i = 0, layers_1 = layers; _i < layers_1.length; _i++) {
                    var layer = layers_1[_i];
                    if (!topLayer) {
                        index = layer.index;
                        topLayer = layer;
                    } else {
                        if (layer.index < index) {
                            index = layer.index;
                            topLayer = layer;
                        }
                    }
                    inPoint = Math.min(inPoint, layer.inPoint);
                    outPoint = Math.max(outPoint, layer.outPoint);
                }
                return [ true, topLayer, inPoint, outPoint ];
            }(), isSelected = _a[0], topLayer = _a[1], startTime = _a[2], outPoint = _a[3];
            try {
                app.beginUndoGroup("New: Adjustment Layer");
                var solidWidth_1 = comp.width;
                var solidHeight_1 = comp.height;
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
                }("Adjustment Layer");
                var solidLayer = function() {
                    var proj = app.project;
                    var solidName = "Solid (".concat(solidWidth_1, "x").concat(solidHeight_1, ")");
                    for (var i = 1, l = proj.numItems; i <= l; i++) {
                        var item = proj.item(i);
                        if (item instanceof FootageItem && item.mainSource instanceof SolidSource && item.name.indexOf(solidName) === 0 && item.width === solidWidth_1 && item.height === solidHeight_1 && item.mainSource.color[0] === 1 && item.mainSource.color[1] === 1 && item.mainSource.color[2] === 1) {
                            return comp.layers.add(item);
                        }
                    }
                    return comp.layers.addSolid([ 1, 1, 1 ], solidName, solidWidth_1, solidHeight_1, 1);
                }();
                solidLayer.name = layerName;
                if (parseFloat(app.version) >= 12) {
                    var preferences = app.preferences;
                    var section = "Label Preference Indices Section 5";
                    var key = "Adjustment Label Index 2";
                    var type = PREFType.PREF_Type_MACHINE_INDEPENDENT;
                    if (preferences.havePref(section, key, type)) {
                        var label = preferences.getPrefAsLong(section, key, type);
                        solidLayer.label = label;
                    }
                }
                solidLayer.adjustmentLayer = true;
                if (isSelected) {
                    solidLayer.startTime = startTime;
                    solidLayer.outPoint = outPoint;
                    solidLayer.moveBefore(topLayer);
                }
            } catch (e) {
                alert(e);
            } finally {
                app.endUndoGroup();
            }
        }
    })();
}).call(this);
