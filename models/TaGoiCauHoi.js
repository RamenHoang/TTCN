module.exports = (sequelize, Sequelize) => {
  const TaGoiCauHoi = sequelize.define('TA_GOICAUHOI', {
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
    tableName: 'TA_CAUHOI'
  });

  return TaGoiCauHoi;
}
