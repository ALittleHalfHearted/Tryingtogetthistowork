const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
	if (message.content === 'ping') {
		message.reply('pong');
	}
	if (message.content.substring(0,1) === '!') {
		message.reply('ping');
		var args = message.content.substring(1).split(' ');
		var cmd = args[0];
		args = args.splice(1);
		
		var mod = 0;
		var build = 0;
		var t1 = 0;
		var t2 = 0;
		var t3 = 0;
		var t4 = 0;
		var t5 = 0;
		var t6 = 0;
		var t7 = 0;
		var t8 = 0;
		var boon = 0;
		var imps = 0;
		var ogres = 0;
		var basilisks = 0;
		var lichs = 0;
		var giclopes = 0;
		var titachnids = 0;
		var archerons = 0;
		var rooks = 0;
		var grist = 0;
		var health = 0;
		
		switch(cmd) {
			// !ping
			case 'ping':
				message.reply('Pong!');
			break;
			case 'drops':
				var command = message.content.substring(7);
				switch(command){
					//![enemy] [#killed]
					case 'imp': case 'ogre': case 'basilisk': case 'lich': case 'giclops': case 'lich': case 'giclops': case 'titachnid': case 'archeron': case 'rook':
						message.reply('**```Use this command to get drops from any number of a single type of enemy. Automatically divides grist ' +
							      'and applies multipliers.```**\n\n**Format:** `![enemy name] [# killed]`\n\n**examples:**\n`!ogre 45` gets drops from 45 ' +
							      'ogres\n`!rook 22` gets drops from 22 rooks.');
					break;
					//!multi t[#] [#killed] t[#] [# killed](Repeat as necessary)
					case 'multi':
						message.reply('**```Use this command to get drops from any number of any amount of enemy types. Automatically divides ' +
						'grist and applies multipliers.```**\n```Tier #s\nt1 = imp\nt2 = ogre\nt3 = basilisk\nt4 = lich\nt5 = giclops\nt6 ' +
						'= titachnid\nt7 = archeron\ntx = rook/D.A.```\n\n**Format:** `!multi t[tier #] [#killed] t[tier #] [# killed](Repeat as ' +
						'necessary)`\n\n**examples:**\n`!multi t3 54 tx 3` gets drops from 54 basilisks and 3 rooks\n`!multi t6 20 t2 8` gets drops ' +
						'from 20 titachnids and 8 ogres.');
					break;
					//!custom [# killed] [Tier] [# of boon dice]d[dice value] [# of grist dice]d[dice value]
					case 'custom':
						message.reply('**```Use this command to get drops from any number of any enemy that doesn\'t have a command. ' +
							      'Automatically divides grist and applies multipliers according to the tier.```**\n\n**Format:** `!custom [# ' +
							      'killed] t[Tier (1-7 (WIP: 8/UNDEFINED: 9))] [# of boon dice]d[dice value] [# of grist dice]d[dice ' +
							      'value]`\n\n**examples:**\n`!multi 14 2 200d400 88d94` rolls 200d400 for boon and 88d94 for grist, then multiplies ' +
							      'and breaks down as if it were an ogre.');
					break;
					case 'death':
						message.reply('Rolls death saves until a result is determined and informs you of your fate.');
					break;
					//normal
					default:
						message.reply('use `!drops [command]` to get info on a specific command\n\n```To get' +
							      ' drops:```\n`!imp`\n`!ogre`\n`!basilisk`\n`!lich`\n`!giclops`\n`!' +
							      'titachnid`\n`!archeron`\n`!rook`\n`!multi`\n`!custom`\n\n```Other:```\n`!death`');
				}
			break;
			case 'death':
				var pass = 0;
				var fail = 0;
				while(pass != 3 && fail != 3){
					var roll = Math.floor(Math.random() * 20) + 1;
					if(roll >= 10){
						pass = pass + 1;
					}
					else{
						fail = fail + 1;
					}
				}
				if(pass == 3){
					message.reply('Congratulations, you survived! Well, barely. You\'re not in the clear yet. But you\'re alive!')
				}
				else{
					message.reply('We at the Committe for Living Peoples regret to inform you that you are no longer allowed to attend our meetings.' +
						      'We hope your experiences in the dream bubbles will be compensation enough until your papers have been processed.')
				}
			break;
			case 'imp':
				var x = message.content.substring(5);
				if(x == 0 || isNaN(x) == true) {
					x = 1;
				}
				for(var i = 0; i < x; i++){
					grist = impGrist(grist);
					boon = impBoon(boon);
					health = impHealth(health);
				}
				build = grist * 0.8;
				t1 = grist * 0.2;
				message.reply('```For killing ' + x + ' imps, you have obtained:\nBoon = ' + boon + '\nBG = ' + build.toFixed(0) +
					      '\nT1 = ' + t1.toFixed(0) + '\nHealth Gel = ' + health + '\n\nTotal Grist = ' + grist + '```');
			break;
			case 'multi':
				mod = getMod(mod)				
				//don't run if there's no input
				if(message.indexOf('tx') == -1 && message.indexOf('t7') == -1 && message.indexOf('t6') == -1 && message.indexOf('t5') == -1 &&
				message.indexOf('t4') == -1 && message.indexOf('t3') == -1 && message.indexOf('t2') == -1 && message.indexOf('t1') == -1){
					message.reply('why don\'t you have input ~~you little shit~~');
				}
				else{
					//imp drops
					if(imps > 0){
						for(var i = 0; i < imps; i++){
							grist = impGrist(grist);
							boon = impBoon(boon);
							health = impHealth(health);
						}
						build = build + (grist * 0.8);
						t1 = t1 + (grist * 0.2);
						grist = 0;
						
					}
				
					//ogre drops
					if(ogres > 0){
						for(var i = 0; i < ogres; i++){
							grist = ogreGrist(grist);
							boon = ogreBoon(boon);
							for(var c = 0; c < 2; c++){
								health = health + Math.floor(Math.random() * 4) + 1;
							}
							health = health + 1
						}
						build = build + (grist * 0.6)
						t1 = t1 + (grist * 0.3)
						t2 = t2 + (grist * 0.1)
						grist = 0
					}
				
					//basilisk drops
					if(basilisks > 0){
						for(var i = 0; i < basilisks; i++){
							//5d100
							for(var z = 0; z < 5; z++){
								grist = grist + Math.floor(Math.random() * 100) + 1;
							}
							//1d100
							boon = (boon + Math.floor(Math.random() * 100) + 1);
							for(var c = 0; c < 2; c++){
								health = health + Math.floor(Math.random() * 6) + 1;
							}
							health = health + 1
						}
						build = build + (grist * 0.4); 
						t1 = t1 + (grist * 0.3)
						t2 = t2 + (grist * 0.2)
						t3 = t3 + (grist * 0.1)
						grist = 0
					}
				
					//lich drops
					if(lichs > 0){
						for(var i = 0; i < lichs; i++){
							//10d100
							for(var z = 0; z < 10; z++){
								grist = grist + Math.floor(Math.random() * 100) + 1;
							}
							//2d100
							for(var y = 0; y < 2; y++){
								boon = boon + Math.floor(Math.random() * 100) + 1;
							}
							for(var c = 0; c < 2; c++){
								health = health + Math.floor(Math.random() * 9) + 1;
							}
						}
						build = build + (grist * 0.3)
						t1 = t1 + (grist * 0.2)
						t2 = t2 + (grist * 0.2)
						t3 = t3 + (grist * 0.2)
						t4 = t4 + (grist * 0.1)
						grist = 0
					}
				
					//giclops drops
					if(giclopes > 0){
						for(var i = 0; i < giclopes; i++){
							//15d100
							for(var z = 0; z < 15; z++){
								grist = grist + Math.floor(Math.random() * 100) + 1;
							}
							//4d100
							for(var y = 0; y < 4; y++){
								boon = boon + Math.floor(Math.random() * 100) + 1;
							}
							for(var c = 0; c < 2; c++){
								health = health + Math.floor(Math.random() * 11) + 1;
							}
						}
						build = build + (grist * 0.25)
						t1 = t1 + (grist * 0.20)
						t2 = t2 + (grist * 0.15)
						t3 = t3 + (grist * 0.15)
						t4 = t4 + (grist * 0.1)
						t5 = t5 + (grist * 0.05)
						grist = 0
					}
					
					//titachnid drops
					if(titachnids > 0){
						for(var i = 0; i < titachnids; i++){
							//25d100
							for(var z = 0; z < 25; z++){
								grist = grist + Math.floor(Math.random() * 100) + 1;
							}
							//10d100
							for(var y = 0; y < 10; y++){
								boon = boon + Math.floor(Math.random() * 100) + 1;
							}
							for(var c = 0; c < 2; c++){
								health = health + Math.floor(Math.random() * 13) + 1;
							}
							health = health + 1
						}
						build = build + (grist * 0.2)
						t1 = t1 + (grist * 0.2)
						t2 = t2 + (grist * 0.15)
						t3 = t3 + (grist * 0.15)
						t4 = t4 + (grist * 0.15)
						t5 = t5 + (grist * 0.15)
						t6 = t6 + (grist * 0.15)
						grist = 0
					}
					
					//archeron drops
					if(archerons > 0){
						for(var i = 0; i < archerons; i++){
							//40d100
							for(var z = 0; z < 40; z++){
								grist = grist + Math.floor(Math.random() * 100) + 1;
							}
							//20d100
							for(var y = 0; y < 20; y++){
								boon = boon + Math.floor(Math.random() * 100) + 1;
							}
							for(var c = 0; c < 2; c++){
								health = health + Math.floor(Math.random() * 16) + 1;
							}
						}
						build = build + (grist * 0.2)
						t1 = t1 + (grist * 0.15)
						t2 = t2 + (grist * 0.15)
						t3 = t3 + (grist * 0.1)
						t4 = t4 + (grist * 0.1)
						t5 = t5 + (grist * 0.1)
						t6 = t6 + (grist * 0.1)
						t7 = t7 + (grist * 0.1)
					}
					
					//rook drops
					if(rooks > 0){
						for(var i = 0; i < rooks; i++){
							//50d100
							boon = rookBoon(boon);
							health = rookHealth(health);
						}
					}
				
					//multiplier!!
					var boon = boon * mod
					var build = build * mod
					var t1 = t1 * mod
					var t2 = t2 * mod
					var t3 = t3 * mod
					var t4 = t4 * mod
					var t5 = t5 * mod
					var t6 = t6 * mod
					var t7 = t7 * mod
				
					//display
					message.reply('```for killing whatever you killed, you have obtained:\nBoon = ' + boon + '\nBG = ' + build.toFixed(0) +
							'\nT1 = ' + t1.toFixed(0) + '\nT2 = ' + t2.toFixed(0) + '\nT3 = ' + t3.toFixed(0) + '\nT4 = ' + t4.toFixed(0) +
							'\nT5 = ' + t5.toFixed(0) + '\nT6 = ' + t6.toFixed(0) + '\nT7 = ' + t7.toFixed(0) + '\nHealth Gel = ' + health + '```')
				}
			break;
		}
	}
})

