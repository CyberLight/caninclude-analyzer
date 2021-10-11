const {TagAnalyzer} = require('../index.js');

describe('TagAnalyzer::Categories', () => {
  it.each`
        parameter                      | expected
        ${undefined}                   | ${['#metadata-content-2']}
        ${'#allowed-in-the-body'}      | ${['#flow-content-2', '#phrasing-content-2', '#metadata-content-2']}
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
    expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
  });
});
