/* eslint-disable max-len */
const {CanincludeAnalyzer, rules} = require('../index.js');
const analyzer = new CanincludeAnalyzer(rules);

describe('TagAnalyzer::ContentModel', () => {
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

  it.each`
        child                                                    | parent              | expected
        ${{name: 'a', params: ['hasAttr:#attr-hyperlink-href']}} | ${{name: 'button'}} | ${{'alternative': null, 'can': false, 'params': [
  ['#interactive-content-2', {'can': false, 'priority': 2}],
  ['#phrasing-content-2', {'can': true, 'priority': 1}],
  ['#flow-content-2', {'can': false, 'priority': 0}],
  ['#palpable-content-2', {'can': false, 'priority': 0}],
  ['#the-a-element', {'can': false, 'priority': 0}]]}}
    `('Can include $child to $parent tag result: $expected with extend response', ({parent, child, expected}) => {
    expect(analyzer.canInclude(child, parent, true)).toStrictEqual(expected);
  });

  it.each`
        child                                                        |  parent            | expected
        ${{name: 'img'}}                                             |  ${{name: 'a'}}    | ${'unknown'}
        ${{name: 'img', params: ['hasAttr:#attr-hyperlink-usemap']}} |  ${{name: 'a'}}    | ${false}
    `('Can include $child to $parent tag result: $expected', ({parent, child, expected}) => {
    expect(analyzer.canInclude(child, parent)).toStrictEqual(expected);
  });
});

