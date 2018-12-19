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
// GET /google
authRoute.get(
  // redirect to google for user auth
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] }),
);
// GET /google/callback
authRoute.get(
  // redirect to our callback url
  "/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect("http://localhost:3000");
  },
);
// TODO: Check with actual passport documentation on twitter authRoute
authRoute.get(
  //redirect to twitter for user auth
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
