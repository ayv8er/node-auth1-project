const db = require("../../data/db-config");

/**
  resolves to an ARRAY with all users, each user having { user_id, username }
 */
async function find() {
  const users = await db("users");

  const results = [];

  users.map((item) => {
    let result = {
      user_id: item.user_id,
      username: item.username,
    };
    results.push(result);
  });

  return results;
}

/**
  resolves to an ARRAY with all users that match the filter condition
 */
function findBy(filter) {
  return db("users").where(filter).orderBy("user_id");
}

/**
  resolves to the user { user_id, username } with the given user_id
 */
async function findById(user_id) {
  const user = await db("users").where("user_id", user_id).first();

  const result = {
    user_id: user.user_id,
    username: user.username,
  };

  return result;
}

/**
  resolves to the newly inserted user { user_id, username }
 */
async function add(user) {
  const [id] = await db("users").insert(user, "user_id");
  return findById(id);
}

// Don't forget to add these to the `exports` object so they can be required in other modules

module.exports = {
  find,
  findBy,
  findById,
  add,
};
