const { Client } = require("pg");
const createClient = require("@supabase/supabase-js").createClient;

const { db_url, supa_public_key, supa_url } = process.env;

var dbClient = new Client(db_url);
dbClient.connect();

const supaClient = createClient(supa_url, supa_public_key);

const getUserEmail = async (token) => {
  const userData = await supaClient.auth.api.getUser(token);
  if (userData.error !== null) return null;
  if (!userData.user.email) return null;
  return userData.user.email;
};

module.exports = { getUserEmail, supaClient, dbClient };
