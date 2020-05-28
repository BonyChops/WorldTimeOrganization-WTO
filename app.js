const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const accessToken = JSON.parse(fs.readFileSync(__dirname+"/config.json")).token;
const dateFormat = (date, format)=> {
    format = format.replace(/YYYY/, date.getFullYear());
    format = format.replace(/MM/, ('00' + date.getMonth() + 1).slice(-2));
    format = format.replace(/DD/, ('00' + date.getDate()).slice(-2));
    format = format.replace(/HH/, ('00' + date.getHours()).slice(-2));
    format = format.replace(/II/, ('00' + date.getMinutes()).slice(-2));
    format = format.replace(/SS/, ('00' + date.getSeconds()).slice(-2));
    return format;
}
const dateTimeToJa = (date) => {
    if(date) {
     const weekDay = ['日', '月', '火', '水', '木', '金', '土'];
     const beginDate = {
      meiji: new Date(1868,8,8),
      taisho: new Date(1912,6,30),
      showa: new Date(1926,11,25),
      heisei: new Date(1989,0,8),
      reiwa: new Date(2019,4,1)
     };
     let eraYear = 0;
     let eraName = '';
     if(date >= beginDate['meiji'] && date < beginDate['taisho']) {
      eraYear = date.getFullYear() - beginDate['meiji'].getFullYear() + 1;
      eraName = '明治';
     } else if(date >= beginDate['taisho'] && date < beginDate['showa']) {
      eraYear = date.getFullYear() - beginDate['taisho'].getFullYear() + 1;
      eraName = '大正';
     } else if(date >= beginDate['showa'] && date < beginDate['heisei']) {
      eraYear = date.getFullYear() - beginDate['showa'].getFullYear() + 1;
      eraName = '昭和';
     } else if(date >= beginDate['heisei'] && date < beginDate['reiwa']) {
      eraYear = date.getFullYear() - beginDate['heisei'].getFullYear() + 1;
      eraName = '平成';
     } else if(date >= beginDate['reiwa']) {
      eraYear = date.getFullYear() - beginDate['reiwa'].getFullYear() + 1;
      eraName = '令和';
     } else {
      return "元号が取得できません";
     }
     if(eraYear === 0) {
      eraYear = '';
     } else if(eraYear === 1) {
      eraYear = '元';
     }
     const year = `${date.getFullYear()}年`;
     const era = `（${eraName}${eraYear}年）`;
     const month = `${date.getMonth() + 1}月`;
     const day = `${date.getDate()}日 `;
     const dayOfWeek = `${weekDay[date.getDay()]}曜日 `;
     const hours = `${date.getHours()}時`;
     const minutes = `${date.getMinutes()}分`;
     const seconds = `${date.getSeconds()}秒`;
     const result = year + era + month + day + dayOfWeek + hours + minutes + seconds;
     console.log(result);
     return result;
    } else {
     return "日付が取得できません";
    }
}


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === '/get day') {
    if(msg.guild.members.cache.find(member => member.user.id == 708145562880311356).user.presence.status === "online"){ //is tex bot installed?
        msg.channel.send(`!tex \\title{World Time Organization} \\author{現在の日時をお知らせいたします。} \\date{${dateTimeToJa(new Date())}} \\maketitle`);
    }else{
        msg.reply("```LaTeX & Markdown Generatorがこの鯖にいない or オンラインではないため、TeX機能を使用できません。\n機構からのより見やすい時報を望む場合は、TeX機能を使えるようにしてください。```\nWorld Time Organizationより、現在の日時をお知らせします。\n\n現在の日時:\n"+dateTimeToJa(new Date()));
    }
  }
});

client.login(accessToken);