function impGrist(grist){
	return grist + Math.floor(Math.random() * 100) + 1;
}
function impBoon(boon){
	return boon + Math.floor(Math.random() * 10) + 1;
}
function impHealth(health){
	for(var c = 0; c < 2; c++){
		health = health + Math.floor(Math.random() * 2) + 1;
	}
	return health
}

function ogreGrist(grist){
	for(var z = 0; z < 2; z++){
		grist = grist + Math.floor(Math.random() * 100) + 1;
	}
	return grist;
}

function ogreBoon(boon){
	return boon + Math.floor(Math.random() * 50) + 1;
}
function ogreHealth(health){
	
}

function basiliskGrist(grist){
	
}
function basiliskBoon(boon){
	
}
function basiliskHealth(health){
	
}

function lichGrist(grist){
	
}
function lichBoon(boon){
	
}
function lichHealth(health){
	
}

function giclopsGrist(grist){
	
}
function giclopsBoon(boon){
	
}
function giclopsHealth(health){
	
}

function titachnidGrist(grist){
	
}
function titachnidBoon(boon){
	
}
function titachnidHealth(health){
	
}

function archeronGrist(grist){
	
}
function archeronBoon(boon){
	
}
function archeronHealth(health){
	
}

function rookBoon(boon){
	for(var z = 0; z < 50; z++){
		boon = boon + Math.floor(Math.random() * 100) + 1;
	}
	return boon;
}
function rookHealth(health){
	for(var c = 0; c < 2; c++){
		health = health + Math.floor(Math.random() * 18) + 1;
	}
	return health;
}

