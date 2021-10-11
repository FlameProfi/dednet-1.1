let mysql = require('./modules/mysql');
let methods = require('./modules/methods');
let chat = require('./modules/chat');

let discord = require('./managers/discord');

let user = require('./user');

let admin = exports;

admin.giveLeader = function(player, type, id, listIndex) {
    try {

        methods.debug('admin.giveLeader');

        if (!user.isAdmin(player))
            return;

        id = methods.parseInt(id);

        if (type === 0) {
            let target = mp.players.at(id);
            if (!user.isLogin(target)) {
                player.notify('~r~Žaidejas nerastas serveryje.');
                return;
            }

            user.set(target, 'fraction_id', listIndex);
            user.set(target, 'is_leader', listIndex > 0);
            user.set(target, 'is_sub_leader', false);
            user.set(target, 'rank1', 0);
            user.set(target, 'rank_type1', 0);

            user.updateClientCache(target);

            target.notify(`~b~Administratorius ${user.getRpName(player)} suteikta prieiga ${user.getRpName(target)} organizacijai ${user.getFractionName(target)}`);
            player.notify(`~b~Administratorius ${user.getRpName(player)} suteikta prieiga ${user.getRpName(target)} organizacijai ${user.getFractionName(target)}`);
        }
        else {
            let target = user.getPlayerById(id);
            if (user.isLogin(target)) {
                admin.giveLeader(player, 0, target.id, listIndex);
                return;
            }

            mysql.executeQuery(`UPDATE users SET fraction_id = '${listIndex}', is_leader = '${listIndex > 0 ? 1 : 0}' WHERE id = '${id}'`);
            player.notify('~r~Jus davete žaidejui lyderi ' + id);
        }
    }
    catch (e) {
        methods.debug(e);
    }
};

admin.blacklist = function(player, type, id, reason) {
    try {
        if (!user.isAdmin(player))
            return;

        id = methods.parseInt(id);

        if (type === 0) {
            let target = mp.players.at(id);
            if (!user.isLogin(target)) {
                player.notify('~r~Žaidejas nerastas serveryje.');
                return;
            }

            mysql.executeQuery(`INSERT INTO black_list (social, serial, rgsc_id, address, reason) VALUES ('${target.socialClub}', '${target.serial}', '${target._rgscId}', '${target.ip}', '${reason}')`);
            chat.sendToAll(`Administratorius ${user.getRpName(player)}`, `${user.getRpName(target)}!{${chat.clRed}} buvo įtrauktas į juodąjį projekto sąrašą su priežastimi!{${chat.clWhite}} ${reason}`, chat.clRed);
            user.kick(target, reason, 'BlackList');
            discord.sendDeadList(user.getRpName(target), 'Į juodąjį sąrašą įtrauktas žaidėjas', reason, user.getRpName(player), discord.socialClub + player.socialClub.toLowerCase());
        }
        else {
            let target = user.getPlayerById(id);
            if (!user.isLogin(target)) {
                player.notify('~r~Žaidejas nerastas serveryje.');
                return;
            }
            admin.blacklist(player, 0, target.id, reason);
        }
    }
    catch (e) {
        methods.debug(e);
    }
};

