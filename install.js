var exec = require('child_process').exec;

console.log('Cloning git@github.com:mikatalk/git-jam.git');
exec('rm -rf jam && git clone git@github.com:mikatalk/git-jam.git jam && cd jam && git checkout jam', (error, stdout, stderr)=>{
  if (error) {
    return console.log('Error:', error, error.code);
  } 
  console.log(' √ Setup jam branch')
})

