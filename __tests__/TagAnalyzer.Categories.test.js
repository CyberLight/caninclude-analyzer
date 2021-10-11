const {TagAnalyzer} = require('../index.js');
const rules = require('../rules.json');

describe('TagAnalyzer::Categories', () => {
  it.each`
        parameter                      | expected
        ${undefined}                   | ${[]}
        ${'#allowed-in-the-body'}      | ${[]}
    `('Get categoties by $parameter for "html" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.html;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                      | expected
        ${undefined}                   | ${[]}
        ${'#allowed-in-the-body'}      | ${[]}
    `('Get categoties by $parameter for "head" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.head;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter           | expected
        ${undefined}        | ${['#metadata-content-2']}
        ${'#any-option'}    | ${['#metadata-content-2']}
    `('Get categoties by $parameter for "title" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.title;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter           | expected
        ${undefined}        | ${['#metadata-content-2']}
        ${'#any-option'}    | ${['#metadata-content-2']}
    `('Get categoties by $parameter for "base" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.base;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                      | expected
        ${undefined}                   | ${['#metadata-content-2']}
        ${'#allowed-in-the-body'}      | ${['#flow-content-2', '#phrasing-content-2', '#metadata-content-2']}
    `('Get categoties by $parameter for "link" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.link;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                                | expected
        ${undefined}                             | ${['#metadata-content-2']}
        ${'#names:-the-itemprop-attribute'}      | ${['#flow-content-2', '#phrasing-content-2', '#metadata-content-2']}
    `('Get categoties by $parameter for "meta" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.meta;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter            | expected
        ${undefined}         | ${['#metadata-content-2']}
        ${'#the-a-element'}  | ${['#metadata-content-2']}
    `('Get categoties by $parameter for "style" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.style;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter            | expected
        ${undefined}         | ${['#sectioning-root']}
        ${'#other-content'}  | ${['#sectioning-root']}
    `('Get categoties by $parameter for "body" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.body;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter            | expected
        ${undefined}         | ${['#flow-content-2', '#sectioning-content-2', '#palpable-content-2']}
        ${'#other-content'}  | ${['#flow-content-2', '#sectioning-content-2', '#palpable-content-2']}
    `('Get categoties by $parameter for "article" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.article;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter            | expected
        ${undefined}         | ${['#flow-content-2', '#sectioning-content-2', '#palpable-content-2']}
        ${'#other-content'}  | ${['#flow-content-2', '#sectioning-content-2', '#palpable-content-2']}
    `('Get categoties by $parameter for "section" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.section;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter            | expected
        ${undefined}         | ${['#flow-content-2', '#sectioning-content-2', '#palpable-content-2']}
        ${'#other-content'}  | ${['#flow-content-2', '#sectioning-content-2', '#palpable-content-2']}
    `('Get categoties by $parameter for "nav" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.nav;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter            | expected
        ${undefined}         | ${['#flow-content-2', '#sectioning-content-2', '#palpable-content-2']}
        ${'#other-content'}  | ${['#flow-content-2', '#sectioning-content-2', '#palpable-content-2']}
    `('Get categoties by $parameter for "aside" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.aside;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
  });

  describe.each(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])(
      'For tag=%s', (tagName) => {
        it.each`
          parameter            | expected
          ${undefined}         | ${['#flow-content-2', '#heading-content-2', '#palpable-content-2']}
          ${'#other-content'}  | ${['#flow-content-2', '#heading-content-2', '#palpable-content-2']}
        `(`Get categoties by $parameter for "${tagName}" tag result: $expected`, ({parameter, expected}) => {
          const tag = rules[tagName];

          const analyzer = new TagAnalyzer(tag);
          expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
        });
      });

  it.each`
        parameter            | expected
        ${undefined}         | ${['#flow-content-2', '#heading-content-2', '#palpable-content-2']}
        ${'#other-content'}  | ${['#flow-content-2', '#heading-content-2', '#palpable-content-2']}
    `('Get categoties by $parameter for "hgroup" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.hgroup;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
  });

  describe.each(['header', 'footer'])(
      'For tag=%s', (tagName) => {
        it.each`
        parameter            | expected
        ${undefined}         | ${['#flow-content-2', '#palpable-content-2']}
        ${'#other-content'}  | ${['#flow-content-2', '#palpable-content-2']}
    `(`Get categoties by $parameter for "${tagName}" tag result: $expected`, ({parameter, expected}) => {
          const tag = rules[tagName];

          const analyzer = new TagAnalyzer(tag);
          expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
        });
      });

  it.each`
        parameter            | expected
        ${undefined}         | ${['#flow-content-2', '#palpable-content-2']}
        ${'#other-content'}  | ${['#flow-content-2', '#palpable-content-2']}
    `('Get categoties by $parameter for "address" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.address;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
  });
});
