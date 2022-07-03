interface MatchPathMatchedResult {
  isMatch: true;
  params: Record<string, string>;
}

interface MatchPathUnmatchedResult {
  isMatch: false;
  params: {};
}

export type MatchPathResult = MatchPathMatchedResult | MatchPathUnmatchedResult;

const PLACEHOLDER_SEARCH = /:([a-z]+)/gi;
const PLACEHOLDER_REPLACE = "(?<$1>[^/]+)";

export const matchPath = (
  pathTemplate: string,
  testPath: string
): MatchPathResult => {
  const matches = [
    ...testPath.matchAll(
      new RegExp(
        `^${pathTemplate.replace(PLACEHOLDER_SEARCH, PLACEHOLDER_REPLACE)}$`,
        "g"
      )
    ),
  ][0];
  return {
    isMatch: !!matches,
    params: matches?.groups ?? {},
  };
};
