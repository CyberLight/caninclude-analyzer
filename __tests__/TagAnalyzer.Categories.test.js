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

  it.each`
        parameter            | expected
        ${undefined}         | ${['#flow-content-2', '#palpable-content-2']}
        ${'#other-content'}  | ${['#flow-content-2', '#palpable-content-2']}
    `('Get categoties by $parameter for "p" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.p;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter            | expected
        ${undefined}         | ${['#flow-content-2']}
        ${'#other-content'}  | ${['#flow-content-2']}
    `('Get categoties by $parameter for "hr" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.hr;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter            | expected
        ${undefined}         | ${['#flow-content-2', '#palpable-content-2']}
        ${'#other-content'}  | ${['#flow-content-2', '#palpable-content-2']}
    `('Get categoties by $parameter for "pre" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.pre;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter            | expected
        ${undefined}         | ${['#flow-content-2', '#sectioning-root', '#palpable-content-2']}
        ${'#other-content'}  | ${['#flow-content-2', '#sectioning-root', '#palpable-content-2']}
    `('Get categoties by $parameter for "blockquote" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.blockquote;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
  });

  describe.each(['ol', 'ul', 'menu'])(
      'For tag=%s', (tagName) => {
        it.each`
        parameter            | expected
        ${undefined}         | ${['#flow-content-2']}
        ${'#other-content'}  | ${['#flow-content-2']}
        ${'#the-li-element'} | ${['#palpable-content-2', '#flow-content-2']}
    `(`Get categoties by $parameter for "${tagName}" tag result: $expected`, ({parameter, expected}) => {
          const tag = rules[tagName];

          const analyzer = new TagAnalyzer(tag);
          expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
        });
      });

  it.each`
        parameter            | expected
        ${undefined}         | ${[]}
        ${'#other-content'}  | ${[]}
    `('Get categoties by $parameter for "li" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.li;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter            | expected
        ${undefined}         | ${['#flow-content-2']}
        ${'#the-dt-element'} | ${['#palpable-content-2', '#flow-content-2']}
        ${'#the-dd-element'} | ${['#palpable-content-2', '#flow-content-2']}
        ${'#other-content'}  | ${['#flow-content-2']}
    `('Get categoties by $parameter for "dl" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.dl;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter            | expected
        ${undefined}         | ${[]}
        ${'#other-content'}  | ${[]}
    `('Get categoties by $parameter for "dt" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.dt;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter            | expected
        ${undefined}         | ${[]}
        ${'#other-content'}  | ${[]}
    `('Get categoties by $parameter for "dd" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.dd;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter            | expected
        ${undefined}         | ${['#flow-content-2', '#sectioning-root', '#palpable-content-2']}
        ${'#other-content'}  | ${['#flow-content-2', '#sectioning-root', '#palpable-content-2']}
    `('Get categoties by $parameter for "figure" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.figure;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter            | expected
        ${undefined}         | ${[]}
        ${'#other-content'}  | ${[]}
    `('Get categoties by $parameter for "figcaption" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.figcaption;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter            | expected
        ${undefined}         | ${['#flow-content-2', '#palpable-content-2']}
        ${'#other-content'}  | ${['#flow-content-2', '#palpable-content-2']}
    `('Get categoties by $parameter for "main" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.main;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter            | expected
        ${undefined}         | ${['#flow-content-2', '#palpable-content-2']}
        ${'#other-content'}  | ${['#flow-content-2', '#palpable-content-2']}
    `('Get categoties by $parameter for "div" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.div;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                 | expected
        ${undefined}              | ${['#flow-content-2', '#phrasing-content-2', '#palpable-content-2']}
        ${'#attr-hyperlink-href'} | ${['#interactive-content-2', '#flow-content-2', '#phrasing-content-2',
  '#palpable-content-2']}
    `('Get categoties by $parameter for "a" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.a;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
  });

  describe.each(['em', 'strong', 'small', 's', 'cite', 'q', 'dfn',
    'abbr', 'ruby', 'data', 'time', 'code', 'var', 'samp', 'kbd', 'sub',
    'sup', 'i', 'b', 'u', 'mark', 'bdi', 'bdo', 'span', 'ins'])(
      'For tag=%s', (tagName) => {
        it.each`
        parameter                 | expected
        ${undefined}              | ${['#flow-content-2', '#phrasing-content-2', '#palpable-content-2']}
    `(`Get categoties by $parameter for "${tagName}" tag result: $expected`, ({parameter, expected}) => {
          const tag = rules[tagName];

          const analyzer = new TagAnalyzer(tag);
          expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
        });
      });

  it.each`
        parameter                 | expected
        ${undefined}              | ${[]}
    `('Get categoties by $parameter for "rt" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.rt;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                 | expected
        ${undefined}              | ${[]}
    `('Get categoties by $parameter for "rp" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.rp;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
  });

  describe.each(['br', 'wbr'])(
      'For tag=%s', (tagName) => {
        it.each`
        parameter                 | expected
        ${undefined}              | ${['#flow-content-2', '#phrasing-content-2']}
    `(`Get categoties by $parameter for "${tagName}" tag result: $expected`, ({parameter, expected}) => {
          const tag = rules[tagName];

          const analyzer = new TagAnalyzer(tag);
          expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
        });
      });

  it.each`
        parameter    | expected
        ${undefined} | ${['#flow-content-2', '#phrasing-content-2']}
    `('Get categoties by $parameter for "del" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.del;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter    | expected
        ${undefined} | ${['#flow-content-2', '#phrasing-content-2', '#embedded-content-category']}
    `('Get categoties by $parameter for "picture" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.picture;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
  });

  describe.each(['source', 'param', 'caption', 'colgroup'])(
      'For tag=%s', (tagName) => {
        it.each`
        parameter           | expected
        ${undefined}        | ${[]}
        ${'#other-content'} | ${[]}
    `(`Get categoties by $parameter for "${tagName}" tag result: $expected`, ({parameter, expected}) => {
          const tag = rules[tagName];

          const analyzer = new TagAnalyzer(tag);
          expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
        });
      });

  it.each`
        parameter           | expected
        ${undefined}        | ${['#flow-content-2', '#phrasing-content-2',
  '#embedded-content-category', '#form-associated-element',
  '#palpable-content-2']}
        ${'#attr-hyperlink-usemap'} | ${['#interactive-content-2', '#flow-content-2', '#phrasing-content-2',
  '#embedded-content-category', '#form-associated-element',
  '#palpable-content-2']}
    `('Get categoties by $parameter for "img" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.img;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
  });

  describe.each(['iframe', 'embed'])(
      'For tag=%s', (tagName) => {
        it.each`
        parameter           | expected
        ${undefined}        | ${['#flow-content-2',
  '#phrasing-content-2',
  '#embedded-content-category',
  '#interactive-content-2',
  '#palpable-content-2']}
    `(`Get categoties by $parameter for "${tagName}" tag result: $expected`, ({parameter, expected}) => {
          const tag = rules[tagName];

          const analyzer = new TagAnalyzer(tag);
          expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
        });
      });

  it.each`
        parameter           | expected
        ${undefined}        | ${['#flow-content-2',
  '#phrasing-content-2',
  '#embedded-content-category',
  '#category-listed',
  '#form-associated-element',
  '#palpable-content-2']}
    `('Get categoties by $parameter for "object" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.object;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                  | expected
        ${undefined}               | ${['#flow-content-2', '#phrasing-content-2',
  '#embedded-content-category', '#palpable-content-2']}
        ${'#attr-media-controls'}  | ${['#interactive-content-2', '#flow-content-2', '#phrasing-content-2',
  '#embedded-content-category', '#palpable-content-2']}
    `('Get categoties by $parameter for "video" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.video;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                  | expected
        ${undefined}               | ${['#flow-content-2', '#phrasing-content-2', '#embedded-content-category']}
        ${'#attr-media-controls'}  | ${['#interactive-content-2',
  '#palpable-content-2', '#flow-content-2',
  '#phrasing-content-2',
  '#embedded-content-category']}
    `('Get categoties by $parameter for "audio" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.audio;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter            | expected
        ${undefined}         | ${[]}
        ${'#other-content'}  | ${[]}
    `('Get categoties by $parameter for "track" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.track;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter            | expected
        ${undefined}         | ${['#flow-content-2', '#phrasing-content-2', '#palpable-content-2']}
        ${'#other-content'}  | ${['#flow-content-2', '#phrasing-content-2', '#palpable-content-2']}
    `('Get categoties by $parameter for "map" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.map;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter            | expected
        ${undefined}         | ${['#flow-content-2', '#phrasing-content-2']}
        ${'#other-content'}  | ${['#flow-content-2', '#phrasing-content-2']}
    `('Get categoties by $parameter for "area" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.area;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter            | expected
        ${undefined}         | ${['#flow-content-2', '#palpable-content-2']}
        ${'#other-content'}  | ${['#flow-content-2', '#palpable-content-2']}
    `('Get categoties by $parameter for "table" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.table;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.getCategories(parameter)).toStrictEqual(expected);
  });
});
