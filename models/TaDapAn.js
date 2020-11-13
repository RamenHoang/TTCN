module.exports = (sequelize, Sequelize) => {
  const TaDapAn = sequelize.define('ta_dapan', {
    Id: {
      type: Sequelize.STRING(50),
      primaryKey: true,
      allowNull: false,
      field: 'MaDapAn'
    },
    MaCauHoi: {
      type: Sequelize.STRING(50),
      allowNull: false,
      field: 'MaCauHoi'
    },
    NoiDungDapAn: {
      type: Sequelize.TEXT,
      allowNull: false,
      field: 'NoiDungDapAn'
    },
    CauTraLoiDung: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'CauTraLoiDung'
    },
    AnhDinhKem: {
      type: Sequelize.STRING(50),
      field: 'AnhDinhKem'
    }
  }, {
    timestamps: false,
    paranoid: true,
    freezeTableName: true,
    tableName: 'ta_dapan'
  });

  return TaDapAn;
}
