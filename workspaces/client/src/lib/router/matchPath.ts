interface MatchPathMatchedResult {
  isMatch: true;
  params: Record<string, string>;
}

interface MatchPathUnmatchedResult {
  isMatch: false;
  params: {};
}

type MatchPathResult = MatchPathMatchedResult | MatchPathUnmatchedResult;

export const matchPath = (
  pathTemplate: string,
  testPath: string
): MatchPathResult => {
  const matches = [
    ...testPath.matchAll(
      new RegExp(pathTemplate.replace(/:([a-z]+)/gi, "(?<$1>[^/]+)"), "g")
    ),
  ][0];
  return {
    isMatch: !!matches,
    params: matches?.groups ?? {},
  };
};
