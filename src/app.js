import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json())

const users = [];

const tweets = [];

app.post("/sign-up", (req, res) => {
    const {username, avatar} = req.body;

    const user = {
      username,
      avatar
    };

    users.push(user);

    console.log(users)

    return res.send("OK");
})

app.get("/tweets", (req, res) => {
  res.send(tweets)
})

app.post("/tweets", (req, res) => {
  const {username, tweet} = req.body;
  let avatar = "";

  if (username === null || username === undefined) {
    return res.send("UNAUTHORIZED")
  };

  users.forEach((item) => {
    if(username === item.username) {
      return avatar = item.avatar
    }
  })

  console.log(avatar)

  const tweetObject = {
    username,
    avatar,
    tweet
  };

  if (tweets.length === 10) {
    for (let i=0; i<tweets.length; i++) {
      if (i !== 9) {
        tweets[i] = tweets[i+1]
      } else {
        tweets[i] = tweetObject
      }
    }
  } else {
    tweets.push(tweetObject);
  }

  return res.send("OK");
})

app.listen(5000, () => console.log("Running server on port 5000"));