const fs = require('fs');
const exec = require('child_process').exec;
const moment = require('moment');

/*****************************************************************
    0.........1.........2.........3.........4.........5.........
0   ------------------------------------------------------------
1   --##----##----####-------##------##---#####---#####---------
2   --####--##---##--##------##-----------##------##------------
3   --##-##-##---##--##------##------##---####----####----------
4   --##--####---##--##------##------##---##------##------------
5   --##----##----####-------#####---##---##------#####---------
6   ------------------------------------------------------------
*****************************************************************/

let days = [
  String('------------------------------------------------------------').split(''),
  String('--##----##----####-------##------##---#####---#####---------').split(''),
  String('--####--##---##--##------##-----------##------##------------').split(''),
  String('--##-##-##---##--##------##------##---####----####----------').split(''),
  String('--##--####---##--##------##------##---##------##------------').split(''),
  String('--##----##----####-------#####---##---##------#####---------').split(''),
  String('------------------------------------------------------------').split('')
];

let offset = 12; // because the day i wrote this was 12 days after %60 == 0
// find indexes
let x = ( moment().diff(moment().startOf('year'), 'days') - offset ) % 60;
let y = moment().weekday() % 7;
// define if it s letter day or not
let isPixel = days[y][x] == '#';

// Randomize:
// if it IS an update day, LOW exit likelyness
if ( isPixel && Math.random()<.15 ) {
  return console.log('['+moment().format('MMMM Do YYYY, h:mm:ss a')+'] - Busy day but not now...');
}
// if it IS NOT an update day, HIGH exit likelyness
if ( !isPixel && Math.random()<.85 ) {
  return console.log('['+moment().format('MMMM Do YYYY, h:mm:ss a')+'] - Not a busy day, not now...');
}

const emos = ["😀","😃","😄","😁","😆","😅","😂","😊","😇","🙂","🙃","😉","😌","😍","😘","😗","😙","😚",
  "😋","😜","😝","😛","🤑","🤗","🤓","😎","😏","😒","😞","😔","😟","😕","🙁","☹️","😣","😖","😫","😩","😤",
  "😠","😡","😶","😐","😑","😯","😦","😧","😮","😲","😵","😳","😱","😨","😰","😢","😥","😭","😓","😪","😴",
  "🙄","🤔","😬","🤐","😷","🤒","🤕","😈","👿","👹","👺","💩","👻","💀","☠️","👽","👾","🤖","🎃","😺","😸",
  "😹","😻","😼","😽","🙀","😿","😾","👐","🙌","👏","🙏","👍","👎","👊","✊","✌️","🤘","👌","👈","👉","👆",
  "👇","☝️","✋","🖐","🖖","👋","💪","🖕","✍️","💅","🖖","💄","💋","👄","👅","👂","👃","👣","👁","👀","🗣",
  "👤","👥","👶","👦","👧","👨","👩","👱","👱","👴","👵","👲","👳","👳","👮","👮","👷","👷","💂","💂","🕵️",
  "🕵️","👩","👨","👩","🌾","👨","🌾","🍳","👨","🍳","👩","🎓","👨","👩","👨","🎤","👩","🏫","👨","🏫","👩",
  "🏭","👨","💻","👚","👕","👖","👔","👗","👙","👘","👠","👡","👢","👞","👟","👒","🎩","🎓","👑","⛑","🎒",
  "👝","👛","👜","💼","👓","🕶","🌂","☂️"
];

// generate commit message
let n = 10;
let code = '';
let message = ''
while ( n-- > 0 )
  message += emos[Math.floor(Math.random()*emos.length)] + ' '
// generate random code
n = Math.random() * 200;
while ( n-- > 0 )
  code += emos[Math.floor(Math.random()*emos.length)] + ' '
  if ( Math.random() > .8 ) code += os.EOL;//' \r\n';
// save code
fs.writeFileSync('jam.txt', code, 'utf8');
// push changes to github
exec('git pull && git add jam.txt && git commit -m "'+message+'" && git push', (error, stdout, stderr)=>{
  if (error) {
    return console.log('['+moment().format('MMMM Do YYYY, h:mm:ss a')+'] - Error:', error, error.code);
  } 
  console.log('['+moment().format('MMMM Do YYYY, h:mm:ss a')+'] -  √ Pushed to Git -', message);
})

