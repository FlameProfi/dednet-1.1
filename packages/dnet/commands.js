let vehicles = require('./property/vehicles');
mp.events.addCommand("apark", (player, args) => {
    let vehicle = player.vehicle;

    if (vehicles.exists(vehicle.id)) {
            
    }
})