admin.ban = function(player, type, id, listIndex, reason) {
    try {
        if (!user.isAdmin(player))
            return;

        id = methods.parseInt(id);

        let timeStr = ['1h', '6h', '12h', '1d', '3d', '7d', '14d', '30d', '60d', '90d', 'Permanent'];
        let timeFormat = 1;

        switch (listIndex)
        {
            case 0:
                timeFormat = 1 * 60 * 60;
                break;
            case 1:
                timeFormat = 6 * 60 * 60;
                break;
            case 2:
                timeFormat = 12 * 60 * 60;
                break;
            case 3:
                timeFormat = 1 * 60 * 60 * 24;
                break;
            case 4:
                timeFormat = 3 * 60 * 60 * 24;
                break;
            case 5:
                timeFormat = 7 * 60 * 60 * 24;
                break;
            case 6:
                timeFormat = 14 * 60 * 60 * 24;
                break;
            case 7:
                timeFormat = 30 * 60 * 60 * 24;
                break;
            case 8:
                timeFormat = 60 * 60 * 60 * 24;
                break;
            case 9:
                timeFormat = 90 * 60 * 60 * 24;
                break;
            case 10:
                timeFormat = 5 * 365 * 60 * 60 * 24;
                break;
        }

        if (type === 0) {
            let target = mp.players.at(id);
            if (!user.isLogin(target)) {
                player.notify('~r~Žaidejas nerastas serveryje.');
                return;
            }

            user.set(target, 'date_ban', methods.getTimeStamp() + timeFormat);
            mysql.executeQuery(`INSERT INTO ban_list (ban_from, ban_to, count, datetime, reason) VALUES ('${user.getRpName(player)}', '${user.getRpName(target)}', '${timeStr[listIndex]}', '${methods.getTimeStamp()}', '${reason}')`);

            chat.sendToAll(`Administratorius ${user.getRpName(player)}`, `${user.getRpName(target)}!{${chat.clRed}} buvo užblokuotas dėl priežasties!{${chat.clWhite}} ${reason}`, chat.clRed);

            discord.sendDeadList(user.getRpName(target), 'Užblokuota ' + timeStr[listIndex], reason, user.getRpName(player), discord.socialClub + player.socialClub.toLowerCase());

            user.kick(target, reason, 'Jūs esate užblokuotas');
        }
        else {
            let target = user.getPlayerById(id);
            if (user.isLogin(target)) {
                admin.ban(player, 0, target.id, listIndex, reason);
                return;
            }

            mysql.executeQuery(`SELECT * FROM users WHERE id = '${methods.parseInt(id)}'`, (err, rows, fields) => {
                rows.forEach(row => {
                    mysql.executeQuery(`INSERT INTO ban_list (ban_from, ban_to, count, datetime, reason) VALUES ('${user.getRpName(player)}', '${row['name']}', '${timeStr[listIndex]}', '${methods.getTimeStamp()}', '${reason}')`);
                    mysql.executeQuery(`UPDATE users SET date_ban = '${methods.getTimeStamp() + timeFormat}' WHERE id = '${id}'`);

                    chat.sendToAll(`Administratorius ${user.getRpName(player)}`, `${row['name']}!{${chat.clRed}} buvo užblokuotas dėl priežasties!{${chat.clWhite}} ${reason}`, chat.clRed);

                    discord.sendDeadList(row['name'], 'Užblokuota ' + timeStr[listIndex], reason, user.getRpName(player), discord.socialClub + player.socialClub.toLowerCase());
                })
            });
        }
    }
    catch (e) {
        methods.debug(e);
    }
};

admin.banByAnticheat = function(type, id, listIndex, reason) {
    try {
        id = methods.parseInt(id);

        let timeStr = ['1h', '6h', '12h', '1d', '3d', '7d', '14d', '30d', '60d', '90d', 'Permanent'];
        let timeFormat = 1;

        switch (listIndex)
        {
            case 0:
                timeFormat = 1 * 60 * 60;
                break;
            case 1:
                timeFormat = 6 * 60 * 60;
                break;
            case 2:
                timeFormat = 12 * 60 * 60;
                break;
            case 3:
                timeFormat = 1 * 60 * 60 * 24;
                break;
            case 4:
                timeFormat = 3 * 60 * 60 * 24;
                break;
            case 5:
                timeFormat = 7 * 60 * 60 * 24;
                break;
            case 6:
                timeFormat = 14 * 60 * 60 * 24;
                break;
            case 7:
                timeFormat = 30 * 60 * 60 * 24;
                break;
            case 8:
                timeFormat = 60 * 60 * 60 * 24;
                break;
            case 9:
                timeFormat = 90 * 60 * 60 * 24;
                break;
            case 10:
                timeFormat = 5 * 365 * 60 * 60 * 24;
                break;
        }

        if (type === 0) {
            let target = mp.players.at(id);
            if (!user.isLogin(target))
                return;

            user.set(target, 'date_ban', methods.getTimeStamp() + timeFormat);
            mysql.executeQuery(`INSERT INTO ban_list (ban_from, ban_to, count, datetime, reason) VALUES ('Server', '${user.getRpName(target)}', '${timeStr[listIndex]}', '${methods.getTimeStamp()}', '${reason}')`);

            chat.sendToAll(`Anti-Cheat Protection`, `${user.getRpName(target)}!{${chat.clRed}} buvo užblokuotas su priežastimi !{${chat.clWhite}} ${reason}`, chat.clRed);

            discord.sendDeadList(user.getRpName(target), 'Užblokuotas už ' + timeStr[listIndex], reason, 'Anti-Cheat Protection');

            user.kick(target, reason, 'Jus esate užblokuotas');
        }
        else {
            let target = user.getPlayerById(id);
            if (user.isLogin(target)) {
                admin.banByAnticheat(0, target.id, listIndex, reason);
                return;
            }

            mysql.executeQuery(`SELECT * FROM users WHERE id = '${methods.parseInt(id)}'`, (err, rows, fields) => {
                rows.forEach(row => {
                    mysql.executeQuery(`INSERT INTO ban_list (ban_from, ban_to, count, datetime, reason) VALUES ('Server', '${row['name']}', '${timeStr[listIndex]}', '${methods.getTimeStamp()}', '${reason}')`);
                    mysql.executeQuery(`UPDATE users SET date_ban = '${methods.getTimeStamp() + timeFormat}' WHERE id = '${id}'`);

                    chat.sendToAll(`Anti-Cheat Protection`, `${row['name']}!{${chat.clRed}} buvo užblokuotas su priežastimi!{${chat.clWhite}} ${reason}`, chat.clRed);

                    discord.sendDeadList(row['name'], 'Užblokuotas už ' + timeStr[listIndex], reason, 'Anti-Cheat Protection');
                })
            });
        }
    }
    catch (e) {
        methods.debug(e);
    }
};

