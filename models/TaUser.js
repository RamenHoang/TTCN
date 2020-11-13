module.exports = (sequelize, Sequelize) => {
  const TaUser = sequelize.define('ta_user', {
    Id: {
      type: Sequelize.STRING(50),
      primaryKey: true,
      field: 'MaUser',
      allowNull: false
    },
    HoTen: {
      type: Sequelize.TEXT,
      field: 'HoTen'
    },
    GioiTinh: {
      type: Sequelize.INTEGER,
      field: 'GioiTinh'
    },
    NgaySinh: {
      type: Sequelize.DATEONLY,
      field: 'NgaySinh'
    },
    QueQuan: {
      type: Sequelize.TEXT,
      field: 'QueQuan'
    },
    NgheNghiep: {
      type: Sequelize.TEXT,
      field: 'NgheNghiep',
      allowNull: false
    },
    SoNgayHoatDong: {
      type: Sequelize.INTEGER,
      field: 'SoNgayHoatDong'
    },
    TrangThai: {
      type: Sequelize.INTEGER,
      field: 'TrangThai'
    },
    Email: {
      type: Sequelize.TEXT,
      field: 'Email'
    },
    SoDienThoai: {
      type: Sequelize.STRING(12),
      field: 'SoDienThoai'
    },
    NoiLamViec: {
      type: Sequelize.TEXT,
      field: 'NoiLamViec'
    },
    Username: {
      type: Sequelize.STRING(100),
      field: 'Username',
      unique: true,
      allowNull: false
    },
    Password: {
      type: Sequelize.STRING(100),
      field: 'Password',
      allowNull: false
    }
  }, {
    timestamps: false,
    paranoid: true,
    freezeTableName: true,
    tableName: 'ta_user'
  }
  );

  return TaUser;
};
