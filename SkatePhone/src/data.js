var user = {
	profile: {
		pic: "resources/mike.jpg",
		name: "Andrew",
		won: 65,
		lost: 19,
		hScore: 421,
		uniqueTricks: 53,
		cTrick: "Kickflip",
		consistentTrick: {"Kickflip": "95%"},
		dTrick: "360 Shove-it",
		difficultTrick: {"360 Shove-it": 75} 
	},
	games: [
		{
			gameIndex: 0,
			opName: "Michael",
			opPic: "resources/mike.jpg",
			gameType: "Trick Contest",
			myScore: 10,
			opScore: 20,
			myTurn: 1,
			myRuns: [
				{
					score: 10,
					moves: ["Ollie","Tailslide","McTwist"],
					video: ""
				}
			],
			opRuns: [
				{
					score: 20,
					moves: ["Ollie","Tailslide","McTwist","Ollie","Tailslide","McTwist"],
					video: ""
				}
			],
		},
		{
			gameIndex: 1,
			opName: "Mark",
			opPic: "resources/mike.jpg",
			gameType: "Trick Contest",
			myScore: 14,
			opScore: 7,
			myTurn: 1,
			myRuns: [
				{
					score: 14,
					moves: ["Ollie","Tailslide","McTwist","Nosegrind"],
					video: ""
				},
			],
			opRuns: [
				{
					score: 7,
					moves: ["Ollie","Nosegrind"],
					video: ""
				}
			],
		},
		{
			gameIndex: 2,
			opName: "Rahul",
			opPic: "resources/mike.jpg",
			gameType: "Trick Contest",
			myScore: 31,
			opScore: 16,
			myTurn: 0,
			myRuns: [
				{
					score: 15,
					moves: ["Ollie","Tailslide","McTwist","Nosegrind", "Kickflip"],
					video: ""
				},
				{
					score: 16,
					moves: ["Ollie","Tailslide","McTwist","Kickflip","Nosegrind", "Kickflip"],
					video: ""
				}
			],
			opRuns: [
				{
					score: 16,
					moves: ["Ollie","Ollie","Ollie","Ollie","Ollie","Kickflip"],
					video: ""
				}
			],
		},
		{
			gameIndex: 3,
			opName: "Mike",
			opPic: "resources/mike.jpg",
			gameType: "Trick Contest",
			myScore: 8,
			opScore: 0,
			myTurn: 0,
			myRuns: [
				{
					score: 8,
					moves: ["Ollie","Mctwist"],
					video: ""
				}
			],
			opRuns: [],
		},
		{
			gameIndex: 4,
			opName: "Sean",
			opPic: "resources/mike.jpg",
			gameType: "Trick Contest",
			myScore: 10,
			opScore: 0,
			myTurn: 0,
			myRuns: [
				{
					score: 10,
					moves: ["Ollie","Mctwist", "Tailslide"],
					video: ""
				}
			],
			opRuns: [],
		},
	]
};

var trickDictionary = {
	"Kickflip": 1,
	"Tailslide": 2,
	"Ollie": 3,
	"Nosegrind": 4,
	"McTwist": 5,
};
