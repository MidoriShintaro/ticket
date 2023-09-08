import request from "supertest";
import { app } from "../../app";

it("should clear the cookie when logout", async () => {
  await request(app)
    .post("/api/users/register")
    .send({ email: "test@example.com", password: "password" })
    .expect(201);

  const res = await request(app).post("/api/users/logout").send({}).expect(200);

  expect(res.get("Set-Cookie")[0]).toEqual(
    "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
  );
});
