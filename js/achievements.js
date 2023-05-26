addLayer("a", {
    name: "Achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "<img src='resources/trophy.png' style='width:calc(80%);height:calc(80%);margin:10%'></img>", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            achievementpower: new Decimal(0),
        }
    },
    nodeStyle: {
        background: "linear-gradient(45deg, blue, purple)",
        "background-origin": "border-box",
    },
    color: "blue",
    row: "side", // Row the layer is in on the tree (0 is the first row)
    tooltip: "Achievements", // Row the layer is in on the tree (0 is the first row)
    update(delta) {
    },
    clickables: {

    },
    upgrades: {
    },
    buyables: {
    },
    achievements: {
        11: {
            name: "Tree.",
            done() { return player.i.trees.gte("1") },
            tooltip: "Get 1 Tree.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(1) },
        },
        12: {
            name: "Pointy.",
            done() { return player.points.gte("100") },
            tooltip: "Get 100 Points.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(1) },
        },
        13: {
            name: "Crypto.",
            done() { return player.i.crypto.gte("1") },
            tooltip: "Get 1 Crypto.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(1) },
        },
        14: {
            name: "Bytes.",
            done() { return player.i.bytes.gte("1") },
            tooltip: "Get 1 Byte.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(1) },
        },
        15: {
            name: "Metaverse.",
            done() { return player.i.crypto.gte("10000") },
            tooltip: "Get 10,000 Crypto.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(1) },
        },
        16: {
            name: "Coder.",
            done() { return player.i.codeexperience.gte("1") },
            tooltip: "Get 1 Code Experience.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(1) },
        },
        17: {
            name: "Programmable.",
            done() { return player.i.programs.gte("10000") },
            tooltip: "Get 10,000 Programs.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(1) },
        },
        18: {
            name: "Modder.",
            done() { return player.i.mods.gte("1") },
            tooltip: "Get 1 Mod.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(1) },
        },
        19: {
            name: "Multiversal Modder.",
            done() { return player.i.totalrealmmods.gte("1") },
            tooltip: "Get 1 Realm Mod.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(1) },
        },
        20: {
            name: "Super Coder.",
            done() { return player.i.codeexperience.gte("1e50") },
            tooltip: "Get 1e50 Code Experience.", // Shows when achievement is not completed
            onComplete() { player.a.achievementpower = player.a.achievementpower.add(1) },
        },
    },
    bars: {
    },
    microtabs: {
        stuff: {
            "Achievements": {
                buttonStyle() { return { 'color': 'violet' } },
                content: [
                    ["blank", "25px"],
                    ["raw-html", function () { return "<h2>You have " + format(player.a.achievementpower) + " achievement power.</h2>" }],
                    ["row", [["achievement", 11], ["achievement", 12], ["achievement", 13], ["achievement", 14], ["achievement", 15], ["achievement", 16], ["achievement", 17], ["achievement", 18], ["achievement", 19], ["achievement", 20]]],
                ]

            },
        },
    },
    tabFormat: [
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
        ["raw-html", function () { return options.musicToggle ? "<audio controls autoplay loop hidden><source src=music/achievements.mp3 type<=audio/mp3>loop=true hidden=true autostart=true</audio>" : "" }],
    ],
    layerShown() {
        return true
    }
})
