const properties = require("./json/properties.json");
const users = require("./json/users.json");
const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  port: 5432,
  database: 'lightbnb'
});
pool.connect()
  .then(() => console.log("connected my db"))
  .catch(err => console.error('An error occurred:', err));

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = async function (email) {
  try {
    const data = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return data.rows[0];
  } catch (err) {
    console.error('An error occurred:', err);
    throw err;
  }

};

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
// const getUserWithId = function (id) {

const getUserWithId = async function (id) {
  try {
    const data = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return data.rows[0];
  } catch (err) {
    console.error('An error occurred:', err);
    throw err;
  }
};



/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = async function (user) {
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
/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = async function(guest_id, limit = 10) {
  try {
    const result = await pool
      .query(`SELECT reservations.*, properties.*,avg(rating) as average_rating
      FROM reservations
      JOIN properties ON reservations.property_id = properties.id
      JOIN property_reviews ON properties.id = property_reviews.property_id
      WHERE reservations.guest_id = $1
      GROUP BY properties.id, reservations.id
      ORDER BY reservations.start_date
      LIMIT $2;`, [guest_id, limit]);
    return result.rows;
  } catch (err) {
    console.log(err.message);
  }
};

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = async function (options, limit = 10) {
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

  try {
    const data = await pool.query(queryString, queryParams);
    return data.rows;
  } catch (err) {
    console.error('An error occurred:', err);
    throw err;
  }
};


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */

const addProperty = async function (property) {
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
