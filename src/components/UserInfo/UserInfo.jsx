import { useState, useEffect } from "react";
import "./UserInfoStyle.css";

export const UserInfo = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => setUsers(json));
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => setPosts(json));
  }, []);

  let ArrayOfPosts = [],
    ArrayOfUsers = [],
    ArrayOfCard = [],
    ArrayOfContent = [],
    CheckOfDisplay = [],
    HandleClicker = [];

  for (let i = 0; i < posts.length; i++) {
    ArrayOfPosts.push({
      userId: posts[i]["userId"],
      title: posts[i]["title"],
      body: posts[i]["body"],
    });
  }
  for (let i = 0; i < users.length; i++) {
    ArrayOfUsers.push({ id: users[i]["id"], key: i, names: users[i]["name"] });
    ArrayOfCard.push(
      ArrayOfPosts.filter((post) => post.userId === ArrayOfUsers[i].id)
    );
  }

  for (let i = 0; i < users.length; i++) {
    setTimeout(() => {
      ArrayOfContent.push(document.getElementById(i));
    }, 1000);
    CheckOfDisplay.push(false);

    HandleClicker.push(() => {
      if (CheckOfDisplay[i] === false && ArrayOfContent[i] !== null) {
        ArrayOfContent[i].style.display = "block";
        CheckOfDisplay[i] = true;
      } else if (CheckOfDisplay[i] === true && ArrayOfContent[i] !== null) {
        ArrayOfContent[i].style.display = "none";
        CheckOfDisplay[i] = false;
      }
    });
  }

  return (
    <div>
      <div id="head">
        <span>Список пользователей:</span>
      </div>
      {ArrayOfUsers.map((item) => (
        <>
          <div onClick={HandleClicker[item.key]} class="button">
            {item.key + 1 + ") " + item.names}
          </div>
          <div class="content" id={item.key}>
            {ArrayOfCard[item.key].map((post) => (
              <div class="post">
                <div class="ElementOfTitle">
                  {ArrayOfCard[item.key].indexOf(post) + 1}. Title:{" "}
                </div>
                <div class="ElementOfText1">{post["title"]}</div>
                <br />
                <div id="Body">
                  <span>Body: </span>
                </div>
                <div class="ElementOfText2">{post["body"]}</div>
              </div>
            ))}
          </div>
        </>
      ))}
    </div>
  );
};
