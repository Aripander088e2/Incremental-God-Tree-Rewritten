let modInfo = {
	name: "The Incremental God Tree: Rewritten",
	id: "incrementalgodtree",
	author: "Icecreamdude",
	pointsName: "points",
	modFiles: ["incremental.js", "tree.js"],

	discordName: "Incremental God Tree Server",
	discordLink: "https://discord.gg/mCxvGNTS",
	initialStartPoints: new Decimal(1), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0",
	name: "Literally nothing",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3><br>
		- Added things.<br>
		- Added stuff.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything", "cryptoreset", "codereset"]

function getStartPoints() {
	return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints() {
	return true
}

// Calculate points/sec!
function getPointGen() {
	if (!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(0)
	gain = player.i.trees.mul(0.1)
	gain = gain.mul(buyableEffect("i", 12))
	gain = gain.mul(buyableEffect("i", 20))
	if (hasUpgrade("i", 11)) gain = gain.mul(3)
	gain = gain.mul(player.i.byteseffect)
	if (hasUpgrade("i", 26)) gain = gain.mul(upgradeEffect("i", 26))
	gain = gain.mul(buyableEffect("i", 33))
	gain = gain.mul(player.i.deathmodseffect)
	player.gain = gain
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() {
	return {
		gain: new Decimal(0),
	}
}

// Display extra things at the top of the page
var displayThings = [
	function () {
		let a = "Current endgame: idk yet lol"

		return a + (options.autosave ? "" : ". Warning: autosave is off")
	},
	function () {
		let c =
			"<h2><a href=https://discord.gg/DubGsHrbs2>DISCORD HERE</a></h2>"
		return c
	}
]

// Determines when the game "ends"
function isEndgame() {
	return false
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return (3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion) {
}