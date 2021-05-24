// import StringCrypto from "string-crypto";

// var password = prompt(
//   "Enter password to encrypt data for server. Or click cancel to keep offline."
// );
// var sendToServer = password !== null;
// if (!sendToServer) return;

// const { encryptString } = new StringCrypto();
// let encryptedString = encryptString(JSON.stringify(collection), password);

// var token = localStorage.getItem("supabase.auth.token");
// if (token) {
//   token = JSON.parse(token).currentSession.access_token;

//   fetch("/api/sync", {
//     method: "POST",
//     headers: {
//       "Content-type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: encryptedString,
//   }).then(() => localStorage.setItem("toPush", false));
// }

/* From totp page */

// function networkFetch() {
//   var token = localStorage.getItem("supabase.auth.token");
//   if (token) {
//     token = JSON.parse(token).currentSession.access_token;
//     var consent = window.confirm("Fetch from database?");
//     if (consent) {
//       fetch("/api/sync", { headers: { Authorization: `Bearer ${token}` } })
//         .then((res) => res.json())
//         .then((data) => {
//           if (data)
//             localStorage.setItem(
//               "collection",
//               JSON.stringify(data.secrets.data)
//             );
//         });
//     }
//   } else {
//     alert("User not logged in!!");
//   }
// }