admin.unban = function(player, type, id, reason) {
    try {
        if (!user.isAdmin(player))
            return;

        id = methods.parseInt(id);

        if (type === 0) {
            player.notify('~r~Galima naudoti tik statiniams ID.');
        }
        else {
            let target = user.getPlayerById(id);
            if (user.isLogin(target)) {
                player.notify('~r~Žaidejas dabar yra serveryje. Jo ID: ~s~' + target.id);
                return;
            }

            mysql.executeQuery(`SELECT * FROM users WHERE id = '${methods.parseInt(id)}'`, (err, rows, fields) => {
                rows.forEach(row => {
                    mysql.executeQuery(`INSERT INTO ban_list (ban_from, ban_to, count, datetime, reason) VALUES ('${user.getRpName(player)}', '${row['name']}', 'Atblokavimas', '${methods.getTimeStamp()}', '${reason}')`);
                    mysql.executeQuery(`UPDATE users SET date_ban = '0' WHERE id = '${id}'`);

                    chat.sendToAll(`Administratorius ${user.getRpName(player)}`, `${row['name']}!{${chat.clRed}} atblokavo su priežastimi!{${chat.clWhite}} ${reason}`, chat.clRed);
                    discord.sendDeadList(row['name'], 'Atblokuotas', reason, user.getRpName(player), discord.socialClub + player.socialClub.toLowerCase());
                })
            });
        }
    }
    catch (e) {
        methods.debug(e);
    }
};

admin.warn = function(player, type, id, reason) {
    try {
        if (!user.isAdmin(player))
            return;

        id = methods.parseInt(id);

        if (type === 0) {
            let target = mp.players.at(id);
            if (!user.isLogin(target)) {
                player.notify('~r~Žaidejo nera serveryje.');
                return;
            }
            chat.sendToAll(`Administratorius ${user.getRpName(player)}`, `${user.getRpName(target)}!{${chat.clRed}} davė įspėjimą su priežastimi!{${chat.clWhite}} ${reason}`, chat.clRed);
            discord.sendDeadList(user.getRpName(target), 'Buvo duotas įspėjimas', reason, user.getRpName(player), discord.socialClub + player.socialClub.toLowerCase(), "#FFEB3B");
            user.warn(target, 1, reason, false);
        }
        else {
            let target = user.getPlayerById(id);
            if (!user.isLogin(target)) {
                player.notify('~r~Žaidejo nera serveryje.');
                return;
            }
            chat.sendToAll(`Administratorius ${user.getRpName(player)}`, `${user.getRpName(target)}!{${chat.clRed}} davė įspėjimą su priežastimi!{${chat.clWhite}} ${reason}`, chat.clRed);
            discord.sendDeadList(user.getRpName(target), 'Buvo duotas įspėjimas', reason, user.getRpName(player), discord.socialClub + player.socialClub.toLowerCase(), "#FFEB3B");
            user.warn(target, 1, reason, false);
        }
    }
    catch (e) {
        methods.debug(e);
    }
};

