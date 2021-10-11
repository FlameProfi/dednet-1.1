let vehicles = require('../property/vehicles');
let methods = require('../modules/methods');
let user = require('../user');
let junkyard = exports;


junkyard.destroyPalces = [
    [-426.34747314453125, -1690.308349609375, 19.029237747192383],
    [-468.6900939941406, -1676.28271484375, 19.059202194213867],
    [1065.2933349609375, -2449.07275390625, 29.00452995300293]
];


junkyard.loadAll = () => {


    methods.createBlip(new mp.Vector3(-451.1270751953125, -1704.991455078125, 18.85304069519043), 527, 3, 0.6, 'Свалка Aвтомобилей');
    junkyard.destroyPalces.forEach(function (item) {
        let shopPos = new mp.Vector3(item[0], item[1], item[2] - 1.0);
        methods.createCp(shopPos.x, shopPos.y, shopPos.z, "~b~нажмите ~s~E~b~ чтобы продать свой автомобиль", 4, -1, [33, 150, 243, 100], 0.3);
    });
}

junkyard.findNearest = function (pos) {
    methods.debug('junkyard.findNearest');
    let prevPos = false;
    junkyard.destroyPalces.forEach(function (item) {
        let shopPos = new mp.Vector3(item[0], item[1], item[2]);
        if (item[2] >= 147)
            return;
        if (methods.distanceToPos(shopPos, pos) < 4)
            prevPos = true;
    });
    return prevPos;
};

junkyard.checkPressE = (player) => {
    let junkYard = junkyard.findNearest(player.position);

    if (junkYard === false) return;

    let vehicle = player.vehicle;

    if (!vehicles.exists(vehicle))
        return;

    if (!vehicle) return player.notify("Вы не в машине");
    if (vehicle.getVariable('user_id') != user.getId(player)) {
        user.showCustomNotify(player, 'Вы не владеете этим автомобилем', 1, 9);
        return;
    }
    if (player.seat !== 0) return player.notify("Вы должны вести автомобиль, который хотите продать.");
    let data = vehicles.getData(vehicle.getVariable('container'));


    if (data) {
        let price = data.get('price')
        let newprice = price / 2;


        player.call('client:vehicle:showdumpmenu', [newprice]);

        // vehicles.delete(data.get('id'));
        // user.addMoney(player, newprice, "Car Dump Payment");
        // player.notify("Вы продали свой автомобиль на свалку и получили 53000 долларов.");
    }

};

junkyard.sellVehicle = (player, price) => {
    let junkYard = junkyard.findNearest(player.position);

    if (junkYard === false) return;

    let vehicle = player.vehicle;

    if (!vehicles.exists(vehicle))
        return;

    if (!vehicle) return player.notify("Вы не в машине");
    if (vehicle.getVariable('user_id') != user.getId(player)) {
        user.showCustomNotify(player, 'Вы не владеете этим автомобилем', 1, 9);
        return;
    }
    if (player.seat !== 0) return player.notify("Вы должны вести автомобиль, который хотите продать.");
    let data = vehicles.getData(vehicle.getVariable('container'));
    if (data) {
        vehicles.delete(data.get('id'));
        user.addMoney(player, price, "Car Dump Payment");
        player.notify("Вы продали свой автомобиль на свалку и получили " + methods.moneyFormat(price));
    }
}