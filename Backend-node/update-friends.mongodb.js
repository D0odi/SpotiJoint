use("fschat");

db.getCollection("users").updateOne(
  { _id: ObjectId("65a05ccbd23041a57085cf68") },
  {
    $set: {
      friends: [
        "65a1b4db86f06c6d95770758",
        "65a1d4bae644849a93d4c5df",
        "65a1d4ce7590c91ae54a9fd2",
        "65a49bd18fc6a0eae7c4b1ae",
        "65a9a2f2ec09a322d3db8708",
      ],
    },
  }
);

db.getCollection("users").updateOne(
  { _id: ObjectId("65a1b4db86f06c6d95770758") },
  {
    $set: {
      friends: ["65a05ccbd23041a57085cf68"],
    },
  }
);
db.getCollection("users").updateOne(
  { _id: ObjectId("65a1d4bae644849a93d4c5df") },
  {
    $set: {
      friends: ["65a05ccbd23041a57085cf68"],
    },
  }
);
db.getCollection("users").updateOne(
  { _id: ObjectId("65a1d4ce7590c91ae54a9fd2") },
  {
    $set: {
      friends: ["65a05ccbd23041a57085cf68"],
    },
  }
);
db.getCollection("users").updateOne(
  { _id: ObjectId("65a49bd18fc6a0eae7c4b1ae") },
  {
    $set: {
      friends: ["65a05ccbd23041a57085cf68"],
    },
  }
);
db.getCollection("users").updateOne(
  { _id: ObjectId("65a9a2f2ec09a322d3db8708") },
  {
    $set: {
      friends: ["65a05ccbd23041a57085cf68"],
    },
  }
);