admin.unwarn = function(player, type, id, reason) {
    try {
        if (!user.isAdmin(player))
            return;

        id = methods.parseInt(id);

        if (type === 0) {
            let target = mp.players.at(id);
            if (!user.isLogin(target)) {
                player.notify('~r~Žaidejo nera serveryje.');
                return;
            }
            chat.sendToAll(`Administratorius ${user.getRpName(player)}`, `${user.getRpName(target)}!{${chat.clRed}} nuėmė įspėjimą su priežastimi!{${chat.clWhite}} ${reason}`, chat.clRed);
            discord.sendDeadList(user.getRpName(target), 'Buvo nuimtas įspėjimas', reason, user.getRpName(player), discord.socialClub + player.socialClub.toLowerCase(), "#FFEB3B");
            user.warn(target, -1, reason, false);
        }
        else {
            let target = user.getPlayerById(id);
            if (!user.isLogin(target)) {
                player.notify('~r~Žaidejo nera serveryje.');
                return;
            }
            chat.sendToAll(`Administratorius ${user.getRpName(player)}`, `${user.getRpName(target)}!{${chat.clRed}} nuėmė įspėjimą su priežastimi!{${chat.clWhite}} ${reason}`, chat.clRed);
            discord.sendDeadList(user.getRpName(target), 'Buvo nuimtas įspėjimas', reason, user.getRpName(player), discord.socialClub + player.socialClub.toLowerCase(), "#FFEB3B");
            user.warn(target, -1, reason, false);
        }
    }
    catch (e) {
        methods.debug(e);
    }
};

admin.untimer = function(player, type, id, reason) {
    try {
        if (!user.isAdmin(player))
            return;

        id = methods.parseInt(id);

        if (type === 0) {
            let target = mp.players.at(id);
            if (!user.isLogin(target)) {
                player.notify('~r~Žaidejo nera serveryje.');
                return;
            }
            chat.sendToAll(`Administratorius ${user.getRpName(player)}`, `${user.getRpName(target)}!{${chat.clRed}} atšaukė ginklų gavimo pertrauką su priežastimi!{${chat.clWhite}} ${reason}`, chat.clRed);
            discord.sendDeadList(user.getRpName(target), 'Buvo atšaukta ginklų gavimo pertrauka', reason, user.getRpName(player), discord.socialClub + player.socialClub.toLowerCase(), "#FFEB3B");
            user.set(target, 'online_lspd', 0);

            methods.saveLog('log_admin', ['name', 'type', 'do'], [`${user.getRpName(player)}`, 'USER_REMOVE_TIMEOUT_LSPD', `${user.getRpName(target)}`]);
        }
        else {
            let target = user.getPlayerById(id);
            if (!user.isLogin(target)) {
                player.notify('~r~Žaidejo nera serveryje.');
                return;
            }
            chat.sendToAll(`Administratorius ${user.getRpName(player)}`, `${user.getRpName(target)}!{${chat.clRed}} atšaukė ginklų gavimo pertrauką su priežastimi!{${chat.clWhite}} ${reason}`, chat.clRed);
            discord.sendDeadList(user.getRpName(target), 'Buvo atšaukta ginklų gavimo pertrauka', reason, user.getRpName(player), discord.socialClub + player.socialClub.toLowerCase(), "#FFEB3B");
            user.set(target, 'online_lspd', 0);

            methods.saveLog('log_admin', ['name', 'type', 'do'], [`${user.getRpName(player)}`, 'USER_REMOVE_TIMEOUT_LSPD', `${user.getRpName(target)}`]);
        }
    }
    catch (e) {
        methods.debug(e);
    }
};

admin.kick = function(player, type, id, reason) {
    try {
        if (!user.isAdmin(player))
            return;

        id = methods.parseInt(id);

        if (type === 0) {
            let target = mp.players.at(id);
            if (!user.isLogin(target)) {
                player.notify('~r~Žaidejo nera serveryje.');
                return;
            }
            chat.sendToAll(`Administratorius ${user.getRpName(player)}`, `${user.getRpName(target)}!{${chat.clRed}} iškickino su priežastimi!{${chat.clWhite}} ${reason}`, chat.clRed);
            user.kick(target, reason);

            discord.sendDeadList(user.getRpName(target), 'Buvo iškickintas', reason, user.getRpName(player), discord.socialClub + player.socialClub.toLowerCase(), "#FFEB3B");
        }
        else {
            let target = user.getPlayerById(id);
            if (!user.isLogin(target)) {
                player.notify('~r~Žaidejo nera serveryje.');
                return;
            }
            chat.sendToAll(`Administratorius ${user.getRpName(player)}`, `${user.getRpName(target)}!{${chat.clRed}} iškickino su priežastimi!{${chat.clWhite}} ${reason}`, chat.clRed);
            user.kick(target, reason);

            discord.sendDeadList(user.getRpName(target), 'Buvo iškickintas', reason, user.getRpName(player), discord.socialClub + player.socialClub.toLowerCase(), "#FFEB3B");
        }
    }
    catch (e) {
        methods.debug(e);
    }
};

