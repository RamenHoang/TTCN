module.exports = (sequelize, Sequelize) => {
  const TaCauHoi = sequelize.define('ta_cauhoi', {
    Id: {
      type: Sequelize.STRING(50),
      field: 'MaCauHoi',
      primaryKey: true,
      allowNull: false
    }, 
    NoiDungCauHoi: {
      type: Sequelize.TEXT,
      field: 'NoiDungCauHoi',
      allowNull: false
    }, 
    MaNganHang: {
      type: Sequelize.STRING(50),
      field: 'MaNganHang',
      allowNull: false
    },
    AnhDinhKem: {
      type: Sequelize.STRING(50),
      field: 'AnhDinhKem'
    }
  }, {
    timestamps: false,
    paranoid: true,
    freezeTableName: true,
    tableName: 'ta_cauhoi'
  });

  return TaCauHoi;
}
