const { dbClient, getUserEmail } = require("./users");

exports.handler = async function (event) {
  if (event.httpMethod == "POST") {
    const data = JSON.parse(event.body);
    var token = event.headers.authorization;
    if (token == undefined) return { statusCode: 401 };
    token = token.split("Bearer ")[1];
    console.log(data);
    const email = await getUserEmail(token);
    console.log(email);

    if (email) {
      // const insertUserText = `IF NOT EXISTS(SELECT * FROM secrets_store WHERE email=$1)
      //                             BEGIN
      //                             INSERT INTO secrets_store($1, $2)
      //                             End
      //                         `;
      // await dbClient.query(insertUserText, [data.email, { collection: [] }]);
      const insertText = "UPDATE secrets_store SET secrets = $2 WHERE email=$1";
      await dbClient.query(insertText, [email, { data: data }]);
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "success" }),
      };
    }

    console.log("Verify failed");

    return {
      statusCode: 401,
    };
  } else if (event.httpMethod == "GET") {
    console.log("Started!!");
    const token = event.headers.authorization.split("Bearer ")[1];
    const email = await getUserEmail(token);

    const getDataQueryText = "SELECT secrets from secrets_store WHERE email=$1";
    const result = await dbClient.query(getDataQueryText, [email]);
    return {
      statusCode: 200,
      body: JSON.stringify(result.rows[0]),
    };
  }

  return { statusCode: 404 };
};
