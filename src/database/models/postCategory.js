module.exports = (sequelize, dataTypes) => {
  const postCategory = sequelize.define('PostCategory', {
    postId: { type: dataTypes.INTEGER, primaryKey: true, foreignKey: true },
    categoryId: { type: dataTypes.INTEGER, foreignKey: true },
  }, { timestamps: false });

  postCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: postCategory,
      foreignKey: 'id',
      otherKey: 'id'
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'posts',
      through: postCategory,
      foreignKey: 'id',
      otherKey: 'id',
    });
  };

  return postCategory;
};