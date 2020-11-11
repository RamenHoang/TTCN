module.exports = (sequelize, Sequelize) => {
  const TaHsTraLoi = sequelize.define('TA_HSTRALOI', {
    Id: {
      type: Sequelize.STRING(50),
      field: 'MaCauTraLoi',
      primaryKey: true,
      allowNull: false
    },
    MaBaiThi: {
      type: Sequelize.STRING(50),
      field: 'MaBaiThi',
      allowNull: false
    },
    MaUserThi: {
      type: Sequelize.STRING(50),
      field: 'MaUserThi',
      allowNull: false
    },
    DiemThi: {
      type: Sequelize.FLOAT,
      field: 'DiemThi'
    },
    DiemThi: {
      type: Sequelize.STRING(50),
      field: 'MaCauHoi',
      allowNull: false
    }
  }, {
    timestamps: false,
    paranoid: true,
    freezeTableName: true,
    tableName: 'TA_HSTRALOI'
  });

  return TaHsTraLoi;
}
