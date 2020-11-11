module.exports = (sequelize, Sequelize) => {
  const TaBaiThi = sequelize.define('TA_BAITHI', {
    Id: {
      type: Sequelize.STRING(50),
      primaryKey: true,
      field: 'MaBaiThi',
      allowNull: false
    },
    TenBaiThi: {
      type: Sequelize.STRING(100),
      field: 'TenBaiThi'
    },
    CheDo: {
      type: Sequelize.INTEGER,
      field: 'CheDo'
    },
    NgayTao: {
      type: Sequelize.DATEONLY,
      field: 'NgayTao'
    },
    BaiThiYeuThich: {
      type: Sequelize.INTEGER,
      field: 'BaiThiYeuThich'
    },
    MaUserTao: {
      type: Sequelize.STRING(50),
      field: 'MaUserTao'
    },
    ChuDe: {
      type: Sequelize.STRING(50),
      field: 'ChuDe'
    },
    ThoiGianBatDau: {
      type: Sequelize.DATE,
      field: 'ThoiGianBatDau'
    },
    ThoiGianThi: {
      type: Sequelize.INTEGER,
      field: 'ThoiGianThi'
    },
    AnhBia: {
      type: Sequelize.STRING(100),
      field: 'AnhBia'
    },
    MatKhauBaiThi: {
      type: Sequelize.STRING(20),
      field: 'MatKhauBaiThi'
    }
  }, {
    timestamps: false,
    paranoid: true,
    freezeTableName: true,
    tableName: 'TA_BAITHI'
  }
  );

  return TaBaiThi;
};
