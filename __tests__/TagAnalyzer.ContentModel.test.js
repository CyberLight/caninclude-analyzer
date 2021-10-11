const {TagAnalyzer} = require('../index.js');

describe('TagAnalyzer::ContentModel', () => {
  it.each`
        parameter              |  expected
        ${'#the-head-element'} |  ${true}
        ${'#the-body-element'} |  ${true}
        ${'#the-h1-element'}   |  ${false}
    `('Can include $parameter to "html" tag result: $expected', ({parameter, expected}) => {
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
    expect(analyzer.canIncludeParam(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                | expected
        ${'#metadata-content-2'} | ${true}
        ${'#the-title-element'}  | ${true}
        ${'#the-base-element'}   | ${true}
        ${'#the-a-element'}      | ${false}
    `('Can include $parameter to "head" tag result: $expected', ({parameter, expected}) => {
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
    expect(analyzer.canIncludeParam(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                      | expected
        ${'#text-content'}             | ${true}
        ${'#inter-element-whitespace'} | ${false}
        ${'#inter-body-element'}       | ${false}
    `('Can include $parameter to "title" tag result: $expected', ({parameter, expected}) => {
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
    expect(analyzer.canIncludeParam(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                      | expected
        ${'#concept-content-nothing'}  | ${true}
        ${'#inter-body-element'}       | ${false}
    `('Can include $parameter to "base" tag result: $expected', ({parameter, expected}) => {
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
    expect(analyzer.canIncludeParam(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter          | expected
        ${'#any-content'}  | ${false}
        ${undefined}       | ${false}
    `('Can include $parameter to "link" tag result: $expected', ({parameter, expected}) => {
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
    expect(analyzer.canIncludeParam(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter          | expected
        ${'#any-content'}  | ${false}
        ${undefined}       | ${false}
    `('Can include $parameter to "meta" tag result: $expected', ({parameter, expected}) => {
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
    expect(analyzer.canIncludeParam(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter           | expected
        ${'#text-content'}  | ${true}
        ${undefined}        | ${false}
        ${'#other-content'} | ${false}
    `('Can include $parameter to "style" tag result: $expected', ({parameter, expected}) => {
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
    expect(analyzer.canIncludeParam(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter              | expected
        ${'#flow-content-2'}  | ${true}
        ${undefined}           | ${false}
        ${'#other-content'}    | ${false}
    `('Can include $parameter to "body" tag result: $expected', ({parameter, expected}) => {
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
    expect(analyzer.canIncludeParam(parameter)).toStrictEqual(expected);
  });
});
