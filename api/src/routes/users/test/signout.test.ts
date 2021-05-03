import request from "supertest";
import { app } from "../../../app";

// sign out
it("Sign out", () => {
  return request(app).post("/api/users/signout").expect(200);
});
