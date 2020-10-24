const Telegraf = require('telegraf')
const bot = new Telegraf('1354795701:AAFrMR0o9hUX6PKqA22ETmQ8KdkEIbjj7yo')
const request = require("request")
const fs = require('fs')
const URL_PERSONAL = "https://api.monobank.ua/personal/client-info";
let authorized = false;
let userToken = "";
let delayInMilliseconds = 2000;

function isAuth() {
    return authorized;
}
var download = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};
bot.start((ctx) => {
    ctx.reply("Добро пожаловать. Вы авторизованы как: " + ctx.from.first_name + " " + ctx.from.last_name);
    return ctx.reply("Напишите /info для получения информации");
})
bot.command("/info",(ctx) => {
    if(isAuth() === false){
        ctx.reply("Вы не авторизованы, пройдите авторизацию /auth") ;
    }
    return ctx.reply("Информация о боте: \n" +
        "1. Авторизация /auth\n" +
        "2. Получить инормацию о балансе /balance \n" +
        "3. Получить информацию о валютах /currency"
        )
})
bot.command("/balance",(ctx) => {
    if(isAuth() === false){
        ctx.reply("Вы не авторизованы, пройдите авторизацию /auth") ;
    }else{
        request({
            'method': 'GET',
            'url': URL_PERSONAL,
            'headers': {
                'X-Token': userToken
            }
        }, function (error, response, body) {
            if(body[0] === "Too many requests"){
                ctx.reply("Ожидайте, слишком много запросов.")
            }else{
                var data = JSON.parse(body)
                console.log(data)
                for(var i = 0; i < data.accounts.length; i++){
                    if(data.accounts[i].currencyCode === 980){
                        return ctx.reply(data.name + "\n" +
                            "🤑 Ваш баланс: " + data.accounts[2].balance/100
                        )
                    }
                }
            }
        })

    }
})
bot.command("/auth", (ctx) =>{
    ctx.reply("Спервай зайдите на сайт https://api.monobank.ua и пройдите авторизацию.");
    setTimeout(function() {
        ctx.reply("Далее нажмите на кнопку активировать.");
    },delayInMilliseconds);
    setTimeout(function() {
        ctx.replyWithPhoto({ source: './resources/step1.jpg' });
    },delayInMilliseconds += 2000);
    setTimeout(function() {
        ctx.reply("Вы получите Ваш персональный токен.");
    },delayInMilliseconds += 2000);
    setTimeout(function() {
        ctx.replyWithPhoto({ source: './resources/step2.jpg' });
    },delayInMilliseconds += 2000);
    setTimeout(function() {
        ctx.reply("Отправьте его командой /token [ваш токен]. \n(Пример: /token 1kjh5123jkh54lmnjg123j54)");
    },delayInMilliseconds += 2000);
    delayInMilliseconds = 2000;
})
bot.on('message', async (ctx) =>{
    let message = ctx.message.text.split(" ");
    if(message[0] === "/token"){
        if(message[1]){
            if(message[1].length > 7){
                userToken = message[1];
                ctx.reply("Вы успешно авторизованы!");
                authorized = true;
            }else{
                ctx.reply("Введите токен корректно.")
            }
        }else {
            ctx.reply("Введите токен.")
        }
    }
})
bot.startPolling()