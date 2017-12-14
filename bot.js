const fs = require('fs');
const exec = require('child_process').exec;
const moment = require('moment');

/*****************************************************************
// run in console to draw on github timeline:
a = document.getElementsByClassName('day')
for (let i=0, l=a.length; i<l; i++ ){
  a[i].setAttribute('fill', '#c6e48b')
  a[i].addEventListener('click', ()=>{ a[i].setAttribute('fill', '#196127') })
  a[i].addEventListener('contextmenu', ()=>{ a[i].setAttribute('fill', '#c6e48b') })
}
*****************************************************************/

let days = [
  '------------------------------------------------------------'.split(''),
  '----##--##--###----##-----##--##--##--##--#-#-#-------------'.split(''),
  '----###-##-##-##----#--#--#--####--#--#---#-#-#-------------'.split(''),
  '----######-##-##----##-#-##-##--##-####---#-#-#-------------'.split(''),
  '----##-###-##-##----######--######--##----------------------'.split(''),
  '----##--##--###------##-##-###--###-##----#-#-#-------------'.split(''),
  '------------------------------------------------------------'.split('')
];

let offset = 17; // because the day i wrote this was 12 days after %60 == 0
// find indexes
let x = ( Math.floor((moment().diff(moment('01-01-2017', 'MM-DD-YYYY').startOf('year'), 'weeks') )-offset) ) % 60;
let y = moment().weekday() % 7;
// define if it s letter day or not
let isPixel = days[y][x] == '#';
log = (...opts) => {
  console.log( (isPixel?'#':'-')+' ['+moment().format('M-D-YY, h:mm a')+'] -', opts.join(' ') );
}

// Randomize:
// if it IS an update day, LOW exit likelyness
if ( isPixel && Math.random()<.15 ) {
  return log('Busy day but not now...');
}
// if it IS NOT an update day, HIGH exit likelyness
if ( !isPixel && Math.random()<.8 ) {
  return log('Not a busy day, not now...');
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
n = 3 + Math.random() * 10;
while ( n-- > 0 )
  code += emos[Math.floor(Math.random()*emos.length)] + ' '
  if ( Math.random() > .8 ) code += '\r\n';
// save code
fs.writeFileSync('jam.txt', code, 'utf8');
// push changes to github
exec('git pull && git add jam.txt && git commit -m "'+message+'" && git push', (error, stdout, stderr)=>{
  if (error) {
    return log('Error:', error, error.code);
  } 
  log('√ Pushed to Git -', message);
})

