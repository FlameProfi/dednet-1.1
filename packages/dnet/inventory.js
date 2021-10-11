let Container = require('./modules/data');
let mysql = require('./modules/mysql');
let methods = require('./modules/methods');
let chat = require('./modules/chat');
let ctos = require('./modules/ctos');

let weather = require('./managers/weather');
let vSync = require('./managers/vSync');
let dispatcher = require('./managers/dispatcher');
let graffiti = require('./managers/graffiti');

let user = require('./user');
let enums = require('./enums');
let items = require('./items');
let weapons = require('./weapons');

let vehicles = require('./property/vehicles');
let fraction = require('./property/fraction');

let bank = require('./business/bank');

let inventory = exports;
let props = new Map();

inventory.loadAll = function() {

    mysql.executeQuery("DELETE FROM items WHERE owner_type = 0");
    mysql.executeQuery("DELETE FROM items WHERE owner_type = 9 AND owner_id = 2 AND timestamp_update < '" + (methods.getTimeStamp() - (60 * 60 * 24 * 7)) + "'");

    /*mysql.executeQuery(`SELECT * FROM items WHERE owner_type = 0 ORDER BY id DESC`, function (err, rows, fields) {
        rows.forEach(row => {

            let obj = mp.objects.new(items.getItemHashById(row['item_id']), new mp.Vector3(row['pos_x'], row['pos_y'], row['pos_z']),
            {
                rotation: new mp.Vector3(row['rot_x'], row['rot_x'], row['rot_x']),
                alpha: 255,
                dimension: 0
            });

            obj.setVariable('isDrop', row['id']);
            obj.setVariable('itemId', row['item_id']);
            props.set(row['id'].toString(), obj);
        });
    });*/
};

inventory.deleteWorldItems = function() {
    mysql.executeQuery("SELECT * FROM items WHERE owner_type = 0 AND timestamp_update < '" + (methods.getTimeStamp() - (60 * 60)) + "'", function (err, rows, fields) {
        rows.forEach(row => {
            inventory.deleteDropItem(row['id']);
        });
        mysql.executeQuery("DELETE FROM items WHERE owner_type = 0 AND timestamp_update < '" + (methods.getTimeStamp() - (60 * 60)) + "'");
    });
};

inventory.getItemList = function(player, ownerType, ownerId, isFrisk = false, justUpdate = false) {

    ownerId = methods.parseInt(ownerId);

    if (!user.isLogin(player))
        return;
    try {

        let data = [];
        //let data2 = new Map();

        let addWhere = '';
        /*if (isFrisk)
            addWhere = ' AND (item_id <> 50 AND item_id <> 27 AND item_id <> 28 AND item_id <> 29 AND item_id <> 30 AND item_id <> 265 AND item_id <> 266 AND item_id <> 267 AND item_id <> 268 AND item_id <> 269 AND item_id <> 270 AND item_id <> 271 AND item_id <> 272 AND item_id <> 273 AND item_id <> 274)';*/

        //SELECT * FROM items WHERE owner_id = '1' AND owner_type = '1' ORDER BY is_equip DESC, item_id DESC LIMIT 400
        let sql = `SELECT * FROM items WHERE owner_id = '${ownerId}' AND owner_type = '${ownerType}'${addWhere} ORDER BY is_equip DESC, item_id DESC`;
        if (ownerType === 1 && ownerId === user.getId(player))
            sql = `SELECT * FROM items WHERE owner_id = '${ownerId}' AND owner_type = '${ownerType}'${addWhere} ORDER BY is_equip DESC, item_id DESC LIMIT 400`;
        if (ownerId == 0 && ownerType == 0)
            sql = `SELECT * FROM items WHERE DISTANCE(POINT(pos_x, pos_y), POINT(${player.position.x}, ${player.position.y})) < 2 AND owner_type = 0 ORDER BY is_equip DESC, item_id DESC LIMIT 400`;

        mysql.executeQuery(sql, function (err, rows, fields) {
            rows.forEach(row => {

                let label = "";

                if (row['prefix'] > 0 && row['number'] > 0 && row['key_id'] <= 0) {
                    label = row['prefix'] + "-" + row['number'];
                } else if (row['key_id'] > 0) {

                    if (row['item_id'] >= 265 && row['item_id'] <= 268) {

                        if (row['prefix'] == 1)
                            label = enums.clothF[row['key_id']][9];
                        else
                            label = enums.clothM[row['key_id']][9];
                    }
                    else if (row['item_id'] >= 269 && row['item_id'] <= 273) {
                        if (row['prefix'] == 1)
                            label = enums.propF[row['key_id']][5];
                        else
                            label = enums.propM[row['key_id']][5];
                    }
                    else {
                        label = "#" + row['key_id'];
                    }
                }

                /*if (isTie && items.isWeapon(row['item_id']) && row['is_equip'])
                    return;*/

                data.push({id: row['id'], label: label, item_id: row['item_id'], count: row['count'], is_equip: row['is_equip'], params: row['params']});
            });
            //player.call('client:showToPlayerItemListMenu', [data.slice(0, 300), ownerType, ownerId.toString(), isFrisk]);

            for (let i = 0; i < methods.parseInt(data.length / 300) + 1; i++) {
                if (i === 0)
                    player.call('client:showToPlayerItemListMenu', [data.slice(i * 300, i * 300 + 299), ownerType, ownerId.toString(), isFrisk, justUpdate]);
                else
                    player.call('client:showToPlayerItemListAddMenu', [data.slice(i * 300, i * 300 + 299), ownerType, ownerId.toString(), isFrisk]);
            }
        });
    } catch(e) {
        methods.debug(e);
    }
};

inventory.getItemListSell = function(player) {

    setTimeout(function () {
        if (!user.isLogin(player))
            return;
        try {

            let data = [];
            //let data2 = new Map();

            let sql = `SELECT * FROM items WHERE owner_id = '${user.getId(player)}' AND owner_type = '1' AND is_equip = 0 ORDER BY item_id DESC LIMIT 400`;

            mysql.executeQuery(sql, function (err, rows, fields) {
                rows.forEach(row => {

                    let label = "";

                    if (row['prefix'] > 0 && row['number'] > 0 && row['key_id'] <= 0) {
                        label = row['prefix'] + "-" + row['number'];
                    } else if (row['key_id'] > 0) {

                        if (row['item_id'] >= 265 && row['item_id'] <= 268) {

                            if (row['prefix'] == 1)
                                label = enums.clothF[row['key_id']][9];
                            else
                                label = enums.clothM[row['key_id']][9];
                        }
                        else if (row['item_id'] >= 269 && row['item_id'] <= 273) {
                            if (row['prefix'] == 1)
                                label = enums.propF[row['key_id']][5];
                            else
                                label = enums.propM[row['key_id']][5];
                        }
                        else {
                            label = "#" + row['key_id'];
                        }
                    }

                    data.push({id: row['id'], label: label, item_id: row['item_id'], count: row['count'], is_equip: row['is_equip'], params: row['params']});
                });

                player.call('client:showSellItemsMenu', [data]);
            });
        } catch(e) {
            methods.debug(e);
        }
    }, 1000);
};

inventory.getItemListTrade = function(player, ownerId, ownerType) {

    setTimeout(function () {
        if (!user.isLogin(player))
            return;
        try {

            let data = [];
            //let data2 = new Map();

            let sql = `SELECT * FROM items WHERE owner_id = '${ownerId}' AND owner_type = '${ownerType}' AND price > 0 ORDER BY item_id DESC LIMIT 400`;

            mysql.executeQuery(sql, function (err, rows, fields) {
                rows.forEach(row => {

                    let label = "";

                    if (row['prefix'] > 0 && row['number'] > 0 && row['key_id'] <= 0) {
                        label = row['prefix'] + "-" + row['number'];
                    } else if (row['key_id'] > 0) {

                        if (row['item_id'] >= 265 && row['item_id'] <= 268) {

                            if (row['prefix'] == 1)
                                label = enums.clothF[row['key_id']][9];
                            else
                                label = enums.clothM[row['key_id']][9];
                        }
                        else if (row['item_id'] >= 269 && row['item_id'] <= 273) {
                            if (row['prefix'] == 1)
                                label = enums.propF[row['key_id']][5];
                            else
                                label = enums.propM[row['key_id']][5];
                        }
                        else {
                            label = "#" + row['key_id'];
                        }
                    }

                    data.push({id: row['id'], label: label, item_id: row['item_id'], count: row['count'], price: row['price'], params: row['params']});
                });
                
                if (data.length > 0)
                    player.call('client:showTradeMenu', [data, ownerId, ownerType]);
                else 
                    player.notify('~r~Siuo metu nera jokiu prekiu')
            });
        } catch(e) {
            methods.debug(e);
        }
    }, 10);
};

inventory.getItemListGunTranferSell = function(player) {
    setTimeout(function () {
        if (!user.isLogin(player))
            return;
        try {

            let data = [];
            //let data2 = new Map();

            let sql = `SELECT * FROM items WHERE owner_id = '${user.getId(player)}' AND owner_type = '1' AND is_equip = 0 AND (item_id > 69 AND item_id < 127 OR item_id = 146 OR item_id = 147)  ORDER BY item_id DESC LIMIT 400`;

            mysql.executeQuery(sql, function (err, rows, fields) {
                rows.forEach(row => {

                    let label = "";

                    if (row['prefix'] > 0 && row['number'] > 0 && row['key_id'] <= 0) {
                        label = row['prefix'] + "-" + row['number'];
                    } else if (row['key_id'] > 0) {

                        if (row['item_id'] >= 265 && row['item_id'] <= 268) {

                            if (row['prefix'] == 1)
                                label = enums.clothF[row['key_id']][9];
                            else
                                label = enums.clothM[row['key_id']][9];
                        }
                        else if (row['item_id'] >= 269 && row['item_id'] <= 273) {
                            if (row['prefix'] == 1)
                                label = enums.propF[row['key_id']][5];
                            else
                                label = enums.propM[row['key_id']][5];
                        }
                        else {
                            label = "#" + row['key_id'];
                        }
                    }

                    data.push({id: row['id'], label: label, item_id: row['item_id'], count: row['count'], is_equip: row['is_equip'], params: row['params']});
                });

                player.call('client:showSellGunMenu', [data]);
            });
        } catch(e) {
            methods.debug(e);
        }
    }, 1000);
};

