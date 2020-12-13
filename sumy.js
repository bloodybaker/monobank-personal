const Telegraf = require('telegraf')
const mysql = require('mysql')
const bot = new Telegraf('1476094317:AAGIpgPHxF5XdA_4YbaSDkJUsDDpsmUiSBA')

const conn = mysql.createConnection({
    host: "server222.hosting.reg.ru",
    user: "u0613437_ecosumy",
    database: "u0613437_ecosumy",
    password: "Lock2612"
});
var globLat = 0;
var globLon = 0;
let items = ['🔋 Батарейки 🔋', '📚 Макулатура 📚', '⚙️ Металобрухт ⚙️', '🔴 Пластикові кришечки 🔴', '🍾 Скляні пляшки 🍾', '💡 Люмінісцентні лампи 💡'];

ids = [];
ids[1] = { name: 'вул Соборна, 36', type: 'Батарейки', lat: '50.910273766825014', lng: '34.800560785319476', photo: '', description: '«Platinum Bank»'};
ids[2] = { name: 'вул. Кооперативна, 1', type: 'Батарейки', lat: '50.90968249999999', lng: '34.79609161045073', photo: '', description: 'Мережа магазинів «Watsons». Тел.: +380 542 215 990'};
ids[3] = { name: 'вул. Набережна р. Стрілки, 46', type: 'Батарейки', lat: '50.9016181', lng: '34.7763816', photo: '', description: 'Магазин «CompService», 1й поверх'};
ids[4] = { name: 'вул. Петропавлівська, 81', type: 'Батарейки', lat: '50.9010960', lng: '34.7903550', photo: '', description: 'Мережа магазинів «Watsons». Тел: +380 542 655 285'};
ids[5] = { name: 'Леваневського, 22', type: 'Батарейки', lat: '50.92192473127266', lng: '34.81277644246677', photo: '', description: 'Підприємство/організація: АТБ-Маркет. Мейл людини, що додала пункт: putnick@list.ru. '};
ids[6] = { name: 'площа Покровська, 3', type: 'Батарейки', lat: '50.906680524618515', lng: '34.79661063194658', photo: '', description: 'Мережа магазинів «Watsons». Тел: +380 542 781 927'};
ids[7] = { name: 'просп. Михайла Лушпи, 4/1', type: 'Батарейки', lat: '50.9047141', lng: '34.8195684', photo: '', description: 'Мережа магазинів «Watsons». Тел: +380 542 700 881'};
ids[8] = { name: 'просп. Михайла Лушпи, 46', type: 'Батарейки', lat: '50.9153870', lng: '34.8321960', photo: '', description: 'Мережа магазинів «Watsons». Тел: +380 542 604 360'};
ids[9] = { name: 'вул. Набережна р. Стрілки, 46', type: 'Люмінісцентні лампи', lat: '50.9016181', lng: '34.7763816', photo: '', description: 'ТОВ НВП «Екостандарт», 3 поверх, офіс 9, тел .: (054) 279-09-67'};
ids[10] = { name: 'вул. Харківська, 78', type: 'Люмінісцентні лампи', lat: '49.8459819', lng: '36.6743886', photo: '', description: 'ТОВ «Промтехсплав», тел: 726-808'};
ids[11] = { name: 'вулиця Скрябіна, 38', type: 'Люмінісцентні лампи', lat: '50.9395287', lng: '34.8013892', photo: '', description: 'ТОВ «Спецзахист», тел: 786-702'};
ids[12] = { name: 'вул. Курська, 147', type: 'Макулатура', lat: '50.94814928750786', lng: '34.772766168786575', photo: '', description: 'Підприємство/організація: ЧП «Солдатенко». Контактні дані: +380 (495) 844-91-28. Мейл людини, що додала пункт: dorosh-nika@mail.ru.'};
ids[13] = { name: 'вул. Черкаська, 4', type: 'Макулатура', lat: '50.89811216759916', lng: '34.84306641964338', photo: '', description: 'Підприємство/організація: СВОД. Контактні дані: +38066429-33-16 . Мейл людини, що додала пункт: dorosh-nika@mail.ru.'};
ids[14] = { name: 'п-т. Курський, 14', type: 'Макулатура', lat: '50.93620145144488', lng: '34.78666131282807', photo: '', description: 'Підприємство/організація: ТОВ «Экогрупп СП». Контактні дані: (050) 307-37-68. Мейл людини, що додала пункт: yana.ihnenko@yandex.ru. '};
ids[15] = { name: '1-а Залізнична вулиця, 2', type: 'Металобрухт', lat: '50.93002249416598', lng: '34.80858709405675', photo: '', description: '«Євроресурси». Тел.: +380 (536) 66-02-78'};
ids[16] = { name: '2-а Залізнична вулиця, 2', type: 'Металобрухт', lat: '50.9278900', lng: '34.8210830', photo: '', description: '«Євроресурс», тел. (0542) 254-105'};
ids[17] = { name: 'вул. Воєводіна, 8', type: 'Металобрухт', lat: '50.8838040', lng: '34.8629960', photo: '', description: '«Сумыэкоресурсы». Тел.: +380 (48) 766-41-83, +380 (48) 766-46-11, info@uecr.gov.ua, http://uecr.gov.ua'};
ids[18] = { name: 'вул. Героїв Крут, 19', type: 'Металобрухт', lat: '50.9105300', lng: '34.8417280', photo: '', description: 'ТОВ «МЕТА», тел. (098) 20-46-872, (066) 99-44-197, Олександр Васильович'};
ids[19] = { name: 'вул. Косівщинська, 18', type: 'Металобрухт', lat: '50.9133720', lng: '34.7671050', photo: '', description: 'Компанія «Металлсервис». Тел: +380 (48) 750-49-73, +380 (48) 750-49-75'};
ids[20] = { name: 'вул. Косівщинська, 18', type: 'Металобрухт', lat: '50.9133720', lng: '34.7671050', photo: '', description: 'Компания «Металлсервис». Тел: 048 750 4973, 048 750 4975'};
ids[21] = { name: 'вул. Тополянська, 13', type: 'Металобрухт', lat: '50.9300760', lng: '34.8119880', photo: '', description: '«Сумывтормет». Тел.: +380 (4853) 3-22-60, glavbuh@fort.sumy.ua'};
ids[22] = { name: 'площа Незалежності, 3', type: 'Металобрухт', lat: '50.91123080250144', lng: '34.80375768406145', photo: '', description: '«Укрекокомресурсы». Тел.: +380 (5366) 6-11-02, +380 (536) 76-09-16, +380 (53'};
ids[23] = { name: 'вул. 20-річчя Перемоги, 9', type: 'Пластикові кришечки', lat: '50.8947100', lng: '34.7799750', photo: '', description: 'Волонтерський центр СББ. Пункт збору розміщено завдяки БФ «ОВЕС» (owesua.org).'};
ids[24] = { name: 'вул. Римського-Корсакова, 2', type: 'Пластикові кришечки', lat: '50.89252744660538', lng: '34.840000449737545', photo: '', description: 'Пункт збору розміщено завдяки БФ «ОВЕС» (owesua.org).'};
ids[25] = { name: 'просп. Тараса Шевченка, 21', type: 'Пластикові кришечки', lat: '50.9161878', lng: '34.8063886', photo: '', description: 'Пункт збору розміщено завдяки БФ «ОВЕС» (owesua.org).'};
ids[26] = { name: 'вул. Баранівська, 11', type: 'Скляні пляшки', lat: '50.939172459673934', lng: '34.83555515134276', photo: '', description: 'Мейл людини, що додала пункт: dorosh-nika@mail.ru.'};
ids[27] = { name: 'вул. Доватора, 1', type: 'Скляні пляшки', lat: '50.93859828494334', lng: '34.83446159391781', photo: '', description: 'Мейл людини, що додала пункт: dorosh-nika@mail.ru.'};
ids[28] = { name: 'Інтернаціоналістів, 14', type: 'Скляні пляшки', lat: '50.910435352649905', lng: '34.82847382209013', photo: '', description: 'Мейл людини, що додала пункт: d.ryazantseva@physgeo.com. '};
ids[29] = { name: 'Інтернаціоналістів, 18', type: 'Скляні пляшки', lat: '50.90940489905698', lng: '34.82902409325402', photo: '', description: 'Мейл людини, що додала пункт: d.ryazantseva@physgeo.com.'};