admin.jail = function(player, type, id, min, reason) {
    try {
        if (!user.isAdmin(player))
            return;

        id = methods.parseInt(id);

        if (type === 0) {
            let target = mp.players.at(id);
            if (!user.isLogin(target)) {
                player.notify('~r~Žaidejo nera serveryje.');
                return;
            }
            user.jail(target, min * 60, 1);
            chat.sendToAll(`Administratorius ${user.getRpName(player)}`, `${user.getRpName(target)}!{${chat.clRed}} pasodino į kalėjimą ${min}min. su priežastimis!{${chat.clWhite}} ${reason}`, chat.clRed);

            mysql.executeQuery(`INSERT INTO ban_list (ban_from, ban_to, count, datetime, reason) VALUES ('${user.getRpName(player)}', '${user.getRpName(target)}', 'Įkalinimas ${min}min.', '${methods.getTimeStamp()}', '${reason}')`);
            discord.sendDeadList(user.getRpName(target), 'Pasodino į kalėjimą', reason, user.getRpName(player), discord.socialClub + player.socialClub.toLowerCase(), "#FF9800");
        }
        else {
            let target = user.getPlayerById(id);
            if (user.isLogin(target)) {
                admin.jail(player, 0, target.id, min, reason);
                return;
            }

            mysql.executeQuery(`SELECT * FROM users WHERE id = '${methods.parseInt(id)}'`, (err, rows, fields) => {
                rows.forEach(row => {
                    mysql.executeQuery(`INSERT INTO ban_list (ban_from, ban_to, count, datetime, reason) VALUES ('${user.getRpName(player)}', '${row['name']}', Įkalinimas ${min}min.', '${methods.getTimeStamp()}', '${reason}')`);
                    mysql.executeQuery(`UPDATE users SET jail_time = '${min * 60}', jail_type = '1' WHERE id = '${id}'`);
                    chat.sendToAll(`Administratorius ${user.getRpName(player)}`, `${row['name']}!{${chat.clRed}} pasodino į kalėjimą ${min}min. su priežastimi!{${chat.clWhite}} ${reason}`, chat.clRed);
                    discord.sendDeadList(row['name'], 'Pasodino į kalėjimą', reason, user.getRpName(player), discord.socialClub + player.socialClub.toLowerCase(), "#FF9800");
                })
            });
        }
    }
    catch (e) {
        methods.debug(e);
    }
};

admin.setArmorById = function(player, type, id, num) {
    try {
        if (!user.isAdmin(player))
            return;

        id = methods.parseInt(id);

        if (type === 0) {
            let target = mp.players.at(id);
            if (!user.isLogin(target)) {
                player.notify('~r~Žaidejo nera serveryje.');
                return;
            }

            user.setArmour(target, num);

            target.notify(`~b~Administratorius ${user.getRpName(player)} dave ${num}% sarvu ${user.getRpName(target)}`);
            player.notify(`~b~Administratorius ${user.getRpName(player)} dave ${num}% sarvu ${user.getRpName(target)}`);

            methods.saveLog('log_admin', ['name', 'type', 'do'], [`${user.getRpName(player)}`, 'USER_ARMOUR', `${user.getRpName(target)} | ${num}`]);
        }
        else {
            let target = user.getPlayerById(id);
            if (!user.isLogin(target)) {
                player.notify('~r~Žaidejo nera serveryje.');
                return;
            }

            user.setArmour(target, num);

            target.notify(`~b~Administratorius ${user.getRpName(player)} dave ${num}% sarvu ${user.getRpName(target)}`);
            player.notify(`~b~Administratorius ${user.getRpName(player)} dave ${num}% sarvu ${user.getRpName(target)}`);

            methods.saveLog('log_admin', ['name', 'type', 'do'], [`${user.getRpName(player)}`, 'USER_ARMOUR', `${user.getRpName(target)} | ${num}`]);
        }
    }
    catch (e) {
        methods.debug(e);
    }
};

