addLayer("i", {
    name: "Incremental", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        startcutscene: new Decimal(1),
        startscene: new Decimal(0),
        trees: new Decimal(0),
        leaves: new Decimal(0),
        leavespersecond: new Decimal(0),
        treereq: new Decimal(10),
        treesoftcapstart: new Decimal(15),
        treesoftcap: new Decimal(1),
        treesupersoftcapstart: new Decimal(15),
        treesupersoftcap: new Decimal(1),
        treegen: new Decimal(1),
        //crypto
        cryptopause: new Decimal(0),
        crypto: new Decimal(0),
        cryptotoget: new Decimal(0),
        bytes: new Decimal(0),
        bytespersecond: new Decimal(0),
        cryptodim1: new Decimal(0),
        cryptodim1mult: new Decimal(1),
        cryptodim1persecond: new Decimal(0),
        cryptodim2: new Decimal(0),
        cryptodim2mult: new Decimal(1),
        cryptodim2persecond: new Decimal(0),
        cryptodim3: new Decimal(0),
        cryptodim3mult: new Decimal(1),
        cryptodim3persecond: new Decimal(0),
        cryptodim4: new Decimal(0),
        cryptodim4mult: new Decimal(1),
        cryptodimsoftcapstart: new Decimal(1e15),
        cryptodimsoftcap: new Decimal(1),
        //code experience
        codecutscene: new Decimal(1),
        codescene: new Decimal(1),
        codepause: new Decimal(0),
        codeexperience: new Decimal(0),
        codeexperienceeffect: new Decimal(0),
        codeexperiencetoget: new Decimal(0),
        programs: new Decimal(0),
        programspersecond: new Decimal(0),
        programcryptoplieramount: new Decimal(0),
        programcryptoplier: new Decimal(0),
        programtickspeedamount: new Decimal(0),
        programtickspeed: new Decimal(0),
        programweakeneramount: new Decimal(0),
        programweakener: new Decimal(0),
        modcutscene: new Decimal(1),
        modscene: new Decimal(1),
        //mods
        mods: new Decimal(0),
        modseffect: new Decimal(1),
        linesofcode: new Decimal(0),
        linesofcodepersecond: new Decimal(0),
        modreq: new Decimal(100),
        modsoftcapstart: new Decimal(15),
        modsoftcap: new Decimal(1),
        modgen: new Decimal(1),
        // Realm Mods
        currentdisplay: new Decimal(0),
        creatormods: new Decimal(0),
        highmods: new Decimal(0),
        deathmods: new Decimal(0),
        dimensionalmods: new Decimal(0),
        backroomsmods: new Decimal(0),
        voidmods: new Decimal(0),
        creatormodseffect: new Decimal(0),
        highmodseffect: new Decimal(0),
        deathmodseffect: new Decimal(0),
        dimensionalmodseffect: new Decimal(0),
        backroomsmodseffect: new Decimal(0),
        voidmodseffect: new Decimal(0),
        totalrealmmods: new Decimal(0),
    }
    },
    automate() {
        if (hasUpgrade("i", 19) || hasUpgrade("i", 23)) {
            buyBuyable(this.layer, 11)
            buyBuyable(this.layer, 12)
            buyBuyable(this.layer, 13)
            buyBuyable(this.layer, 14)
            buyBuyable(this.layer, 19)
            buyBuyable(this.layer, 24)
        }
        if (hasUpgrade("i", 24)) {
            buyBuyable(this.layer, 15)
            buyBuyable(this.layer, 16)
            buyBuyable(this.layer, 17)
            buyBuyable(this.layer, 18)
            buyBuyable(this.layer, 20)
            buyBuyable(this.layer, 21)
            buyBuyable(this.layer, 22)
            buyBuyable(this.layer, 23)
            buyBuyable(this.layer, 25)
            buyBuyable(this.layer, 26)
            buyBuyable(this.layer, 27)
        }
    },
    nodeStyle: {
        background: "linear-gradient(90deg, #ff0000, #ff7700, #ffff00, #77ff00, #00ff00, #00ff77, #00ffff, #0077ff, #0000ff, #7700ff, #ff00ff, #ff0077)",
        "background-origin": "border-box",
    },
    color: "white",
    row: "side", // Row the layer is in on the tree (0 is the first row)
    tooltip: "Incremental", // Row the layer is in on the tree (0 is the first row)
    displayRow: 1, // Row the layer is in on the tree (0 is the first row)
    update(delta) {
        if (player.i.startscene.eq(40)) {
            player.i.startcutscene = new Decimal(0)
        }

        player.i.leaves = player.i.leaves.add(player.i.leavespersecond.mul(delta))
        if (player.i.leaves.gte(player.i.treereq)) {
            player.i.trees = player.i.trees.add(player.i.treegen)
            player.i.leaves = new Decimal(0)
        }
        player.i.treereq = player.i.trees.pow(1.4).add(10).div(buyableEffect("i", 14)).div(buyableEffect("i", 23))

        let leavespersecond = new Decimal(0)
        leavespersecond = buyableEffect("i", 11)
        if (hasUpgrade("i", 12)) leavespersecond = leavespersecond.mul(4)
        if (hasUpgrade("i", 15)) leavespersecond = leavespersecond.mul(upgradeEffect("i", 15))
        leavespersecond = leavespersecond.mul(buyableEffect("i", 20))
        leavespersecond = leavespersecond.mul(buyableEffect("i", 33))
        leavespersecond = leavespersecond.mul(player.i.creatormodseffect)
        player.i.treesoftcapstart = new Decimal(15)
        player.i.treesoftcapstart = player.i.treesoftcapstart.mul(buyableEffect("i", 13))
        if (hasUpgrade("i", 14)) player.i.treesoftcapstart = player.i.treesoftcapstart.mul(3) 
        player.i.treesoftcapstart = player.i.treesoftcapstart.mul(buyableEffect("i", 23))
        if (player.i.trees.gte(player.i.treesoftcapstart)) {
            player.i.treesoftcap = Decimal.pow(player.i.trees.add(1).sub(player.i.treesoftcapstart), 0.5)
            player.i.treesoftcap = player.i.treesoftcap.div(buyableEffect("i", 27))
            leavespersecond = leavespersecond.div(player.i.treesoftcap)
        }
        player.i.treesupersoftcapstart = new Decimal(10000000)
        if (hasUpgrade("i", 25)) player.i.treesupersoftcapstart = player.i.treesupersoftcapstart.mul(upgradeEffect("i", 25))
        if (player.i.trees.gte(player.i.treesupersoftcapstart)) {
            player.i.treesupersoftcap = Decimal.pow(player.i.trees.add(1).sub(player.i.treesupersoftcapstart), 0.5)
            leavespersecond = leavespersecond.div(player.i.treesupersoftcap)
        }
        player.i.leavespersecond = leavespersecond

        player.i.treegen = new Decimal(1)
        if (hasUpgrade("i", 13)) player.i.treegen = player.i.treegen.mul(1.5)
        player.i.treegen = player.i.treegen.mul(buyableEffect("i", 19)) 
        player.i.treegen = player.i.treegen.mul(buyableEffect("i", 20)) 
        player.i.treegen = player.i.treegen.mul(buyableEffect("i", 33)) 
        player.i.treegen = player.i.treegen.mul(player.i.creatormodseffect)
        if (hasUpgrade("i", 32)) player.i.treegen = player.i.treegen.mul(upgradeEffect("i", 32))

        //crypto 
        player.i.cryptotoget = player.i.trees.div(1.2).pow(1.5)
        player.i.cryptotoget = player.i.cryptotoget.mul(buyableEffect("i", 21))
        if (hasUpgrade("i", 17)) player.i.cryptotoget = player.i.cryptotoget.mul(upgradeEffect("i", 17))
        player.i.cryptotoget = player.i.cryptotoget.mul(buyableEffect("i", 26))

        if (hasUpgrade("i", 29)) player.i.crypto = player.i.crypto.add(player.i.cryptotoget.mul(delta))

        player.i.cryptopause = player.i.cryptopause.sub(1)
        if (player.i.cryptopause.gt(0)) {
            layers.i.cryptoreset();
        }

        let cryptodimbooster = new Decimal(1)
        cryptodimbooster = cryptodimbooster.mul(buyableEffect("i", 22))
        cryptodimbooster = cryptodimbooster.mul(buyableEffect("i", 24))
        cryptodimbooster = cryptodimbooster.mul(buyableEffect("i", 25))
        cryptodimbooster = cryptodimbooster.mul(player.i.dimensionalmodseffect)

        player.i.cryptodimsoftcapstart = new Decimal(1e45)
        player.i.cryptodimsoftcapstart = player.i.cryptodimsoftcapstart.mul(buyableEffect("i", 32))
        if (player.i.bytes.gte(player.i.cryptodimsoftcapstart)) {
            player.i.cryptodimsoftcap = Decimal.pow(player.i.bytes.add(1).sub(player.i.cryptodimsoftcapstart), 0.2)
            cryptodimbooster = cryptodimbooster.div(player.i.cryptodimsoftcap)
        }

        player.i.bytespersecond = player.i.cryptodim1.pow(0.5).mul(player.i.cryptodim1mult.mul(cryptodimbooster))
        player.i.cryptodim1persecond = player.i.cryptodim2.pow(0.5).mul(player.i.cryptodim2mult.mul(cryptodimbooster).div(10))
        player.i.cryptodim2persecond = player.i.cryptodim3.pow(0.5).mul(player.i.cryptodim3mult.mul(cryptodimbooster).div(33))
        player.i.cryptodim3persecond = player.i.cryptodim4.pow(0.5).mul(player.i.cryptodim4mult.mul(cryptodimbooster).div(100))

        player.i.bytes = player.i.bytes.add(player.i.bytespersecond.mul(delta))
        player.i.cryptodim1 = player.i.cryptodim1.add(player.i.cryptodim1persecond.mul(delta))
        player.i.cryptodim2 = player.i.cryptodim2.add(player.i.cryptodim2persecond.mul(delta))
        player.i.cryptodim3 = player.i.cryptodim3.add(player.i.cryptodim3persecond.mul(delta))

        player.i.byteseffect = player.i.bytes.pow(0.3).add(1)

        //coding
        if (player.i.codescene.eq(23)) {
            player.i.codecutscene = new Decimal(0)
        }

        player.i.codepause = player.i.codepause.sub(1)
        if (player.i.codepause.gt(0)) {
            layers.i.codereset();
        }

        let effectsoftcapbase = new Decimal(500)
        player.i.codeexperiencetoget = player.i.crypto.pow(0.30).div(50)
        player.i.codeexperiencetoget = player.i.codeexperiencetoget.mul(buyableEffect("i", 35)) 
        player.i.codeexperiencetoget = player.i.codeexperiencetoget.mul(player.i.voidmodseffect) 

        if (player.i.codeexperience.lt(1e12)) player.i.codeexperienceeffect = player.i.codeexperience.pow(0.15).mul(8)
        if (player.i.codeexperience.gt(1e12)) player.i.codeexperienceeffect = effectsoftcapbase.add(player.i.codeexperience.sub(1e12).pow(0.05))
        if (player.i.codeexperience.gt(1e60)) player.i.codeexperienceeffect = new Decimal(1500)

        player.i.programs = player.i.programs.add(player.i.programspersecond.mul(delta))
        player.i.programspersecond = buyableEffect("i", 28)
        player.i.programspersecond = player.i.programspersecond.mul(buyableEffect("i", 30))
        player.i.programspersecond = player.i.programspersecond.mul(player.i.modseffect)
        player.i.programspersecond = player.i.programspersecond.mul(player.i.backroomsmodseffect)

        let effectsoftcapbase2 = new Decimal(400)
        if (player.i.programcryptoplieramount.lt(5.65e7)) player.i.programcryptoplier = player.i.programcryptoplieramount.pow(0.16).mul(2).mul(buyableEffect("i", 29))
        if (player.i.programcryptoplieramount.gt(5.65e7)) player.i.programcryptoplier = effectsoftcapbase2.add(player.i.programcryptoplieramount.sub(5.65e7).pow(0.08))
        player.i.programtickspeed = player.i.programtickspeedamount.pow(0.15).mul(2).mul(buyableEffect("i", 29))
        player.i.programweakener = player.i.programweakeneramount.pow(0.14).mul(2).mul(buyableEffect("i", 29))

        if (player.i.buyables[29].gt(50)) player.i.buyables[29] = new Decimal(50)
        //mods
        if (player.i.modscene.eq(12)) {
            player.i.modcutscene = new Decimal(0)
        }

        player.i.linesofcode = player.i.linesofcode.add(player.i.linesofcodepersecond.mul(delta))
        if (player.i.linesofcode.gte(player.i.modreq)) {
            player.i.mods = player.i.mods.add(player.i.modgen)
            player.i.linesofcode = new Decimal(0)
        }
        player.i.modreq = player.i.mods.pow(1.5).add(20).div(buyableEffect("i", 36))

        let linesofcodepersecond = new Decimal(0)
        linesofcodepersecond = buyableEffect("i", 31)
        linesofcodepersecond = linesofcodepersecond.mul(player.i.highmodseffect)
        player.i.modsoftcapstart = new Decimal(15)
        player.i.modsoftcapstart = player.i.modsoftcapstart.mul(buyableEffect("i", 32))
        player.i.modsoftcapstart = player.i.modsoftcapstart.mul(player.i.voidmodseffect)
        if (player.i.mods.gte(player.i.modsoftcapstart)) {
            player.i.modsoftcap = Decimal.pow(player.i.mods.add(1).sub(player.i.modsoftcapstart), 0.5)
            linesofcodepersecond = linesofcodepersecond.div(player.i.modsoftcap)
        }
        player.i.linesofcodepersecond = linesofcodepersecond

        player.i.modgen = new Decimal(1)
        player.i.modgen = player.i.modgen.mul(buyableEffect("i", 34))

        player.i.modseffect = player.i.mods.pow(0.3).mul(5).add(1)

        player.i.creatormodseffect = player.i.creatormods.pow(1.1).add(1) //Trees, Leaves
        player.i.highmodseffect = player.i.highmods.pow(0.5).add(1) //Lines of Code
        player.i.deathmodseffect = player.i.deathmods.pow(1.25).add(1) //Points
        player.i.dimensionalmodseffect = player.i.dimensionalmods.pow(0.8).add(1) //Crypto Dimensions
        player.i.backroomsmodseffect = player.i.backroomsmods.pow(0.3).add(1) //Programs
        player.i.voidmodseffect = player.i.voidmods.pow(0.25).add(1) //Code Exp

        if (hasUpgrade("i", 33)) player.i.creatormods = player.i.creatormods.add(player.i.mods.mul(0.1).mul(delta)) //Trees, Leaves, and Points
        if (hasUpgrade("i", 33)) player.i.highmods = player.i.highmods.add(player.i.mods.mul(0.1).mul(delta)) //Lines of Code
        if (hasUpgrade("i", 33)) player.i.deathmods = player.i.deathmods.add(player.i.mods.mul(0.1).mul(delta)) //Mod Softcap
        if (hasUpgrade("i", 33)) player.i.dimensionalmods = player.i.dimensionalmods.add(player.i.mods.mul(0.1).mul(delta)) //Crypto Dimensions
        if (hasUpgrade("i", 33)) player.i.backroomsmods = player.i.backroomsmods.add(player.i.mods.mul(0.1).mul(delta)) //Crypto
        if (hasUpgrade("i", 33)) player.i.voidmods = player.i.voidmods.add(player.i.mods.mul(0.1).mul(delta)) //Code Experience

        player.i.totalrealmmods = player.i.creatormods.add(player.i.highmods.add(player.i.deathmods.add(player.i.dimensionalmods.add(player.i.backroomsmods.add(player.i.voidmods)))))

    },
    cryptoreset() {
        player.i.trees = new Decimal(0)
        player.points = new Decimal(1)
        player.i.leaves = new Decimal(0)
        player.i.buyables[11] = new Decimal(0)
        player.i.buyables[12] = new Decimal(0)
        player.i.buyables[13] = new Decimal(0)
        player.i.buyables[14] = new Decimal(0)
        player.i.buyables[19] = new Decimal(0)
        player.i.buyables[24] = new Decimal(0)
        player.i.crypto = player.i.crypto.add(player.i.cryptotoget)

        player.i.bytes = new Decimal(0)
        player.i.cryptodim1 = player.i.buyables[15]
        player.i.cryptodim2 = player.i.buyables[16]
        player.i.cryptodim3 = player.i.buyables[17]
        player.i.cryptodim4 = player.i.buyables[18]
    },
    codereset() {
        if (!hasUpgrade("i", 27)) {
            for (let i = 0; i < player.i.upgrades.length; i++) {
                if (+player.i.upgrades[i] <= 21) {
                    player.i.upgrades.splice(i, 1);
                    i--;
                }
            }
        }
        player.i.buyables[11] = new Decimal(0)
        player.i.buyables[12] = new Decimal(0)
        player.i.buyables[13] = new Decimal(0)
        player.i.buyables[14] = new Decimal(0)
        player.i.buyables[15] = new Decimal(0)
        player.i.buyables[16] = new Decimal(0)
        player.i.buyables[17] = new Decimal(0)
        player.i.buyables[18] = new Decimal(0)
        player.i.buyables[19] = new Decimal(0)
        player.i.buyables[20] = new Decimal(0)
        player.i.buyables[21] = new Decimal(0)
        player.i.buyables[22] = new Decimal(0)
        player.i.buyables[23] = new Decimal(0)
        player.i.buyables[24] = new Decimal(0)
        player.i.buyables[25] = new Decimal(0)
        player.i.buyables[26] = new Decimal(0)
        player.i.buyables[27] = new Decimal(0)
        player.i.bytes = new Decimal(0)
        player.i.crypto = new Decimal(0)
        player.i.cryptodim1 = new Decimal(0)
        player.i.cryptodim1mult = new Decimal(1)
        player.i.cryptodim2 = new Decimal(0)
        player.i.cryptodim2mult = new Decimal(1)
        player.i.cryptodim3 = new Decimal(0)
        player.i.cryptodim3mult = new Decimal(1)
        player.i.cryptodim4 = new Decimal(0)
        player.i.cryptodim4mult = new Decimal(1)
        player.i.trees = new Decimal(0)
        player.points = new Decimal(1)
        player.i.leaves = new Decimal(0)

        player.i.codeexperience = player.i.codeexperience.add(player.i.codeexperiencetoget)
    },
    clickables: {
        11: {
            title() { return "<img src='resources/assemblylinearrow.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>" },
            canClick() { return player.i.startcutscene.eq(1) },
            unlocked() { return player.i.startscene.neq(40) },
            onClick() {
                player.i.startscene = player.i.startscene.add(1)
            },
        },
        12: {
            title() { return "<h2>Reset for crypto " },
            canClick() { return player.i.cryptotoget.gte(1) },
            onClick() {
                player.i.cryptopause = new Decimal(3)
            },
            style: { "background-color": "#0F52BA", width: '400px', "min-height": '100px' },
            tooltip() {
                return "<h5>Resets are a required part of becoming godly."
            },
        },
        13: {
            title() { return "+" + format(player.i.cryptotoget) + " CR" },
            canClick() { return player.i.cryptotoget.gte(1) },
            unlocked() { return player.i.crypto.gt(0) || player.i.codeexperience.gt(0) },
            onClick() {
                player.i.cryptopause = new Decimal(3)
            },
            style: { width: '150px', "min-height": '60px', "background-color": "#0F52BA", }
        },
        14: {
            title() { return "<img src='resources/assemblylinearrow.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>" },
            canClick() { return player.i.codecutscene.eq(1) },
            unlocked() { return player.i.codescene.neq(23) },
            onClick() {
                player.i.codescene = player.i.codescene.add(1)
            },
        },
        15: {
            title() { return "<h2>Reset for code experience" },
            canClick() { return player.i.codeexperiencetoget.gte(1) },
            onClick() {
                player.i.codepause = new Decimal(3)
            },
            style: { "background-color": "#BF40BF", width: '400px', "min-height": '100px' },
            tooltip() {
                return "<h5>Multiple layers of prestige. It's like an onion."
            },
        },
        16: {
            title() { return "+" + format(player.i.codeexperiencetoget) + " CE" },
            canClick() { return player.i.codeexperiencetoget.gte(1) },
            unlocked() { return player.i.codeexperience.gt(0) },
            onClick() {
                player.i.codepause = new Decimal(3)
            },
            style: { width: '150px', "min-height": '60px', "background-color": "#BF40BF", }
        },
        17: {
            title() { return "Make Cryptoplier Programs" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.i.programcryptoplieramount = player.i.programcryptoplieramount.add(player.i.programs)
                player.i.programs = new Decimal(0)
            },
            style: { "background-color": "#BF40BF", }
        },
        18: {
            title() { return "Make Tickspeed Programs" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.i.programtickspeedamount = player.i.programtickspeedamount.add(player.i.programs)
                player.i.programs = new Decimal(0)
            },
            style: {  "background-color": "#BF40BF", }
        },
        19: {
            title() { return "Make Weakener Programs" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.i.programweakeneramount = player.i.programweakeneramount.add(player.i.programs)
                player.i.programs = new Decimal(0)
            },
            style: { "background-color": "#BF40BF", }
        },
        20: {
            title() { return "<img src='resources/assemblylinearrow.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>" },
            canClick() { return player.i.modcutscene.eq(1) },
            unlocked() { return player.i.modscene.neq(12) },
            onClick() {
                player.i.modscene = player.i.modscene.add(1)
            },
        },
        21: {
            title() { return "<img src='resources/symbolcreator.png' style='width:calc(80%);height:calc(80%);margin:10%'></img>" },
            canClick() { return true },
            onClick() {
                player.i.currentdisplay = new Decimal(1) //Each number is assinged to its corresponding realm
            },
            tooltip() {
                return "<h5>The creator realm. The realm above all realms, yet they don't know we exist. They created all of us using their imaginations and placed us into their stories. Meta-Beings, or real humans live in this world. They do not know their fantasies are living in the realms below..."
            },
            style: { "background-color": "#EC7063", }
        },
        22: {
            title() { return "<img src='resources/symbolhigh.png' style='width:calc(80%);height:calc(80%);margin:10%'></img>" },
            canClick() { return true },
            onClick() {
                player.i.currentdisplay = new Decimal(2)
            },
            tooltip() {
                return "<h5>The higher plane. The god realm. All gods live in this realm. After the five-way war, they organized and their job is to do one thing. Keep peace. However, they have not been doing a very good job. They have been fighting back the other realms who threatened them. Other than keeping peace, they also recruit new gods."
            },
            style: { "background-color": "#F5B041", }
        },
        23: {
            title() { return "<img src='resources/symboldeath.png' style='width:calc(80%);height:calc(80%);margin:10%'></img>" },
            canClick() { return true },
            onClick() {
                player.i.currentdisplay = new Decimal(3)
            },
            tooltip() {
                return "<h5>The death realm consists of three parts: Heaven, Hell, and Purgatory. Heaven is where all the do-gooders go. It's nothing special, but it's just bliss and harmony. Hell is like hell. All the sinners go there. And purgatory is just nothing. Those who equal amounts of good and bad go there."
            },
            style: { "background-color": "#F1C40F", }
        },
        24: {
            title() { return "<img src='resources/symboldimension.png' style='width:calc(80%);height:calc(80%);margin:10%'></img>" },
            canClick() { return true },
            onClick() {
                player.i.currentdisplay = new Decimal(4)
            },
            tooltip() {
                return "<h5>The dimensional realm is the largest realm in the multiverse, by a wide margin. It consists of every real, fictional, abstract, complex, crazy world out there. You take refuge in the dimensional realm."
            },
            style: { "background-color": "#27AE60", }
        },
        25: {
            title() { return "<img src='resources/symbolbackrooms.png' style='width:calc(80%);height:calc(80%);margin:10%'></img>" },
            canClick() { return true },
            onClick() {
                player.i.currentdisplay = new Decimal(5)
            },
            tooltip() {
                return "<h5>The backrooms is worse than hell. Many people have noclipped here, and trust me. It's not fun. People who enter the backrooms usually die within 10 minutes, but others keep exploring. It consists of quintillions of levels which make up the entire realm."
            },
            style: { "background-color": "#2980B9", }
        },
        26: {
            title() { return "<img src='resources/symbolvoid.png' style='width:calc(80%);height:calc(80%);margin:10%'></img>" },
            canClick() { return true },
            onClick() {
                player.i.currentdisplay = new Decimal(6)
            },
            tooltip() {
                return "<h1 class=glitch-text data-text=Glitchy Text>THE VOID IS TOO STRONG</h1>"
            },
            style: { "background-color": "#9B59B6", }
        },
        27: {
            title() { return "Deposit ALL of your mods to the Creator Realm." },
            canClick() { return player.i.mods.gte(1) && !inChallenge("i", 22) },
            unlocked() { return player.i.currentdisplay.eq(1) },
            onClick() {
                player.i.creatormods = player.i.creatormods.add(player.i.mods)
                player.i.mods = new Decimal(0)
            },
            tooltip() {
                return "<h5>There is a border seperating the five other realms and the creator realm. It is called the fourth wall. Us from the other realms can break this wall with ease, but the meta-beings above can never do it. However, we cannot physically permeate this wall. We can only see through it."
            },
            style: { "background-color": "#EC7063", }
        },
        28: {
            title() { return "Deposit ALL of your mods to the Higher Plane." },
            canClick() { return player.i.mods.gte(1) && !inChallenge("i", 22) },
            unlocked() { return player.i.currentdisplay.eq(2) },
            onClick() {
                player.i.highmods = player.i.highmods.add(player.i.mods)
                player.i.mods = new Decimal(0)
            },
            tooltip() {
                return "<h5>The higher plane recruits new gods by making prophecies. These prophecies belong to chosen ones, who can go on amazing quests and then, become a god. Many heroes are created and they strive to protect the multiverse from evil forces."
            },
            style: { "background-color": "#F5B041", }
        },
        29: {
            title() { return "Deposit ALL of your mods to the Death Realm." },
            canClick() { return player.i.mods.gte(1) && !inChallenge("i", 22) },
            unlocked() { return player.i.currentdisplay.eq(3) },
            onClick() {
                player.i.deathmods = player.i.deathmods.add(player.i.mods)
                player.i.mods = new Decimal(0)
            },
            tooltip() {
                return "<h5>However, the devils are actually friends with the angels. They keep the whole realm stable, and make sure everyone is placed where they belong. They teamed up with the higher plane of existence to keep peace across the multiverse, but you know what happened next."
            },
            style: { "background-color": "#F1C40F", }
        },
        30: {
            title() { return "Deposit ALL of your mods to the Dimensional Realm." },
            canClick() { return player.i.mods.gte(1) && !inChallenge("i", 22) },
            unlocked() { return player.i.currentdisplay.eq(4) },
            onClick() {
                player.i.dimensionalmods = player.i.dimensionalmods.add(player.i.mods)
                player.i.mods = new Decimal(0)
            },
            tooltip() {
                return "<h5>It is said that pre-split entities still exist in inter-universal space called sentients. These entities can build universes using their own energy. Sentiental energy is REALLY POWERFUL. It can break the laws of physics and is SOMETHING TO NOT BE PLAYED AROUND WITH."
            },
            style: { "background-color": "#27AE60", }
        },
        31: {
            title() { return "Deposit ALL of your mods to the Backrooms." },
            canClick() { return player.i.mods.gte(1) && !inChallenge("i", 22) },
            unlocked() { return player.i.currentdisplay.eq(5) },
            onClick() {
                player.i.backroomsmods = player.i.backroomsmods.add(player.i.mods)
                player.i.mods = new Decimal(0)
            },
            tooltip() {
                return "<h5>People have been trying for years to find an exit to the backrooms. But there is only one way, but the person who escaped doesn't want to talk about it for some reason."
            },
            style: { "background-color": "#2980B9", }
        },
        32: {
            title() { return "Deposit ALL of your mods to the Void." },
            canClick() { return player.i.mods.gte(1) && !inChallenge("i", 22) },
            unlocked() { return player.i.currentdisplay.eq(6) },
            onClick() {
                player.i.voidmods = player.i.voidmods.add(player.i.mods)
                player.i.mods = new Decimal(0)
            },
            tooltip() {
                return "<h1 class=glitch-text data-text=Glitchy Text>YOU ARE TOO WEAK TO KNOW</h1>"
            },
            style: { "background-color": "#9B59B6", }
        },
        33: {
            title() { return "<img src='resources/backarrow.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>" },
            canClick() { return player.i.startcutscene.eq(1) },
            unlocked() { return player.i.startscene.neq(40) && player.i.startscene.neq(0) },
            onClick() {
                player.i.startscene = player.i.startscene.sub(1)
            },
        },
        34: {
            title() { return "<img src='resources/backarrow.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>" },
            canClick() { return player.i.codecutscene.eq(1) },
            unlocked() { return player.i.codescene.neq(23) && player.i.codescene.neq(0) },
            onClick() {
                player.i.codescene = player.i.codescene.sub(1)
            },
        },
        35: {
            title() { return "<img src='resources/backarrow.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>" },
            canClick() { return player.i.modcutscene.eq(1) },
            unlocked() { return player.i.modscene.neq(12) && player.i.modscene.neq(0) },
            onClick() {
                player.i.modscene = player.i.modscene.sub(1)
            },
        },
    },
    upgrades: {
        11:
        {
            title: "Points Booster",
            unlocked() { return player.i.crypto.gt(0) },
            description: "x3 Point Generation.",
            cost: new Decimal(1),
            currencyLocation() { return player.i },
            currencyDisplayName: "Crypto",
            currencyInternalName: "crypto",
        },
        12:
        {
            title: "Leaves Booster",
            unlocked() { return player.i.crypto.gt(0) },
            description: "x4 Leaf Generation.",
            cost: new Decimal(3),
            currencyLocation() { return player.i },
            currencyDisplayName: "Crypto",
            currencyInternalName: "crypto",
        },
        13:
        {
            title: "Trees Booster",
            unlocked() { return player.i.crypto.gt(0) },
            description: "x1.5 Tree Generation.",
            cost: new Decimal(6),
            currencyLocation() { return player.i },
            currencyDisplayName: "Crypto",
            currencyInternalName: "crypto",
        },
        14:
        {
            title: "Softcap Booster",
            unlocked() { return player.i.crypto.gt(0) },
            description: "Tree softcap starts 3x later.",
            cost: new Decimal(10),
            currencyLocation() { return player.i },
            currencyDisplayName: "Crypto",
            currencyInternalName: "crypto",
        },
        15:
        {
            title: "Crypto Effect",
            unlocked() { return hasUpgrade("i", 14) },
            description: "Boosts leaves basted on crypto.",
            cost: new Decimal(20),
            currencyLocation() { return player.i },
            currencyDisplayName: "Crypto",
            currencyInternalName: "crypto",
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            effect() {
                return player.i.crypto.pow(0.275).add(1)
            },
        },
        16:
        {
            title: "New Buyable",
            unlocked() { return hasUpgrade("i", 15) },
            description: "Unlocks a new tree buyable and unlocks byte buyables.",
            cost: new Decimal(40),
            currencyLocation() { return player.i },
            currencyDisplayName: "Crypto",
            currencyInternalName: "crypto",
        },
        17:
        {
            title: "Increased Output",
            unlocked() { return hasUpgrade("i", 16) },
            description: "Boosts crypto based on points",
            cost: new Decimal(100),
            currencyLocation() { return player.i },
            currencyDisplayName: "Crypto",
            currencyInternalName: "crypto",
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            effect() {
                return player.points.plus(1).log10().div(2).add(1)
            },
        },
        18:
        {
            title: "New Buyable II",
            unlocked() { return hasUpgrade("i", 17) },
            description: "Unlocks another new tree buyable.",
            cost: new Decimal(500),
            currencyLocation() { return player.i },
            currencyDisplayName: "Crypto",
            currencyInternalName: "crypto",
        },
        19:
        {
            title: "Automation",
            unlocked() { return hasUpgrade("i", 18) },
            description: "Automatically buys tree buyables without spending.",
            cost: new Decimal(5000),
            currencyLocation() { return player.i },
            currencyDisplayName: "Crypto",
            currencyInternalName: "crypto",
        },
        20:
        {
            title: "More Buyables",
            unlocked() { return hasUpgrade("i", 19) },
            description: "Unlocks crypto buyables.",
            cost: new Decimal(25000),
            currencyLocation() { return player.i },
            currencyDisplayName: "Crypto",
            currencyInternalName: "crypto",
        },
        21:
        {
            title: "Next Layer",
            unlocked() { return hasUpgrade("i", 20) },
            description: "Unlocks the next layer.",
            cost: new Decimal(5000000),
            currencyLocation() { return player.i },
            currencyDisplayName: "Crypto",
            currencyInternalName: "crypto",
        },
        22:
        {
            title: "Programs",
            unlocked() { return true },
            description: "Unlocks programs.",
            cost: new Decimal(2),
            currencyLocation() { return player.i },
            currencyDisplayName: "Code Experience",
            currencyInternalName: "codeexperience",
        },
        23:
        {
            title: "QoL I",
            unlocked() { return hasUpgrade("i", 22) },
            description: "Always autobuy tree buyables.",
            cost: new Decimal(30),
            currencyLocation() { return player.i },
            currencyDisplayName: "Code Experience",
            currencyInternalName: "codeexperience",
        },
        24:
        {
            title: "QoL II",
            unlocked() { return hasUpgrade("i", 23) },
            description: "Always autobuy crypto buyables.",
            cost: new Decimal(1000),
            currencyLocation() { return player.i },
            currencyDisplayName: "Code Experience",
            currencyInternalName: "codeexperience",
        },
        25:
        {
            title: "Effect I",
            unlocked() { return hasUpgrade("i", 24) },
            description: "Extends tree super softcap (yes, that exists) based on programs.",
            cost: new Decimal(25000),
            currencyLocation() { return player.i },
            currencyDisplayName: "Code Experience",
            currencyInternalName: "codeexperience",
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            effect() {
                return player.i.programs.pow(0.2).add(1)
            },
        },
        26:
        {
            title: "Effect II",
            unlocked() { return hasUpgrade("i", 25) },
            description: "Crypto boosts point gain.",
            cost: new Decimal(150000),
            currencyLocation() { return player.i },
            currencyDisplayName: "Code Experience",
            currencyInternalName: "codeexperience",
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            effect() {
                return player.i.crypto.pow(0.15).add(1)
            },
        },
        27:
        {
            title: "QoL III",
            unlocked() { return hasUpgrade("i", 26) },
            description: "Keep crypto upgrades on reset.",
            cost: new Decimal(1e6),
            currencyLocation() { return player.i },
            currencyDisplayName: "Code Experience",
            currencyInternalName: "codeexperience",
        },
        28:
        {
            title: "The Modding Tree",
            unlocked() { return hasUpgrade("i", 27) },
            description: "Unlock mods.",
            cost: new Decimal(2e8),
            currencyLocation() { return player.i },
            currencyDisplayName: "Code Experience",
            currencyInternalName: "codeexperience",
        },
        29:
        {
            title: "QoL IV",
            unlocked() { return hasUpgrade("i", 28) },
            description: "Gain 10% of crypto per second.",
            cost: new Decimal(1e22),
            currencyLocation() { return player.i },
            currencyDisplayName: "Code Experience",
            currencyInternalName: "codeexperience",
        },
        30:
        {
            title: "Realm Mods",
            unlocked() { return hasUpgrade("i", 29) },
            description: "Unlocks realm mods.",
            cost: new Decimal(1e30),
            currencyLocation() { return player.i },
            currencyDisplayName: "Code Experience",
            currencyInternalName: "codeexperience",
        },
        31:
        {
            title: "More Buyables",
            unlocked() { return hasUpgrade("i", 30) },
            description: "Unlocks more mod buyables.",
            cost: new Decimal(1e38),
            currencyLocation() { return player.i },
            currencyDisplayName: "Code Experience",
            currencyInternalName: "codeexperience",
        },
        32:
        {
            title: "Inflate",
            unlocked() { return hasUpgrade("i", 31) },
            description: "Boost tree gain based on leaves per second.",
            cost: new Decimal(1e45),
            currencyLocation() { return player.i },
            currencyDisplayName: "Code Experience",
            currencyInternalName: "codeexperience",
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            effect() {
                return player.i.leavespersecond.pow(0.3).add(1)
            },
        },
        33:
        {
            title: "QoL V",
            unlocked() { return hasUpgrade("i", 32) },
            description: "Gives 10% of realm mods per second.",
            cost: new Decimal(1e65),
            currencyLocation() { return player.i },
            currencyDisplayName: "Code Experience",
            currencyInternalName: "codeexperience",
        },
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(1.8).pow(x || getBuyableAmount(this.layer, this.id)).mul(1) },
            effect(x) { return new getBuyableAmount(this.layer, this.id) },
            unlocked() { return player.i.startcutscene.eq(0) },
            canAfford() { return player.points.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Leaf Generator"
            },
            tooltip() {
                return "<h5>Gaining Incremental Power this way hasn't always been this easy, hasn't it?"
            },
            display() {
                return "which are producing " + format(tmp[this.layer].buyables[this.id].effect) + " leaves per second.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Points"
            },
            buy() {
                if (player.points.gte(this.cost())) {
                    let base = new Decimal(1)
                    let growth = 1.8
                    let max = Decimal.affordGeometricSeries(player.points, base, growth, getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("i", 23)) { if (!hasUpgrade("i", 19)) player.points = player.points.sub(cost) }
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { "background-color": "#228B22", width: '275px', height: '150px', }
        },
        12: {
            cost(x) { return new Decimal(1.3).pow(x || getBuyableAmount(this.layer, this.id)).mul(15) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).add(1) },
            unlocked() { return player.i.startcutscene.eq(0) },
            canAfford() { return player.i.trees.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Point Multiplier"
            },
            tooltip() {
                return "<h5>Trees must be the only source of finding this power."
            },
            display() {
                return "which are boosting point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Trees"
            },
            buy() {
                if (player.i.trees.gte(this.cost())) {
                    let base = new Decimal(15)
                    let growth = 1.3
                    let max = Decimal.affordGeometricSeries(player.i.trees, base, growth, getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("i", 23)) { if (!hasUpgrade("i", 19)) player.i.trees = player.i.trees.sub(cost) }
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { "background-color": "#228B22", width: '275px', height: '150px', }
        },
        13: {
            cost(x) { return new Decimal(1.5).pow(x || getBuyableAmount(this.layer, this.id)).mul(100) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.2).add(1) },
            unlocked() { return player.i.startcutscene.eq(0) },
            canAfford() { return player.points.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Softcap Extender"
            },
            tooltip() {
                return "<h5>This strange feeling tugging on me. Must be the softcap. Strange feeling."
            },
            display() {
                return "which are extending the tree softcap by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Points"
            },
            buy() {
                if (player.points.gte(this.cost())) {
                    let base = new Decimal(100)
                    let growth = 1.5
                    let max = Decimal.affordGeometricSeries(player.points, base, growth, getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("i", 23)) { if (!hasUpgrade("i", 19)) player.points = player.points.sub(cost) }
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { "background-color": "#228B22", width: '275px', height: '150px', }
        },
        14: {
            cost(x) { return new Decimal(1.4).pow(x || getBuyableAmount(this.layer, this.id)).mul(30) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.3).add(1) },
            unlocked() { return player.i.startcutscene.eq(0) },
            canAfford() { return player.i.trees.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Requirement Shortener"
            },
            tooltip() {
                return "<h5>Did I even notice how Red Diamond looked?"
            },
            display() {
                return "which are dividing tree requirement by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Trees"
            },
            buy() {
                if (player.i.trees.gte(this.cost())) {
                    let base = new Decimal(30)
                    let growth = 1.4
                    let max = Decimal.affordGeometricSeries(player.i.trees, base, growth, getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("i", 23)) { if (!hasUpgrade("i", 19)) player.i.trees = player.i.trees.sub(cost) }
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { "background-color": "#228B22", width: '275px', height: '150px', }
        },
        15: {
            cost(x) { return new Decimal(1.2).pow(x || getBuyableAmount(this.layer, this.id)).mul(10) },
            unlocked() { return true },
            canAfford() { return player.i.crypto.gte(this.cost()) },
            title() {
                return format(player.i.cryptodim1) + "<br/>Crypto Dimension 1"
            },
            tooltip() {
                return "<h5>Crypto. The modern version of coins. More powerful. More versatility."
            },
            display() {
                return "which gives " + format(player.i.bytespersecond) + " bytes per second.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Crypto\n\
                    (" + format(player.i.cryptodim1mult) + "x)"
            },
            buy() {
                let base = new Decimal(10)
                let growth = 1.2
                let max = Decimal.affordGeometricSeries(player.i.crypto, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("i", 24)) player.i.crypto = player.i.crypto.sub(cost)
                player.i.cryptodim1mult = player.i.cryptodim1mult.add(max.div(100))
                player.i.cryptodim1 = player.i.cryptodim1.add(max)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            },
            style: { "background-color": "#0F52BA", width: '250px', height: '150px', }
        },
        16: {
            cost(x) { return new Decimal(1.3).pow(x || getBuyableAmount(this.layer, this.id)).mul(100) },
            unlocked() { return true },
            canAfford() { return player.i.crypto.gte(this.cost()) },
            title() {
                return format(player.i.cryptodim2) + "<br/>Crypto Dimension 2"
            },
            tooltip() {
                return "<h5>Bytes store information. Information is vital for keeping incremental power stable."
            },
            display() {
                return "which gives " + format(player.i.cryptodim1persecond) + " crypto dimension 1 per second.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Crypto\n\
                    (" + format(player.i.cryptodim2mult) + "x)"
            },
            buy() {
                let base = new Decimal(100)
                let growth = 1.3
                let max = Decimal.affordGeometricSeries(player.i.crypto, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("i", 24)) player.i.crypto = player.i.crypto.sub(cost)
                player.i.cryptodim2mult = player.i.cryptodim2mult.add(max.div(100))
                player.i.cryptodim2 = player.i.cryptodim2.add(max)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            },
            style: { "background-color": "#0F52BA", width: '250px', height: '150px', }
        },
        17: {
            cost(x) { return new Decimal(1.4).pow(x || getBuyableAmount(this.layer, this.id)).mul(1e3) },

            unlocked() { return true },
            canAfford() { return player.i.crypto.gte(this.cost()) },
            title() {
                return format(player.i.cryptodim3) + "<br/>Crypto Dimension 3"
            },
            tooltip() {
                return "<h5>Oddly enough, crypto can be corrupting. Something coins didn't do."
            },
            display() {
                return "which gives " + format(player.i.cryptodim2persecond) + " crypto dimension 2 per second.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Crypto\n\
                    (" + format(player.i.cryptodim3mult) + "x)"
            },
            buy() {
                let base = new Decimal(1e3)
                let growth = 1.4
                let max = Decimal.affordGeometricSeries(player.i.crypto, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("i", 24)) player.i.crypto = player.i.crypto.sub(cost)
                player.i.cryptodim3mult = player.i.cryptodim3mult.add(max.div(100))
                player.i.cryptodim3 = player.i.cryptodim3.add(max)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            },
            style: { "background-color": "#0F52BA", width: '250px', height: '150px', }
        },
        18: {
            cost(x) { return new Decimal(1.5).pow(x || getBuyableAmount(this.layer, this.id)).mul(1e4) },
            unlocked() { return true },
            canAfford() { return player.i.crypto.gte(this.cost()) },
            title() {
                return format(player.i.cryptodim4) + "<br/>Crypto Dimension 4"
            },
            tooltip() {
                return "<h5>The power of crypto has only popped up recently. I assume."
            },
            display() {
                return "which gives " + format(player.i.cryptodim3persecond) + " crypto dimension 3 per second.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Crypto\n\
                    (" + format(player.i.cryptodim4mult) + "x)"
            },
            buy() {
                let base = new Decimal(1e4)
                let growth = 1.5
                let max = Decimal.affordGeometricSeries(player.i.crypto, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("i", 24)) player.i.crypto = player.i.crypto.sub(cost)
                player.i.cryptodim4mult = player.i.cryptodim4mult.add(max.div(100))
                player.i.cryptodim4 = player.i.cryptodim4.add(max)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            },
            style: { "background-color": "#0F52BA", width: '250px', height: '150px', }
        },
        19: {
            cost(x) { return new Decimal(2).pow(x || getBuyableAmount(this.layer, this.id)).mul(250) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.3).add(1) },
            unlocked() { return hasUpgrade("i", 16) || player.i.codeexperience.gt(0) },
            canAfford() { return player.points.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Tree Booster"
            },
            tooltip() {
                return "<h5>To get enough power to do something meaninful, I must have a lot of points. A LOT."
            },
            display() {
                return "which are boosting trees by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Points"
            },
            buy() {
                if (player.points.gte(this.cost())) {
                    let base = new Decimal(250)
                    let growth = 2
                    let max = Decimal.affordGeometricSeries(player.points, base, growth, getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("i", 23)) { if (!hasUpgrade("i", 19)) player.points = player.points.sub(cost) }
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { "background-color": "#228B22", width: '275px', height: '150px', }
        },
        20: {
            cost(x) { return new Decimal(2).pow(x || getBuyableAmount(this.layer, this.id)).mul(10) },
            effect(x) { return Decimal.pow(1.1, player[this.layer].buyables[this.id].add(player.i.codeexperienceeffect)) },
            unlocked() { return hasUpgrade("i", 16) || player.i.codeexperience.gt(0) },
            canAfford() { return player.i.bytes.gte(this.cost()) },
            title() {
                return player.i.codeexperience.eq(0) ? format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Accelerator" : format(getBuyableAmount(this.layer, this.id), 0) + " + " + format(player.i.codeexperienceeffect) + "<br/> Accelerator"
            },
            tooltip() {
                return "<h5>Strange, how little amounts of information can provide generous boosts."
            },
            display() {
                return "which are boosting trees, points, and leaves by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Bytes"
            },
            buy() {
                if (player.i.bytes.gte(this.cost())) {
                    let base = new Decimal(10)
                    let growth = 2
                    let max = Decimal.affordGeometricSeries(player.i.bytes, base, growth, getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("i", 24)) player.i.bytes = player.i.bytes.sub(cost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { "background-color": "#0F52BA", width: '275px', height: '150px', }
        },
        21: {
            cost(x) { return new Decimal(2.5).pow(x || getBuyableAmount(this.layer, this.id)).mul(50) },
            effect(x) { return Decimal.pow(1.3, player[this.layer].buyables[this.id].add(player.i.programcryptoplier)) },
            unlocked() { return hasUpgrade("i", 16) || player.i.codeexperience.gt(0) },
            canAfford() { return player.i.bytes.gte(this.cost()) },
            title() {
                return player.i.programcryptoplier.eq(0) ? format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Cryptoplier" : format(getBuyableAmount(this.layer, this.id), 0) + " + " + format(player.i.programcryptoplier) + "<br/> Cryptoplier"
            },
            tooltip() {
                return "<h5>Also strange that the type of crypto isn't specified. Is it bitcoin or ethereum?"
            },
            display() {
                return "which are boosting crypto gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Bytes"
            },
            buy() {
                if (player.i.bytes.gte(this.cost())) {
                    let base = new Decimal(50)
                    let growth = 2.5
                    let max = Decimal.affordGeometricSeries(player.i.bytes, base, growth, getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("i", 24)) player.i.bytes = player.i.bytes.sub(cost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { "background-color": "#0F52BA", width: '275px', height: '150px', }
        },
        22: {
            cost(x) { return new Decimal(3).pow(x || getBuyableAmount(this.layer, this.id)).mul(200) },
            effect(x) { return Decimal.pow(1.25, player[this.layer].buyables[this.id].add(player.i.programtickspeed)) },
            unlocked() { return hasUpgrade("i", 16) || player.i.codeexperience.gt(0) },
            canAfford() { return player.i.bytes.gte(this.cost()) },
            title() {
                return player.i.programtickspeed.eq(0) ? format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Tickspeed" : format(getBuyableAmount(this.layer, this.id), 0) + " + " + format(player.i.programtickspeed) + "<br/> Tickspeed"
            },
            tooltip() {
                return "<h5>Polynomial growth... A power consumed by higher beings."
            },
            display() {
                return "which are boosting crypto dimensions by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Bytes"
            },
            buy() {
                if (player.i.bytes.gte(this.cost())) {
                    let base = new Decimal(200)
                    let growth = 3
                    let max = Decimal.affordGeometricSeries(player.i.bytes, base, growth, getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("i", 24)) player.i.bytes = player.i.bytes.sub(cost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { "background-color": "#0F52BA", width: '275px', height: '150px', }
        },
        23: {
            cost(x) { return new Decimal(3.5).pow(x || getBuyableAmount(this.layer, this.id)).mul(800) },
            effect(x) { return Decimal.pow(1.22, player[this.layer].buyables[this.id].add(player.i.programweakener)) },
            unlocked() { return hasUpgrade("i", 16) || player.i.codeexperience.gt(0) },
            canAfford() { return player.i.bytes.gte(this.cost()) },
            title() {
                return player.i.programweakener.eq(0) ? format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Weakener" : format(getBuyableAmount(this.layer, this.id), 0) + " + " + format(player.i.programweakener) + "<br/> Weakener"
            },
            tooltip() {
                return "<h5>Remember, the softcaps will always exist no matter what."
            },
            display() {
                return "which are extending softcaps and dividing tree requirement by x and /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Bytes"
            },
            buy() {
                if (player.i.bytes.gte(this.cost())) {
                    let base = new Decimal(800)
                    let growth = 3.5
                    let max = Decimal.affordGeometricSeries(player.i.bytes, base, growth, getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("i", 24)) player.i.bytes = player.i.bytes.sub(cost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { "background-color": "#0F52BA", width: '275px', height: '150px', }
        },
        24: {
            cost(x) { return new Decimal(3).pow(x || getBuyableAmount(this.layer, this.id)).mul(1000) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.5).add(1) },
            unlocked() { return hasUpgrade("i", 18) || player.i.codeexperience.gt(0) },
            canAfford() { return player.points.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Dimension Booster"
            },
            tooltip() {
                return "<h5>Six realms huh? Before I only thought there were one universe. Why am I even believing all of this?"
            },
            display() {
                return "which are boosting crypto dimensions by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Points"
            },
            buy() {
                if (player.points.gte(this.cost())) {
                    let base = new Decimal(1000)
                    let growth = 3
                    let max = Decimal.affordGeometricSeries(player.points, base, growth, getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("i", 23)) { if (!hasUpgrade("i", 19)) player.points = player.points.sub(cost) }
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { "background-color": "#228B22", width: '275px', height: '150px', }
        },
        25: {
            cost(x) { return new Decimal(2).pow(x || getBuyableAmount(this.layer, this.id)).mul(1000) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).add(1) },
            unlocked() { return hasUpgrade("i", 18) || player.i.codeexperience.gt(0) },
            canAfford() { return player.i.crypto.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Dimension Amplifier"
            },
            tooltip() {
                return "<h5>Why is bringing the multiverse back together a good thing?"
            },
            display() {
                return "which are boosting crypto dimensions by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Crypto"
            },
            buy() {
                if (player.i.crypto.gte(this.cost())) {
                    let base = new Decimal(1000)
                    let growth = 2
                    let max = Decimal.affordGeometricSeries(player.i.crypto, base, growth, getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("i", 24)) player.i.crypto = player.i.crypto.sub(cost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { "background-color": "#0F52BA", width: '275px', height: '150px', }
        },
        26: {
            cost(x) { return new Decimal(3).pow(x || getBuyableAmount(this.layer, this.id)).mul(3000) },
            effect(x) { return new Decimal.pow(1.25, player[this.layer].buyables[this.id]) },
            unlocked() { return hasUpgrade("i", 18) || player.i.codeexperience.gt(0) },
            canAfford() { return player.i.crypto.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Crypto Amplifier"
            },
            tooltip() {
                return "<h5>Wouldn't bringing it back only cause more chaos?"
            },
            display() {
                return "which are boosting crypto gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Crypto"
            },
            buy() {
                if (player.i.crypto.gte(this.cost())) {
                    let base = new Decimal(3000)
                    let growth = 3
                    let max = Decimal.affordGeometricSeries(player.i.crypto, base, growth, getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("i", 24)) player.i.crypto = player.i.crypto.sub(cost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { "background-color": "#0F52BA", width: '275px', height: '150px', }
        },
        27: {
            cost(x) { return new Decimal(2.5).pow(x || getBuyableAmount(this.layer, this.id)).mul(10000) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(1.4).add(1) },
            unlocked() { return hasUpgrade("i", 18) || player.i.codeexperience.gt(0) },
            canAfford() { return player.i.crypto.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Softcap Weakener"
            },
            tooltip() {
                return "<h5>And what about me made me worthy in the first place?"
            },
            display() {
                return "which are weakening tree softcap by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Crypto"
            },
            buy() {
                if (player.i.crypto.gte(this.cost())) {
                    let base = new Decimal(10000)
                    let growth = 2.5
                    let max = Decimal.affordGeometricSeries(player.i.crypto, base, growth, getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("i", 24)) player.i.crypto = player.i.crypto.sub(cost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { "background-color": "#0F52BA", width: '275px', height: '150px', }
        },
        28: {
            cost(x) { return new Decimal(1.4).pow(x || getBuyableAmount(this.layer, this.id)).mul(1) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(1.75).mul(0.01) },
            unlocked() { return true },
            canAfford() { return player.i.codeexperience.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Programmer"
            },
            tooltip() {
                return "<h5>The power of code. Information in it's purest form. Really enchances point gain."
            },
            display() {
                return "which are producing +" + format(tmp[this.layer].buyables[this.id].effect) + " programs per second.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Code Experience"
            },
            buy() {
                if (player.i.codeexperience.gte(this.cost())) {
                    let base = new Decimal(1)
                    let growth = 1.4
                    let max = Decimal.affordGeometricSeries(player.i.codeexperience, base, growth, getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                    player.i.codeexperience = player.i.codeexperience.sub(cost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { "background-color": "#BF40BF", width: '275px', height: '150px', }
        },
        29: {
            cost(x) { return new Decimal(2).pow(x || getBuyableAmount(this.layer, this.id)).mul(4) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(0.95).mul(0.25).add(1) },
            unlocked() { return true },
            canAfford() { return player.i.codeexperience.gte(this.cost()) && player.i.buyables[29].lt(50) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> User"
            },
            tooltip() {
                return "<h5>This force plays the biggest role in incremental power. Without it, incremental power would be meaningless."
            },
            display() {
                return "which are providing x" + format(tmp[this.layer].buyables[this.id].effect) + " extra buyables from programs. (Caps at 50)\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Code Experience"
            },
            buy() {
                if (player.i.codeexperience.gte(this.cost())) {
                    let base = new Decimal(4)
                    let growth = 2
                    let max = Decimal.affordGeometricSeries(player.i.codeexperience, base, growth, getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                    player.i.codeexperience = player.i.codeexperience.sub(cost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { "background-color": "#BF40BF", width: '275px', height: '150px', }
        },
        30: {
            cost(x) { return new Decimal(2.5).pow(x || getBuyableAmount(this.layer, this.id)).mul(2000) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(0.90).mul(0.2).add(1) },
            unlocked() { return true },
            canAfford() { return player.i.codeexperience.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Reviewer"
            },
            tooltip() {
                return "<h5>However, only the truest of programmers can access true code experience."
            },
            display() {
                return "which are boosting program gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Code Experience"
            },
            buy() {
                if (player.i.codeexperience.gte(this.cost())) {
                    let base = new Decimal(2000)
                    let growth = 2.5
                    let max = Decimal.affordGeometricSeries(player.i.codeexperience, base, growth, getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                    player.i.codeexperience = player.i.codeexperience.sub(cost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { "background-color": "#BF40BF", width: '275px', height: '150px', }
        },
        31: {
            cost(x) { return new Decimal(3).pow(x || getBuyableAmount(this.layer, this.id)).mul(1e8) },
            effect(x) { return new getBuyableAmount(this.layer, this.id) },
            unlocked() { return true },
            canAfford() { return player.i.codeexperience.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Modder"
            },
            tooltip() {
                return "<h5>Acamaeda. His intelligence helped the nobles in many conquests."
            },
            display() {
                return "which are making +" + format(tmp[this.layer].buyables[this.id].effect) + " lines of code per second.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Code Experience"
            },
            buy() {
                if (player.i.codeexperience.gte(this.cost())) {
                    let base = new Decimal(1e8)
                    let growth = 3
                    let max = Decimal.affordGeometricSeries(player.i.codeexperience, base, growth, getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                    player.i.codeexperience = player.i.codeexperience.sub(cost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { "background-color": "#BF40BF", width: '275px', height: '150px', }
        },
        32: {
            cost(x) { return new Decimal(4).pow(x || getBuyableAmount(this.layer, this.id)).mul(1e10) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.25).add(1) },
            unlocked() { return true },
            canAfford() { return player.i.codeexperience.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Moderator"
            },
            tooltip() {
                return "<h5>An ancestor of the ancient incremental high gods, he started from humble beginnings."
            },
            display() {
                return "which are extending the crypto dimension and mod softcap by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Code Experience"
            },
            buy() {
                if (player.i.codeexperience.gte(this.cost())) {
                    let base = new Decimal(1e10)
                    let growth = 4
                    let max = Decimal.affordGeometricSeries(player.i.codeexperience, base, growth, getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                    player.i.codeexperience = player.i.codeexperience.sub(cost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { "background-color": "#BF40BF", width: '275px', height: '150px', }
        },
        33: {
            cost(x) { return new Decimal(6).pow(x || getBuyableAmount(this.layer, this.id)).mul(1e25) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(2.5).mul(400).add(1) },
            unlocked() { return true },
            canAfford() { return player.i.codeexperience.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Moddist"
            },
            tooltip() {
                return "<h5>Acamaeda stuidied incremental powers extensively like his ancestors had. However, he never had a mentor."
            },
            display() {
                return "which are boosting leaf, tree and point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Code Experience"
            },
            buy() {
                if (player.i.codeexperience.gte(this.cost())) {
                    let base = new Decimal(1e25)
                    let growth = 6
                    let max = Decimal.affordGeometricSeries(player.i.codeexperience, base, growth, getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                    player.i.codeexperience = player.i.codeexperience.sub(cost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            }, 
            style: { "background-color": "#BF40BF", width: '275px', height: '150px', }
        },
        34: {
            cost(x) { return new Decimal(1.5).pow(x || getBuyableAmount(this.layer, this.id)).mul(10) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.8).add(1) },
            unlocked() { return hasUpgrade("i", 31) },
            canAfford() { return player.i.mods.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Moddician"
            },
            tooltip() {
                return "<h5>One day, Acamaeda was noticed by two of the four nobles. They wanted him to work on a machine that can replicate one of their creations."
            },
            display() {
                return "which are boosting mod gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Mods"
            },
            buy() {
                if (player.i.mods.gte(this.cost())) {
                    let base = new Decimal(10)
                    let growth = 1.5
                    let max = Decimal.affordGeometricSeries(player.i.mods, base, growth, getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                    player.i.mods = player.i.mods.sub(cost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { "background-color": "#BF40BF", width: '275px', height: '150px', }
        },
        35: {
            cost(x) { return new Decimal(1.6).pow(x || getBuyableAmount(this.layer, this.id)).mul(25) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).add(1) },
            unlocked() { return hasUpgrade("i", 31) },
            canAfford() { return player.i.mods.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Moddinger"
            },
            tooltip() {
                return "<h5>The nobles' creation was called the prestige tree. It was a very legendary creation. It is said that the tree can split multiverses and release large bursts of energy."
            },
            display() {
                return "which are boosting code experience gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Mods"
            },
            buy() {
                if (player.i.mods.gte(this.cost())) {
                    let base = new Decimal(25)
                    let growth = 1.6
                    let max = Decimal.affordGeometricSeries(player.i.mods, base, growth, getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                    player.i.mods = player.i.mods.sub(cost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { "background-color": "#BF40BF", width: '275px', height: '150px', }
        },
        36: {
            cost(x) { return new Decimal(1.7).pow(x || getBuyableAmount(this.layer, this.id)).mul(75) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.5).add(1) },
            unlocked() { return hasUpgrade("i", 31) },
            canAfford() { return player.i.mods.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Moddisa"
            },
            tooltip() {
                return "<h5>But one day, the tree started wilting. It wasn't know why. The tree fell down to the ground once the nobles were exiled."
            },
            display() {
                return "which are shortening mod requirement by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Mods"
            },
            buy() {
                if (player.i.mods.gte(this.cost())) {
                    let base = new Decimal(75)
                    let growth = 1.7
                    let max = Decimal.affordGeometricSeries(player.i.mods, base, growth, getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                    player.i.mods = player.i.mods.sub(cost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { "background-color": "#BF40BF", width: '275px', height: '150px', }
        },
    },
    milestones: {

    },
    challenges: {
    },
    bars: {
        treebar: {
            unlocked() { return player.i.startcutscene.eq(0) },
            direction: RIGHT,
            width: 476,
            height: 50,
            progress() {
                return player.i.leaves.div(player.i.treereq)
            },
            fillStyle: {
                "background-color": "#228B22",
            },
            display() {
                return "<h5>" + format(player.i.leaves) + "/" + format(player.i.treereq) + "<h5> Leaves to beat a tree</h5>";
            },
        },
        modbar: {
            unlocked() { return player.i.modcutscene.eq(0) },
            direction: RIGHT,
            width: 476,
            height: 50,
            progress() {
                return player.i.linesofcode.div(player.i.modreq)
            },
            fillStyle: {
                "background-color": "#BF40BF",
            },
            display() {
                return "<h5>" + format(player.i.linesofcode) + "/" + format(player.i.modreq) + "<h5> Lines of code to make a mod</h5>";
            },
        },
    },
    infoboxes: {

    },
    microtabs: {
        stuff: {
            "Trees": {
                buttonStyle() { return { 'color': '#228B22' } },
                unlocked() { return true },
                content:
                    [
                        ["blank", "25px"],
                        ["row", [["bar", "treebar"]]],
                        ["raw-html", function () { return player.i.startcutscene.eq(0) ? "<h2>You are making " + format(player.i.leavespersecond) + "<h2> leaves per second. " : "" }],
                        ["raw-html", function () { return player.i.startcutscene.eq(0) ? "<h2>You beat " + formatWhole(player.i.trees) + "<h2> trees, which produce points. " : "" }],
                        ["raw-html", function () { return player.i.startcutscene.eq(0) ? "<h2>You will gain " + format(player.i.treegen, 1) + "<h2> trees." : ""}],
                        ["raw-html", function () { return player.i.startcutscene.eq(0) && player.i.trees.gte(player.i.treesoftcapstart) ? "After " + formatWhole(player.i.treesoftcapstart) + " trees, leaf gain is divided by " + format(player.i.treesoftcap) + " (Based on trees)" : "" }, { "color": "red", "font-size": "16px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.startcutscene.eq(0) && player.i.trees.gte(player.i.treesupersoftcapstart) ? "After " + formatWhole(player.i.treesupersoftcapstart) + " trees, leaf gain is divided by " + format(player.i.treesupersoftcap) + " (SUPER SOFTCAP)" : "" }, { "color": "#880808", "font-size": "16px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["row", [["buyable", 11], ["buyable", 12], ["buyable", 13], ["buyable", 14]]],
                        ["row", [["buyable", 19], ["buyable", 24]]],
                        ["blank", "25px"],
                        ["raw-html", function () { return player.i.startscene.eq(0) ? "<h1> Hello! I might seem strange, or unwelcoming. Don't worry. " : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.startscene.eq(1) ? "<h1> My name is Red Diamond. I have a very special task for you. " : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.startscene.eq(2) ? "<h1> You will be confused, but trust me. You will eventually understand. " : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.startscene.eq(3) ? "<h1> First, you must understand the truth behind our multiverse. " : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.startscene.eq(4) ? "<h1> Six realms. Creator. Higher. Death. Dimensional. Backrooms. Void. " : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.startscene.eq(5) ? "<h1> Each realm is special to one another. You live in the dimensional realm. " : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.startscene.eq(6) ? "<h1> I am from the higher plane of existence. " : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.startscene.eq(7) ? "<h1> The creator realm is where the meta-beings live. " : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.startscene.eq(8) ? "<h1> They have power over all the lower realms. However, we can't interact with them. " : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.startscene.eq(9) ? "<h1> The higher plane of existence is the mainland of all godly beings. " : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.startscene.eq(10) ? "<h1> The most powerful beings reside there. They also recruit new gods. " : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.startscene.eq(11) ? "<h1> The death realm. Heaven, hell and purgatory. The afterlife is the death realm. " : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.startscene.eq(12) ? "<h1> The dimensional realm. The mainland of the multiverse. Every possible universe is here. " : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.startscene.eq(13) ? "<h1> Realistic. Fictional. Theoretical. Abstract. All in this one realm. " : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.startscene.eq(14) ? "<h1> The backrooms. The liminal spaces. A glitch in the multiverse. " : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.startscene.eq(15) ? "<h1> If you are unlucky enough, you might noclip into this realm. " : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.startscene.eq(16) ? "<h1> Trust me. This is worse than hell. " : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.startscene.eq(17) ? "<h1> The void. Complete and utter darkness. The worst place to be. " : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.startscene.eq(18) ? "<h1> However, the most powerful energy is in here. " : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.startscene.eq(19) ? "<h1> It hasn't always been this way. " : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.startscene.eq(20) ? "<h1> In the genesis of the multiverse, all six realms were one. " : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.startscene.eq(21) ? "<h1> All the beings lived in harmony. No conflict ever occurred. " : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.startscene.eq(22) ? "<h1> Until the multiversal splitter came. " : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.startscene.eq(23) ? "<h1> The splitter used an ancient force and split the multiverse into the six realms. " : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.startscene.eq(24) ? "<h1> Everything started getting worse from here. " : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.startscene.eq(25) ? "<h1> After life evolved in each realm, they started conflict with each other. " : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.startscene.eq(26) ? "<h1> A five-way war happened, excluding the creator realm. " : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.startscene.eq(27) ? "<h1> The higher plane ended up victorious. We took total control over the lower realms. " : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.startscene.eq(28) ? "<h1> But in a good way, to end conflict. By starting prophecies and recruiting heroes. " : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.startscene.eq(29) ? "<h1> And that's why I'm here. To give you the most harrowing task we've ever sent. " : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.startscene.eq(30) ? "<h1> YOU ARE THE PROPHESIED HERO THAT WILL REUNITE THE REALMS AS ONE. " : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.startscene.eq(31) ? "<h1> YOU MUST BE READY TO KILL THE SPLITTER AND END ALL CONFLICT. " : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.startscene.eq(32) ? "<h1> However, it will take a very long way from there. " : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.startscene.eq(33) ? "<h1> You must obtain the most useful and versatile force in the multiverse. " : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.startscene.eq(34) ? "<h1> Incremental power. Stored in the form of points. " : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.startscene.eq(35) ? "<h1> You can get them from playing idle games. YOU KNOW WHAT TO DO NOW. " : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.startscene.eq(36) ? "<h1> Incremental God Tree " : "" }, { "color": "white", "font-size": "64px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.startscene.eq(37) ? "<h1> Made by Icecreamdude " : "" }, { "color": "white", "font-size": "32px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.startscene.eq(38) ? "<h1> Music by Sweetlolipop " : "" }, { "color": "white", "font-size": "32px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.startscene.eq(39) ? "<h1> Chapter 1: The path of singularity " : "" }, { "color": "white", "font-size": "32px", "font-family": "monospace" }],
                        ["blank", "50px"],
                        ["row", [["clickable", 33], ["clickable", 11]]],
                    ]

            },
            "Crypto": {
                buttonStyle() { return { 'color': '#0F52BA' } },
                unlocked() { return player.points.gte(1000) || player.i.crypto.gt(0) || player.i.codeexperience.gt(0) },
                content:
                    [
                        ["microtabs", "crypto", { 'border-width': '0px' }],
                    ]

            },
            "Coding": {
                buttonStyle() { return { 'color': '#BF40BF' } },
                unlocked() { return hasUpgrade("i", 21) || player.i.codeexperience.gt(0) },
                content:
                    [
                        ["microtabs", "coding", { 'border-width': '0px' }],
                    ]

            },
        },
        crypto: {
            "Main": {
                buttonStyle() { return { 'color': '#0F52BA' } },
                unlocked() { return player.points.gte(1000) || player.i.crypto.gt(0) || player.i.codeexperience.gt(0) },
                content:
                    [
                        ["blank", "25px"],
                        ["raw-html", function () { return player.i.startcutscene.eq(0) ? "<h2>You have " + format(player.i.crypto) + "<h2> crypto. " : "" }],
                        ["raw-html", function () { return player.i.startcutscene.eq(0) ? "<h2>You will gain " + format(player.i.cryptotoget) + "<h2> on reset. " : "" }],
                        ["raw-html", function () { return player.i.startcutscene.eq(0) ? "<h3>Crypto gain is based on trees. " : "" }],
                        ["blank", "25px"],
                        ["row", [["clickable", 12]]],
                        ["blank", "25px"],
                        ["raw-html", function () { return "<h1>Upgrades " }],
                        ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15], ["upgrade", 16]]],
                        ["row", [["upgrade", 17], ["upgrade", 18], ["upgrade", 19], ["upgrade", 20], ["upgrade", 21]]],
                    ]

            },
            "Crypto Dimensions": {
                buttonStyle() { return { 'color': '#0F52BA' } },
                unlocked() { return hasUpgrade("i", 14) || player.i.codeexperience.gt(0) },
                content:
                    [
                        ["blank", "25px"],
                        ["raw-html", function () { return player.i.startcutscene.eq(0) ? "<h2>You have " + format(player.i.crypto) + "<h2> crypto. " : "" }],
                        ["raw-html", function () { return player.i.startcutscene.eq(0) ? "<h2>You have " + format(player.i.bytes) + "<h2> bytes, which give a " + format(player.i.byteseffect) + "x boost to point gain." : "" }],
                        ["raw-html", function () { return player.i.startcutscene.eq(0) && player.i.bytes.gte(player.i.cryptodimsoftcapstart) ? "After " + formatWhole(player.i.cryptodimsoftcapstart) + " bytes, crypto dimensions gain is divided by " + format(player.i.cryptodimsoftcap) + " (Based on bytes)" : "" }, { "color": "red", "font-size": "16px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["row", [["buyable", 15], ["buyable", 16], ["buyable", 17], ["buyable", 18]]],
                        ["blank", "25px"],
                        ["raw-html", function () { return "<h1>Buyables " }],
                        ["row", [["buyable", 20], ["buyable", 21], ["buyable", 22], ["buyable", 23]]],
                    ]
            },
            "Crypto Buyables": {
                buttonStyle() { return { 'color': '#0F52BA' } },
                unlocked() { return hasUpgrade("i", 20) || player.i.codeexperience.gt(0) },
                content:
                    [
                        ["blank", "25px"],
                        ["raw-html", function () { return player.i.startcutscene.eq(0) ? "<h2>You have " + format(player.i.crypto) + "<h2> crypto. " : "" }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "<h1>Buyables " }],
                        ["row", [["buyable", 25], ["buyable", 26], ["buyable", 27]]],
                    ]
            },
        },
        coding: {
            "Cutscene": {
                buttonStyle() { return { 'color': '#BF40BF' } },
                unlocked() { return player.i.codecutscene.eq(1) },
                content:
                    [
                        ["blank", "25px"],
                        ["raw-html", function () { return player.i.codescene.eq(1) ? "<h1>Hello. It looks like you have made some reasonable progress." : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.codescene.eq(2) ? "<h1>You have achieved mastery in the power of trees and crypto." : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.codescene.eq(3) ? "<h1>Perhaps I shall provide more context for what's coming." : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.codescene.eq(4) ? "<h1>After the war. Things were still going wrong." : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.codescene.eq(5) ? "<h1>There were alliances. The higher plane and death realm made one." : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.codescene.eq(6) ? "<h1>Also the backrooms and void. They hated each other." : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.codescene.eq(7) ? "<h1>They had one goal: To claim the dimensional realm." : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.codescene.eq(8) ? "<h1>In order to succeed, the backrooms and void used their power to create four legendary beings." : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.codescene.eq(9) ? "<h1>They were the incremental nobles. They had full mastery over incremental power." : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.codescene.eq(10) ? "<h1>The knight of upgrades. The mage of automation. The ranger of numbers. The warrior of infinity." : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.codescene.eq(11) ? "<h1>The nobles did their job and helped the backrooms and void out." : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.codescene.eq(12) ? "<h1>They worked well with numbers. They discovered many things never known before." : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.codescene.eq(13) ? "<h1>They extracted power from darkness to make a very powerful weapon." : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.codescene.eq(14) ? "<h1>This weapon was so powerful, it could have killed the multiversal splitter." : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.codescene.eq(15) ? "<h1>But the higher plane took notice of their creation. They wanted truce." : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.codescene.eq(16) ? "<h1>However, the death realm didn't want truce. So they cut ties with the higher plane." : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.codescene.eq(17) ? "<h1>The death realm searched for the incremental nobles." : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.codescene.eq(18) ? "<h1>In a long battle, three of the four nobles got captured." : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.codescene.eq(19) ? "<h1>The infinity keeper fleed. I'll talk about him when you get to infinity." : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.codescene.eq(20) ? "<h1>Now, you must learn how to code. The power of coding is also beneficial to incremental power." : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.codescene.eq(21) ? "<h1>This power is great. You can even harness power from the realms." : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.codescene.eq(22) ? "<h1>Keep going. I will see you soon." : "" }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["blank", "50px"],
                        ["row", [["clickable", 34], ["clickable", 14]]],
                    ]

            },
            "Main": {
                buttonStyle() { return { 'color': '#BF40BF' } },
                unlocked() { return player.i.codecutscene.neq(1) },
                content:
                    [
                        ["blank", "25px"],
                        ["raw-html", function () { return player.i.startcutscene.eq(0) ? "<h2>You have " + format(player.i.codeexperience) + "<h2> code experience. " : "" }],
                        ["raw-html", function () { return player.i.startcutscene.eq(0) ? "<h2>Your code experience provides +" + format(player.i.codeexperienceeffect) + "<h2> extra accelerators. (Caps at 1500)" : "" }],
                        ["raw-html", function () { return player.i.startcutscene.eq(0) ? "<h2>You will gain " + format(player.i.codeexperiencetoget) + "<h2> on reset. " : "" }],
                        ["raw-html", function () { return player.i.startcutscene.eq(0) ? "<h3>Code experience gain is based on crypto. " : "" }],
                        ["blank", "25px"],
                        ["row", [["clickable", 15]]],
                        ["blank", "25px"],
                        ["raw-html", function () { return "<h1>Upgrades " }],
                        ["row", [["upgrade", 22], ["upgrade", 23], ["upgrade", 24], ["upgrade", 25], ["upgrade", 26], ["upgrade", 27]]],
                        ["row", [["upgrade", 28], ["upgrade", 29], ["upgrade", 30], ["upgrade", 31], ["upgrade", 32], ["upgrade", 33]]],
                    ]
            },
            "Programs": {
                buttonStyle() { return { 'color': '#BF40BF' } },
                unlocked() { return hasUpgrade("i", 22) },
                content:
                    [
                        ["blank", "25px"],
                        ["raw-html", function () { return player.i.startcutscene.eq(0) ? "<h2>You have " + format(player.i.codeexperience) + "<h2> code experience. " : "" }],
                        ["raw-html", function () { return player.i.startcutscene.eq(0) ? "<h2>You have " + format(player.i.programs) + "<h2> programs. " : "" }],
                        ["raw-html", function () { return player.i.startcutscene.eq(0) ? "<h2>You are gaining " + format(player.i.programspersecond) + "<h2> programs per second. " : "" }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "<h1>Buyables " }],
                        ["row", [["buyable", 28], ["buyable", 29], ["buyable", 30]]],
                        ["blank", "25px"],
                        ["raw-html", function () { return "<h1>Programs" }],
                        ["raw-html", function () { return "<h2>You have " + format(player.i.programcryptoplier) + "<h2> extra cryptopliers. " }],
                        ["raw-html", function () { return "<h2>You have " + format(player.i.programtickspeed) + "<h2> extra tickspeeds. " }],
                        ["raw-html", function () { return "<h2>You have " + format(player.i.programweakener) + "<h2> extra weakeners. " }],
                        ["blank", "25px"],
                        ["row", [["clickable", 17], ["clickable", 18], ["clickable", 19]]],
                    ]
            },
            "Mods": {
                buttonStyle() { return { 'color': '#BF40BF' } },
                unlocked() { return hasUpgrade("i", 28) },
                content:
                    [
                        ["blank", "25px"],
                        ["raw-html", function () { return player.i.startcutscene.eq(0) ? "<h2>You have " + format(player.i.codeexperience) + "<h2> code experience. " : "" }],
                        ["row", [["bar", "modbar"]]],
                        ["raw-html", function () { return player.i.modcutscene.eq(0) ? "<h2>You are making " + format(player.i.linesofcodepersecond) + "<h2> lines of code per second. " : "" }],
                        ["raw-html", function () { return player.i.modcutscene.eq(0) ? "<h2>You made " + formatWhole(player.i.mods) + "<h2> mods, which boost program gain by x" + format(player.i.modseffect) + "." : "" }],
                        ["raw-html", function () { return player.i.modcutscene.eq(0) ? "<h2>You will gain " + format(player.i.modgen, 1) + "<h2> mods." : "" }],
                        ["raw-html", function () { return player.i.modcutscene.eq(0) && player.i.mods.gte(player.i.modsoftcapstart) ? "After " + formatWhole(player.i.modsoftcapstart) + " mods, lines of code gain is divided by " + format(player.i.modsoftcap) + " (Based on mods)" : "" }, { "color": "red", "font-size": "16px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["row", [["buyable", 31], ["buyable", 32], ["buyable", 33]]],
                        ["row", [["buyable", 34], ["buyable", 35], ["buyable", 36]]],
                        ["raw-html", function () { return player.i.modscene.eq(1) ? "<h1>Hello! Red Diamond sent me here. We work together." : "" }, { "color": "#ff6f34", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.modscene.eq(2) ? "<h1>Well I will introduce myself. My name is Acamaeda." : "" }, { "color": "#ff6f34", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.modscene.eq(3) ? "<h1>I've been trying to set the nobles free for years now. They are my close friends." : "" }, { "color": "#ff6f34", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.modscene.eq(4) ? "<h1>Since you are the prophesied hero, I can give that task to you." : "" }, { "color": "#ff6f34", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.modscene.eq(5) ? "<h1>A few years ago, I have designed this software purely made of incremental power." : "" }, { "color": "#ff6f34", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.modscene.eq(6) ? "<h1>I experimented and experiemented, until I got the perfect design." : "" }, { "color": "#ff6f34", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.modscene.eq(7) ? "<h1>This software is called THE MODDING TREE." : "" }, { "color": "#ff6f34", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.modscene.eq(8) ? "<h1>However, I'm only granting you a portion of the power, since you are not godly enough." : "" }, { "color": "#ff6f34", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.modscene.eq(9) ? "<h1>You will still be granted with the ability to make mods." : "" }, { "color": "#ff6f34", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.modscene.eq(10) ? "<h1>For now, this software can only boost your power gain. But soon, you'll be freeing the nobles." : "" }, { "color": "#ff6f34", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.modscene.eq(11) ? "<h1>Take this hard drive. It contains your piece of power." : "" }, { "color": "#ff6f34", "font-size": "18px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["raw-html", function () { return player.i.modcutscene.eq(1) ? "<img src='resources/themoddingtree.png'style='width:calc(20%);height:calc(20%)'></img>" : "" }],
                        ["row", [["clickable", 35], ["clickable", 20]]],
                    ]
            },
            "Realm Mods": {
                buttonStyle() { return { 'color': '#BF40BF' } },
                unlocked() { return hasUpgrade("i", 30) },
                content:
                    [
                        ["blank", "25px"],
                        ["raw-html", function () { return player.i.startcutscene.eq(0) ? "<h2>You have " + format(player.i.mods) + "<h2> mods. " : "" }],
                        ["blank", "25px"],
                        ["raw-html", function () { return player.i.currentdisplay.eq(1) ? "<h2>You made " + format(player.i.creatormods, 0) + "<h2> creation mods. " : "" }, { "color": "red", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.currentdisplay.eq(1) ? "Currently making mods powered by the CREATOR REALM." : "" }, { "color": "red", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.currentdisplay.eq(1) ? "<h2>Which boost tree and leaf gain by x" + format(player.i.creatormodseffect, 2) : "" }, { "color": "red", "font-size": "16px", "font-family": "monospace" }],
                        //hpoe
                        ["raw-html", function () { return player.i.currentdisplay.eq(2) ? "<h2>You made " + format(player.i.highmods, 0) + "<h2> divine mods. " : "" }, { "color": "orange", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.currentdisplay.eq(2) ? "Currently making mods powered by the HIGHER PLANE." : "" }, { "color": "orange", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.currentdisplay.eq(2) ? "<h2>Which boost lines of code gain by x" + format(player.i.highmodseffect, 2) : "" }, { "color": "orange", "font-size": "16px", "font-family": "monospace" }],
                        //der
                        ["raw-html", function () { return player.i.currentdisplay.eq(3) ? "<h2>You made " + format(player.i.deathmods, 0) + "<h2> fatal mods. " : "" }, { "color": "yellow", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.currentdisplay.eq(3) ? "Currently making mods powered by the DEATH REALM." : "" }, { "color": "yellow", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.currentdisplay.eq(3) ? "<h2>Which are boosting points by x" + format(player.i.deathmodseffect, 2) : "" }, { "color": "yellow", "font-size": "16px", "font-family": "monospace" }],
                        //dir
                        ["raw-html", function () { return player.i.currentdisplay.eq(4) ? "<h2>You made " + format(player.i.dimensionalmods, 0) + "<h2> dimensional mods. " : "" }, { "color": "green", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.currentdisplay.eq(4) ? "Currently making mods powered by the DIMENSIONAL REALM." : "" }, { "color": "green", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.currentdisplay.eq(4) ? "<h2>Which boost crypto dimensions gain by x" + format(player.i.dimensionalmodseffect, 2) : "" }, { "color": "green", "font-size": "16px", "font-family": "monospace" }],
                        //br
                        ["raw-html", function () { return player.i.currentdisplay.eq(5) ? "<h2>You made " + format(player.i.backroomsmods, 0) + "<h2> liminal mods. " : "" }, { "color": "blue", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.currentdisplay.eq(5) ? "Currently making mods powered by the BACKROOMS." : "" }, { "color": "blue", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.currentdisplay.eq(5) ? "<h2>Which boost program gain by x" + format(player.i.backroomsmodseffect, 2) : "" }, { "color": "blue", "font-size": "16px", "font-family": "monospace" }],
                        //tv
                        ["raw-html", function () { return player.i.currentdisplay.eq(6) ? "<h2>You made " + format(player.i.voidmods, 0) + "<h2> shadow mods. " : "" }, { "color": "purple", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.currentdisplay.eq(6) ? "Currently making mods powered by the VOID." : "" }, { "color": "purple", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.i.currentdisplay.eq(6) ? "<h2>Which are boosting code experience by x" + format(player.i.voidmodseffect, 2) : "" }, { "color": "purple", "font-size": "16px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["row", [["clickable", 27], ["clickable", 28], ["clickable", 29], ["clickable", 30], ["clickable", 31], ["clickable", 32]]],
                        ["blank", "25px"],
                        ["row", [["clickable", 21], ["clickable", 22], ["clickable", 23], ["clickable", 24], ["clickable", 25], ["clickable", 26]]],
                    ]
            },
            "Jacorbian Energy": {
                buttonStyle() { return { 'color': '#BF40BF' } },
                unlocked() { return hasUpgrade("i", 33) },
                content:
                    [
                        ["blank", "25px"],
                        ["raw-html", function () { return player.i.startcutscene.eq(0) ? "<h2>You have " + format(player.i.totalrealmmods) + "<h2> total realm mods. " : "" }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "<h2>MORE COMING SOON!" }, { "color": "red", "font-size": "24px", "font-family": "monospace" }],
                    ]
            },
        },
    },

    tabFormat: [
        ["raw-html", function () { return "You have " + format(player.points) + " points." }, { "color": "white", "font-size": "28px", "font-family": "monospace" }],
        ["raw-html", function () { return "You are gaining " + format(player.gain) + " points per second." }, { "color": "white", "font-size": "22px", "font-family": "monospace" }],
        ["row", [["clickable", 13], ["clickable", 16]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],

        //MUSIC CONTROL
        ["raw-html", function () { return options.musicToggle ? "<audio controls autoplay loop hidden><source src=music/incremental.mp3 type<=audio/mp3>loop=true hidden=true autostart=true</audio>" : "" }],
    ],
    layerShown() { return true }
})
const jacorbparticle = {
    image: "resources/jacorblayer.png",
    x() {
        return (Math.random() + 4) * 300
    },
    y() {
        return (Math.random() + 1) * -400
    },
    spread: 200,
    time: 10,
    dir() {
        return (Math.random() + 1) * 365
    },
    speed() { // Randomize speed a bit
        return (Math.random() + 4) * 4
    },
}
const aarexparticle = {
    image: "resources/aarexlayer.png",
    x() {
        return (Math.random() + 4) * 300
    },
    y() {
        return (Math.random() + 1) * -400
    },
    spread: 200,
    time: 5,
    dir() {
        return (Math.random() + 1) * 365
    },
    speed() { // Randomize speed a bit
        return (Math.random() + 4) * 7
    },
}
