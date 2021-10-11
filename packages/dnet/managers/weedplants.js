const methods = require('../modules/methods');
const mysql = require('../modules/mysql');
const enums = require('../enums');
const user = require('../user');
const Container = require('../modules/data');

//starting to grow plant: prop_weed_02
//mid grown plant: prop_weed_01
//fully grown plant object: h4_prop_weed_01_plant
 



let cayoWeedPlants = [
    [5391.22021484375, -5258.58447265625, 33.87166976928711],
    [5392.75390625, -5259.4833984375, 34.023014068603516],
    [5394.263671875, -5260.5693359375, 34.06573486328125],
    [5397.80712890625, -5263.57080078125, 34.38920974731445],
    [5399.41015625, -5264.98095703125, 34.57669448852539],
    [5402.26611328125, -5267.02978515625, 34.81741714477539],
    [5404.05224609375, -5268.56396484375, 34.9926643371582],
    [5405.701171875, -5271.46142578125, 35.07906723022461],
    [5402.1630859375, -5268.716796875, 34.85826873779297],
    [5399.6455078125, -5266.6552734375, 34.56494140625],
    [5396.88232421875, -5264.7373046875, 34.368019104003906],
    [5392.91943359375, -5261.44677734375, 33.99882125854492],
    [5390.20458984375, -5259.4833984375, 33.78510284423828],
    [5385.42529296875, -5255.765625, 33.28657913208008],
    [5380.9794921875, -5252.3447265625, 32.92675018310547],
    [5379.02880859375, -5249.27587890625, 32.82390213012695],
    [5374.85400390625, -5247.708984375, 32.423065185546875],
    [5371.0224609375, -5244.7783203125, 32.11930465698242],
    [5365.64208984375, -5240.322265625, 31.815166473388672],
    [5363.16796875, -5238.39990234375, 31.681419372558594],
    [5360.12841796875, -5235.94091796875, 31.393516540527344],
    [5356.52880859375, -5233.45361328125, 31.245136260986328],
    [5353.6005859375, -5231.14501953125, 31.104244232177734],
    [5360.40625, -5239.25927734375, 31.62395477294922],
    [5358.5419921875, -5237.673828125, 31.499622344970703],
    [5352.87255859375, -5232.69580078125, 31.251136779785156],
    [5349.6494140625, -5234.25048828125, 31.135677337646484],
    [5352.34033203125, -5236.30908203125, 31.350112915039062],
    [5355.13916015625, -5238.66650390625, 31.507247924804688],
    [5357.70166015625, -5240.81591796875, 31.631511688232422],
    [5360.69970703125, -5243.09130859375, 31.7744140625],
    [5365.0224609375, -5246.4638671875, 31.940475463867188],
    [5368.28076171875, -5248.99267578125, 32.12677764892578],
    [5371.10693359375, -5251.29296875, 32.33089828491211],
    [5372.89892578125, -5252.81591796875, 32.49112319946289],
    [5371.4599609375, -5259.65771484375, 32.79848098754883],
    [5368.587890625, -5257.52392578125, 32.49300003051758],
    [5365.49658203125, -5254.71484375, 32.255332946777344],
    [5363.001953125, -5252.73681640625, 32.13054656982422],
    [5360.888671875, -5251.1025390625, 31.99315643310547],
    [5350.94384765625, -5243.58642578125, 31.61928939819336],
    [5359.0849609375, -5262.2646484375, 32.367862701416016],
    [5367.015625, -5265.869140625, 32.92019271850586],
    [5370.5029296875, -5268.77294921875, 33.14141082763672],
    [5373.5380859375, -5271.17138671875, 33.38795471191406],
    [5376.99072265625, -5273.78857421875, 33.6865119934082],
    [5380.5830078125, -5276.67333984375, 33.99603271484375],
    [5383.75537109375, -5279.2099609375, 34.25362777709961],
    [5387.55029296875, -5282.0390625, 34.508331298828125],
    [5390.67724609375, -5284.58349609375, 34.737586975097656],
    [5393.8779296875, -5286.892578125, 34.83830642700195],
    [5394.02587890625, -5288.6650390625, 34.9261474609375],
    [5389.716796875, -5285.59619140625, 34.824459075927734],
    [5385.4970703125, -5282.3935546875, 34.49165725708008],
    [5370.9296875, -5271.41015625, 33.34620666503906],
    [5367.0078125, -5272.1552734375, 33.28157043457031],
    [5364.35693359375, -5269.98486328125, 33.061309814453125],
    [5362.47021484375, -5268.60791015625, 32.87977600097656],
    [5387.33740234375, -5283.984375, 34.690879821777344],
    [5388.6875, -5288.6240234375, 34.863468170166016],
    [5386.66552734375, -5287.0859375, 34.75239944458008],
    [5381.60693359375, -5283.486328125, 34.41708755493164],
    [5375.9609375, -5279.20849609375, 33.90251541137695],
    [5375.271484375, -5282.77880859375, 34.23776626586914],
    [5372.4013671875, -5280.38037109375, 34.03246307373047],
    [5369.93017578125, -5278.1884765625, 33.73085021972656],
    [5356.96142578125, -5268.43408203125, 32.73402404785156],
    [5353.8984375, -5266.0498046875, 32.47179412841797],
    [5350.6142578125, -5263.42919921875, 32.451595306396484],
    [5347.35888671875, -5260.9384765625, 32.29762649536133],
    [5350.06689453125, -5264.95751953125, 32.34355545043945],
    [5354.98486328125, -5268.98193359375, 32.63580322265625],
    [5359.3134765625, -5272.25927734375, 33.00634765625],
    [5363.28173828125, -5275.44482421875, 33.289878845214844],
    [5367.91796875, -5278.94287109375, 33.529273986816406],
    [5371.22412109375, -5281.49658203125, 33.87606430053711],
    [5375.61962890625, -5284.85498046875, 34.198299407958984],
    [5379.38330078125, -5287.814453125, 34.53770446777344],
    [5382.845703125, -5290.5068359375, 34.773048400878906],
    [5385.9931640625, -5292.9306640625, 34.846717834472656],
    [5374.35546875, -5275.78955078125, 33.65719985961914],
    [5371.3203125, -5273.50390625, 33.433197021484375],
    [5367.67041015625, -5270.69921875, 33.15480041503906],
    [5364.05859375, -5268.1328125, 32.87288284301758],
    [5359.40380859375, -5264.32568359375, 32.46148681640625],
    [5354.24267578125, -5260.06396484375, 32.17938995361328],
    [5350.69384765625, -5257.3291015625, 32.04627227783203],
    [5347.33349609375, -5254.6484375, 31.832805633544922],
    [5344.13623046875, -5252.1513671875, 31.564838409423828],
    [5341.13232421875, -5249.81591796875, 31.475086212158203],
    [5338.44140625, -5247.7529296875, 31.4552001953125],
    [5350.939453125, -5259.86669921875, 32.182655334472656],
    [5348.29638671875, -5257.62109375, 32.093109130859375],
    [5345.546875, -5255.412109375, 31.89947509765625],
    [5343.025390625, -5253.4150390625, 31.7103271484375],
    [5365.14111328125, -5234.619140625, 31.456253051757812],
    [5367.17578125, -5236.15673828125, 31.622066497802734],
    [5370.2685546875, -5238.60595703125, 31.799503326416016],
    [5371.71875, -5239.71337890625, 31.910533905029297],
    [5375.12451171875, -5242.28125, 32.184288024902344],
    [5377.45263671875, -5244.138671875, 32.37324142456055],
    [5382.65234375, -5248.0966796875, 32.89638137817383],
    [5385.06982421875, -5249.96826171875, 33.049713134765625],
    [5388.16748046875, -5252.27783203125, 33.31337356567383],
    [5391.1484375, -5254.54833984375, 33.58707046508789],
    [5392.435546875, -5255.50927734375, 33.70070266723633],
    [5397.712890625, -5259.14208984375, 34.18339538574219],
    [5399.658203125, -5260.51416015625, 34.3229866027832],
    [5406.73095703125, -5266.1328125, 35.04768753051758],
];

