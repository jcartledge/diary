interface MatchPathResult {
  isMatch: boolean;
}

export const matchPath = (
  pathTemplate: string,
  testPath: string
): MatchPathResult => ({
  isMatch: matchPathTemplateToRegex(pathTemplate).test(testPath),
});

const matchPathTemplateToRegex = (pathTemplate: string): RegExp => {
  const pathTemplateWithPlacerholdersReplaced = pathTemplate.replace(
    /:[a-z]+/gi,
    "[^/]+"
  );
  return new RegExp(pathTemplateWithPlacerholdersReplaced);
};
