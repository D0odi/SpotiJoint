/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("fschat");

// Create a new document in the collection.
db.getCollection("users").updateMany(
  {},
  { $set: { friends: [], friends_req_in: [], friends_req_out: [] } }
);