admin.setHpById = function(player, type, id, num) {
    try {
        if (!user.isAdmin(player))
            return;

        id = methods.parseInt(id);

        if (type === 0) {
            let target = mp.players.at(id);
            if (!user.isLogin(target)) {
                player.notify('~r~Žaidejo nera serveryje.');
                return;
            }

            user.setHealth(target, num);

            target.notify(`~b~Administratorius ${user.getRpName(player)} dave ${num}% gyvybiu ${user.getRpName(target)}`);
            player.notify(`~b~Administratorius ${user.getRpName(player)} dave ${num}% gyvybiu ${user.getRpName(target)}`);

            methods.saveLog('log_admin', ['name', 'type', 'do'], [`${user.getRpName(player)}`, 'USER_HEALTH', `${user.getRpName(target)} | ${num}`]);
        }
        else {
            let target = user.getPlayerById(id);
            if (!user.isLogin(target)) {
                player.notify('~r~Žaidejo nera serveryje.');
                return;
            }

            user.setHealth(target, num);

            target.notify(`~b~Administratorius ${user.getRpName(player)} dave ${num}% gyvybiu ${user.getRpName(target)}`);
            player.notify(`~b~Administratorius ${user.getRpName(player)} dave ${num}% gyvybiu ${user.getRpName(target)}`);

            methods.saveLog('log_admin', ['name', 'type', 'do'], [`${user.getRpName(player)}`, 'USER_HEALTH', `${user.getRpName(target)} | ${num}`]);
        }
    }
    catch (e) {
        methods.debug(e);
    }
};

admin.setSkinById = function(player, type, id, skin) {
    try {
        if (!user.isAdmin(player))
            return;

        id = methods.parseInt(id);

        if (type === 0) {
            let target = mp.players.at(id);
            if (!user.isLogin(target)) {
                player.notify('~r~Žaidejo nera serveryje.');
                return;
            }

            if (user.getSex(target) == 1)
                target.model = mp.joaat(skin);
            else
                target.model = mp.joaat(skin);

            target.notify(`~b~Administratorius ${user.getRpName(player)} dave skina ${user.getRpName(target)}`);
            player.notify(`~b~Administratorius ${user.getRpName(player)} dave skina ${user.getRpName(target)}`);

            methods.saveLog('log_admin', ['name', 'type', 'do'], [`${user.getRpName(player)}`, 'USER_SKIN', `${user.getRpName(target)} | ${skin}`]);
        }
        else {
            let target = user.getPlayerById(id);
            if (!user.isLogin(target)) {
                player.notify('~r~Žaidejo nera serveryje.');
                return;
            }

            if (user.getSex(target) == 1)
                target.model = mp.joaat(skin);
            else
                target.model = mp.joaat(skin);

            target.notify(`~b~Administratorius ${user.getRpName(player)} dave skina ${user.getRpName(target)}`);
            player.notify(`~b~Administratorius ${user.getRpName(player)} dave skina ${user.getRpName(target)}`);

            methods.saveLog('log_admin', ['name', 'type', 'do'], [`${user.getRpName(player)}`, 'USER_SKIN', `${user.getRpName(target)} | ${skin}`]);
        }
    }
    catch (e) {
        methods.debug(e);
    }
};

admin.resetSkinById = function(player, type, id) {
    try {
        if (!user.isAdmin(player))
            return;

        id = methods.parseInt(id);

        if (type === 0) {
            let target = mp.players.at(id);
            if (!user.isLogin(target)) {
                player.notify('~r~Žaidejo nera serveryje.');
                return;
            }

            if (user.getSex(target) == 1)
                target.model = mp.joaat('mp_f_freemode_01');
            else
                target.model = mp.joaat('mp_m_freemode_01');

            user.updateCharacterFace(target);
            user.updateCharacterCloth(target);

            target.notify(`~b~Administratorius ${user.getRpName(player)} dave skina ${user.getRpName(target)}`);
            player.notify(`~b~Administratorius ${user.getRpName(player)} dave skina ${user.getRpName(target)}`);

            methods.saveLog('log_admin', ['name', 'type', 'do'], [`${user.getRpName(player)}`, 'USER_RESET_SKIN', `${user.getRpName(target)}`]);
        }
        else {
            let target = user.getPlayerById(id);
            if (!user.isLogin(target)) {
                player.notify('~r~Žaidejo nera serveryje.');
                return;
            }

            if (user.getSex(target) == 1)
                target.model = mp.joaat('mp_f_freemode_01');
            else
                target.model = mp.joaat('mp_m_freemode_01');

            user.updateCharacterFace(target);
            user.updateCharacterCloth(target);

            target.notify(`~b~Administratorius ${user.getRpName(player)} dave skina ${user.getRpName(target)}`);
            player.notify(`~b~Administratorius ${user.getRpName(player)} dave skina ${user.getRpName(target)}`);

            methods.saveLog('log_admin', ['name', 'type', 'do'], [`${user.getRpName(player)}`, 'USER_RESET_SKIN', `${user.getRpName(target)}`]);
        }
    }
    catch (e) {
        methods.debug(e);
    }
};

