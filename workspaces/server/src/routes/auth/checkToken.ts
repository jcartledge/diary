import { auth, requiredScopes } from "express-oauth2-jwt-bearer";
import { AUTH0_AUDIENCE, AUTH0_ISSUER_BASE_URL } from "../../config";

export const checkJwt = auth({
  audience: AUTH0_AUDIENCE,
  issuerBaseURL: AUTH0_ISSUER_BASE_URL,
});

export const checkGetDiaryScopes = requiredScopes(
  "read:diary_entries_for_user"
);

export const checkPostDiaryScopes = requiredScopes(
  "write:diary_entries_for_user"
);
