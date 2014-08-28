/*global ig*/
ig.module(
    'scene.shared.inventory'
).requires(
    'impact.impact',
    'impact.entity',
    'impact.system',
    'system.atlas',
    'scene.battle.atlas',
    'scene.shared.font.berenika-bold-24'
).defines(function () {
    'use strict';
    // Inventory class definition
    ig.InventoryManager = ig.Class.extend({
        inventoryMinions: {},
        inventoryBosses: {},
        inventoryLairs: {},
        inventoryAtlas: new ig.Atlas(new ig.Image('battle/sprites'), new ig.BattleAtlas().sprites),
        alias: function (name) {
            Object.defineProperty(ig, name, {
                value: this
            });
        },
        init: function (selectedFaction) {
            if (!ig.inventory) {
                this.alias('inventory');
            }
            this.faction = selectedFaction;
            this.initInventory(this.faction);
        },
        initInventory: function (selectedFaction) {
            //var faction = ig.player.faction.prototype,
            //var faction = selectedFaction.prototype,
            var faction = selectedFaction,
                i = faction.unitStock.length - 1;
            for (i; i >= 0; i = i - 1) {
                this.addToUnitsInventory(faction.unitStock[i].type, faction.unitStock[i].availableUnits);
            }
            this.persistInitialInventory(this.inventoryUnits);
            i = faction.resourceStock.length - 1;
            for (i; i >= 0; i = i - 1) {
                this.addToResourceInventory(faction.resourceStock[i].type, faction.resourceStock[i].availableUnits);
            }
            this.persistInitialInventory(this.inventoryResources);
            i = faction.componentStock.length - 1;
            for (i; i >= 0; i = i - 1) {
                this.addToComponentsInventory(faction.componentStock[i].type, faction.componentStock[i].availableUnits);
            }
        },
        persistInitialInventory: function (resourceType) {
            var resource = resourceType,
                item;
            for (item in resource) {
                if (resource.hasOwnProperty(item)) {
                    this.modifyStock(item, resource[item].stock);
                }
            }

        },
        addToResourceInventory: function (resourceId, resourceStock) {
            var invItem = {};
            invItem.stock = resourceStock;
            this.inventoryResources[resourceId + this.faction.name] = invItem;
        },
        addToUnitsInventory: function (invItemEntityDef, unitStock) {
            // Create inventory item's definition
            var invItem = {},
                def = invItemEntityDef;
            invItem.id = def.prototype.inventoryId;
            invItem.images = {
                ready: new ig.AtlasImage(this.inventoryAtlas, def.prototype.inventoryReady),
                selected: new ig.AtlasImage(this.inventoryAtlas, def.prototype.inventorySelected),
                onMouseOver: new ig.AtlasImage(this.inventoryAtlas, def.prototype.inventoryOnMouseOver),
                deactivated: new ig.AtlasImage(this.inventoryAtlas, def.prototype.inventoryDeactivated)
            };
            invItem.entityDef = def;
            invItem.stock = unitStock;
            invItem.productionTimer = def.prototype.productionTimer;
            // Register inventory item's definition
            this.inventoryUnits[invItem.id + this.faction.name] = invItem;
        },
        addToComponentsInventory: function (componentId, componentStock) {
            var invItem = {};
            invItem.stock = componentStock;
            this.inventoryComponents[componentId + this.faction.name] = invItem;
        },
        modifyStock: function (id, stock) {
            ig.persistence.set(id, stock);
        },
        getStock: function (id, faction) {
            return ig.persistence.get(id + faction.name);
        },
        increaseStock: function (id, faction, increment) {
            var currentStock = this.getStock(id, faction),
                newStock = currentStock + increment;

            this.stock = newStock;
            this.modifyStock(id + faction.name, newStock);
        },
        decreaseStock: function (id, faction, decrement) {
            var currentStock = this.getStock(id, faction),
                newStock = currentStock - decrement;
            this.stock = newStock;
            this.modifyStock(id + faction.name, newStock);
        }
    });
});