let weedplants = exports;
let MarijuanaPlants = [];

weedplants.loadAll = () => {
    methods.debug("weedplants.loadAll");
    mysql.executeQuery("SELECT * from weedplants", (err, rows) => {
        if (err)
            methods.debug("Сорняк error: " + err);

        if (rows)
            rows.forEach(plant => {
                let weedplant = {};

                weedplant.id = plant['id'];
                weedplant.pos_x = plant['pos_x'];
                weedplant.pos_y = plant['pos_y'];
                weedplant.pos_z = plant['pos_z'];
                weedplant.stage = plant['stage'];
                weedplant.timeplaced = plant['time'];
                weedplant.growngrams = plant['grams'];
                weedplant.object = null;
                weedplant.label = null;



                weedplants.set(plant['id'], 'id', plant['id']);
                weedplants.set(plant['id'], 'pos_x', plant['pos_x']);
                weedplants.set(plant['id'], 'pos_y', plant['pos_y']);
                weedplants.set(plant['id'], 'pos_z', plant['pos_z']);
                weedplants.set(plant['id'], 'grams', plant['grams']);

                weedplants.set(plant['id'], 'object', weedplant.object);
                weedplants.set(plant['id'], 'label', weedplant.label);


                MarijuanaPlants.push(weedplant);
                weedplants.changeStage(weedplant.id);

            });
    });
};

