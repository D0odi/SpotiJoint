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

// add notifications

// "65a05cff8e0ea05a1f6d3d11",
// "65a05d348e0ea05a1f6d3d12",
// "65a05d558e0ea05a1f6d3d13",
// "65a1d479f147f74219432469",
// "65a1d479f147f7421943246a",
// "65a1d4aa9b053e3208761ec5",
// "65a1d4ab9b053e3208761ec6",
// "65a1d4bae644849a93d4c5df",
// "65a1d4ce7590c91ae54a9fd2",
// "65a1b4db86f06c6d95770758"
