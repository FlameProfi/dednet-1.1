let user = require('../user');


mp.events.addCommand("makeadmin", (player, _fillup, target, rank) => {
    console.log("aaaaaaaaaaaaaa");
    if (user.get(player, 'admin_level') < 8) return ;
 
    if (typeof rank !== 'number') return;
    if (typeof target !== 'number') return;


    let _target = mp.players.at(target);

    if (!target) return player.notify("Invalid target id");
    

    user.set(_target, 'admin_level', parseInt(rank));
    user.save(_target);
    user.updateClientCache(_target);

    player.notify(`You have set ${user.get(_target, 'name')} admin level to ${parseInt(rank)}`);
    _target.notify(`Administrator ${user.get(player, 'name')} has set your admin rank to ${parseInt(rank)}`);

});