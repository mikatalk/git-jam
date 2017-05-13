# git-jam
git tile jammer bot


## install
```yarn```

## setup cron job

Edit crontab file:
```sudo vim /etc/crontab```

Set your own path:
```*/30 *  * * *   mika    cd /home/mika/projects/git-jam/ && /usr/local/bin/node ./bot.js >> /home/mika/projects/git-jam/log.txt```