weedplants.loadLast = (id) => {
    methods.debug("weedplants.loadLast");
    mysql.executeQuery("SELECT * FROM `weedplants` WHERE id=?", [id], (err, rows) => {
        if (err)
            methods.debug("Сорняк error: " + err);

        if (rows)
            rows.forEach(plant => {
                let weedplant = {};
                weedplant.id = plant['id'];

                weedplant.pos_x = plant['pos_x'];
                weedplant.pos_y = plant['pos_y'];
                weedplant.pos_z = plant['pos_z'];
                weedplant.stage = plant['stage'];
                weedplant.timeplaced = plant['time'];
                weedplant.growngrams = plant['grams'];

                weedplant.object = null;
                weedplant.label = null;

                MarijuanaPlants.push(weedplant);
                weedplants.changeStage(weedplant.id);
            });
    });
};

weedplants.changeStage = (plantid) => {
    try {
        let plant = weedplants.getByID(plantid);
        if (plant !== false) {
            if (mp.objects.exists(plant.object)) plant.object.destroy();
            if (mp.labels.exists(plant.label)) plant.label.destroy();
        }
        let plantObject = "";
        if (plant.growngrams >= 0 && plant.growngrams < 11) {
            plantObject = "bkr_prop_weed_01_small_01c";
        } else if (plant.growngrams >= 11 && plant.growngrams <= 20) {
            plantObject = "bkr_prop_weed_01_small_01a";
        } else if (plant.growngrams >= 21 && plant.growngrams <= 30) {
            plantObject = "prop_weed_02";
        } else if (plant.growngrams >= 31 && plant.growngrams <= 50) {
            plantObject = "prop_weed_01";
        }
        plant.object = mp.objects.new(mp.joaat(plantObject), new mp.Vector3(plant.pos_x, plant.pos_y, plant.pos_z - 1.0), {
            dimension: 0
        });
        plant.label = mp.labels.new(`~g~Сорняк~w~~n~~n~Выросшие граммы: ${plant.growngrams}`, new mp.Vector3(plant.pos_x, plant.pos_y, plant.pos_z), {
            dimension: 0,
            font: 4,
            los: true,
            drawDistance: 20
        });
        plant.object.setVariable("IS_WEED_PLANT", true);
        plant.object.setVariable("WEED_PLANT_ID", plantid);
        weedplants.set(plantid, 'object', plant.object.id);
        weedplants.set(plantid, 'label', plant.label.id);
    } catch (err) {
        console.log(err);
    }
};


