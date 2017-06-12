module.exports = function(sequelize, DataTypes) {
    var Masters = sequelize.define("Masters", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: false,
            allowNull: false
        },
        title: DataTypes.STRING,

        artist: DataTypes.STRING,

        styles: DataTypes.STRING,
        genres: DataTypes.STRING,

        main_release: DataTypes.INTEGER,

        notes: DataTypes.TEXT,
        artistJoins: DataTypes.STRING,
        artists: DataTypes.STRING,

        year: DataTypes.STRING,
        anv: DataTypes.STRING
    }/* , {
        classMethods: {
            associate: function(models) {
                User.hasMany(models.Task)
            }
        }
    }*/);

    return Masters;
};