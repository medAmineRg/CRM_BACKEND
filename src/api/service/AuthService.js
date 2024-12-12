import AuthEntity from "../models/AuthEntity.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authSchemaValidation from "../schema/authSchemaValidation.js";

const signin = async (req, res) => {
  const { email, password } = req.body;
  // validate the request
  const { error } = authSchemaValidation.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  // check if the user is in the database
  const user = await AuthEntity.findOne({ where: { email } });
  if (!user) {
    return res.status(400).send("Email or password is incorrect");
  }
  // check if the password is correct
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).send("Email or password is incorrect");
  }
  // create a token
  delete user.dataValues.password;
  const token = jwt.sign({ id: user }, process.env.TOKEN_SECRET);
  // send the token in the response body
  return res.status(200).send(token);
};

const signup = async (req, res) => {
  const { email, password } = req.body;
  // validate the request
  const { error } = authSchemaValidation.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  // check if the user is in the database
  const user = await AuthEntity.findOne({ where: { email } });
  if (user) {
    return res.status(400).send("User already exists");
  }
  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create a new user
  await AuthEntity.create({ email, password: hashedPassword });
  // send the new user in the response body
  return res.status(200).send({ message: "User created successfully" });
};

export { signin, signup };