weedplants.updateLabel = (plantid, text) => {
    let plant = weedplants.getByID(plantid);
    if (plant) {
        plant.label.text = text;
    }
};


weedplants.insert = (data) => {
    mysql.executeQuery("INSERT INTO `weedplants` (`pos_x`, `pos_y`, `pos_z`, `grams`, `stage`) VALUES (?, ?, ?, ?, ?)", [data.pos_x, data.pos_y, data.pos_z, data.growngrams, data.stage],
        (err, rows) => {
            if (err) return methods.debug(err);
            let lastInsert = rows.insertId;
            weedplants.loadLast(lastInsert);
        });
};
weedplants.plant = (player) => {
    try {
        let world = player.dimension;
        if (world !== 0) return player.notify("В интерьере этого сделать нельзя.");

        let weedplant = {};
        weedplant.pos_x = player.position.x;
        weedplant.pos_y = player.position.y;
        weedplant.pos_z = player.position.z;

        weedplant.growngrams = 0;
        weedplant.stage = 0;
        weedplant.time = 0;
        weedplant.object = {};
        weedplant.label = {};
        weedplants.insert(weedplant);

        weedplant = null; //we reset
    } catch (err) {
        methods.debug(err);
    }
};

weedplants.pickup = (player, plantid) => {
    if (!weedplants.isValid(plantid)) return player.notify("Завод не найден.");
    let plant = weedplants.getByID(plantid);
    if (!plant || plant === null) return player.notify("Завод не найден.");

    if (methods.distanceToPos(plant.position, player.position) < 5) return player.notify("There's no plants nearby");
};

weedplants.destroy = (plantid) => {
    let plant = weedplants.getByID(plantid);
    if (plant) {
        if (plant.object && mp.objects.exists(plant.object)) plant.object.destroy();
        if (plant.label && mp.labels.exists(plant.label)) plant.label.destroy();
        mysql.executeQuery("DELETE FROM weedplants WHERE id=?", [plant.id]);
        MarijuanaPlants.splice(plant, 1);
    }
};
weedplants.getByID = (id) => {
    methods.debug('weedplants.getByID');
    let foundPlant = false;
    MarijuanaPlants.forEach((plant) => {
        if (plant.id === id) foundPlant = plant;
    });
    return foundPlant;
};

weedplants.save = (plant) => {
    return new Promise((resolve) => {
        methods.debug('weed.save');

    });

};

weedplants.isValid = (plantid) => {
    MarijuanaPlants.forEach((plant) => {
        if (plant.id === plantid) return true;
    });
    return false;
};


weedplants.getAll = () => {
    return MarijuanaPlants;
};


weedplants.getData = function (id) {
    return Container.Data.GetAll(enums.offsets.weedplants + methods.parseInt(id));
};

weedplants.get = function (id, key) {
    return Container.Data.Get(enums.offsets.weedplants + methods.parseInt(id), key);
};

weedplants.has = function (id, key) {
    return Container.Data.Has(enums.offsets.weedplants + methods.parseInt(id), key);
};

weedplants.set = function (id, key, val) {
    Container.Data.Set(enums.offsets.weedplants + methods.parseInt(id), key, val);
};

weedplants.reset = function (id, key, val) {
    Container.Data.Reset(enums.offsets.weedplants + methods.parseInt(id), key, val);
};

mp.events.addCommand("createplant", (player) => {

    mp.objects.new(mp.joaat('prop_weed_02'), new mp.Vector3(player.position.x, player.position.y, player.position.z - 1), { dimension: player.dimension });
    methods.saveFile('weedplants', `mp.objects.new(mp.joaat('prop_weed_02'), new mp.Vector3(${player.position.x}, ${player.position.y}, ${player.position.z - 1}), {dimension: player.dimension });`);

});