inventory.getItemListGunFix = function(player) {
    setTimeout(function () {
        if (!user.isLogin(player))
            return;
        try {

            let data = [];
            //let data2 = new Map();

            let sql = `SELECT * FROM items WHERE owner_id = '${user.getId(player)}' AND owner_type = '1' AND is_equip = 0 AND (item_id > 69 AND item_id < 127 OR item_id = 146 OR item_id = 147 OR item_id = 252)  ORDER BY item_id DESC LIMIT 400`;

            mysql.executeQuery(sql, function (err, rows, fields) {
                rows.forEach(row => {

                    let label = "";

                    if (row['prefix'] > 0 && row['number'] > 0 && row['key_id'] <= 0) {
                        label = row['prefix'] + "-" + row['number'];
                    } else if (row['key_id'] > 0) {

                        if (row['item_id'] >= 265 && row['item_id'] <= 268) {

                            if (row['prefix'] == 1)
                                label = enums.clothF[row['key_id']][9];
                            else
                                label = enums.clothM[row['key_id']][9];
                        }
                        else if (row['item_id'] >= 269 && row['item_id'] <= 273) {
                            if (row['prefix'] == 1)
                                label = enums.propF[row['key_id']][5];
                            else
                                label = enums.propM[row['key_id']][5];
                        }
                        else {
                            label = "#" + row['key_id'];
                        }
                    }

                    data.push({id: row['id'], label: label, item_id: row['item_id'], count: row['count'], is_equip: row['is_equip'], params: row['params']});
                });

                player.call('client:showFixGunMenu', [data]);
            });
        } catch(e) {
            methods.debug(e);
        }
    }, 1000);
};

inventory.getItemListGunColor = function(player) {
    setTimeout(function () {
        if (!user.isLogin(player))
            return;
        try {

            let data = [];
            //let data2 = new Map();

            let sql = `SELECT * FROM items WHERE owner_id = '${user.getId(player)}' AND owner_type = '1' AND is_equip = 0 AND (item_id > 69 AND item_id < 127 OR item_id = 146 OR item_id = 147) ORDER BY item_id DESC LIMIT 400`;

            mysql.executeQuery(sql, function (err, rows, fields) {
                rows.forEach(row => {

                    let label = "";

                    if (row['prefix'] > 0 && row['number'] > 0 && row['key_id'] <= 0) {
                        label = row['prefix'] + "-" + row['number'];
                    } else if (row['key_id'] > 0) {

                        if (row['item_id'] >= 265 && row['item_id'] <= 268) {

                            if (row['prefix'] == 1)
                                label = enums.clothF[row['key_id']][9];
                            else
                                label = enums.clothM[row['key_id']][9];
                        }
                        else if (row['item_id'] >= 269 && row['item_id'] <= 273) {
                            if (row['prefix'] == 1)
                                label = enums.propF[row['key_id']][5];
                            else
                                label = enums.propM[row['key_id']][5];
                        }
                        else {
                            label = "#" + row['key_id'];
                        }
                    }

                    data.push({id: row['id'], label: label, item_id: row['item_id'], count: row['count'], is_equip: row['is_equip'], params: row['params']});
                });

                player.call('client:showColorGunMenu', [data]);
            });
        } catch(e) {
            methods.debug(e);
        }
    }, 1000);
};

inventory.getItemListGunFixFree = function(player) {
    setTimeout(function () {
        if (!user.isLogin(player))
            return;
        try {

            let data = [];
            //let data2 = new Map();

            let sql = `SELECT * FROM items WHERE owner_id = '${user.getId(player)}' AND owner_type = '1' AND is_equip = 0 AND (item_id > 69 AND item_id < 127 OR item_id = 146 OR item_id = 147 OR item_id = 252)  ORDER BY item_id DESC LIMIT 400`;

            mysql.executeQuery(sql, function (err, rows, fields) {
                rows.forEach(row => {

                    let label = "";

                    if (row['prefix'] > 0 && row['number'] > 0 && row['key_id'] <= 0) {
                        label = row['prefix'] + "-" + row['number'];
                    } else if (row['key_id'] > 0) {

                        if (row['item_id'] >= 265 && row['item_id'] <= 268) {

                            if (row['prefix'] == 1)
                                label = enums.clothF[row['key_id']][9];
                            else
                                label = enums.clothM[row['key_id']][9];
                        }
                        else if (row['item_id'] >= 269 && row['item_id'] <= 273) {
                            if (row['prefix'] == 1)
                                label = enums.propF[row['key_id']][5];
                            else
                                label = enums.propM[row['key_id']][5];
                        }
                        else {
                            label = "#" + row['key_id'];
                        }
                    }

                    data.push({id: row['id'], label: label, item_id: row['item_id'], count: row['count'], is_equip: row['is_equip'], params: row['params']});
                });

                player.call('client:showFixGunFreeMenu', [data]);
            });
        } catch(e) {
            methods.debug(e);
        }
    }, 1000);
};

inventory.getItemListClothTranferSell = function(player) {
    if (!user.isLogin(player))
        return;
    try {

        let data = [];
        //let data2 = new Map();

        let sql = `SELECT * FROM items WHERE owner_id = '${user.getId(player)}' AND owner_type = '1' AND is_equip = 0 AND (item_id = 265 OR item_id = 266 OR item_id = 267 OR item_id = 269 OR item_id = 274) ORDER BY item_id DESC LIMIT 400`;

        mysql.executeQuery(sql, function (err, rows, fields) {
            rows.forEach(row => {

                let label = "";

                if (row['prefix'] > 0 && row['number'] > 0 && row['key_id'] <= 0) {
                    label = row['prefix'] + "-" + row['number'];
                } else if (row['key_id'] > 0) {

                    if (row['item_id'] >= 265 && row['item_id'] <= 268) {

                        if (row['prefix'] == 1)
                            label = enums.clothF[row['key_id']][9];
                        else
                            label = enums.clothM[row['key_id']][9];
                    }
                    else if (row['item_id'] >= 269 && row['item_id'] <= 273) {
                        if (row['prefix'] == 1)
                            label = enums.propF[row['key_id']][5];
                        else
                            label = enums.propM[row['key_id']][5];
                    }
                    else {
                        label = "#" + row['key_id'];
                    }
                }

                data.push({id: row['id'], label: label, item_id: row['item_id'], count: row['count'], is_equip: row['is_equip'], params: row['params']});
            });

            player.call('client:showSellClothMenu', [data]);
        });
    } catch(e) {
        methods.debug(e);
    }
};

inventory.getItemListSellFish = function(player, shopId) {
    if (!user.isLogin(player))
        return;
    try {

        let data = [];
        //let data2 = new Map();

        let sql = `SELECT * FROM items WHERE owner_id = '${user.getId(player)}' AND owner_type = '1' AND is_equip = 0 AND (item_id > 486 AND item_id < 537) ORDER BY item_id DESC LIMIT 400`;

        mysql.executeQuery(sql, function (err, rows, fields) {
            rows.forEach(row => {

                let label = "";

                if (row['prefix'] > 0 && row['number'] > 0 && row['key_id'] <= 0) {
                    label = row['prefix'] + "-" + row['number'];
                } else if (row['key_id'] > 0) {

                    if (row['item_id'] >= 265 && row['item_id'] <= 268) {

                        if (row['prefix'] == 1)
                            label = enums.clothF[row['key_id']][9];
                        else
                            label = enums.clothM[row['key_id']][9];
                    }
                    else if (row['item_id'] >= 269 && row['item_id'] <= 273) {
                        if (row['prefix'] == 1)
                            label = enums.propF[row['key_id']][5];
                        else
                            label = enums.propM[row['key_id']][5];
                    }
                    else {
                        label = "#" + row['key_id'];
                    }
                }

                data.push({id: row['id'], label: label, item_id: row['item_id'], count: row['count'], is_equip: row['is_equip'], params: row['params']});
            });

            player.call('client:showSellFishMenu', [data, shopId]);
        });
    } catch(e) {
        methods.debug(e);
    }
};

inventory.unEquip = function(player, id, itemId) {
    if (!user.isLogin(player))
        return;

    if (itemId === 50) {
        let money = user.getBankMoney(player);
        user.set(player, 'bank_card', 0);
        user.set(player, 'bank_owner', '');
        user.set(player, 'bank_pin', 0);
        user.setBankMoney(player, 0);
        inventory.updateItemCount(id, money);
        user.save(player);
    }
};

inventory.upgradeWeapon = function(player, id, itemId, weaponStr) {

    if (!user.isLogin(player))
        return;
    try {

        let sql = `SELECT * FROM items WHERE id = ${id} AND owner_id = ${user.getId(player)} AND owner_type = ${inventory.types.Player}`;

        mysql.executeQuery(sql, function (err, rows, fields) {
            if (rows.length === 0) {
                player.notify('~r~Sis elementas jums nepriklauso');
                return;
            }

            let weapon = JSON.parse(weaponStr);

            let wpName = items.getItemNameHashById(weapon.item_id);
            let wpHash = weapons.getHashByName(wpName);

            let wpModifer = items.getItemNameHashById(itemId);
            let hashModifer = items.getItemHashModiferById(itemId);

            if (wpModifer != wpName) {
                player.notify(`~r~Si modifikacija netinka siam ginklui`);
                return;
            }

            let wpSlot = weapons.getUpgradeSlot(wpName, hashModifer);

            if (wpSlot == 1) {
                if (weapon.params.slot1) {
                    player.notify(`~r~Aikstele jau užimta`);
                    return;
                }
                weapon.params.slot1 = true;
                weapon.params.slot1hash = hashModifer;
            }
            if (wpSlot == 2) {
                if (weapon.params.slot2) {
                    player.notify(`~r~Aikstele jau užimta`);
                    return;
                }
                weapon.params.slot2 = true;
                weapon.params.slot2hash = hashModifer;
            }
            if (wpSlot == 3) {
                if (weapon.params.slot3) {
                    player.notify(`~r~Aikstele jau užimta`);
                    return;
                }
                weapon.params.slot3 = true;
                weapon.params.slot3hash = hashModifer;
            }
            if (wpSlot == 4) {
                if (weapon.params.slot4) {
                    player.notify(`~r~Aikstele jau užimta`);
                    return;
                }
                weapon.params.slot4 = true;
                weapon.params.slot4hash = hashModifer;
            }

            if (wpSlot == -1) {
                player.notify(`~r~Ivyko nežinoma klaida #weapon`);
                return;
            }

            user.giveWeaponComponent(player, methods.parseInt(wpHash), methods.parseInt(hashModifer));

            inventory.updateItemParams(weapon.id, JSON.stringify(weapon.params));
            inventory.deleteItem(id);

            user.callCef(player, 'inventory', JSON.stringify({ type: 'removeItemId', itemId: id }));
            user.callCef(player, 'inventory', JSON.stringify({ type: 'updateWeaponParams', itemId: weapon.id, params: weapon.params }));
        });
    } catch (e) {

    }
};

inventory.fixItem = function(player, id) {
    if (!user.isLogin(player))
        return;
    try {
        let sql = `SELECT * FROM items WHERE item_id = 476 AND owner_id = ${user.getId(player)} AND owner_type = ${inventory.types.Player} LIMIT 1`;
        mysql.executeQuery(sql, function (err, rows, fields) {
            if (rows.length === 0) {
                player.notify('~r~Jus neturite plieniniu ploksciu');
                return;
            }
            inventory.updateItemCount(id, 100);
            inventory.deleteItem(rows[0]['id']);
            player.notify('~y~Baigete remonta');
        });
    } catch (e) {

    }
};

