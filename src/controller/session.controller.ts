import { Request, Response } from "express";
import { validatePassword } from "../service/user.service";
import {
  createSession,
  findSessions,
  updateSessions,
} from "../service/session.service";
import { signJwt } from "../utils/jwt.utils";
import ConfigManager from "../configurations/config.manager";

export async function createUserSessionHandler(req: Request, res: Response) {
  const config = ConfigManager.getConfiguration();
  //validate the user's password
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send("Invalid email or password");
  }

  //create a session
  const session = await createSession(user._id, req.get("user-agent") || "");

  // create an access token

  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.accessTokenTtl }
  );

  // create a refresh token
  const refreshToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.refreshTokenTtl }
  );

  res.cookie("accessToken", accessToken, {
    maxAge: 900000, //15 min
    httpOnly: true,
    domain: "localhost",
    path: "/",
    sameSite: true,
    secure: false,
  });

  res.cookie("refreshToken", refreshToken, {
    maxAge: 3.154e10, //1year
    httpOnly: true,
    domain: "localhost",
    path: "/",
    sameSite: true,
    secure: false,
  });

  // return access & refresh tokens
  return res.send({ accessToken, refreshToken });
}

export async function getUserSessionHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;
  const sessions = await findSessions({ user: userId, valid: true });
  return res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session;

  await updateSessions({ _id: sessionId }, { valid: false });

  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}
