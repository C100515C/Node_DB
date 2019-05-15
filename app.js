const Sequelize = require('sequelize')
const config = require('./config')
///  创建 sequelize 对象
var sequelize = new Sequelize(config.database,config.username,config.password,{
    host:config.host,
    dialect:'mysql',
    pool:{
        max: 5,
        min: 0,
        idle: 30000
    }
});
/// 通过sequelize 创建 表对象
var Pet = sequelize.define('pet',{
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    name: Sequelize.STRING(100),
    gender: Sequelize.BOOLEAN,
    birth: Sequelize.STRING(10),
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    version: Sequelize.BIGINT
}, {
        timestamps: false
    });

/// 插入操作
var now = Date.now();
// Pet.create({
//     id: 'g-' + now,
//     name: 'Gaffey',
//     gender: false,
//     birth: '2007-07-07',
//     createdAt: now,
//     updatedAt: now,
//     version: 0
// }).then(function (p){
//         console.log('created.' + JSON.stringify(p));
// }).catch(function (err){
//         console.log('failed:' + err);
// });

// (async () =>{
//     var dog = await Pet.create({
//         id: 'g-' + now,
//         name: 'Gaffey',
//         gender: false,
//         birth: '2007-07-07',
//         createdAt: now,
//         updatedAt: now,
//         version: 0
//     });
//     console.log('created:' + JSON.stringify(dog));
// })();

// /查询操作
(async () =>{
    var pets = await Pet.findAll({
        where:{
            name: 'Gaffey'
        }
    });
    console.log(`find ${pets.length} pets:`);
    for (let p of pets){
        console.log(JSON.stringify(p));
    }
})();

function queryFromSomewhere(name){
    var pets = Pet.findAll({
        where:{
            name: name
        }
    });
    console.log(`find ${pets.length} pets:`);
    return pets;
}
/// 更新操作
// (async () =>{
//     var pets = await Pet.findAll(
//         {
//             where: {
//                 name: "Gaffey"
//             }
//         });
//     console.log(`find ${pets.length} pets:`);
//     for (let p of pets){
//         p.gender = true;
//         p.updatedAt = Date.now();
//         p.version ++;
//         await p.save();
//     }
    
// })();

/// 删除 操作
// (async () =>{
//     var pets = await Pet.findAll(
//         {
//             where: {
//                 name: "Gaffey"
//             }
//         }
//     );
//     console.log(`find ${pets.length} pets:`);
//     for (let p of pets){
//         if (p.version === 3){
//             await p.destroy();
//         }
//     }
    
// })();