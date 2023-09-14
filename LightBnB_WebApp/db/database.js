const properties = require("./json/properties.json");
const users = require("./json/users.json");
const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  port : 5432,
  database: 'lightbnb'
});
pool.connect()
{
  console.log("connected my db")

 }
//pool.query(`SELECT title FROM properties LIMIT 10;`).then(response => {console.log(response)});
/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  // let resolvedUser = null;
  // for (const userId in users) {
  //   const user = users[userId];
  //   if (user && user.email.toLowerC 'ase() === email.toLowerCase()) {
  //     resolvedUser = user;
  //   }
  // }
  // return Promise.resolve(resolvedUser);
return pool.query('SELECT * FROM users WHERE email = $1' ,[email])
.then(data => {
  return data.rows[0]
})
.catch(err => {
  console.error('An error occurred:', err);
  throw err; 
});

};

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
// const getUserWithId = function (id) {
//  // return Promise.resolve(users[id]);

// };
const getUserWithId = function(id) {
  return pool.query('SELECT * FROM users WHERE id = $1', [id])
    .then(data => {
      return data.rows[0];
    })
    .catch(err => {
      console.error('An error occurred:', err);
      throw err; 
    });
};



/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
// const addUser = function (user) {
//   const userId = Object.keys(users).length + 1;
//   user.id = userId;
//   users[userId] = user;
//   return Promise.resolve(user);
// };

const addUser = async function(user) {
  const query = `
    INSERT INTO users (name, email, age)  -- specify the column names here
    VALUES ($1, $2, $3)                    -- use parameterized queries for security
    RETURNING *;                           -- returns the newly added row
  `;

  const values = [user.name, user.email, user.age];  // adjust the values to match your user object keys

  try {
    const data = await pool.query(query, values);
    return data.rows[0];
  } catch (err) {
    console.error('An error occurred:', err);
    throw err;
  }
};



/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
// const getAllReservations = function (guest_id, limit = 10) {
//   return getAllProperties(null, 2);
// };
const getAllReservations = async function(guest_id, limit = 10) {
  const queryString = `
    SELECT *
    FROM reservations
    WHERE guest_id = $1
    LIMIT $2;
  `;

  const queryParams = [guest_id, limit];

  return pool.query(queryString, queryParams)
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      console.error('An error occurred:', err);
      throw err;
    });
};




/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
// const getAllProperties = function (options, limit = 10) {
//   const limitedProperties = {};
//   for (let i = 1; i <= limit; i++) {
//     limitedProperties[i] = properties[i];
//   }
//   return Promise.resolve(limitedProperties);
// };
const getAllProperties = function(options, limit = 10) {
  let queryParams = [];
  let queryString = `
    SELECT properties.*, avg(property_reviews.rating) as average_rating
    FROM properties
    LEFT JOIN property_reviews ON properties.id = property_reviews.property_id
  `;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }

  queryString += `
    GROUP BY properties.id
    ORDER BY average_rating DESC
  `;

  queryParams.push(limit);
  queryString += `
    LIMIT $${queryParams.length};
  `;

  return pool.query(queryString, queryParams)
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      console.error('An error occurred:', err);
      throw err;
    });
};






/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
// const addProperty = function (property) {
//   const propertyId = Object.keys(properties).length + 1;
//   property.id = propertyId;
//   properties[propertyId] = property;
//   return Promise.resolve(property);
// };
const addProperty = async function(property) {
  const queryString = `
    INSERT INTO properties (
      owner_id,
      title,
      description,
      thumbnail_photo_url,
      cover_photo_url,
      cost_per_night,
      street,
      city,
      province,
      post_code,
      country,
      parking_spaces,
      number_of_washrooms,
      number_of_bedrooms,
      active)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
    RETURNING *;
  `;

  const values = [
    property.owner_id,
    property.title,
    property.description,
    property.thumbnail_photo_url,
    property.cover_photo_url,
    property.cost_per_night,
    property.street,
    property.city,
    property.province,
    property.post_code,
    property.country,
    property.parking_spaces,
    property.number_of_washrooms,
    property.number_of_bedrooms,
    true  // assuming 'active' is always true when you add a property
  ];

  return pool.query(queryString, values)
    .then(data => {
      return data.rows[0];
    })
    .catch(err => {
      console.error('An error occurred:', err);
      throw err;
    });
};







module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
