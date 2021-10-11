const webhook = require("webhook-discord");

let mysql = require('../modules/mysql');
let methods = require('../modules/methods');
let user = require('../user');

let discord = exports;

discord.report = "https://discord.com/api/webhooks/893617734615707648/6VsDl4HdwWxNI_dBoNnPFYNebwvdvUG0OpQK658_VNW1jhdv_u2zrM8mPqhRfEsgZOGb";
discord.deadlist = "https://discord.com/api/webhooks/893617872415379506/pp1DRee_bfat1JCAZhYdpa8npPp2miTp1JgOeqavYOZofJMR8UAzt1YVbVz32uKpGcav";
discord.invaderAd = "https://discord.com/api/webhooks/876696775753359420/UPDfvxJiQ2FmLfusULCiaD5MG_-ecTYi_TctAXGI_6BQRcCB1ejBidY1jplOcO_Uj4so";
discord.invaderNews = "https://discord.com/api/webhooks/876696775753359420/UPDfvxJiQ2FmLfusULCiaD5MG_-ecTYi_TctAXGI_6BQRcCB1ejBidY1jplOcO_Uj4so";
discord.fractionNews = "https://discord.com/api/webhooks/876696775753359420/UPDfvxJiQ2FmLfusULCiaD5MG_-ecTYi_TctAXGI_6BQRcCB1ejBidY1jplOcO_Uj4so";

discord.workBcsd = "https://discord.com/api/webhooks/876696775753359420/UPDfvxJiQ2FmLfusULCiaD5MG_-ecTYi_TctAXGI_6BQRcCB1ejBidY1jplOcO_Uj4so";
discord.workLspd = "https://discord.com/api/webhooks/893617180359401523/bkOcg8OlJq63tSNz0H4Vmz__znb_ibZzZ0QtagJToLfgK50u4mFbr4wouStBpwTsvTEl";
discord.workUsmc = "https://discord.com/api/webhooks/876696775753359420/UPDfvxJiQ2FmLfusULCiaD5MG_-ecTYi_TctAXGI_6BQRcCB1ejBidY1jplOcO_Uj4so";
discord.workNews = "https://discord.com/api/webhooks/876696775753359420/UPDfvxJiQ2FmLfusULCiaD5MG_-ecTYi_TctAXGI_6BQRcCB1ejBidY1jplOcO_Uj4so";
discord.workEms = "https://discord.com/api/webhooks/892904502032732160/Ou3vGgu5E4Ca2fH88KIXEtR1H1I_PCgN6JAv9nD_7rsZdRULY_nO88O-tbrYu_Z-nONJ";
discord.workFib = "https://discord.com/api/webhooks/893616543349506098/OgjWWKi4t-6kjHrrz5TKL7C8ZR-qFa0mUKEFlnhoEjwgSMnjC0up74RSHvBp5pWAHE79";
discord.workGov = "https://discord.com/api/webhooks/893617318867902564/PMMFNDkHRcHdPyIKiaVVGsg84G6Ihy6yo-1FGAM14fQTbTf10wOd5l8JlypUvVb_LZJc";

discord.marketProperty = "https://discord.com/api/webhooks/876696775753359420/UPDfvxJiQ2FmLfusULCiaD5MG_-ecTYi_TctAXGI_6BQRcCB1ejBidY1jplOcO_Uj4so";
discord.marketBusiness = "https://discord.com/api/webhooks/876696775753359420/UPDfvxJiQ2FmLfusULCiaD5MG_-ecTYi_TctAXGI_6BQRcCB1ejBidY1jplOcO_Uj4so";
discord.marketVehicles = "https://discord.com/api/webhooks/876696775753359420/UPDfvxJiQ2FmLfusULCiaD5MG_-ecTYi_TctAXGI_6BQRcCB1ejBidY1jplOcO_Uj4so";

discord.dednetImg = "https://i.imgur.com/WhubVMp.png";
discord.socialClub = "https://a.rsg.sc/n/";

discord.imgGov = "https://i.imgur.com/eFGOitl.png";
discord.imgLspd = "https://i.imgur.com/uRUp6ig.png";
discord.imgFib = "https://i.imgur.com/KaMdGAl.png";
discord.imgUsmc = "";
discord.imgSheriff = "https://i.imgur.com/sOPdklt.png";
discord.imgEms = "https://i.imgur.com/MoMutqI.png";
discord.imgInvader = "https://i.imgur.com/xxUGqJi.png";

discord.colorGov = "#795548";
discord.colorLspd = "#2196F3";
discord.colorFib = "#212121";
discord.colorUsmc = "#9E9E9E";
discord.colorSheriff = "#8BC34A";
discord.colorEms = "#f44336";
discord.colorInvader = "#FFEB3B";

discord.sendFractionList = function (title, sender, message, senderImg = discord.dednetImg, avatar = discord.imgGov, color = "#f44336") {
    const Hook = new webhook.Webhook(discord.fractionNews);

    const msg = new webhook.MessageBuilder()
        .setName('Valstybės žinios')
        .setTitle(sender)
        .setAvatar(avatar)
        .setDescription(message)
        .setFooter(title, senderImg)
        .setColor(color)
        .setTime();

    Hook.send(msg);
};

