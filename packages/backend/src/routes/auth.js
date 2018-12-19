import { Router } from "express";
import passport from "passport";

const authRoute = Router();

authRoute.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["email"],
  }),
);
authRoute.get(
  "/facebook/callback",
  passport.authenticate("facebook"),
  (req, res) => {
    res.redirect("/graphql");
  },
);
authRoute.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] }),
);
authRoute.get(
  "/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect("http://localhost:3000");
  },
);
// TODO: Check with actual passport documentation on twitter authRoute
authRoute.get(
  "/twitter",
  passport.authenticate("twitter", {
    scope: ["email"],
  }),
);
authRoute.get(
  "/twitter/callback",
  passport.authenticate("twitter"),
  (req, res) => {
    res.redirect("/graphql");
  },
);

export default authRoute;
