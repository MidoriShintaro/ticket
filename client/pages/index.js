import buildClient from "../helpers/build-client";

function Home({ currentUser }) {
  console.log(currentUser);
  return currentUser ? <div>You are login</div> : <div>You are not login</div>;
}

Home.getInitialProps = async function (context) {
  const client = buildClient(context); //context is req in express.js
  const { data } = await client.get("/api/users/current-user");
  return { currentUser: data.user };
};

export default Home;