inventory.colorItem = function(player, id, tint, sTint) {
    if (!user.isLogin(player))
        return;
    try {
        let count = 5;
        if (methods.parseInt(sTint) !== 0)
            count = 10;
        let sql = `SELECT * FROM items WHERE item_id = 477 AND owner_id = ${user.getId(player)} AND owner_type = ${inventory.types.Player}`;
        mysql.executeQuery(sql, function (err, rows, fields) {
            if (rows.length < count) {
                player.notify(`~r~Turite tiek daug skardiniu. Reikia: ${count}vnt.`);
                return;
            }

            mysql.executeQuery(`SELECT params FROM items WHERE id = ${id} LIMIT 1`, function (err, rows2, fields) {
                if (rows2.length === 0) {
                    player.notify('~r~Ginklu nerasta');
                    return;
                }
                try {
                    let params = JSON.parse(rows2[0]['params']);
                    params.tint = tint;
                    if (sTint !== 0)
                        params.superTint = methods.parseInt(sTint);
                    inventory.updateItemParams(id, JSON.stringify(params));

                    rows.forEach((row, idx) => {
                        if (count > idx)
                            inventory.deleteItem(row['id']);
                    });

                    player.notify('~g~Baigete tapyba');
                }
                catch (e) {
                    player.notify('~y~Ivyko dažymo klaida');
                }
            });
        });
    } catch (e) {

    }
};

inventory.fixItemFree = function(player, id) {
    if (!user.isLogin(player))
        return;
    try {
        inventory.updateItemCount(id, 100);
        player.notify('~y~Baigete remonta');
    } catch (e) {

    }
};

inventory.craft = function(player, id, itemId, countItems, count, params) {

    if (!user.isLogin(player))
        return;
    try {
        let sql2 = '';

        items.recipes[id].craft.forEach(item => {
            sql2 += ` OR item_id=${item}`;
        });

        let sql = `SELECT * FROM items WHERE owner_id = ${user.getId(player)} AND owner_type = ${inventory.types.Player} AND (item_id = '-1' ${sql2})`;
        mysql.executeQuery(sql, function (err, rows, fields) {
            if (rows.length === 0) {
                player.notify('~r~Neturite visu sudedamuju daliu, reikalingu gamybai');
                inventory.getItemList(player, inventory.types.Player, user.getId(player));
                return;
            }

            items.recipes[id].craft.forEach(item => {
                setTimeout(function () {
                    inventory.deleteUserItemByItemId(inventory.types.Player, user.getId(player), item, 0, 1);
                }, methods.getRandomInt(1, 500))
            });

            inventory.addItem(itemId, countItems, inventory.types.Player, user.getId(player), count, 0, params);
            setTimeout(function () {
                inventory.getItemList(player, inventory.types.Player, user.getId(player));
            }, 1000);
        });
    } catch (e) {

    }
};

inventory.equip = function(player, id, itemId, count, aparams) {

    if (!user.isLogin(player))
        return;
    try {

        let sql = `SELECT * FROM items WHERE id = ${id} AND owner_id = ${user.getId(player)} AND owner_type = ${inventory.types.Player}`;
        if (itemId === 264 || itemId === 263 || itemId === 252)
            sql = `SELECT * FROM items WHERE id = ${id}`;

        mysql.executeQuery(sql, function (err, rows, fields) {
            if (rows.length === 0) {
                player.notify('~r~Sis elementas jums nepriklauso');
                return;
            }

            if (rows[0]['is_equip'] === 1 && itemId === 50) {
                player.notify('~r~Kortele jau paimta');
                return;
            }

            methods.saveLog('log_inventory',
                ['type', 'text'],
                ['EQUIP', `id:${id}, itemId:${itemId}, count:${count}, params:${aparams}`],
            );

            inventory.deleteItemByUsers(id);
            inventory.deleteDropItem(id);
            inventory.updateOwnerId(id, user.getId(player), inventory.types.Player);

            let params = {};

            try {
                params = JSON.parse(aparams);
            }
            catch (e) {
                methods.debug(e);
            }

            if (itemId == 50) {
                if (user.get(player, 'bank_card') == 0) {
                    user.set(player, 'bank_card', methods.parseInt(params.number));
                    user.set(player, 'bank_owner', params.owner);
                    user.set(player, 'bank_pin', methods.parseInt(params.pin));
                    user.setBankMoney(player, methods.parseFloat(rows[0]['count']));
                    user.save(player);
                }
                else {
                    player.notify("~r~Kortele jau paimta, pirmiausia isimkite esama kortele");
                    return;
                }
            }
            else if (itemId >= 27 && itemId <= 30) {
                if (user.get(player, 'phone_type') === 0) {
                    user.set(player, 'phone', methods.parseInt(params.number));
                    user.set(player, 'phone_type', methods.parseInt(params.type));
                    user.set(player, 'phone_bg', methods.parseInt(params.bg));
                    user.save(player);
                }
                else {
                    player.notify("~r~Telefonas jau yra paimtas, isimkite esama");
                    return;
                }
            }
            else if (items.isWeapon(itemId)) {

                try {
                    let slot = weapons.getGunSlotIdByItem(itemId);
                    if (user.get(player, 'weapon_' + slot) == '') {

                        user.set(player, 'weapon_' + slot, params.serial);
                        user.set(player, 'weapon_' + slot + '_ammo', 0);

                        user.giveWeapon(player, items.getItemNameHashById(itemId), 0);
                        user.callCef(player, 'inventory', JSON.stringify({type: "updateSelectWeapon", selectId: id}));

                        let wpHash = weapons.getHashByName(items.getItemNameHashById(itemId));

                        player.removeAllWeaponComponents(wpHash);
                        player.setWeaponTint(wpHash, 0);

                        if (params.slot1)
                            player.giveWeaponComponent(wpHash, params.slot1hash);
                        if (params.slot2)
                            player.giveWeaponComponent(wpHash, params.slot2hash);
                        if (params.slot3)
                            player.giveWeaponComponent(wpHash, params.slot3hash);
                        if (params.slot4)
                            player.giveWeaponComponent(wpHash, params.slot4hash);
                        if (params.superTint)
                            player.giveWeaponComponent(wpHash, params.superTint);
                        if (params.tint)
                            player.setWeaponTint(wpHash, params.tint);

                        user.updateClientCache(player);
                        user.save(player);
                    }
                    else {
                        user.callCef(player, 'inventory', JSON.stringify({type: "weaponToInventory", itemId: id}));
                        player.notify("~r~Ginklo slotas jau užimtas");
                        return;
                    }
                }
                catch (e) {
                    methods.debug(e);
                }
            }
            else if (itemId == 264 || itemId == 263) {
                user.set(player, "hand", params.hand);
                user.set(player, "hand_color", params.hand_color);
                user.updateCharacterCloth(player);
                user.save(player);
            }
            else if (itemId == 275) {

                if (params.sex !== user.getSex(player)) {
                    player.notify("~r~Drabužiai tinka tik priesingai pusei");
                    return;
                }
                inventory.updateItemsEquipByItemId(itemId, user.getId(player), inventory.types.Player, 0);
                user.set(player, "gloves", params.gloves);
                user.set(player, "gloves_color", params.gloves_color);
                user.updateCharacterCloth(player);
            }
            else if (itemId == 265) {

                if (params.sex !== user.getSex(player)) {
                    player.notify("~r~Drabužiai tinka tik priesingai pusei");
                    return;
                }

                inventory.updateItemsEquipByItemId(itemId, user.getId(player), inventory.types.Player, 0);

                user.set(player, "torso", params.torso);
                user.set(player, "torso_color", params.torso_color);
                user.set(player, "body", params.body);
                user.set(player, "body_color", params.body_color);
                user.set(player, "parachute", params.parachute);
                user.set(player, "parachute_color", params.parachute_color);
                user.set(player, "decal", 0);
                user.set(player, "decal_color", 0);
                user.set(player, "tprint_o", params.tprint_o);
                user.set(player, "tprint_c", params.tprint_c);

                user.updateCharacterCloth(player);
                user.updateTattoo(player);
            }
            else if (itemId == 266) {

                if (params.sex !== user.getSex(player)) {
                    player.notify("~r~Drabužiai tinka tik priesingai pusei");
                    return;
                }
                inventory.updateItemsEquipByItemId(itemId, user.getId(player), inventory.types.Player, 0);
                user.set(player, "leg", params.leg);
                user.set(player, "leg_color", params.leg_color);
                user.updateCharacterCloth(player);
            }
            else if (itemId == 267) {

                if (params.sex !== user.getSex(player)) {
                    player.notify("~r~Drabužiai tinka tik priesingai pusei");
                    return;
                }

                inventory.updateItemsEquipByItemId(itemId, user.getId(player), inventory.types.Player, 0);
                user.set(player, "foot", params.foot);
                user.set(player, "foot_color", params.foot_color);
                user.updateCharacterCloth(player);
            }
            else if (itemId == 268) {

                if (params.sex !== user.getSex(player)) {
                    player.notify("~r~Drabužiai tinka tik priesingai pusei");
                    return;
                }

                inventory.updateItemsEquipByItemId(itemId, user.getId(player), inventory.types.Player, 0);
                user.set(player, "accessorie", params.accessorie);
                user.set(player, "accessorie_color", params.accessorie_color);
                user.updateCharacterCloth(player);
            }
            else if (itemId == 269) {

                if (params.sex !== user.getSex(player)) {
                    player.notify("~r~Drabužiai tinka tik priesingai pusei");
                    return;
                }

                inventory.updateItemsEquipByItemId(itemId, user.getId(player), inventory.types.Player, 0);
                user.set(player, "hat", params.hat);
                user.set(player, "hat_color", params.hat_color);
                user.updateCharacterCloth(player);
            }
            else if (itemId == 270) {

                if (params.sex !== user.getSex(player)) {
                    player.notify("~r~Drabužiai tinka tik priesingai pusei");
                    return;
                }

                inventory.updateItemsEquipByItemId(itemId, user.getId(player), inventory.types.Player, 0);
                user.set(player, "glasses", params.glasses);
                user.set(player, "glasses_color", params.glasses_color);
                user.updateCharacterCloth(player);
            }
            else if (itemId == 271) {

                if (params.sex !== user.getSex(player)) {
                    player.notify("~r~Drabužiai tinka tik priesingai pusei");
                    return;
                }

                inventory.updateItemsEquipByItemId(itemId, user.getId(player), inventory.types.Player, 0);
                user.set(player, "ear", params.ear);
                user.set(player, "ear_color", params.ear_color);
                user.updateCharacterCloth(player);
            }
            else if (itemId == 272) {

                if (params.sex !== user.getSex(player)) {
                    player.notify("~r~Drabužiai tinka tik priesingai pusei");
                    return;
                }

                inventory.updateItemsEquipByItemId(itemId, user.getId(player), inventory.types.Player, 0);
                user.set(player, "watch", params.watch);
                user.set(player, "watch_color", params.watch_color);
                user.updateCharacterCloth(player);
            }
            else if (itemId == 273) {

                if (params.sex !== user.getSex(player)) {
                    player.notify("~r~Drabužiai tinka tik priesingai pusei");
                    return;
                }

                inventory.updateItemsEquipByItemId(itemId, user.getId(player), inventory.types.Player, 0);
                user.set(player, "bracelet", params.bracelet);
                user.set(player, "bracelet_color", params.bracelet_color);
                user.updateCharacterCloth(player);
            }
            else if (itemId == 274) {
                if (user.get(player, 'mask') == -1) {
                    user.set(player, "mask", params.mask);
                    user.set(player, "mask_color", 1);
                    user.updateCharacterCloth(player);
                    user.updateCharacterFace(player);
                    user.playAnimation(player, 'mp_masks@on_foot', 'put_on_mask', 48);
                }
                else {
                    player.notify("~r~Drabužiai jau paimti");
                    return;
                }
            }
            else if (itemId == 252) {
                user.set(player, "armor", params.armor);
                user.set(player, "armor_color", params.armor_color);
                if (user.get(player, 'parachute_color') !== 170 &&
                    user.get(player, 'parachute_color') !== 172 &&
                    user.get(player, 'parachute_color') !== 207 &&
                    user.get(player, 'parachute_color') !== 210
                )
                    user.setComponentVariation(player, 9, params.armor, params.armor_color);
                user.setArmour(player, methods.parseInt(rows[0]['count']));
            }

            user.updateClientCache(player);
            setTimeout(function () {
                try {
                    inventory.updateEquipStatus(id, true);
                }
                catch (e) {}
            }, 1000)
        });
    } catch(e) {
        methods.debug(e);
    }
};

