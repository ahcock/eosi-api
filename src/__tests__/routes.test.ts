import app from "../server";
import supertest from "supertest";

describe("GET /", () => {
  it("데이터를 리턴해야 합니다.", async () => {
    const res = await supertest(app).get("/");
    expect(res.body.message).toBe("test");
  });
});
