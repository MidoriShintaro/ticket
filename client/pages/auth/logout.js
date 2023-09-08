import useRequest from "../../hooks/use-request";
import Router from "next/router";

import { useEffect } from "react";

export default function () {
  const { doRequest } = useRequest({
    url: "/api/users/logout",
    method: "post",
    body: {},
    onSuccess: () => Router.push("/"),
  });

  useEffect(() => {
    doRequest();
  }, []);
  return <div>Logout...</div>;
}
