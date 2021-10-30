const {TagAnalyzer} = require('../index.js');
const rules = require('../rules.json');

describe('TagAnalyzer::ContentModel', () => {
  it.each`
        parameter              |  expected
        ${'#the-head-element'} |  ${true}
        ${'#the-body-element'} |  ${true}
        ${'#the-h1-element'}   |  ${false}
    `('Can include $parameter to "html" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.html;

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
    const tag = rules.head;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canIncludeParam(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                      | expected
        ${'#text-content'}             | ${true}
        ${'#inter-element-whitespace'} | ${false}
        ${'#inter-body-element'}       | ${false}
    `('Can include $parameter to "title" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.title;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canIncludeParam(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter          | expected
        ${'#any-content'}  | ${false}
        ${undefined}       | ${false}
    `('Can include $parameter to "link" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.link;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canIncludeParam(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter          | expected
        ${'#any-content'}  | ${false}
        ${undefined}       | ${false}
    `('Can include $parameter to "meta" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.meta;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canIncludeParam(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter           | expected
        ${'#text-content'}  | ${true}
        ${undefined}        | ${false}
        ${'#other-content'} | ${false}
    `('Can include $parameter to "style" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.style;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canIncludeParam(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter              | expected
        ${'#flow-content-2'}  | ${true}
        ${undefined}           | ${false}
        ${'#other-content'}    | ${false}
    `('Can include $parameter to "body" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.body;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canIncludeParam(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter              | expected
        ${'#flow-content-2'}   | ${true}
        ${undefined}           | ${false}
        ${'#other-content'}    | ${false}
    `('Can include $parameter to "article" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.article;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canIncludeParam(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter              | expected
        ${'#flow-content-2'}   | ${true}
        ${undefined}           | ${false}
        ${'#other-content'}    | ${false}
    `('Can include $parameter to "section" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.section;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canIncludeParam(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter              | expected
        ${'#flow-content-2'}   | ${true}
        ${undefined}           | ${false}
        ${'#other-content'}    | ${false}
    `('Can include $parameter to "nav" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.nav;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canIncludeParam(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter              | expected
        ${'#flow-content-2'}   | ${true}
        ${undefined}           | ${false}
        ${'#other-content'}    | ${false}
    `('Can include $parameter to "aside" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.aside;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canIncludeParam(parameter)).toStrictEqual(expected);
  });

  describe.each(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])(
      'For tag=%s', (tagName) => {
        it.each`
          parameter                 | expected
          ${'#phrasing-content-2'}  | ${true}
          ${undefined}              | ${false}
          ${'#flow-content-2'}      | ${false}
        `(`Can include $parameter to "${tagName}" tag result: $expected`, ({parameter, expected}) => {
          const tag = rules[tagName];

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
    const tag = rules.hgroup;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canIncludeParam(parameter)).toStrictEqual(expected);
  });

  describe.each(['header', 'footer'])(
      'For tag=%s', (tagName) => {
        it.each`
        parameter                | expected
        ${'#flow-content-2'}     | ${true}
        ${undefined}             | ${false}
        ${'#the-header-element'} | ${false}
        ${'#the-footer-element'} | ${false}
        ${'#other-content'}      | ${false}
    `(`Can include $parameter to "${tagName}" tag result: $expected`, ({parameter, expected}) => {
          const tag = rules[tagName];

          const analyzer = new TagAnalyzer(tag);
          expect(analyzer.canIncludeParam(parameter)).toStrictEqual(expected);
        });
      });

  it.each`
        parameter                  | expected
        ${'#flow-content-2'}       | ${true}
        ${'#heading-content-2'}    | ${false}
        ${'#sectioning-content-2'} | ${false}
        ${'#the-header-element'}   | ${false}
        ${'#the-footer-element'}   | ${false}
        ${'#the-address-element'}  | ${false}
    `('Can include $parameter to "address" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.address;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canIncludeParam(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                  | expected
        ${'#phrasing-content-2'}   | ${true}
        ${'#flow-content-2'}       | ${false}
        ${'#palpable-content-2'}   | ${false}
    `('Can include $parameter to "p" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.p;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canIncludeParam(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                     | expected
        ${'#phrasing-content-2'}      | ${true}
        ${'#other-content'}           | ${false}
    `('Can include $parameter to "pre" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.pre;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canIncludeParam(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                     | expected
        ${'#flow-content-2'}          | ${true}
        ${'#other-content'}           | ${false}
    `('Can include $parameter to "blockquote" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.blockquote;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canIncludeParam(parameter)).toStrictEqual(expected);
  });

  describe.each(['ol', 'ul', 'menu'])(
      'For tag=%s', (tagName) => {
        it.each`
        parameter                          | expected
        ${'#the-li-element'}               | ${true}
        ${'#script-supporting-elements-2'} | ${true}
        ${'#other-content'}                | ${false}
    `(`Can include $parameter to "${tagName}" tag result: $expected`, ({parameter, expected}) => {
          const tag = rules[tagName];

          const analyzer = new TagAnalyzer(tag);
          expect(analyzer.canIncludeParam(parameter)).toStrictEqual(expected);
        });
      });

  it.each`
        parameter                     | expected
        ${'#flow-content-2'}          | ${true}
        ${'#other-content'}           | ${false}
    `('Can include $parameter to "li" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.li;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canIncludeParam(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                           | expected
        ${'#the-div-element'}               | ${true}
        ${'#the-dt-element'}                | ${true}
        ${'#the-dd-element'}                | ${true}
        ${'#script-supporting-elements-2'}  | ${true}
        ${'#other-content'}                 | ${false}
    `('Can include $parameter to "dl" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.dl;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canIncludeParam(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                  | expected
        ${'#flow-content-2'}       | ${true}
        ${'#the-header-element'}   | ${false}
        ${'#the-footer-element'}   | ${false}
        ${'#sectioning-content-2'} | ${false}
        ${'#heading-content-2'}    | ${false}
    `('Can include $parameter to "dt" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.dt;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canIncludeParam(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                  | expected
        ${'#flow-content-2'}       | ${true}
        ${'#other-content'}        | ${false}
    `('Can include $parameter to "dd" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.dd;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canIncludeParam(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                     | expected
        ${'#flow-content-2'}          | ${true}
        ${'#the-figcaption-element'}  | ${true}
        ${'#other-content'}           | ${false}
    `('Can include $parameter to "figure" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.figure;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canIncludeParam(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                     | expected
        ${'#flow-content-2'}          | ${true}
        ${'#other-content'}           | ${false}
    `('Can include $parameter to "figcaption" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.figcaption;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canIncludeParam(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                     | expected
        ${'#flow-content-2'}          | ${true}
        ${'#other-content'}           | ${false}
    `('Can include $parameter to "main" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.main;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canIncludeParam(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                                          | expected
        ${['childOf:#the-dl-element', '#the-dt-element']}  | ${true}
        ${['childOf:#the-dl-element', '#the-dd-element']}  | ${true}
        ${'#flow-content-2'}                               | ${true}
        ${['#flow-content-2']}                             | ${true}
        ${['childOf:#the-dl-element', '#other-content']}   | ${false}
        ${'#other-content'}                                | ${false}
    `('Can include $parameter to "div" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.div;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canIncludeParam(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                    | expected
        ${['#some-element']}         | ${'unknown'}
        ${'#interactive-content-2'}  | ${false}
        ${'#the-a-element'}          | ${false}
        ${'#attr-tabindex'}          | ${false}
    `('Can include $parameter to "a" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.a;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canIncludeParam(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                | expected
        ${'#phrasing-content-2'} | ${true}
        ${'#the-dfn-element'}    | ${false}
        ${'#other-element'}      | ${false}
    `('Can include $parameter to "dfn" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.dfn;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canIncludeParam(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                | expected
        ${'#phrasing-content-2'} | ${true}
        ${'#the-ruby-element'}   | ${false}
        ${'#the-rp-element'}     | ${true}
        ${'#the-rt-element'}     | ${true}
    `('Can include $parameter to "ruby" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.ruby;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canIncludeParam(parameter)).toStrictEqual(expected);
  });

  describe.each(['em', 'strong', 'small', 's', 'cite', 'q', 'abbr',
    'data', 'code', 'var', 'samp', 'kbd', 'sub', 'sup', 'i', 'b', 'u',
    'mark', 'bdi', 'bdo', 'span'])(
      'For tag=%s', (tagName) => {
        it.each`
        parameter                | expected
        ${'#phrasing-content-2'} | ${true}
        ${'#other-content'}      | ${false}
        ${undefined}             | ${false}
    `(`Can include $parameter to "${tagName}" tag result: $expected`, ({parameter, expected}) => {
          const tag = rules[tagName];

          const analyzer = new TagAnalyzer(tag);
          expect(analyzer.canIncludeParam(parameter)).toStrictEqual(expected);
        });
      });

  it.each`
        parameter                | expected
        ${'#phrasing-content-2'} | ${true}
        ${'#other-content'}      | ${false}
        ${undefined}             | ${false}
    `('Can include $parameter to "rt" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.rt;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canIncludeParam(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter            | expected
        ${'#text-content'}   | ${true}
        ${'#other-content'}  | ${false}
        ${undefined}         | ${false}
    `('Can include $parameter to "rp" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.rp;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canIncludeParam(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                                                    | expected
        ${'#text-content'}                                           | ${true}
        ${['hasAttr:#attr-time-datetime', '#phrasing-content-2']}  | ${true}
        ${['hasAttr:#attr-time-datetime', '#other-content']}       | ${false}
        ${undefined}                                                 | ${false}
    `('Can include $parameter to "time" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.time;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canIncludeParam(parameter)).toStrictEqual(expected);
  });

  describe.each(['hr', 'base', 'source', 'img', 'iframe', 'embed', 'br', 'wbr', 'param'])(
      'For tag=%s', (tagName) => {
        it.each`
        parameter                     | expected
        ${'#concept-content-nothing'} | ${true}
        ${'#other-content'}           | ${false}
        ${undefined}                  | ${false}
    `(`Can include $parameter to "${tagName}" tag result: $expected`, ({parameter, expected}) => {
          const tag = rules[tagName];

          const analyzer = new TagAnalyzer(tag);
          expect(analyzer.canIncludeParam(parameter)).toStrictEqual(expected);
        });
      });

  describe.each(['ins', 'del'])(
      'For tag=%s', (tagName) => {
        it.each`
        parameter                     | expected
        ${'#transparent'}             | ${'unknown'}
        ${'#other-content'}           | ${'unknown'}
        ${undefined}                  | ${'unknown'}
    `(`Can include $parameter to "${tagName}" tag result: $expected`, ({parameter, expected}) => {
          const tag = rules[tagName];

          const analyzer = new TagAnalyzer(tag);
          expect(analyzer.canIncludeParam(parameter)).toStrictEqual(expected);
        });
      });

  it.each`
        parameter                           | expected
        ${'#the-source-element'}            | ${true}
        ${'#the-img-element'}               | ${true}
        ${'#script-supporting-elements-2'}  | ${true}
        ${'#other-content'}                 | ${false}
    `('Can include $parameter to "picture" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.picture;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canIncludeParam(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                                                 | expected
        ${['hasChild:#the-param-element', '#the-source-element']} | ${'unknown'}
        ${'#the-source-element'}                                  | ${'unknown'}
    `('Can include $parameter to "object" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.object;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canIncludeParam(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                                            | expected
        ${['hasAttr:#attr-media-src', '#the-track-element']} | ${'unknown'}
        ${['hasAttr:#attr-media-src']}                       | ${'unknown'}
        ${'#media-element'}                                  | ${false}
        ${'#the-source-element'}                             | ${'unknown'}
        ${'#the-track-element'}                              | ${'unknown'}
        ${'#flow-content-2'}                                 | ${false}
    `('Can include $parameter to "video" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.video;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canIncludeParam(parameter)).toStrictEqual(expected);
  });
});