function getMod(mod, message, imps, ogres, basilisks, lichs, giclopes, titachnids, archerons, rooks){
	var highest = 0
	if(message.content.indexOf('t1') != -1){
		imps = message.substring(message.indexOf('t1') + 2,message.indexOf('t1') + 4)
		highest = 1
		mod = 1
	}
	if(message.content.indexOf('t2') != -1){
		ogres = message.substring(message.indexOf('t2') + 2,message.indexOf('t2') + 4)
		highest = 2
		mod = 2
	}
	if(message.content.indexOf('t3') != -1){
		basilisks = message.substring(message.indexOf('t3') + 2,message.indexOf('t3') + 4)
		highest = 3
		mod = 4
	}
	if(message.content.indexOf('t4') != -1){
		lichs = message.substring(message.indexOf('t4') + 2,message.indexOf('t4') + 4)
		highest = 4
		mod = 8
	}
	if(message.content.indexOf('t5') != -1){
		giclopes = message.substring(message.indexOf('t5') + 2,message.indexOf('t5') + 4)
		highest = 5
		mod = 16
	}
	if(message.content.indexOf('t6') != -1){
		titachnids = message.substring(message.indexOf('t6') + 2,message.indexOf('t6') + 4)
		highest = 6
		mod = 32
	}
	if(message.content.indexOf('t7') != -1){
		archerons = message.substring(message.indexOf('t7') + 2,message.indexOf('t7') + 4)
		highest = 7
		mod = 64
	}
	if(message.content.indexOf('t8') != -1){
		rooks = message.substring(message.indexOf('tx') + 2,message.indexOf('tx') + 4)
		highest = 8
		mod = 128
	}
	return mod
}

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
