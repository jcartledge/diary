interface MatchPathMatchedResult {
  isMatch: true;
  params: Record<string, string>;
}

interface MatchPathUnmatchedResult {
  isMatch: false;
  params: {};
}

export type MatchPathResult = MatchPathMatchedResult | MatchPathUnmatchedResult;

export const matchPath = (
  pathTemplate: string,
  testPath: string
): MatchPathResult =>
  doMatch(
    new RegExp(
      `^${replacePlaceholdersWithNamedCaptureSyntax(pathTemplate)}`,
      "g"
    ),
    testPath
  );

export const matchExactPath = (
  pathTemplate: string,
  testPath: string
): MatchPathResult =>
  doMatch(
    new RegExp(
      `^${replacePlaceholdersWithNamedCaptureSyntax(pathTemplate)}$`,
      "g"
    ),
    testPath
  );

const doMatch = (pathTemplate: RegExp, testPath: string): MatchPathResult => {
  const matches = [...testPath.matchAll(pathTemplate)][0];
  return {
    isMatch: !!matches,
    params: matches?.groups ?? {},
  };
};

const replacePlaceholdersWithNamedCaptureSyntax = (
  pathTemplate: string
): string => pathTemplate.replace(/:([a-z]+)/gi, "(?<$1>[^/]+)");
