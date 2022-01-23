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
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
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
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                      | expected
        ${'#text-content'}             | ${true}
        ${'#inter-element-whitespace'} | ${false}
        ${'#inter-body-element'}       | ${false}
    `('Can include $parameter to "title" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.title;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter          | expected
        ${'#any-content'}  | ${false}
        ${undefined}       | ${false}
    `('Can include $parameter to "link" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.link;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter          | expected
        ${'#any-content'}  | ${false}
        ${undefined}       | ${false}
    `('Can include $parameter to "meta" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.meta;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter           | expected
        ${'#text-content'}  | ${true}
        ${undefined}        | ${false}
        ${'#other-content'} | ${false}
    `('Can include $parameter to "style" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.style;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter              | expected
        ${'#flow-content-2'}  | ${true}
        ${undefined}           | ${false}
        ${'#other-content'}    | ${false}
    `('Can include $parameter to "body" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.body;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter              | expected
        ${'#flow-content-2'}   | ${true}
        ${undefined}           | ${false}
        ${'#other-content'}    | ${false}
    `('Can include $parameter to "article" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.article;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter              | expected
        ${'#flow-content-2'}   | ${true}
        ${undefined}           | ${false}
        ${'#other-content'}    | ${false}
    `('Can include $parameter to "section" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.section;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter              | expected
        ${'#flow-content-2'}   | ${true}
        ${undefined}           | ${false}
        ${'#other-content'}    | ${false}
    `('Can include $parameter to "nav" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.nav;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter              | expected
        ${'#flow-content-2'}   | ${true}
        ${undefined}           | ${false}
        ${'#other-content'}    | ${false}
    `('Can include $parameter to "aside" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.aside;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
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
          expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
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
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
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
          expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
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
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                  | expected
        ${'#phrasing-content-2'}   | ${true}
        ${'#flow-content-2'}       | ${false}
        ${'#palpable-content-2'}   | ${false}
    `('Can include $parameter to "p" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.p;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                     | expected
        ${'#phrasing-content-2'}      | ${true}
        ${'#other-content'}           | ${false}
    `('Can include $parameter to "pre" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.pre;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                     | expected
        ${'#flow-content-2'}          | ${true}
        ${'#other-content'}           | ${false}
    `('Can include $parameter to "blockquote" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.blockquote;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
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
          expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
        });
      });

  it.each`
        parameter                     | expected
        ${'#flow-content-2'}          | ${true}
        ${'#other-content'}           | ${false}
    `('Can include $parameter to "li" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.li;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
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
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
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
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                  | expected
        ${'#flow-content-2'}       | ${true}
        ${'#other-content'}        | ${false}
    `('Can include $parameter to "dd" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.dd;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                     | expected
        ${'#flow-content-2'}          | ${true}
        ${'#the-figcaption-element'}  | ${true}
        ${'#other-content'}           | ${false}
    `('Can include $parameter to "figure" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.figure;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                     | expected
        ${'#flow-content-2'}          | ${true}
        ${'#other-content'}           | ${false}
    `('Can include $parameter to "figcaption" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.figcaption;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                     | expected
        ${'#flow-content-2'}          | ${true}
        ${'#other-content'}           | ${false}
    `('Can include $parameter to "main" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.main;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
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
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
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
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                | expected
        ${'#phrasing-content-2'} | ${true}
        ${'#the-dfn-element'}    | ${false}
        ${'#other-element'}      | ${false}
    `('Can include $parameter to "dfn" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.dfn;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
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
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
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
          expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
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
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter            | expected
        ${'#text-content'}   | ${true}
        ${'#other-content'}  | ${false}
        ${undefined}         | ${false}
    `('Can include $parameter to "rp" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.rp;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                                                    | expected
        ${'#text-content'}                                           | ${true}
        ${['hasAttr:#attr-time-datetime', '#phrasing-content-2']}    | ${true}
        ${['hasAttr:#attr-time-datetime', '#other-content']}         | ${false}
        ${undefined}                                                 | ${false}
    `('Can include $parameter to "time" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.time;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
  });

  describe.each(['hr', 'base', 'source', 'img', 'iframe', 'embed', 'br',
    'wbr', 'param', 'track', 'area', 'col', 'input'])(
      'For tag=%s', (tagName) => {
        it.each`
        parameter                     | expected
        ${'#concept-content-nothing'} | ${true}
        ${'#other-content'}           | ${false}
        ${undefined}                  | ${false}
    `(`Can include $parameter to "${tagName}" tag result: $expected`, ({parameter, expected}) => {
          const tag = rules[tagName];

          const analyzer = new TagAnalyzer(tag);
          expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
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
          expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
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
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                                                 | expected
        ${['hasChild:#the-param-element', '#the-source-element']} | ${'unknown'}
        ${'#the-source-element'}                                  | ${'unknown'}
    `('Can include $parameter to "object" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.object;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
  });

  describe.each(['video', 'audio'])(
      'For tag=%s', (tagName) => {
        it.each`
            parameter                                            | expected
            ${['hasAttr:#attr-media-src', '#the-track-element']} | ${'unknown'}
            ${['hasAttr:#attr-media-src']}                       | ${'unknown'}
            ${'#media-element'}                                  | ${false}
            ${'#the-source-element'}                             | ${'unknown'}
            ${'#the-track-element'}                              | ${'unknown'}
            ${'#flow-content-2'}                                 | ${false}
        `(`Can include $parameter to "${tagName}" tag result: $expected`, ({parameter, expected}) => {
          const tag = rules[tagName];

          const analyzer = new TagAnalyzer(tag);
          expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
        });
      });

  it.each`
        parameter                                                 | expected
        ${undefined}                                              | ${'unknown'}
        ${'#the-any-other-element'}                               | ${'unknown'}
    `('Can include $parameter to "map" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.map;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                                               | expected
        ${undefined}                                            | ${false}
        ${'#the-any-other-element'}                             | ${false}
        ${'#the-caption-element'}                               | ${true}
        ${'#the-colgroup-element'}                              | ${true}
        ${'#the-thead-element'}                                 | ${true}
        ${'#the-tbody-element'}                                 | ${true}
        ${'#the-tr-element'}                                    | ${true}
        ${['#script-supporting-elements-2', '#the-tr-element']} | ${true}
        ${['#the-tfoot-element', '#the-tr-element']}            | ${true}
    `('Can include $parameter to "table" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.table;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                                                 | expected
        ${undefined}                                              | ${false}
        ${'#the-any-other-element'}                               | ${false}
        ${'#flow-content-2'}                                      | ${true}
        ${['hasChild:#the-table-element']}                        | ${false}
        ${['hasChild:#the-table-element', '#flow-content-2']}     | ${false}
    `('Can include $parameter to "caption" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.caption;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                                                       | expected
        ${undefined}                                                    | ${false}
        ${'#the-any-other-element'}                                     | ${false}
        ${['hasAttr:#attr-colgroup-span', '#concept-content-nothing']}  | ${true}
        ${['hasAttr:#attr-colgroup-span', '#the-any-other-element']}    | ${false}
        ${'#the-col-element'}                                           | ${true}
        ${'#the-template-element'}                                      | ${true}
    `('Can include $parameter to "colgroup" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.colgroup;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
  });

  describe.each(['tbody', 'thead', 'tfoot'])(
      'For tag=%s', (tagName) => {
        it.each`
        parameter                                 | expected
        ${undefined}                              | ${false}
        ${'#the-any-other-element'}               | ${false}
        ${'#the-tr-element'}                      | ${true}
        ${'#script-supporting-elements-2'}        | ${true}
    `(`Can include $parameter to "${tagName}" tag result: $expected`, ({parameter, expected}) => {
          const tag = rules[tagName];

          const analyzer = new TagAnalyzer(tag);
          expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
        });
      });

  it.each`
        parameter                          | expected
        ${undefined}                       | ${false}
        ${'#the-any-other-element'}        | ${false}
        ${'#the-td-element'}               | ${true}
        ${'#the-th-element'}               | ${true}
        ${'#script-supporting-elements-2'} | ${true}
    `('Can include $parameter to "tr" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.tr;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                          | expected
        ${undefined}                       | ${false}
        ${'#the-any-other-element'}        | ${false}
        ${'#flow-content-2'}               | ${true}
    `('Can include $parameter to "td" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.td;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                          | expected
        ${undefined}                       | ${false}
        ${'#flow-content-2'}               | ${true}
        ${'#the-header-element'}           | ${false}
        ${'#the-footer-element'}           | ${false}
        ${'#sectioning-content-2'}         | ${false}
        ${'#heading-content-2'}            | ${false}
    `('Can include $parameter to "th" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.th;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                                            | expected
        ${undefined}                                         | ${false}
        ${'#flow-content-2'}                                 | ${true}
        ${'#the-form-element'}                               | ${false}
        ${['hasChild:#the-form-element', '#flow-content-2']} | ${false}
    `('Can include $parameter to "form" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.form;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                                                                                     | expected
        ${undefined}                                                                                  | ${false}
        ${'#phrasing-content-2'}                                                                      | ${true}
        ${'#labeled-control'}                                                                         | ${true}
        ${'#category-label'}                                                                          | ${false}
        ${'#the-label-element'}                                                                       | ${false}
        ${['hasChild:#category-label', '#phrasing-content-2']}                                        | ${false}
        ${['hasChild:#the-label-element', '#phrasing-content-2']}                                     | ${false}
        ${['hasChild:#category-label', '#labeled-control']}                                           | ${false}
        ${['hasChild:#the-label-element', '#labeled-control']}                                        | ${false}
        ${['hasAttr:#hidden-state-(type=hidden)', '#the-input-element']}                              | ${false}
        ${['hasAttr:#attr-input-type', '#the-input-element']}                                         | ${true}
        ${['hasAttr:#attr-input-type', 'hasAttr:#hidden-state-(type=hidden)', '#the-input-element']}  | ${false}
        ${'#the-input-element'}                                                                       | ${true}
        ${'#the-select-element'}                                                                      | ${true}
        ${'#the-textarea-element'}                                                                    | ${true}
    `('Can include $parameter to "label" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.label;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                              | expected
        ${undefined}                           | ${false}
        ${'#phrasing-content-2'}               | ${true}
        ${'#interactive-content-2'}            | ${false}
        ${'#attr-tabindex'}                    | ${false}
    `('Can include $parameter to "button" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.button;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                              | expected
        ${undefined}                           | ${false}
        ${'#other-content'}                    | ${false}
        ${'#the-option-element'}               | ${true}
        ${'#the-optgroup-element'}             | ${true}
        ${'#script-supporting-elements-2'}     | ${true}
    `('Can include $parameter to "select" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.select;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                              | expected
        ${undefined}                           | ${false}
        ${'#other-content'}                    | ${false}
        ${'#phrasing-content-2'}               | ${true}
        ${'#the-option-element'}               | ${true}
        ${'#script-supporting-elements-2'}     | ${true}
    `('Can include $parameter to "datalist" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.datalist;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                              | expected
        ${undefined}                           | ${false}
        ${'#other-content'}                    | ${false}
        ${'#the-option-element'}               | ${true}
        ${'#script-supporting-elements-2'}     | ${true}
    `('Can include $parameter to "optgroup" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.optgroup;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
  });


  it.each`
        parameter                                                                                    | expected
        ${undefined}                                                                                 | ${false}
        ${'#other-content'}                                                                          | ${false}
        ${['hasAttr:#attr-option-label', 'hasAttr:#attr-option-value', '#concept-content-nothing']}  | ${true}
        ${['hasAttr:#attr-option-label', '#text-content']}                                           | ${true}
        ${['hasAttr:#attr-option-value', '#text-content']}                                           | ${true}
        ${['hasAttr:#attr-option-value', 'not:#inter-element-whitespace']}                           | ${true}
        ${['childOf:#the-datalist-element', '#text-content']}                                        | ${true}
        ${['childOf:#the-datalist-element', 'hasAttr:#attr-option-value', '#text-content']}          | ${true}
        ${['childOf:#the-div-element', 'hasAttr:#attr-option-value', '#text-content']}               | ${true}
    `('Can include $parameter to "option" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.option;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter           | expected
        ${'#text-content'}  | ${true}
        ${undefined}        | ${false}
        ${'#other-content'} | ${false}
    `('Can include $parameter to "textarea" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.textarea;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                 | expected
        ${'#phrasing-content-2'}  | ${true}
        ${undefined}              | ${false}
        ${'#other-content'}       | ${false}
    `('Can include $parameter to "output" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.output;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                                                     | expected
        ${'#phrasing-content-2'}                                      | ${true}
        ${'#the-progress-element'}                                    | ${false}
        ${['hasChild:#the-progress-element', '#phrasing-content-2']}  | ${false}
        ${undefined}                                                  | ${false}
        ${'#other-content'}                                           | ${false}
    `('Can include $parameter to "progress" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.progress;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                                                  | expected
        ${'#phrasing-content-2'}                                   | ${true}
        ${'#the-meter-element'}                                    | ${false}
        ${['hasChild:#the-meter-element', '#phrasing-content-2']}  | ${false}
        ${undefined}                                               | ${false}
        ${'#other-content'}                                        | ${false}
    `('Can include $parameter to "meter" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.meter;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                                                  | expected
        ${'#the-legend-element'}                                   | ${true}
        ${'#flow-content-2'}                                       | ${true}
        ${undefined}                                               | ${false}
        ${'#other-content'}                                        | ${false}
    `('Can include $parameter to "fieldset" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.fieldset;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                                                  | expected
        ${'#phrasing-content-2'}                                   | ${true}
        ${'#heading-content-2'}                                    | ${true}
        ${undefined}                                               | ${false}
        ${'#other-content'}                                        | ${false}
    `('Can include $parameter to "legend" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.legend;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                                                    | expected
        ${'#the-summary-element'}                                    | ${true}
        ${['hasChild:#the-summary-element', '#flow-content-2']}      | ${true}
        ${['hasChild:#the-summary-element', '#other-content']}       | ${false}
        ${['hasChild:#the-summary-element', '#the-div-element']}     | ${false}
        ${['hasChild:#the-summary-element', '#the-legend-element']}  | ${false}
        ${undefined}                                                 | ${false}
        ${'#other-content'}                                          | ${false}
    `('Can include $parameter to "details" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.details;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                   | expected
        ${'#flow-content-2'}        | ${true}
        ${undefined}                | ${false}
        ${'#other-content'}         | ${false}
    `('Can include $parameter to "dialog" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.dialog;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                                                 | expected
        ${['hasAttr:#attr-script-src', '#text-content-comment']}  | ${true}
        ${['hasAttr:#attr-script-src', '#text-content']}          | ${false}
        ${'#text-content-comment'}                                | ${true}
        ${'#text-content'}                                        | ${true}
        ${undefined}                                              | ${false}
        ${'#other-content'}                                       | ${false}
    `('Can include $parameter to "script" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.script;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                                                                                    | expected
        ${['is:#concept-n-noscript']}                                                                | ${'unknown'}
        ${['childOf:#the-head-element', 'is:#concept-n-noscript', '#the-link-element']}              | ${true}
        ${['childOf:#the-head-element', 'is:#concept-n-noscript', '#the-style-element']}             | ${true}
        ${['childOf:#the-head-element', 'is:#concept-n-noscript', '#the-meta-element']}              | ${true}
        ${['childOf:#the-head-element', 'is:#concept-n-noscript', '#the-div-element']}               | ${false}
        ${undefined}                                                                                 | ${false}
        ${'#other-content'}                                                                          | ${false}
        ${'#the-noscript-element'}                                                                   | ${false}
        ${['is:#concept-n-noscript', 'hasChild:#the-noscript-element']}                              | ${false}
        ${['is:#concept-n-noscript', 'hasChild:#the-noscript-element', 'childOf:#the-head-element']} | ${false}
        ${['is:#concept-n-noscript', 'childOf:#the-head-element']}                                   | ${false}
    `('Can include $parameter to "noscript" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.noscript;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                                                  | expected
        ${'#concept-content-nothing'}                              | ${true}
        ${undefined}                                               | ${false}
        ${'#other-content'}                                        | ${false}
    `('Can include $parameter to "template" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.template;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
  });

  it.each`
        parameter                                                  | expected
        ${undefined}                                               | ${'unknown'}
        ${'#other-content'}                                        | ${'unknown'}
    `('Can include $parameter to "slot" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.slot;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
  });

  /* eslint-disable max-len */
  it.each`
        parameter                                                                                           | expected
        ${undefined}                                                                                        | ${'unknown'}
        ${'#other-content'}                                                                                 | ${'unknown'}
        ${'#the-button-element'}                                                                            | ${true}
        ${['tag:#the-button-element', '#the-button-element']}                                               | ${true}
        ${'#the-a-element'}                                                                                 | ${true}
        ${['tag:#the-a-element', '#the-a-element']}                                                         | ${true}
        ${['tag:#the-img-element', 'hasAttr:#attr-hyperlink-usemap', '#the-img-element']}                   | ${true}
        ${'#the-input-element'}                                                                             | ${'unknown'}
        ${['tag:#the-input-element', 'hasAttr:#checkbox-state-(type=checkbox)', '#the-input-element']}      | ${true}
        ${['tag:#the-input-element', 'hasAttr:#radio-button-state-(type=radio)', '#the-input-element']}     | ${true}
        ${['tag:#the-input-element', 'is:#concept-button', '#the-input-element']}                           | ${true}
        ${'#the-select-element'}                                                                            | ${'unknown'}
        ${['tag:#the-select-element', 'hasAttr:#attr-select-multiple', '#the-select-element']}              | ${true}
        ${['tag:#the-select-element', 'hasAttr:#attr-select-size', '#the-select-element']}                  | ${true}
        ${['tag:#the-select-element', 'hasAttr:#concept-select-size', '#the-select-element']}                  | ${true}
    `('Can include $parameter to "canvas" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.canvas;

    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
  });
  /* eslint-enable max-len */

  it.each`
        parameter                                                  | expected
        ${undefined}                                               | ${false}
        ${'#other-content'}                                        | ${false}
        ${'#phrasing-content-2'}                                   | ${true}
        ${'#heading-content-2'}                                    | ${true}
    `('Can include $parameter to "summary" tag result: $expected', ({parameter, expected}) => {
    const tag = rules.summary;
    const analyzer = new TagAnalyzer(tag);
    expect(analyzer.canInclude(parameter)).toStrictEqual(expected);
  });
});
