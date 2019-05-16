const Sequelize = require('sequelize');
const config = require('./config');

var seq = new Sequelize(config.database, config.username, config.password,{
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

const ID_TYPE = Sequelize.STRING(50);

function defineModel(name, attributes){
    var atts = {};
    for (let key in attributes){
        let value = attributes[key];
        if (typeof value === 'object' && value['type']){
            value.allowNull = value.allowNull || false;
            atts[key] = value;
        }else{
            atts[key] = {
                type: value,
                allowNull: false
            };
        }
    }

    atts.id = {
        type: ID_TYPE,
        primaryKey:true
    };

    atts.createdAt = {
        type:Sequelize.BIGINT,
        allowNull:false
    };
    
    atts.updatedAt = {
        type: Sequelize.BIGINT,
        allowNull: false
    };

    atts.version = {
        type: Sequelize.BIGINT,
        allowNull: false
    };

    return seq.define(name, atts, {
        tableName: name,
        timestamps: false,
        hooks:{
            beforeValidate: function (obj){
                let now = Date.now();
                if (obj.isNewRecord) {
                    if(!obj.id){
                        obj.id = generateId(now);
                    }
                    obj.createdAt = now;
                    obj.updatedAt = now;
                    obj.version = 0;
                } else {
                    obj.updatedAt = now;
                    obj.version ++;
                }
            }
        }
    });
}

function generateId(now){
    return 'g_' + now;
}

const TYPES = ['STRING', 'INTEGER', 'BIGINT', 'TEXT', 'DOUBLE', 'DATEONLY', 'BOOLEAN'];
var exp = {
    defineModel:defineModel,
    sync: ()=>{
        if (process.env.NODE_ENV === 'production') {
            seq.sync({force:true});
        } else {
            throw new Error('Cannot sync() when NODE_ENV is set to \'production\'.');
        }
    }
};

for (let type of TYPES) {
    exp[type] = Sequelize[type];
}
exp.ID = ID_TYPE;
exp.generateId = generateId;

module.exports = exp;