import "bootstrap/dist/css/bootstrap.min.css";
import buildClient from "../helpers/build-client";
import Header from "../component/header";

function AppComponent({ Component, pageProps, currentUser }) {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />;
    </div>
  );
}

AppComponent.getInitialProps = async function (appContext) {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get("/api/users/current-user");
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  return { pageProps, currentUser: data.user };
};

export default AppComponent;
