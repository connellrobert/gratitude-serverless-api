const { Client } = require("pg");
const client = new Client();
/* 
expected body:
    {
        user: {
            username: String
        }
    }
*/
/**
 * Gets a compliment by calling a plsql function to take
 *      in a username and get a random compliment for that user.
 * @param event 
 * @param context 
 * @returns A string for the compliment.
 */
exports.handler = async (event, context) => {
  await client.connect();

  const { user } = JSON.parse(event.body);
  const query = {
    text: "select getComplimentByUsername($1)",
    values: [user.username],
    rowMode: 'array'
  };

  try {
    const res = await client.query(query);
    event.result.data = res.rows[0][0];
  } finally {
    await client.end();
  }
  return event;

};
