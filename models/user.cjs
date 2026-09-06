module.exports = (sequelize, DataTypes) => {
class Author extends Model {
static associate(models) { /* Session 8 */ }
}
Author.init({
name: DataTypes.STRING,
email: DataTypes.STRING
}, { sequelize, modelName: 'Author' });
return Author;
}