bot.start((ctx) => {
    var user =
        [
        ctx.from.id,
        ctx.from.first_name,
        ctx.from.last_name,
        ctx.from.username
        ]
    var sql = "INSERT INTO users(id, first_name, last_name, username) VALUES(?,?,?,?)"
    conn.query(sql, user, function(err, results) {
        if(err) console.log(err);
        else console.log("Данные добавлены");
    });
    ctx.reply("Привіт!");
    return ctx.reply("Для початку - надішліть вашу геолокацію.")
})
bot.on('location', (ctx) => {
    console.log(ctx.message.location.latitude + " " + ctx.message.location.longitude)
    globLon = ctx.message.location.longitude
    globLat = ctx.message.location.latitude
    var userData =
        [
            ctx.from.first_name,
            ctx.from.last_name,
            ctx.from.username,
            ctx.message.location.latitude,
            ctx.message.location.longitude
        ]
    var sql = "INSERT INTO messages(first_name, last_name, username, latitude, longitude) VALUES(?,?,?,?,?)"
    conn.query(sql, userData, function(err, results) {
        if(err) console.log(err);
        else console.log("Данные добавлены");
    });
    bot.telegram.sendMessage(ctx.chat.id,'Оберіть відходи', {
        reply_markup:{
            keyboard:[
                ['🔋 Батарейки 🔋'],
                ['📚 Макулатура 📚'],
                ['⚙️ Металобрухт ⚙️'],
                ['🔴 Пластикові кришечки 🔴'],
                ['🍾 Скляні пляшки 🍾'],
                ['💡 Люмінісцентні лампи 💡']
            ]
        }
    })
})
bot.on("message", ctx => {
    if(items.includes(ctx.message.text)){
        var minlength = 10000000;
        var savedIndex = 0;
        if(globLat === 0 || globLon === 0){
            ctx.reply("Отправьте геолокацию")
        }else {
            for(i = 1; i <= 29; i++){
                if(ctx.message.text.includes(ids[i]['type'])) {
                    var templength = Math.sqrt(Math.pow(ids[i]['lat'] - globLat, 2) + Math.pow(ids[i]['lng'] - globLon, 2))
                    if (templength < minlength) {
                        minlength = templength;
                        savedIndex = i;
                    }
                }
            }
           return ctx.reply("Здати " + ids[savedIndex]['type'] + " ви можете за адресою: " + ids[savedIndex]['name'] + ".\nДякуємо, що піклуєтесь про наше довкілля ❤️")
        }
    }
})
bot.startPolling()