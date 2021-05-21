exports.handler = async function (event, context) {
  console.log(event.headers);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World" }),
  };
};
