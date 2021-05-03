import express, { Request, Response } from "express";

const router = express.Router();

// sign out
router.post("/api/users/signout", async (req: Request, res: Response) => {
  //logout
  res.send({});
});

export { router as userSignOutRouter };
