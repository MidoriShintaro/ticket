import request from "supertest";
import { app } from "../../app";

it("should return information about the user", async () => {
  const cookie = await global.register();

  const currentUser = await request(app)
    .get("/api/users/current-user")
    .set("Cookie", cookie)
    .expect(200);

  expect(currentUser.body.user.email).toEqual("user@example.com");
});

it("should return null when have no cookies", async () => {
  const currentUser = await request(app)
    .get("/api/users/current-user")
    .expect(200);

  expect(currentUser.body.user).toEqual(null);
});