admin.adrenalineById = function(player, type, id) {
    try {
        if (!user.isAdmin(player))
            return;

        id = methods.parseInt(id);

        if (type === 0) {
            let target = mp.players.at(id);
            if (!user.isLogin(target)) {
                player.notify('~r~Žaidejo nera serveryje.');
                return;
            }

            user.useAdrenaline(target);

            target.notify(`~b~Administratorius ${user.getRpName(player)} panaudojo adrenalina ${user.getRpName(target)}`);
            player.notify(`~b~Administratorius ${user.getRpName(player)} panaudojo adrenalina ${user.getRpName(target)}`);

            methods.saveLog('log_admin', ['name', 'type', 'do'], [`${user.getRpName(player)}`, 'USER_ADRENALINE', `${user.getRpName(target)}`]);
        }
        else {
            let target = user.getPlayerById(id);
            if (!user.isLogin(target)) {
                player.notify('~r~Žaidejo nera serveryje.');
                return;
            }

            user.useAdrenaline(target);

            target.notify(`~b~Administratorius ${user.getRpName(player)} panaudojo adrenalina ${user.getRpName(target)}`);
            player.notify(`~b~Administratorius ${user.getRpName(player)} panaudojo adrenalina ${user.getRpName(target)}`);

            methods.saveLog('log_admin', ['name', 'type', 'do'], [`${user.getRpName(player)}`, 'USER_ADRENALINE', `${user.getRpName(target)}`]);
        }
    }
    catch (e) {
        methods.debug(e);
    }
};

admin.freeHospById = function(player, type, id) {
    try {
        if (!user.isAdmin(player))
            return;

        id = methods.parseInt(id);

        if (type === 0) {
            let target = mp.players.at(id);
            if (!user.isLogin(target)) {
                player.notify('~r~Žaidejo nera serveryje.');
                return;
            }

            target.call('client:hosp:free');

            target.notify(`~b~Administratorius ${user.getRpName(player)} isleido is ligonines ${user.getRpName(target)}`);
            player.notify(`~b~Administratorius ${user.getRpName(player)} isleido is ligonines ${user.getRpName(target)}`);

            methods.saveLog('log_admin', ['name', 'type', 'do'], [`${user.getRpName(player)}`, 'USER_FREE_HOSP', `${user.getRpName(target)}`]);
        }
        else {
            let target = user.getPlayerById(id);
            if (!user.isLogin(target)) {
                player.notify('~r~Žaidejo nera serveryje.');
                return;
            }

            target.call('client:hosp:free');

            target.notify(`~b~Administratorius ${user.getRpName(player)} isleido is ligonines ${user.getRpName(target)}`);
            player.notify(`~b~Administratorius ${user.getRpName(player)} isleido is ligonines ${user.getRpName(target)}`);

            methods.saveLog('log_admin', ['name', 'type', 'do'], [`${user.getRpName(player)}`, 'USER_FREE_HOSP', `${user.getRpName(target)}`]);
        }
    }
    catch (e) {
        methods.debug(e);
    }
};

admin.tpToAdmin = function(player, type, id) {
    try {
        if (!user.isAdmin(player))
            return;

        id = methods.parseInt(id);

        if (type === 0) {
            let target = mp.players.at(id);
            if (!user.isLogin(target)) {
                player.notify('~r~Žaidejo nera serveryje.');
                return;
            }

            let pos = player.position;
            user.teleport(target, pos.x, pos.y, pos.z);
            target.dimension = player.dimension;

            target.notify(`~b~Administratorius ${user.getRpName(player)} atsiteleportavo žaideja ${user.getRpName(target)} pas save`);
            player.notify(`~b~Administratorius ${user.getRpName(player)} atsiteleportavo žaideja ${user.getRpName(target)} pas save`);

            methods.saveLog('log_admin', ['name', 'type', 'do'], [`${user.getRpName(player)}`, 'USER_TP_TO_ADMIN', `${user.getRpName(target)} | ${methods.parseInt(pos.x)} | ${methods.parseInt(pos.y)} | ${methods.parseInt(pos.z)} | DIMENSION: ${player.dimension}`]);
        }
        else {
            let target = user.getPlayerById(id);
            if (!user.isLogin(target)) {
                player.notify('~r~Žaidejo nera serveryje.');
                return;
            }

            let pos = player.position;
            user.teleport(target, pos.x, pos.y, pos.z);
            target.dimension = player.dimension;

            target.notify(`~b~Administratorius ${user.getRpName(player)} atsiteleportavo žaideja ${user.getRpName(target)} pas save`);
            player.notify(`~b~Administratorius ${user.getRpName(player)} atsiteleportavo žaideja ${user.getRpName(target)} pas save`);

            methods.saveLog('log_admin', ['name', 'type', 'do'], [`${user.getRpName(player)}`, 'USER_TP_TO_ADMIN', `${user.getRpName(target)} | ${methods.parseInt(pos.x)} | ${methods.parseInt(pos.y)} | ${methods.parseInt(pos.z)} | DIMENSION: ${player.dimension}`]);
        }
    }
    catch (e) {
        methods.debug(e);
    }
};

