/* eslint-disable max-len */
const {CanincludeAnalyzer} = require('../index.js');
const analyzer = new CanincludeAnalyzer();

describe('TagAnalyzer::ContentModel', () => {
  beforeAll(() => {
    return analyzer.load();
  });

  it.each`
        child              |  parent                | expected
        ${{name: 'audio'}} |  ${{name: 'video'}}    | ${false}
        ${{name: 'video'}} |  ${{name: 'audio'}}    | ${false}
    `('Can include $child to $parent tag result: $expected', ({parent, child, expected}) => {
    expect(analyzer.canInclude(child, parent)).toStrictEqual(expected);
  });

  it.each`
        child              |  parent                | expected
        ${{name: 'input'}} |  ${{name: 'label'}}    | ${true}
    `('Can include $child to $parent tag result: $expected', ({parent, child, expected}) => {
    expect(analyzer.canInclude(child, parent)).toStrictEqual(expected);
  });

  it.each`
        child                                                    | parent              | expected
        ${{name: 'a', params: ['hasAttr:#attr-hyperlink-href']}} | ${{name: 'button'}} | ${false}
        ${{name: 'a'}}                                           | ${{name: 'button'}} | ${true}
        ${{name: 'a'}}                                           | ${{name: 'a'}}      | ${false}
    `('Can include $child to $parent tag result: $expected', ({parent, child, expected}) => {
    expect(analyzer.canInclude(child, parent)).toStrictEqual(expected);
  });
});