inventory.updateEquipStatus = function(id, status) {
    try {
        let newStatus = 0;
        if (status == true)
            newStatus = 1;
        mysql.executeQuery(`UPDATE items SET is_equip = '${newStatus}' WHERE id = '${methods.parseInt(id)}'`);
    }
    catch (e) {
        methods.debug('inventory.updateEquipStatus', e);
    }
};

inventory.updateItemsEquipByItemId = function(itemId, ownerId, ownerType, equip, count = -1) {
    try {
        if (count >= 0)
            mysql.executeQuery(`UPDATE items SET is_equip = '${equip}', count = '${count}' where item_id = '${itemId}' AND is_equip = '${(equip === 0 ? 1 : 0)}' AND owner_type = '${ownerType}' AND owner_id = '${ownerId}'`);
        else
            mysql.executeQuery(`UPDATE items SET is_equip = '${equip}' where item_id = '${itemId}' AND owner_type = '${ownerType}' AND owner_id = '${ownerId}'`);
    } catch(e) {
        methods.debug(e);
    }
};

inventory.updateOwnerId = function(id, ownerId, ownerType) {
    try {
        mysql.executeQuery(`UPDATE items SET owner_type = '${ownerType}', owner_id = '${methods.parseInt(ownerId)}' where id = '${id}'`);

        methods.saveLog('log_inventory',
            ['type', 'text'],
            ['UPDATE_OWNER', `id:${id}, ownerId:${ownerId}, ownerType:${ownerType}`],
        );
    } catch(e) {
        methods.debug(e);
    }
};

inventory.updateOwnerIdWithPrice = function(id, ownerId, ownerType, price) {
    try {
        mysql.executeQuery(`UPDATE items SET owner_type = '${ownerType}', owner_id = '${methods.parseInt(ownerId)}', price = '${methods.parseInt(price)}' where id = '${id}'`);

        methods.saveLog('log_inventory',
            ['type', 'text'],
            ['UPDATE_OWNER', `id:${id}, ownerId:${ownerId}, ownerType:${ownerType}, price:${price}`],
        );
    } catch(e) {
        methods.debug(e);
    }
};

inventory.updateOwnerAll = function(oldOwnerId, oldOwnerType, ownerId, ownerType) {
    try {
        mysql.executeQuery(`UPDATE items SET owner_type = '${ownerType}', owner_id = '${methods.parseInt(ownerId)}' where owner_type = '${oldOwnerType}' AND owner_id = '${methods.parseInt(oldOwnerId)}' AND is_equip = '0'`);
    } catch(e) {
        methods.debug(e);
    }
};

inventory.updateItemParams = function(id, params) {
    try {
        mysql.executeQuery(`UPDATE items SET params = '${params}' where id = '${methods.parseInt(id)}'`);

        methods.saveLog('log_inventory',
            ['type', 'text'],
            ['UPDATE_PARAMS', `id:${id}, params:${params}`],
        );
    } catch(e) {
        methods.debug(e);
    }
};

inventory.updateItemCount = function(id, count) {
    try {
        mysql.executeQuery(`UPDATE items SET count = '${count}', timestamp_update = '${methods.getTimeStamp()}' where id = '${id}'`);

        methods.saveLog('log_inventory',
            ['type', 'text'],
            ['UPDATE_COUNT', `id:${id}, count:${count}`],
        );
    } catch(e) {
        methods.debug(e);
    }
};

inventory.updateItemCountByItemId = function(itemId, count, ownerId, ownerType = 1, isEquip = 1) {
    try {
        mysql.executeQuery(`UPDATE items SET count = '${count}', timestamp_update = '${methods.getTimeStamp()}' where item_id = '${itemId}' AND is_equip = '${isEquip}' AND owner_id = '${ownerId}' AND owner_type = '${ownerType}'`);

        methods.saveLog('log_inventory',
            ['type', 'text'],
            ['UPDATE_COUNT', `itemId:${itemId}, ownerType:${ownerType}, ownerId:${ownerId}, count:${count}`],
        );
    } catch(e) {
        methods.debug(e);
    }
};

inventory.getPlayerInvAmountMax = function(player) {
    if (user.isLogin(player) && user.get(player, 'vip_type') === 2)
        return 35001;
    return 30001;
};

inventory.updateAmount = function(player, ownerId, ownerType) { // Фикс хуйни, котороая просто поломала все, заметочка никогда не писать код когда ты очень сильно хочешь спать.

    if (!user.isLogin(player))
        return;

    ownerId = methods.parseInt(ownerId);
    let data = new Map();
    mysql.executeQuery(`SELECT * FROM items WHERE owner_id = '${ownerId}' AND owner_type = '${ownerType}' AND is_equip = 0`, function (err, rows, fields) {
        rows.forEach(row => {
            data.set(row['id'].toString(), row["item_id"]);
        });
        try {
            player.call('client:inventory:sendToPlayerItemListUpdateAmountMenu', [Array.from(data), ownerType, ownerId]);
        }
        catch (e) {
            methods.debug(e);
        }
    });
};

inventory.dropItem = function(player, id, itemId, posX, posY, posZ, rotX, rotY, rotZ) {
    if (!user.isLogin(player))
        return;
    try {

        if (vehicles.exists(player.vehicle)) {
            player.notify('~r~Esate transporto srityje');
            inventory.getItemList(player, inventory.types.Player, user.getId(player));
            return;
        }
        if (player.isJumping) {
            player.notify('~r~Negalima sokineti');
            inventory.getItemList(player, inventory.types.Player, user.getId(player));
            return;
        }
        inventory.dropItemJust(id, itemId, posX, posY, posZ, rotX, rotY, player.heading);

    } catch(e) {
        methods.debug(e);
    }
};

inventory.dropItemJust = function(id, itemId, posX, posY, posZ, rotX, rotY, rotZ) {

    try {
        if (props.has(id.toString()))
            return;

        let heading = rotZ;
        let rot = new mp.Vector3(0, 0, heading);

        switch (itemId) {
            case 1:
            case 2:
            case 8:
            case 50:
            case 154:
            case 156:
            case 158:
            case 159:
            case 160:
            case 171:
            case 172:
            case 173:
            case 176:
            case 177:
            case 178:
            case 251:
            case 252:
                rot = new mp.Vector3(-90, 0, heading);
                break;
        }

        if(itemId >= 27 && itemId <= 30)
            rot = new mp.Vector3(-90, 0, heading);
        if(itemId >= 54 && itemId <= 126)
            rot = new mp.Vector3(-90, 0, heading);
        if(itemId === 252)
            rot = new mp.Vector3(-90, -90, heading);

        //eval mp.game.invoke('0x5006D96C995A5827', -50000.0,-50000.0,-100.0); mp.game.invoke('0x5006D96C995A5827', 50000.0,50000.0,10000.0);
        //eval mp.game.invoke('0x5006D96C995A5827', -5000.0,-5000.0,-10.0); mp.game.invoke('0x5006D96C995A5827', 5000.0,5000.0,100.0);

        let obj = mp.objects.new(
            items.getItemHashById(itemId),
            new mp.Vector3(posX + (methods.getRandomInt(-100, 100) / 200), posY + (methods.getRandomInt(-100, 100) / 200), posZ - 0.98),
            {
                rotation: rot,
                alpha: 255,
                dimension: 0
            });

        obj.setVariable('isDrop', id);
        obj.setVariable('itemId', itemId);

        posX = obj.position.x;
        posY = obj.position.y;
        posZ = obj.position.z;

        rotX = rot.x;
        rotY = rot.y;
        rotZ = rot.z;

        props.set(id.toString(), obj);
        mysql.executeQuery(`UPDATE items SET owner_type = 0, owner_id = 0, is_equip = 0, pos_x = ${posX}, pos_y = ${posY}, pos_z = ${posZ}, rot_x = ${rotX}, rot_y = ${rotY}, rot_z = ${rotZ}, timestamp_update = ${methods.getTimeStamp()} where id = ${id}`);

    } catch(e) {
        methods.debug(e);
    }
};

inventory.deleteDropItem = function(id) {
    try {
        let entity = props.get(id.toString());
        if (mp.objects.exists(entity))
            entity.destroy();
    } catch(e) {
        methods.debug(e);
    }
    
    try {
        props.delete(id.toString());
    }
    catch (e) {
        methods.debug(e);
    }
};

inventory.deleteItem = function(id) {
    try {
        mysql.executeQuery(`DELETE FROM items WHERE id = ${id}`);
        inventory.deleteDropItem(id);
        inventory.deleteItemByUsers(id);
    } catch(e) {
        methods.debug(e);
    }
};

inventory.deleteItemByItemId = function(id, isEquip = 0, limit = -1) {
    try {
        if (limit > 0) {
            mysql.executeQuery(`SELECT * FROM items WHERE item_id = ${id} AND is_equip = ${isEquip} LIMIT ${limit}`, function (err, rows, fields) {
                rows.forEach(row => {
                    mysql.executeQuery(`DELETE FROM items WHERE id = ${row['id']}`);
                })
            });
        }
        else
            mysql.executeQuery(`DELETE FROM items WHERE item_id = ${id} AND is_equip = ${isEquip}`);
    } catch(e) {
        methods.debug(e);
    }
};

