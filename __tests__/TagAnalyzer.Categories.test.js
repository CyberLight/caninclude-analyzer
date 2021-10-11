const {TagAnalyzer} = require('../index.js');

describe('TagAnalyzer::Categories', () => {
  it.each`
        parameter                      | expected
        ${undefined}                   | ${[]}
        ${'#allowed-in-the-body'}      | ${[]}
    `('Get categoties by $parameter for "html" tag result: $expected', ({parameter, expected}) => {
    const tag = {
      'rules': {
        'Categories': {},
        'ContentModel': {
          'onlyOne': [
            '#the-head-element',
            '#the-body-element',
          ],
        },
      },
    };

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                      | expected
        ${undefined}                   | ${[]}
        ${'#allowed-in-the-body'}      | ${[]}
    `('Get categoties by $parameter for "head" tag result: $expected', ({parameter, expected}) => {
    const tag = {
      'rules': {
        'Categories': {},
        'ContentModel': {
          'or': [
            {'zeroOrMore': '#metadata-content-2'},
            {'onlyOne': [
              '#the-title-element',
              '#the-base-element',
            ]},
          ],
        },
      },
    };

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter           | expected
        ${undefined}        | ${['#metadata-content-2']}
        ${'#any-option'}    | ${['#metadata-content-2']}
    `('Get categoties by $parameter for "title" tag result: $expected', ({parameter, expected}) => {
    const tag = {
      'rules': {
        'Categories': {
          'default': '#metadata-content-2',
        },
        'ContentModel': {
          'if': {
            'not': '#inter-element-whitespace',
            'then': '#text-content',
          },
        },
      },
    };

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter           | expected
        ${undefined}        | ${['#metadata-content-2']}
        ${'#any-option'}    | ${['#metadata-content-2']}
    `('Get categoties by $parameter for "base" tag result: $expected', ({parameter, expected}) => {
    const tag = {
      'rules': {
        'Categories': {
          'default': '#metadata-content-2',
        },
        'ContentModel': {
          'default': '#concept-content-nothing',
        },
      },
    };

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                      | expected
        ${undefined}                   | ${['#metadata-content-2']}
        ${'#allowed-in-the-body'}      | ${['#flow-content-2', '#phrasing-content-2', '#metadata-content-2']}
    `('Get categoties by $parameter for "link" tag result: $expected', ({parameter, expected}) => {
    const tag = {
      'rules': {
        'Categories': {
          'default': '#metadata-content-2',
          'if': {
            'is': '#allowed-in-the-body',
            'then': [
              '#flow-content-2',
              '#phrasing-content-2',
            ],
          },
        },
        'ContentModel': {
        },
      },
    };

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                                | expected
        ${undefined}                             | ${['#metadata-content-2']}
        ${'#names:-the-itemprop-attribute'}      | ${['#flow-content-2', '#phrasing-content-2', '#metadata-content-2']}
    `('Get categoties by $parameter for "meta" tag result: $expected', ({parameter, expected}) => {
    const tag = {
      'rules': {
        'Categories': {
          'default': '#metadata-content-2',
          'if': {
            'is': '#names:-the-itemprop-attribute',
            'then': [
              '#flow-content-2',
              '#phrasing-content-2',
            ],
          },
        },
        'ContentModel': {},
      },
    };

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter            | expected
        ${undefined}         | ${['#metadata-content-2']}
        ${'#the-a-element'}  | ${['#metadata-content-2']}
    `('Get categoties by $parameter for "style" tag result: $expected', ({parameter, expected}) => {
    const tag = {
      'rules': {
        'Categories': {
          'default': '#metadata-content-2',
        },
        'ContentModel': {
          'default': '#text-content',
        },
      },
    };

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter            | expected
        ${undefined}         | ${['#sectioning-root']}
        ${'#other-content'}  | ${['#sectioning-root']}
    `('Get categoties by $parameter for "body" tag result: $expected', ({parameter, expected}) => {
    const tag = {
      'rules': {
        'Categories': {
          'default': '#sectioning-root',
        },
        'ContentModel': {
          'default': '#flow-content-2',
        },
      },
    };

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter            | expected
        ${undefined}         | ${['#flow-content-2', '#sectioning-content-2', '#palpable-content-2']}
        ${'#other-content'}  | ${['#flow-content-2', '#sectioning-content-2', '#palpable-content-2']}
    `('Get categoties by $parameter for "article" tag result: $expected', ({parameter, expected}) => {
    const tag = {
      'rules': {
        'Categories': {
          'any': [
            '#flow-content-2',
            '#sectioning-content-2',
            '#palpable-content-2',
          ],
        },
        'ContentModel': {
          'default': '#flow-content-2',
        },
      },
    };

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter            | expected
        ${undefined}         | ${['#flow-content-2', '#sectioning-content-2', '#palpable-content-2']}
        ${'#other-content'}  | ${['#flow-content-2', '#sectioning-content-2', '#palpable-content-2']}
    `('Get categoties by $parameter for "section" tag result: $expected', ({parameter, expected}) => {
    const tag = {
      'rules': {
        'Categories': {
          'any': [
            '#flow-content-2',
            '#sectioning-content-2',
            '#palpable-content-2',
          ],
        },
        'ContentModel': {
          'default': '#flow-content-2',
        },
      },
    };

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
  });
});
