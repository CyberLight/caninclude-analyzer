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

  it.each`
        parameter              | expected
        ${'#flow-content-2'}   | ${true}
        ${undefined}           | ${false}
        ${'#other-content'}    | ${false}
    `('Can include $parameter to "article" tag result: $expected', ({parameter, expected}) => {
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
    expect(analyzer.canIncludeParam(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter              | expected
        ${'#flow-content-2'}   | ${true}
        ${undefined}           | ${false}
        ${'#other-content'}    | ${false}
    `('Can include $parameter to "section" tag result: $expected', ({parameter, expected}) => {
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
    expect(analyzer.canIncludeParam(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter              | expected
        ${'#flow-content-2'}   | ${true}
        ${undefined}           | ${false}
        ${'#other-content'}    | ${false}
    `('Can include $parameter to "nav" tag result: $expected', ({parameter, expected}) => {
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
    expect(analyzer.canIncludeParam(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter              | expected
        ${'#flow-content-2'}   | ${true}
        ${undefined}           | ${false}
        ${'#other-content'}    | ${false}
    `('Can include $parameter to "aside" tag result: $expected', ({parameter, expected}) => {
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
    expect(analyzer.canIncludeParam(parameter)).toStrictEqual(expected);
  });

  describe.each(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])(
      'For tag=%s', (tag) => {
        it.each`
          parameter                 | expected
          ${'#phrasing-content-2'}  | ${true}
          ${undefined}              | ${false}
          ${'#flow-content-2'}      | ${false}
        `(`Can include $parameter to "${tag}" tag result: $expected`, ({parameter, expected}) => {
          const tag = {
            'rules': {
              'Categories': {
                'any': [
                  '#flow-content-2',
                  '#heading-content-2',
                  '#palpable-content-2',
                ],
              },
              'ContentModel': {
                'default': '#phrasing-content-2',
              },
            },
          };

          const analyzer = new TagAnalyzer(tag);
          expect(analyzer.canIncludeParam(parameter)).toStrictEqual(expected);
        });
      });

  it.each`
        parameter                                      | expected
        ${'#the-h1,-h2,-h3,-h4,-h5,-and-h6-elements'}  | ${true}
        ${'#script-supporting-elements-2'}             | ${true}
        ${'#the-h1-element'}                           | ${true}
        ${'#the-h2-element'}                           | ${true}
        ${'#the-h3-element'}                           | ${true}
        ${'#the-h4-element'}                           | ${true}
        ${'#the-h5-element'}                           | ${true}
        ${'#the-h6-element'}                           | ${true}
        ${undefined}                                   | ${false}
        ${'#other-content'}                            | ${false}
    `('Can include $parameter to "hgroup" tag result: $expected', ({parameter, expected}) => {
    const tag = {
      'rules': {
        'Categories': {
          'any': [
            '#flow-content-2',
            '#heading-content-2',
            '#palpable-content-2',
          ],
        },
        'ContentModel': {
          'and': [
            {'oneOrMore': [
              '#the-h1,-h2,-h3,-h4,-h5,-and-h6-elements',
              '#the-h1-element',
              '#the-h2-element',
              '#the-h3-element',
              '#the-h4-element',
              '#the-h5-element',
              '#the-h6-element',
            ]},
            {'optional': '#script-supporting-elements-2'},
          ],
        },
      },
    };

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canIncludeParam(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                | expected
        ${'#flow-content-2'}     | ${true}
        ${undefined}             | ${false}
        ${'#the-header-element'} | ${false}
        ${'#the-footer-element'} | ${false}
        ${'#other-content'}      | ${false}
    `('Can include $parameter to "header" tag result: $expected', ({parameter, expected}) => {
    const tag = {
      'rules': {
        'Categories': {
          'default': [
            '#flow-content-2',
            '#palpable-content-2',
          ],
        },
        'ContentModel': {
          'default': '#flow-content-2',
          'butNo': [
            '#the-header-element',
            '#the-footer-element',
          ],
        },
      },
    };

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canIncludeParam(parameter)).toStrictEqual(expected);
  });
});