inventory.deleteUserItemByItemId = function(ownerType, ownerId, id, isEquip = 0, limit = -1) {
    try {
        if (limit > 0) {
            mysql.executeQuery(`SELECT * FROM items WHERE owner_id = ${ownerId} AND owner_type = ${ownerType} AND item_id = ${id} AND is_equip = ${isEquip} LIMIT ${limit}`, function (err, rows, fields) {
                rows.forEach(row => {
                    mysql.executeQuery(`DELETE FROM items WHERE id = ${row['id']}`);
                })
            });
        }
        else
            mysql.executeQuery(`DELETE FROM items WHERE owner_id = ${ownerId} AND owner_type = ${ownerType} AND item_id = ${id} AND is_equip = ${isEquip}`);
    } catch(e) {
        methods.debug(e);
    }
};

inventory.deleteItemByUsers = function(id) {
    try {
        let data = JSON.stringify({type: 'deleteItemById', id: id});
        mp.players.forEach(p => {
            if (user.isLogin(p))
                user.callCef(p, 'inventory', data);
        });
    } catch(e) {
        methods.debug(e);
    }
};

inventory.deleteItemsRange = function(player, itemIdFrom, itemIdTo) {
    try {
        if (!user.isLogin(player))
            return;
        mysql.executeQuery(`DELETE FROM items WHERE item_id >= ${itemIdFrom} AND item_id <= ${itemIdTo} AND owner_id = ${user.getId(player)} AND owner_type = 1`);
    } catch(e) {
        methods.debug(e);
    }
};

inventory.deleteItemsByItemId = function(itemId) {
    try {
        mysql.executeQuery(`DELETE FROM items WHERE item_id = ${itemId}`);
    } catch(e) {
        methods.debug(e);
    }
};

inventory.addItem = function(itemId, count, ownerType, ownerId, countItems, isEquip, params, timeout = 1) {
    if (items.isWeapon(itemId))
        inventory.addWeaponItem(itemId, count, ownerType, ownerId, countItems, isEquip, params, timeout);
    else if (items.isAmmo(itemId))
        inventory.addAmmoItem(itemId, count, ownerType, ownerId, countItems, isEquip, params, timeout);
    else if (itemId === 252)
        inventory.addArmourItem(itemId, count, ownerType, ownerId, countItems, isEquip, params, timeout);
    else
        inventory.addItemSql(itemId, count, ownerType, ownerId, countItems, isEquip, params, timeout);
};

inventory.addPlayerWeaponItem = function(player, itemId, count, ownerType, ownerId, countItems, isEquip, params, text = 'Išduoti ginklai', timeout = 1) {
    let serial = weapons.getWeaponSerial(itemId);
    let paramsObject = JSON.parse(params);
    paramsObject.serial = serial;
    if (items.isAmmo(itemId))
        inventory.addAmmoItem(itemId, count, ownerType, ownerId, countItems, isEquip, JSON.stringify(paramsObject), timeout);
    else
        inventory.addItemSql(itemId, count, ownerType, ownerId, countItems, isEquip, JSON.stringify(paramsObject), timeout);
    user.addHistory(player, 5, `${text} ${items.getItemNameById(itemId)} (${serial})`);
};

inventory.addWeaponItem = function(itemId, count, ownerType, ownerId, countItems, isEquip, params, timeout = 1) {
    let serial = weapons.getWeaponSerial(itemId);
    let paramsObject = JSON.parse(params);
    paramsObject.serial = serial;
    inventory.addItemSql(itemId, count, ownerType, ownerId, 100, isEquip, JSON.stringify(paramsObject), timeout);
};

inventory.addArmourItem = function(itemId, count, ownerType, ownerId, countItems, isEquip, params, timeout = 1) {
    let paramsObject = JSON.parse(params);
    let armourNames = ['Pilka', 'Juoda', 'Žalia', 'Kamufliažas', 'Žalias kamufliažas'];
    let armor = 12;
    let color = methods.getRandomInt(0, 5);
    if (methods.getRandomInt(0, 2) === 0) {
        armor = 28;
        color = methods.getRandomInt(0, 10);
    }

    if (paramsObject.armor)
        armor = paramsObject.armor;
    if (paramsObject.armor_color >= 0)
        color = paramsObject.armor_color;

    paramsObject.armor = armor;
    paramsObject.armor_color = color;

    if (armor === 28)
        armourNames = ['Žalia', 'Oranžinė', 'Violetinė', 'Rožinė', 'Raudona', 'Mėlyna', 'Pilka', 'Smėlio', 'Balta', 'Juoda'];

    paramsObject.name = `${armourNames[color]} neperšaunama liemenė`;
    inventory.addItemSql(itemId, count, ownerType, ownerId, countItems, isEquip, JSON.stringify(paramsObject), timeout);
};

inventory.addAmmoItem = function(itemId, count, ownerType, ownerId, countItems, isEquip, params, timeout = 1) {
    inventory.addItemSql(itemId, count, ownerType, ownerId, items.getAmmoCount(itemId), isEquip, params, timeout);
};

inventory.addItemSql = function(itemId, count, ownerType, ownerId, countItems, isEquip, params, timeout = 1) {

    setTimeout(function () {
        try {
            for (let i = 0; i < count; i++) {
                mysql.executeQuery(`INSERT INTO items (item_id, owner_type, owner_id, count, is_equip, params, timestamp_update) VALUES ('${itemId}', '${ownerType}', '${ownerId}', '${countItems}', '${isEquip}', '${params}', '${methods.getTimeStamp()}')`);
            }

            methods.saveLog('log_inventory',
                ['type', 'text'],
                ['ADD_NEW', `itemId:${itemId}, count:${count}, ownerType:${ownerType}, ownerId:${ownerId}, countItems:${countItems}, params:${params}`],
            );
        } catch(e) {
            methods.debug(e);
        }
    }, timeout);
};

inventory.addWorldItem = function(itemId, count, countItems, posx, posy, posz, rotx, roty, rotz, params, timeout = 1) {

    setTimeout(function () {
        try {
            for (let i = 0; i < count; i++) {
                let timeStamp = methods.getTimeStamp();
                mysql.executeQuery(`INSERT INTO items (item_id, owner_type, owner_id, count, is_equip, params, timestamp_update) VALUES ('${itemId}', '0', '0', '${countItems}', '0', '${params}', '${timeStamp}')`);

                setTimeout(function () {
                    mysql.executeQuery(`SELECT id FROM items WHERE owner_type='0' AND owner_id='0' AND item_id='${itemId}' AND timestamp_update='${timeStamp}' ORDER BY item_id DESC`, function (err, rows, fields) {
                        rows.forEach(row => {
                            inventory.dropItemJust(row['id'], itemId, posx, posy, posz, rotx, roty, rotz);
                        });
                    });
                })
            }

            methods.saveLog('log_inventory',
                ['type', 'text'],
                ['ADD_NEW', `itemId:${itemId}, count:${count}, ownerType:${0}, ownerId:${0}, countItems:${countItems}, params:${params}`],
            );
        } catch(e) {
            methods.debug(e);
        }
    }, timeout);
};

inventory.dropWeaponItem = function(player, itemId, posx, posy, posz, rotx, roty, rotz) {

    setTimeout(function () {

        if (!user.isLogin(player))
            return;

        mysql.executeQuery(`SELECT id, item_id FROM items WHERE owner_type='1' AND owner_id='${user.getId(player)}' AND id='${itemId}' AND is_equip='1'`, function (err, rows, fields) {
            rows.forEach(row => {
                inventory.dropItem(player, row['id'], row['item_id'], posx, posy, posz, rotx, roty, rotz);
            });
        });
    })
};

inventory.getInvAmount = function(player, id, type) {
    try {
        if (!user.isLogin(player))
            return;
        if (Container.Data.Has(id, "invAmount:" + type))
            return Container.Data.Get(id, "invAmount:" + type);
        inventory.updateAmount(player, id, type);
        return Container.Data.Get(id, "invAmount:" + type);
    } catch(e) {
        methods.debug(e);
    }
};

inventory.usePlayerItem = function(player, id, itemId) {
    if (!user.isLogin(player))
        return;

    switch (itemId) {
        case 277: {
            try {
                let target = methods.getNearestPlayerWithPlayer(player, 4);
                if (!user.isLogin(target)) {
                    player.notify("~r~Salia jusu nera ne vieno žmogaus");
                    return;
                }

                if (!user.isEms(player)) {
                    player.notify("~y~Neturite igudžiu naudotis siuo itaisu");
                    return;
                }

                if (target.health > 0) {
                    player.notify("~r~Žaidejas turi buti istiktas komos.");
                    return;
                }

                chat.sendMeCommand(player, "naudojo defibriliatorių.");
                user.useAdrenaline(target);

                let targetId = user.getId(target);
                if (user.hasById(targetId, 'adrenaline')) {
                    player.notify("~r~žaidejui neseniai buvo panaudotas defibriliatorius, todel premijos negausite.");
                    return;
                }
                user.setById(targetId, 'adrenaline', true);

                user.addCashMoney(player, 200, 'Defibriliatoriaus naudojimas');
                player.notify("~g~Gavote 200€ premija");
                
                setTimeout(function () {
                    try {
                        user.resetById(targetId, 'adrenaline');
                    }
                    catch (e) {}
                }, 1000 * 60 * 10);
            }
            catch (e) {}
            break;
        }
        default:
        {
            let target = methods.getNearestPlayerWithPlayer(player, 1.5);
            if (!user.isLogin(target)) {
                player.notify("~r~Salia jusu nera ne vieno žmogaus");
                return;
            }
            inventory.useItem(target, id, itemId, true);
        }
    }
};