admin.tpToUser = function(player, type, id) {
    try {
        if (!user.isAdmin(player))
            return;

        id = methods.parseInt(id);

        if (type === 0) {
            let target = mp.players.at(id);
            if (!user.isLogin(target)) {
                player.notify('~r~Žaidejo nera serveryje.');
                return;
            }

            player.dimension = target.dimension;
            user.teleport(player, target.position.x, target.position.y, target.position.z);
        }
        else {
            let target = user.getPlayerById(id);
            if (!user.isLogin(target)) {
                player.notify('~r~Žaidejo nera serveryje.');
                return;
            }

            player.dimension = target.dimension;
            user.teleport(player, target.position.x, target.position.y, target.position.z);
        }
    }
    catch (e) {
        methods.debug(e);
    }
};

admin.changeDimension = function(player, type, id, dim) {
    try {
        if (!user.isAdmin(player))
            return;

        id = methods.parseInt(id);

        if (type === 0) {
            let target = mp.players.at(id);
            if (!user.isLogin(target)) {
                player.notify('~r~Žaidejo nera serveryje.');
                return;
            }

            target.dimension = dim;

            target.notify(`~b~Administratorius ${user.getRpName(player)} pakeite žaidejo virtualuji pasauli ${user.getRpName(target)}`);
            player.notify(`~b~Administratorius ${user.getRpName(player)} pakeite žaidejo virtualuji pasauli ${user.getRpName(target)}`);
        }
        else {
            let target = user.getPlayerById(id);
            if (!user.isLogin(target)) {
                player.notify('~r~Žaidejo nera serveryje.');
                return;
            }

            target.dimension = dim;

            target.notify(`~b~Administratorius ${user.getRpName(player)} pakeite žaidejo virtualuji pasauli ${user.getRpName(target)}`);
            player.notify(`~b~Administratorius ${user.getRpName(player)} pakeite žaidejo virtualuji pasauli ${user.getRpName(target)}`);
        }
    }
    catch (e) {
        methods.debug(e);
    }
};

admin.getDimension = function(player, type, id) {
    try {
        if (!user.isAdmin(player))
            return;

        id = methods.parseInt(id);

        if (type === 0) {
            let target = mp.players.at(id);
            if (!user.isLogin(target)) {
                player.notify('~r~Žaidejo nera serveryje.');
                return;
            }

            player.notify(`~b~Žaidejo virtualus pasaulis ${user.getRpName(target)} lygus ~s~${target.dimension}`);
        }
        else {
            let target = user.getPlayerById(id);
            if (!user.isLogin(target)) {
                player.notify('~r~Žaidejo nera serveryje.');
                return;
            }

            player.notify(`~b~Žaidejo virtualus pasaulis ${user.getRpName(target)} lygus ~s~${target.dimension}`);
        }
    }
    catch (e) {
        methods.debug(e);
    }
};

admin.inviteMp = function(player) {
    try {
        if (!user.isAdmin(player))
            return;

        let pos = player.position;
        mp.players.forEach(p => {
            if (user.isLogin(p) && !user.isCuff(p) && !user.isTie(p)) {
                p.call('client:menuList:showInviteMpMenu', [pos.x, pos.y, pos.z, player.dimension]);
            }
        });

        methods.saveLog('log_admin', ['name', 'type', 'do'], [`${user.getRpName(player)}`, 'INVITE_MP', ``]);
    }
    catch (e) {
        methods.debug(e);
    }
};