discord.sendDeadList = function (target, desc, reason, sender = 'Server', senderImg = discord.dednetImg, color = "#f44336") {
    const Hook = new webhook.Webhook(discord.deadlist);

    const msg = new webhook.MessageBuilder()
        .setName("DEAD LIST")
        .setTitle(target)
        .addField("Aprašymas", desc)
        .addField("Priežastis", reason)
        .setFooter(sender, senderImg)
        .setColor(color)
        .setTime();

    Hook.send(msg);
};

discord.sendAd = function (title, name, text, phone, editor, editorImg) {
    const Hook = new webhook.Webhook(discord.invaderAd);

    let color = "#607D8B";
    if (title === 'Pirkimas')
        color = "#03A9F4";
    if (title === 'Parduodama')
        color = "#8BC34A";
    if (title === 'Paslauga')
        color = "#FFEB3B";

    const msg = new webhook.MessageBuilder()
        .setName('Skelbimas')
        .setTitle(title)
        .setAvatar(discord.imgInvader)
        .addField(`Telefono numeris`, `\`\`\`${phone}\`\`\``, true)
        .addField(`Klientas`, `\`\`\`${name}\`\`\``, true)
        .setDescription(`\`\`\`fix\n${text}\`\`\``)
        .setFooter(editor, 'https://a.rsg.sc/n/' + editorImg.toLowerCase())
        .setColor(color)
        .setTime();

    Hook.send(msg);
};

discord.sendNews = function (title, text, editor, editorImg) {
    const Hook = new webhook.Webhook(discord.invaderNews);
    const msg = new webhook.MessageBuilder()
        .setName('Naujienos')
        .setTitle(title)
        .setDescription(text)
        .setFooter(editor, 'https://a.rsg.sc/n/' + editorImg)
        .setColor("#f44336")
        .setTime();

    Hook.send(msg);
};

discord.sendWork = function (url, player, dscrd, text) {

    if (!user.isLogin(player))
        return;

    let history = '';
    let sender = `${user.getRpName(player)} (${user.getId(player)})`;
    let phone = methods.phoneFormat(user.get(player, 'phone'));
    let senderImg = player.socialClub;

    mysql.executeQuery(`SELECT * FROM log_player WHERE user_id = ${user.getId(player)} AND type = 1 ORDER BY id DESC LIMIT 5`, (err, rows, fields) => {
        if (rows.length > 0) {
            try {
                rows.forEach(row => {
                    history += `${methods.unixTimeStampToDateTimeShort(row['timestamp'])} | ${row['do']}\n`;
                });
            }
            catch (e) {
                methods.debug(e);
            }
        }

        if (history === '')
            history = 'Nėra teistumo istorijos';

        const Hook = new webhook.Webhook(url);
        const msg = new webhook.MessageBuilder()
            .setName('DARBO PARAIŠKA')
            .setTitle(sender)
            .setDescription(text)
            .addField(`Telefonas`, `\`\`\`${phone}\`\`\``, true)
            .addField(`DISCORD`, `\`\`\`${dscrd}\`\`\``, true)
            .addField(`Darbo lygis / Darbo patirtis`, `\`\`\`${user.get(player, 'work_lvl')} / ${user.get(player, 'work_exp')}\`\`\``, true)
            .addField(`Istorija`, `\`\`\`${history}\`\`\``)
            .setFooter(sender, 'https://a.rsg.sc/n/' + senderImg)
            .setColor("#f44336")
            .setTime();

        Hook.send(msg);
    });
};

discord.sendMarketProperty = function (title, text) {
    const Hook = new webhook.Webhook(discord.marketProperty);
    const msg = new webhook.MessageBuilder()
        .setName('Nekilnojamojo turto naujienos')
        .setTitle(title)
        .setDescription(`\`\`\`ml\n${text}\`\`\``)
        .setFooter('Vyriausybė', discord.imgGov)
        .setColor("#f44336")
        .setTime();
    Hook.send(msg);
};

discord.sendMarketBusiness = function (title, text) {
    const Hook = new webhook.Webhook(discord.marketBusiness);
    const msg = new webhook.MessageBuilder()
        .setName('Verslo naujienos')
        .setTitle(title)
        .setDescription(`\`\`\`ml\n${text}\`\`\``)
        .setFooter('Vyriausybė', discord.imgGov)
        .setColor("#f44336")
        .setTime();
    Hook.send(msg);
};

discord.sendMarketVehicles = function (title, text, imgUrl) {
    const Hook = new webhook.Webhook(discord.marketVehicles);
    const msg = new webhook.MessageBuilder()
        .setName('Transporto naujienos')
        .setTitle(title)
        .setDescription(`\`\`\`ml\n${text}\`\`\``)
        .setImage(imgUrl)
        .setFooter('Vyriausybė', discord.imgGov)
        .setColor("#f44336")
        .setTime();
    Hook.send(msg);
};