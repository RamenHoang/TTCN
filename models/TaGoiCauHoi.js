module.exports = (sequelize, Sequelize) => {
  const TaGoiCauHoi = sequelize.define('ta_goicauhoi', {
    MaCauHoi: {
      type: Sequelize.STRING(50),
      field: 'MaCauHoi',
      allowNull: false
    }, 
    MaBaiThi: {
      type: Sequelize.STRING(50),
      field: 'MaBaiThi',
      allowNull: false
    }
  }, {
    timestamps: false,
    paranoid: true,
    freezeTableName: true,
    tableName: 'ta_goicauhoi'
  });

  return TaGoiCauHoi;
}
