const { prisma } = require('./index');

const createUser = async (userId) => {
  return prisma.user.create({
    data: {
      userId
    }
  });
}

const getUserById = async (userId) => {
  const user = await prisma.user.findUnique({
    where: {
      userId
    }
  });
}

const getOrCreateUser = async (userId) => {
  const user = getUserById(userId);
  if(user) return user;

  const createdUser = await createUser(userId);
  return createdUser;
}

module.exports = {
  getOrCreateUser
}