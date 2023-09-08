import request from "supertest";
import { app } from "../../app";

it("should return status code 404 when email does not exist", () => {
  return request(app)
    .post("/api/users/login")
    .send({ email: "test@example.com", password: "password" })
    .expect(404);
});

it("should return status code 400 when password not same", async () => {
  await request(app)
    .post("/api/users/register")
    .send({ email: "test@example.com", password: "password" })
    .expect(201);

  await request(app)
    .post("/api/users/login")
    .send({ email: "test@example.com", password: "pass" })
    .expect(400);
});

it("should response cookie when login successful", async () => {
  await request(app)
    .post("/api/users/register")
    .send({ email: "test@example.com", password: "password" })
    .expect(201);

  const res = await request(app)
    .post("/api/users/login")
    .send({ email: "test@example.com", password: "password" })
    .expect(200);
  expect(res.get("Set-Cookie")).toBeDefined();
});
