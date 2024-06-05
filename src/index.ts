import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { routes } from "./router/routes";
import cors from "cors";
import {UserAuthenticate} from './middleware/auth.middleware'

const app = express();
app.use(express.json());
const EXPRESS_PORT = 4000;

// Use cookie-parser middleware
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: ["http://localhost:3000"]
}));
// Route to set a cookie
app.get("/setcookie", (req: Request, res: Response) => {
  // Set a cookie named 'myCookie' with value 'Hello, Cookie!'
  const expirationTime = 60000;
  const userData = {
    Name: "kanha",
    age: 23,
  };
  res.cookie("myCookie", JSON.stringify(userData), { maxAge: expirationTime });
  res.send("Cookie has been set!");
});

// Route to read a cookie
app.get("/readcookie", (req: Request, res: Response) => {
  // Get the value of 'myCookie' from the request cookies
  const myCookie = req.cookies["myCookie"];
  res.send(`Value of 'myCookie': ${myCookie}`);
});

// Secret key for JWT
const secretKey = "your_secret_key";

// Route to generate a JWT
app.get("/generateJWT", (req: Request, res: Response) => {
  // Payload to be signed into the token
  const payload = {
    user_id: 12345,
    username: "example_user",
    email: "user@example.com",
  };

  // Generate JWT token with the payload and secret key
  jwt.sign(payload, secretKey, { expiresIn: "1m" }, (err, token) => {
    if (err) {
      console.error("Error generating JWT:", err);
      res.status(500).send("Error generating JWT");
    } else {
      res.json({ token });
    }
  });
});

// jwt.verify(token, 'shhhhh', function(err, decoded) {
//     console.log(decoded.foo) // bar
//   });

app.get("/getToken", (req: Request, res: Response) => {
  // Generate JWT token with the payload and secret key
  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjM0NSwidXNlcm5hbWUiOiJleGFtcGxlX3VzZXIiLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJpYXQiOjE3MTcyNzEzMTIsImV4cCI6MTcxNzI3MTM3Mn0.ZaN9Fa80hpnOKkSbIfg_XcroS6_Y6WJgEs3jFwP4fO8";
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).send("Error generating JWT");
    } else {
      res.json({ decoded });
    }
  });
});
app.use(UserAuthenticate);
routes(app);

app.listen(EXPRESS_PORT, async () => {
  console.log("INFO :: Webserver started on port " + EXPRESS_PORT);
});
