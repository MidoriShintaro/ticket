import request from "supertest";
import { app } from "../../app";

it("should return 201 register success", async () => {
  return request(app)
    .post("/api/users/register")
    .send({ email: "test@test.com", password: "1234567" })
    .expect(201);
  // expect("success");
});

it("should return 400 invalid email", async () => {
  return request(app)
    .post("/api/users/register")
    .send({ email: "email", password: "12345567" })
    .expect(400);
});

it("should return 400 invalid password", async () => {
  return request(app)
    .post("/api/users/register")
    .send({ email: "email@email.com", password: "123" })
    .expect(400);
});

it("should return 400 empty email and password", async () => {
  await request(app).post("/api/users/register").send({}).expect(400);

  await request(app).post("/api/users/register").send({}).expect(400);
});

it("disable duplicates email", async () => {
  await request(app)
    .post("/api/users/register")
    .send({ email: "test@test.com", password: "123456789" })
    .expect(201);
  await request(app)
    .post("/api/users/register")
    .send({ email: "test@test.com", password: "123456789" })
    .expect(400);
});

it("return set-cookie when successfully register", async () => {
  const res = await request(app)
    .post("/api/users/register")
    .send({ email: "test@test.com", password: "123456789" })
    .expect(201);

  expect(res.get("Set-Cookie")).toBeDefined();
});
