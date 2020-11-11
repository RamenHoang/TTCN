module.exports = (sequelize, Sequelize) => {
  const TaNganHang = sequelize.define('TA_NGANHANG', {
    Id: {
      type: Sequelize.STRING(50),
      field: 'MaNganHangCauHoi',
      primaryKey: true,
      allowNull: false
    },
    TenNganHangCauHoi: {
      type: Sequelize.STRING(100),
      field: 'TenNganHangCauHoi',
      allowNull: false
    },
    LinhVuc: {
      type: Sequelize.TEXT,
      field: 'LinhVuc',
      allowNull: false
    },
    MoTa: {
      type: Sequelize.TEXT,
      field: 'MoTa'
    },
    ThuocTinh: {
      type: Sequelize.INTEGER,
      field: 'ThuocTinh'
    }
  }, {
    timestamps: false,
    paranoid: true,
    freezeTableName: true,
    tableName: 'TA_NGANHANG'
  });

  return TaNganHang;
}
