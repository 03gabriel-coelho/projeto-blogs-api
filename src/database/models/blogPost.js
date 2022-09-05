module.exports = (sequelize, dataType) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: { type: dataType.INTEGER, primaryKey: true, autoIncrement: true },
    title: dataType.STRING,
    content: dataType.STRING,
    userId: { type: dataType.INTEGER, foreignKey: true },
    published: dataType.DATE,
    updated: dataType.DATE,
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {
      foreignKey: 'userId',
    });
  };

  return BlogPost;
};