inventory.useItem = function(player, id, itemId, isTargetable = false) {
    if (!user.isLogin(player))
        return;
    try {
        let user_id = user.getId(player);

        methods.saveLog('log_inventory',
            ['type', 'text'],
            ['USE', `userId:${user_id}, id:${id}, itemId:${itemId}`],
        );

        let sql = `SELECT * FROM items WHERE id = ${id} AND owner_id = ${user.getId(player)} AND owner_type = ${inventory.types.Player}`;
        if (itemId === 264 || itemId === 263 || itemId === 252 || isTargetable)
            sql = `SELECT * FROM items WHERE id = ${id}`;

        mysql.executeQuery(sql, function (err, rows, fields) {
            if (rows.length === 0) {
                player.notify('~r~Jei norite naudoti elementa, jis turi buti jusu inventoriuje.');
                return;
            }

            let params = {};
            try {
                params = JSON.parse(rows[0]['params']);
            }
            catch (e) {

            }

            switch (itemId) {
                case 0:
                    {
                        let target = methods.getNearestPlayerWithPlayer(player, 1.5);
                        if (!user.isLogin(target)) {
                            player.notify("~r~Salia jusu nera ne vieno žmogaus");
                            return;
                        }

                        if (user.isTie(target)) {
                            inventory.addItem(0, 1, inventory.types.Player, user.getId(player), 1, 0, "{}", 10);
                            //user.stopAnimation(target);
                            user.playAnimation(player, "mp_arresting", "a_uncuff", 8);
                            user.unTie(target);
                            chat.sendMeCommand(player, "nuėmė nuo priešais esančio vyro kaklaraiščius.");
                        }
                        else {
                            if (!user.get(target, 'isKnockout')) {
                                player.notify("~r~Žaidejas turi buti nokautuotas");
                                return;
                            }

                            if (user.isCuff(target) || user.isTie(target)) {
                                player.notify("~r~Sis žmogus jau suristas ir (arba) prirakintas");
                                return;
                            }
                            if (target.health == 0) {
                                player.notify("~r~Negalima uždeti virves komos istiktam žmogui");
                                return;
                            }
                            if (target.vehicle) {
                                player.notify("~r~Grotuvas yra automobilyje");
                                return;
                            }

                            user.tie(target);
                        player.notify("~y~Susiejote žaidėja");
                        chat.sendMeCommand(player, "surišo šalia esantį vyrą.");
                        inventory.deleteItem(id);
                        chat.sendMeCommand(player, "naudojami užtrauktukai");
                        }
                        break;
                    }
                case 253:
                    {
                        chat.sendDiceCommand(player);
                        break;
                    }
                case 477:
                    {
                        graffiti.changeGraffiti(player);
                        break;
                    }
                case 537: {
                    try {
                        if (user.isInWeedZone(player) === false) return user.showCustomNotify(player, "Вы можете посадить только на плантации!", 1);
                        inventory.deleteItem(id);
                        user.plantWeed(player);
                    } catch (e) {
                        methods.debug(e);
                    }
                    break;
                }
                case 474:
                {
                    try {
                        let recipes = JSON.parse(user.get(player, 'recepts'));
                        if (recipes.includes(params.id)) {
                            player.notify('~r~Jus jau naudojote si recepta');
                            return;
                        }
                        recipes.push(params.id);
                        user.set(player, 'recepts', JSON.stringify(recipes));
                        inventory.deleteItem(id);
                        player.notify('~g~Isstudijavote recepta');
                        user.updateClientCache(player);
                    }
                    catch (e) {
                        methods.debug(e);
                    }
                    break;
                }
                case 251:
                {
                    player.call('client:startFishing', [params.upg]);
                    /*if (user.has(player, 'useFish')) {
                        player.notify('~r~Вы уже рыбачите');
                        return;
                    }
                    user.playScenario(player, 'WORLD_HUMAN_STAND_FISHING');
                    user.set(player, 'useFish', true);
                    setTimeout(function () {
                        if (user.isLogin(player)) {
                            player.call('client:startFishing', [params.upg]);
                            user.reset(player, 'useFish');
                        }
                    }, methods.getRandomInt(10000, 20000));*/
                    break;
                }
                case 2:
                {
                    if (user.has(player, 'useHeal')) {
                        player.notify('~r~Negalima taip dažnai vartoti narkotiku');
                        return;
                    }
                    chat.sendMeCommand(player, "vartojo kokainą");
                    user.setHealth(player, 100);
                    inventory.deleteItem(id);

                    user.addDrugLevel(player, 1, 200);
                    user.playDrugAnimation(player);

                    user.set(player, 'useHeal', true);
                    setTimeout(function () {
                        if (user.isLogin(player))
                            user.reset(player, 'useHeal');
                    }, 10000);
                    break;
                }
                case 158:
                {
                    if (user.has(player, 'useHeal')) {
                        player.notify('~r~Negalima taip dažnai vartoti narkotiku');
                        return;
                    }
                    chat.sendMeCommand(player, "vartojo amfetaminą");
                    user.setHealth(player, 100);
                    inventory.deleteItem(id);

                    user.addDrugLevel(player, 0, 200);
                    user.playDrugAnimation(player);

                    user.set(player, 'useHeal', true);
                    setTimeout(function () {
                        if (user.isLogin(player))
                            user.reset(player, 'useHeal');
                    }, 10000);
                    break;
                }
                case 159:
                {
                    if (user.has(player, 'useHeal')) {
                        player.notify('~r~Negalima taip dažnai vartoti narkotiku');
                        return;
                    }
                    chat.sendMeCommand(player, "suvartotas DMT");
                    user.setHealth(player, 100);
                    inventory.deleteItem(id);

                    user.addDrugLevel(player, 2, 200);
                    user.playDrugAnimation(player);

                    user.set(player, 'useHeal', true);
                    setTimeout(function () {
                        if (user.isLogin(player))
                            user.reset(player, 'useHeal');
                    }, 10000);
                    break;
                }
                case 160:
                {
                    if (user.has(player, 'useHeal')) {
                        player.notify('~r~Negalima taip dažnai vartoti narkotiku');
                        return;
                    }
                    chat.sendMeCommand(player, "vartojo mefedroną");
                    user.setHealth(player, 100);
                    inventory.deleteItem(id);

                    user.addDrugLevel(player, 5, 200);
                    user.playDrugAnimation(player);

                    user.set(player, 'useHeal', true);
                    setTimeout(function () {
                        if (user.isLogin(player))
                            user.reset(player, 'useHeal');
                    }, 10000);
                    break;
                }
                case 161:
                {
                    if (user.has(player, 'useHeal')) {
                        player.notify('~r~Negalima taip dažnai vartoti narkotiku');
                        return;
                    }
                    chat.sendMeCommand(player, "naudojo ketaminą");
                    user.setHealth(player, 100);
                    inventory.deleteItem(id);

                    user.addDrugLevel(player, 3, 200);
                    user.playDrugAnimation(player);

                    user.set(player, 'useHeal', true);
                    setTimeout(function () {
                        if (user.isLogin(player))
                            user.reset(player, 'useHeal');
                    }, 10000);
                    break;
                }
                case 162:
                {
                    if (user.has(player, 'useHeal')) {
                        player.notify('~r~Negalima taip dažnai vartoti narkotiku');
                        return;
                    }
                    chat.sendMeCommand(player, "vartojo LSD");
                    user.setHealth(player, 100);
                    inventory.deleteItem(id);

                    user.addDrugLevel(player, 4, 200);
                    user.playDrugAnimation(player);

                    user.set(player, 'useHeal', true);
                    setTimeout(function () {
                        if (user.isLogin(player))
                            user.reset(player, 'useHeal');
                    }, 10000);
                    break;
                }
                case 49:
                {
                    if (user.get(player,'fraction_id2') === 0) {
                        player.notify('~r~Reikia buti nusikalstamos organizacijos nariu');
                        return;
                    }

                    /*let dateTime = new Date();
                    if (dateTime.getHours() < 18 || dateTime.getHours() > 19) {
                        player.notify('~r~Доступно только с 18 до 19 вечера ООС времени');
                        return;
                    }*/

                    try {
                        if (params.type === 2 && !user.isMafia(player)) {
                            player.notify('~r~Mokymas prieinamas tik mafijai');
                            return;
                        }

                        let count = 2;
                        if (params.type === 2)
                            count = 3;
                        fraction.set(user.get(player,'fraction_id2'), 'grabBankFleeca', params.type);
                        fraction.set(user.get(player,'fraction_id2'), 'grabBankFleecaCar', count);
                        fraction.set(user.get(player,'fraction_id2'), 'grabBankFleecaPt', count);
                        fraction.set(user.get(player,'fraction_id2'), 'grabBankFleecaHp', count);
                        fraction.set(user.get(player,'fraction_id2'), 'grabBankFleecaOt', count);
                        fraction.set(user.get(player,'fraction_id2'), 'grabBankFleecaTimer', 60);

                        player.notify('~g~Prasidejo pasirengimas apiplesimui');
                        inventory.deleteItem(id);
                    }
                    catch (e) {
                        player.notify('~g~Ivyko klaida');
                    }
                    break;
                }
                case 3:
                {
                    if (user.has(player, 'useHeal')) {
                        player.notify('~r~Negalima taip dažnai vartoti narkotiku');
                        return;
                    }
                    chat.sendMeCommand(player, "naudojama marihuana");
                    user.playAnimation(player, "amb@world_human_smoking_pot@male@base", "base", 48);
                    user.setHealth(player, 100);
                    inventory.deleteItem(id);

                    user.set(player, 'useHeal', true);
                    setTimeout(function () {
                        if (user.isLogin(player))
                            user.reset(player, 'useHeal');
                    }, 10000);
                    break;
                }
                case 4:
                {

                    let pickId = bank.getLockPickDoorInRadius(player.position, 3);
                    if (pickId >= 0) {
                        bank.lockPickDoor(player, 3);
                        inventory.deleteItem(id);
                        return;
                    }

                    let veh = methods.getNearestVehicleWithCoords(player.position, 10);
                    if (!vehicles.exists(veh))
                    {
                        player.notify("~r~Reikia buti netoli automobilio");
                        return;
                    }

                    let vehInfo = methods.getVehicleInfo(veh.model);
                    if (vehInfo.fuel_type == 3)
                    {
                        player.notify("~r~Sios klases automobilius galima nulaužti telefonu");
                        return;
                    }

                    if (vehInfo.class_name == "Super")
                    {
                        player.notify("~r~Sios klases automobilius galima nulaužti telefonu");
                        return;
                    }

                    if (vehInfo.class_name == "Helicopters" || vehInfo.class_name == "Planes" || vehInfo.class_name == "Emergency")
                    {
                        player.notify("~r~Negalite isilaužti i sia transporto priemone");
                        return;
                    }

                    if (!veh.locked)
                    {
                        player.notify("~r~Transportas jau atrakintas");
                        return;
                    }
                    if (veh.getVariable('fraction_id') > 0 || veh.getVariable('isAdmin') || veh.getVariable('useless'))
                    {
                        player.notify("~r~Negalite isilaužti i sia transporto priemone");
                        return;
                    }

                    if(user.has(player, 'usingLockpick')) {
                        player.notify("~r~Jau naudojate picklock");
                        return;
                    }
                    user.playAnimation(player, "mp_arresting", "a_uncuff", 8);
                    user.set(player, 'usingLockpick', true);

                    setTimeout(function () {
                        try {

                            if (!user.isLogin(player))
                                return;

                            user.removeRep(player, 1);

                            if (!vehicles.exists(veh))
                            {
                                player.notify("~r~Nepavyksta nulaužti transporto");
                                user.reset(player, 'usingLockpick');
                                return;
                            }

                            if (methods.getRandomInt(0, 5) == 1)
                            {
                                user.removeRep(player, 5);
                                veh.locked = false;
                                player.notify("~g~Atrakinote transporta");
                            }
                            else
                            {
                                player.notify("~g~Jus sulaužete spynos užrakta");
                                inventory.deleteItem(id);
                            }
                            user.reset(player, 'usingLockpick');
                        }
                        catch (e) {
                            methods.debug(e);
                        }
                    }, 5000);
                    break;
                }
                case 5:
                {
                    if (player.dimension > 0) {
                        player.notify('~r~Negalite ivykdyti apiplesimo');
                        return;
                    }

                    let grabId2 = bank.getBombInRadius(player.position, 30);
                    if (grabId2.idx === -1) {
                        fraction.startGrabShopGang(player, id);
                        return;
                    }

                    let grabId = bank.getGrabInRadius(player.position);
                    if (user.isGos(player)) {
                        player.notify('~r~Esate vyriausybines organizacijos narys');
                        return;
                    }

                    let frId = user.get(player, 'fraction_id2');
                    if (frId === 0) {
                        player.notify("~r~Nesate nusikalstamos organizacijos narys");
                        return;
                    }

                    if (!fraction.has(frId, 'bankGrabId')) {
                        player.notify("~r~Jus negalite apiplesti sio banko");
                        return;
                    }

                    if (fraction.get(frId, 'bankGrabId') !== grabId2.idx) {
                        player.notify("~r~Jus negalite apiplesti sio banko");
                        return;
                    }

                    let dateTime = new Date();
                    if (dateTime.getHours() < 19 || dateTime.getHours() > 22) {
                        player.notify('~r~Galimybe naudotis tik nuo 19 iki 22 val. vakaro OOC laiku');
                        return;
                    }

                    if (user.has(player, 'isGrab')) {
                        player.notify('~r~Siuo metu sis veiksmas negalimas');
                        return;
                    }
                    let count = bank.grabPos[grabId][4];
                    if (count === 0) {
                        player.notify('~r~Visos lasteles yra tuscios');
                        return;
                    }

                    user.heading(player, bank.grabPos[grabId][3]);

                    user.set(player, 'isGrab', true);
                    user.playAnimation(player, "missheistfbisetup1", "unlock_loop_janitor", 9);
                    user.blockKeys(player, true);
                    bank.grabPos[grabId][4] = count - 1;

                    setTimeout(function () {
                        user.playAnimation(player, "anim@heists@ornate_bank@grab_cash", "grab", 9);
                        player.addAttachment('bagGrab');
                        player.addAttachment('cash');
                    }, 5000);

                    setTimeout(function () {
                        if (!user.isLogin(player))
                            return;

                        player.addAttachment('bagGrab', true);
                        player.addAttachment('cash', true);

                        if (methods.getRandomInt(0, 100) < 20) {
                            player.notify(`~y~Dežute pasirode esanti tuscia`);
                        }
                        else {
                            inventory.addItem(141, 1, inventory.types.Player, user.getId(player), methods.parseInt(methods.getRandomInt(3000, 5000)), 0, "{}", 2);
                        }

                        dispatcher.sendPos("Kodas 0", "Banke suveikė pavojaus signalas", player.position);
                        player.call('client:quest:gang:14');

                        user.blockKeys(player, false);
                        player.notify(`~y~Likusios lasteles ~s~${count - 1}`);

                        user.giveWanted(player, 10, 'Banko apiplėšimas');

                        user.reset(player, 'isGrab');
                        user.stopAnimation(player);
                        if (methods.getRandomInt(0, 2) === 0) {
                            inventory.deleteItem(id);
                            player.notify('~r~Jus sulaužete spynos užrakta');
                        }
                    }, 10000);
                    break;
                }
                case 262:
                {
                    if (user.isGos(player)) {
                        player.notify('~r~Esate vyriausybines organizacijos narys');
                        return;
                    }

                    let grabId = bank.getBombInRadius(player.position);
                    if (grabId.idx === -1) {
                        player.notify('~r~Esate per toli nuo duru');
                        return;
                    }

                    let frId = user.get(player, 'fraction_id2');
                    if (frId === 0) {
                        player.notify("~r~Nesate nusikalstamos organizacijos narys");
                        return;
                    }

                    if (!fraction.has(frId, 'grabBankFleecaDone')) {
                        player.notify("~r~Neivykdete užduoties ivykdyti apiplesima");
                        return;
                    }

                    if (grabId.type != fraction.get(frId, 'grabBankFleeca')) {
                        player.notify("~r~Jus negalite apiplesti sio banko");
                        return;
                    }

                    if (fraction.has(frId, 'bankGrabId')) {
                        player.notify("~r~Negalima taip apiplesti banko.");
                        return;
                    }

                    let dateTime = new Date();
                    if (dateTime.getHours() < 19 || dateTime.getHours() > 22) {
                        player.notify('~r~Galimybe naudotis tik nuo 19 iki 22 val. vakaro OOC laiku');
                        return;
                    }

                    if (player.dimension !== 0) {
                        player.notify("~r~Jokio plesikavimo salies viduje");
                        return;
                    }

                    fraction.set(frId, 'bankGrabId', grabId.idx);

                    inventory.deleteItem(id);
                    user.playAnimation(player, "mp_arresting", "a_uncuff", 8);

                    setTimeout(function () {
                        player.notify("~y~Sprogimas ivyks per ~s~10~y~sek.");

                        setTimeout(function () {
                            if (!user.isLogin(player))
                                return;
                            player.notify("~y~Sprogimas ivyks per ~s~5~y~sek.");
                        }, 5000);

                        setTimeout(function () {
                            if (!user.isLogin(player))
                                return;
                            player.notify("~y~Sprogimas ivyks per ~s~3~y~ sek.");
                        }, 7000);

                        setTimeout(function () {
                            try {
                                dispatcher.sendPos("Kodas 0", "Banke suveikė pavojaus signalas", player.position);
                                methods.explodeObject(bank.doorPos[grabId.idx][1], bank.doorPos[grabId.idx][2], bank.doorPos[grabId.idx][3]);
                                methods.deleteObject(bank.doorPos[grabId.idx][1], bank.doorPos[grabId.idx][2], bank.doorPos[grabId.idx][3], bank.doorPos[grabId.idx][0]);
                            }
                            catch (e) {
                                methods.debug(e);
                            }
                        }, 10000);
                    }, 5000);

                    break;
                }
                case 6:
                {
                    if (vehicles.exists(player.vehicle))
                    {
                        player.notify("~r~Turite buti prie atviro variklio dangcio");
                        return;
                    }
                    let veh = methods.getNearestVehicleWithCoords(player.position, 10, player.dimension);
                    if (!vehicles.exists(veh))
                    {
                        player.notify("~r~Turite buti salia automobilio.");
                        return;
                    }

                    let vehInfo = methods.getVehicleInfo(veh.model);
                    if (vehInfo.class_name == "Helicopters" || vehInfo.class_name == "Planes" || vehInfo.class_name == "Boats" || vehInfo.class_name == "Cycles")
                    {
                        player.notify("~r~Sios transporto priemones remontuoti negalima");
                        return;
                    }

                    if (!vSync.getHoodState(veh) && vehInfo.class_name != "Motorcycles")
                    {
                        player.notify("~r~Turi buti atidarytas variklio dangtis");
                        return;
                    }

                    if (veh.broke) {
                        player.notify("~g~Sekmingai suremontavote automobili, dabar galite sesti i ji ir vykti i oro uosta.");
                        veh.broke = false;
                        inventory.deleteItem(id);
                        user.playAnimation(player, "amb@medic@standing@kneel@enter", "enter", 8);
                        return;
                    }

                    try {
                        vehicles.set(veh.getVariable('container'), 's_eng', 100);
                    }
                    catch (e) {}
                    veh.engineHealth = 1000.0;

                    user.playAnimation(player, "amb@medic@standing@kneel@enter", "enter", 8);
                    player.notify("~g~Sekmingai suremontavote automobili");
                    inventory.deleteItem(id);
                    break;
                }
                case 8:
                {
                    if (vehicles.exists(player.vehicle))
                    {
                        player.notify("~r~Turite buti netoli transporto");
                        return;
                    }

                    let veh = methods.getNearestVehicleWithCoords(player.position, 10, player.dimension);
                    if (!vehicles.exists(veh))
                    {
                        player.notify("~r~Reikia buti netoli automobilio");
                        return;
                    }

                    let vehInfo = methods.getVehicleInfo(veh.model);
                    if (vehInfo.fuel_type != 4)
                    {
                        player.notify("~r~Sio tipo degalai netinka siai transporto priemonei");
                        return;
                    }

                    let currentFuel = vehicles.getFuel(veh);
                    if (vehInfo.fuel_full < currentFuel + 10)
                    {
                        player.notify("~r~Pilnas transporto priemones bakas");
                        return;
                    }
                    vehicles.setFuel(veh, currentFuel + 10);
                    player.notify("~g~I transporto priemone ipylėte 10 litru degalu.");
                    inventory.deleteItem(id);
                    break;
                }
                case 9:
                {
                    if (vehicles.exists(player.vehicle))
                    {
                        player.notify("~r~Turite buti netoli transporto");
                        return;
                    }
                    let veh = methods.getNearestVehicleWithCoords(player.position, 10, player.dimension);
                    if (!vehicles.exists(veh))
                    {
                        player.notify("~r~Reikia buti netoli automobilio");
                        return;
                    }

                    let vehInfo = methods.getVehicleInfo(veh.model);
                    if (vehInfo.fuel_type != 1)
                    {
                        player.notify("~r~Sio tipo degalai netinka siai transporto priemonei");
                        return;
                    }


                    let currentFuel = vehicles.getFuel(veh);

                    if (vehInfo.fuel_full < currentFuel + 10)
                    {
                        player.notify("~r~Pilnas transporto priemones bakas");
                        return;
                    }

                    if (veh.prolog)
                        vehicles.setFuel(veh, currentFuel + 40);
                    else
                        vehicles.setFuel(veh, currentFuel + 10);

                    player.notify("~g~I transporto priemone ipylete 10 litru degalu.");
                    inventory.deleteItem(id);
                    break;
                }
                case 10:
                {
                    if (vehicles.exists(player.vehicle))
                    {
                        player.notify("~r~Turite buti netoli transporto");
                        return;
                    }
                    let veh = methods.getNearestVehicleWithCoords(player.position, 10, player.dimension);
                    if (!vehicles.exists(veh))
                    {
                        player.notify("~r~Reikia buti netoli automobilio");
                        return;
                    }

                    let vehInfo = methods.getVehicleInfo(veh.model);
                    if (vehInfo.fuel_type != 2)
                    {
                        player.notify("~r~Sio tipo degalai netinka siai transporto priemonei");
                        return;
                    }

                    let currentFuel = vehicles.getFuel(veh);

                    if (vehInfo.fuel_full < currentFuel + 10)
                    {
                        player.notify("~r~Pilnas transporto priemones bakas");
                        return;
                    }

                    vehicles.setFuel(veh, currentFuel + 10);
                    player.notify("~g~I transporto priemone ipylete 10 litru degalu.");
                    inventory.deleteItem(id);
                    break;
                }
                case 47:
                {
                    if (ctos.setRadioBlackout(player) || ctos.setRadioNetwork(player))
                        inventory.deleteItem(id);
                    break;
                }
                case 232:
                case 233:
                case 234:
                case 235:
                case 236:
                case 237:
                case 238:
                case 239:
                case 240:
                {
                    user.addEatLevel(player, 800);
                    chat.sendMeCommand(player, "Valgo žuvį");
                    inventory.deleteItem(id);
                    user.playEatAnimation(player);
                    break;
                }
                case 11:
                {
                    user.addEatLevel(player, 500);
                    chat.sendMeCommand(player, "valgo " + items.getItemNameById(itemId));
                    inventory.deleteItem(id);
                    user.playEatAnimation(player);
                    break;
                }
                case 12:
                {
                    user.addWaterLevel(player, 300);
                    user.addEatLevel(player, 400);
                    chat.sendMeCommand(player, "valgo " + items.getItemNameById(itemId));
                    inventory.deleteItem(id);
                    user.playEatAnimation(player);
                    break;
                }
                case 13:
                {
                    user.addEatLevel(player, 300);
                    chat.sendMeCommand(player, "valgo " + items.getItemNameById(itemId));
                    inventory.deleteItem(id);
                    user.playEatAnimation(player);
                    break;
                }
                case 14:
                {
                    user.addEatLevel(player, 100);
                    chat.sendMeCommand(player, "valgo " + items.getItemNameById(itemId));
                    inventory.deleteItem(id);
                    user.playEatAnimation(player);
                    break;
                }
                case 15:
                case 16:
                {
                    user.addWaterLevel(player, 150);
                    user.addEatLevel(player, 400);
                    chat.sendMeCommand(player, "valgo " + items.getItemNameById(itemId));
                    inventory.deleteItem(id);
                    user.playEatAnimation(player);
                    break;
                }
                case 17:
                {
                    user.addEatLevel(player, 250);
                    chat.sendMeCommand(player, "valgo " + items.getItemNameById(itemId));
                    inventory.deleteItem(id);
                    user.playEatAnimation(player);
                    break;
                }
                case 18:
                {
                    user.addEatLevel(player, 200);
                    chat.sendMeCommand(player, "valgo " + items.getItemNameById(itemId));
                    inventory.deleteItem(id);
                    user.playEatAnimation(player);
                    break;
                }
                case 19:
                {
                    user.addWaterLevel(player, 150);
                    user.addEatLevel(player, 300);
                    chat.sendMeCommand(player, "valgo " + items.getItemNameById(itemId));
                    inventory.deleteItem(id);
                    user.playEatAnimation(player);
                    break;
                }
                case 20:
                {
                    user.addEatLevel(player, 500);
                    chat.sendMeCommand(player, "valgo " + items.getItemNameById(itemId));
                    inventory.deleteItem(id);
                    user.playEatAnimation(player);
                    break;
                }
                case 21:
                {
                    user.addEatLevel(player, 150);
                    chat.sendMeCommand(player, "valgo " + items.getItemNameById(itemId));
                    inventory.deleteItem(id);
                    user.playEatAnimation(player);
                    break;
                }
                case 22:
                {
                    user.addWaterLevel(player, 50);
                    user.addEatLevel(player, 250);
                    chat.sendMeCommand(player, "valgo " + items.getItemNameById(itemId));
                    inventory.deleteItem(id);
                    user.playEatAnimation(player);
                    break;
                }
                case 23:
                {
                    user.addWaterLevel(player, 50);
                    user.addEatLevel(player, 200);
                    chat.sendMeCommand(player, "valgo " + items.getItemNameById(itemId));
                    inventory.deleteItem(id);
                    user.playEatAnimation(player);
                    break;
                }
                case 24:
                {
                    user.addWaterLevel(player, 100);
                    user.addEatLevel(player, 250);
                    chat.sendMeCommand(player, "valgo " + items.getItemNameById(itemId));
                    inventory.deleteItem(id);
                    user.playEatAnimation(player);
                    break;
                }
                case 25:
                {
                    user.addWaterLevel(player, 50);
                    user.addEatLevel(player, 300);
                    chat.sendMeCommand(player, "valgo " + items.getItemNameById(itemId));
                    inventory.deleteItem(id);
                    user.playEatAnimation(player);
                    break;
                }
                case 241:
                {
                    user.addEatLevel(player, 50);
                    user.addWaterLevel(player, 300);
                    chat.sendMeCommand(player, "Gėrimai " + items.getItemNameById(itemId));
                    inventory.deleteItem(id);
                    user.playDrinkAnimation(player);
                    break;
                }
                case 242:
                {
                    user.addWaterLevel(player, 500);
                    chat.sendMeCommand(player, "Gėrimai " + items.getItemNameById(itemId));
                    inventory.deleteItem(id);
                    user.playDrinkAnimation(player);
                    break;
                }
                case 243:
                case 244:
                case 245:
                case 246:
                case 247:
                case 248:
                case 249:
                case 250:
                {
                    user.addWaterLevel(player, 50);
                    chat.sendMeCommand(player, "Gėrimai " + items.getItemNameById(itemId));
                    inventory.deleteItem(id);
                    user.playDrinkAnimation(player);
                    user.addDrugLevel(player, 99, 200);
                    break;
                }
                case 32:
                {
                    user.addWaterLevel(player, 600);
                    user.addEatLevel(player, 600);
                    chat.sendMeCommand(player, "Valgo supakuotą maistą");
                    inventory.deleteItem(id);
                    user.playEatAnimation(player);
                    break;
                }
                case 26:
                {
                    chat.sendMeCommand(player, "surūko cigaretę");
                    user.playScenario(player, 'WORLD_HUMAN_AA_SMOKE');
                    inventory.deleteItem(id);
                    break;
                }
                case 40:
                {
                    let target = methods.getNearestPlayerWithPlayer(player, 1.2);
                    if (!user.isLogin(target))
                    {
                        player.notify("~r~Salia jusu nera ne vieno žmogaus");
                        return;
                    }
                    if (user.isCuff(target) || user.isTie(target)) {
                        player.notify("~r~Sis žmogus jau suristas ir (arba) prirakintas");
                        return;
                    }

                    if (!user.isGos(player)) {
                        player.notify("~y~Vyriausybines agenturos gali naudoti antrankius");
                        return;
                    }

                    /*if (target.health == 0) {
                        player.notify("~r~Нельзя надевать наручники на человека в коме");
                        return;
                    }*/
                    if (target.vehicle) {
                        player.notify("~r~Žaidejas yra automobilyje");
                        return;
                    }

                    user.heading(target, player.heading);
                    user.cuff(target);
                    chat.sendMeCommand(player, "naudojo antrankius");

                    setTimeout(function () {
                        user.playAnimation(target, 'mp_arrest_paired', 'crook_p2_back_right', 8);
                        user.playAnimation(player, 'mp_arrest_paired', 'cop_p2_back_right', 8);

                        setTimeout(function () {
                            try {
                                user.cuff(target);
                                inventory.deleteItem(id);
                            }
                            catch (e) {
                                methods.debug(e);
                            }
                        }, 3800); //3760
                    }, 200);
                    break;
                }
                case 215:
                {
                    if (user.has(player, 'useHeal')) {
                        player.notify('~r~Pirmosios pagalbos rinkiniu negalima naudoti taip dažnai');
                        return;
                    }

                    if (player.health < 1) {
                        player.notify('~r~Negalima naudoti bunant mirusiam');
                        return;
                    }

                    chat.sendMeCommand(player, "naudojosi pirmosios pagalbos rinkiniu");
                    if (player.health >= 40)
                        user.setHealth(player, 100);
                    else
                        user.setHealth(player, player.health + 60);
                    inventory.deleteItem(id);
                    user.playDrugAnimation(player);
                    user.set(player, 'useHeal', true);
                    setTimeout(function () {
                        if (user.isLogin(player))
                            user.reset(player, 'useHeal');
                    }, 30000);
                    break;
                }
                case 216:
                {
                    if (user.has(player, 'useHeal')) {
                        player.notify('~r~Pirmosios pagalbos rinkiniu negalima naudoti taip dažnai');
                        return;
                    }

                    if (player.health < 1) {
                        player.notify('~r~Negalima naudoti bunant mirusiam');
                        return;
                    }

                    /*if (player.health < 1 && isTargetable) {
                        user.revive(player);
                    }*/

                    chat.sendMeCommand(player, "naudojo tvarstį");
                    if (player.health >= 80)
                        user.setHealth(player, 100);
                    else
                        user.setHealth(player, player.health + 20);
                    inventory.deleteItem(id);
                    user.playAnimation(player, 'oddjobs@bailbond_hobotwitchy', 'base', 48);

                    user.set(player, 'useHeal', true);

                    setTimeout(function () {
                        if (user.isLogin(player))
                            user.reset(player, 'useHeal');
                    }, 30000);
                    break;
                }
                case 278:
                {
                    if (user.has(player, 'useHeal')) {
                        player.notify('~r~Pirmosios pagalbos rinkiniu negalima naudoti taip dažnai');
                        return;
                    }

                    if (player.health < 1) {
                        player.notify('~r~Negalima naudoti bunant mirusiam');
                        return;
                    }

                    /*if (player.health < 1 && isTargetable) {
                        user.revive(player);
                    }*/

                    chat.sendMeCommand(player, "naudojosi pirmosios pagalbos rinkiniu");
                    user.setHealth(player, 100);
                    inventory.deleteItem(id);
                    user.playDrugAnimation(player);
                    user.set(player, 'useHeal', true);

                    setTimeout(function () {
                        if (user.isLogin(player))
                            user.reset(player, 'useHeal');
                    }, 20000);
                    break;
                }
                case 221:
                {
                    if (user.has(player, 'useHeal1')) {
                        player.notify('~r~Nereiketu taip dažnai vartoti tableciu');
                        return;
                    }

                    chat.sendMeCommand(player, "suvartojo tabletę");

                    user.setDrugLevel(player, 0, 0);
                    user.setDrugLevel(player, 1, 0);
                    user.setDrugLevel(player, 2, 0);
                    user.setDrugLevel(player, 3, 0);
                    user.setDrugLevel(player, 4, 0);
                    user.setDrugLevel(player, 5, 0);
                    user.setDrugLevel(player, 99, 0);

                    user.stopAllScreenEffects(player);
                    user.playDrugAnimation(player);

                    inventory.deleteItem(id);

                    user.set(player, 'useHeal1', true);
                    setTimeout(function () {
                        if (user.isLogin(player))
                            user.reset(player, 'useHeal1');
                    }, 60000);
                    break;
                }
            }
        });
    } catch(e) {
        methods.debug(e);
    }
};

inventory.types = {
    World : 0,
    Player : 1,
    BagArm : 2,
    Condo : 3,
    BagSmall : 4,
    House : 5,
    Apartment : 6,
    Bag : 7,
    Vehicle : 8,
    StockGov : 9,
    Fridge : 10,
    StockTakeWeap : 11,
    TradeBeach : 12,
    TradeBlack : 13,
    UserStockDef : 75,
    UserStock : 100,
    UserStockEnd : 200,
};