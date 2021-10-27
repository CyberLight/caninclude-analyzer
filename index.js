/* eslint-disable require-jsdoc */
const {readFile} = require('fs');

const TagAnalyzerUnknown = 'unknown';

class TagAnalyzer {
  constructor(tagMetadata) {
    this.tagMetadata = tagMetadata;
    this.keywords = ['childOf:', 'attribute:'];
  }

  onlyOne(o) {
    if (Array.isArray(o)) {
      return o;
    }
    return [o];
  }

  zeroOrMore(o) {
    if (Array.isArray(o)) {
      return o;
    }
    return [o];
  }

  or(arr) {
    return arr.flatMap((item) => {
      if (item.zeroOrMore) return this.zeroOrMore(item.zeroOrMore);
      if (item.oneOrMore) return this.oneOrMore(item.oneOrMore);
      if (item.onlyOne) return this.onlyOne(item.onlyOne);
      if (item.optional) return this.optional(item.optional);
      if (item.default) return this.defaultCond(item.default);
    });
  }

  and(arr) {
    return arr.flatMap((item) => {
      if (item.oneOrMore) return this.oneOrMore(item.oneOrMore);
      if (item.optional) return this.optional(item.optional);
      if (item.zeroOrMore) return this.zeroOrMore(item.zeroOrMore);
      if (item.onlyOne) return this.onlyOne(item.onlyOne);
    });
  }

  not(o, text) {
    return o !== text;
  }

  hasOne(o, text) {
    if (Array.isArray(o)) {
      return new Set(o).has(text);
    }
    return o == text;
  }

  has(o, text) {
    if (Array.isArray(o)) {
      return new Set(o).has(text);
    }
    return o == text;
  }

  ifthen(o) {
    if (Array.isArray(o)) {
      return o;
    }
    return [o];
  }

  ifelse(o) {
    if (Array.isArray(o)) {
      return o;
    }
    return [o];
  }

  childOf(o, text) {
    if (Array.isArray(text)) {
      const childOfPattern = 'childOf:';
      const [childOf] = text.filter((o) => o.startsWith(childOfPattern));
      if (String(childOf).replace(childOfPattern, '') === o.childOf) {
        return this.ifthen(o.then);
      } else if (o.else) {
        return this.ifelse(o.else);
      }
    } else if (text === o.childOf) {
      return this.ifthen(o.then);
    } else if (o.else) {
      return this.ifelse(o.else);
    }
    return [];
  }

  ifCond(o, text) {
    if (o.childOf) {
      return this.childOf(o, text);
    }
    if (o.is) {
      if (o.is === text) {
        return this.ifthen(o.then);
      }
    }
    if (o.hasOne && this.hasOne(o.hasOne, text)) {
      return this.ifthen(o.then);
    }
    if (o.has && this.has(o.has, text)) {
      return this.ifthen(o.then);
    }
    if (o.not && this.not(o, text)) {
      if (o.then) return this.ifthen(o.then);
    }
    if (o.else) {
      return this.ifelse(o.else);
    }
    return [];
  }

  defaultCond(o) {
    if (Array.isArray(o)) {
      return o;
    }
    return [o];
  }

  any(o) {
    if (Array.isArray(o)) {
      return o;
    }
    return [o];
  }

  oneOrMore(o) {
    if (Array.isArray(o)) {
      return o;
    }
    return [o];
  }

  optional(o) {
    if (Array.isArray(o)) {
      return o;
    }
    return [o];
  }

  butNo(o) {
    if (Array.isArray(o)) {
      return o;
    }
    return [o];
  }

  normalize(text) {
    if (Array.isArray(text)) {
      const filtered = text.filter((t) => !this.keywords.some((kw) => t.startsWith(kw)));
      if (filtered.length === 1) {
        return filtered[0];
      }
      return filtered;
    }
    return text;
  }

  hasKeyword(text) {
    return this.keywords.some((kw) => text.startsWith(kw));
  }

  cleanFromKeywords(text) {
    return this.keywords.reduce((result, kw) => result.replace(kw, ''), text);
  }

  parseText(text) {
    if (Array.isArray(text)) {
      return text.reduce((result, item) => {
        if (this.hasKeyword(item)) {
          result.condition = this.cleanFromKeywords(item);
        } else {
          result.text = item;
        }
        return result;
      }, {condition: undefined, text: undefined});
    }
    return {condition: undefined, text};
  }

  isTransparent(setOfparams) {
    return setOfparams.has('#transparent');
  }

  getCategories(text) {
    const {Categories} = this.tagMetadata.rules;
    const {
      any,
      if: ifCond,
      default: defaultCond,
    } = Categories;
    let tagCategories = [];

    if (ifCond) {
      tagCategories = tagCategories.concat(this.ifCond(ifCond, text));
    }

    if (defaultCond) {
      tagCategories = tagCategories.concat(this.defaultCond(defaultCond));
    }

    if (any) {
      tagCategories = tagCategories.concat(this.any(any));
    }

    return [...new Set(tagCategories)];
  }

  canIncludeParam(text) {
    const {ContentModel} = this.tagMetadata.rules;
    const {
      onlyOne,
      zeroOrMore,
      or,
      if: ifCond,
      default: defaultCond,
      oneOrMore,
      and,
      butNo,
    } = ContentModel;

    if (onlyOne) {
      return new Set(this.onlyOne(onlyOne)).has(text);
    }

    if (zeroOrMore) {
      return new Set(this.zeroOrMore(zeroOrMore)).has(text);
    }

    if (or) {
      return new Set(this.or(or)).has(text);
    }

    if (and) {
      return new Set(this.and(and)).has(text);
    }

    if (ifCond) {
      const {condition, text: actualText} = this.parseText(text);
      return new Set(this.ifCond(ifCond, condition || actualText)).has(this.normalize(text));
    }

    if (oneOrMore) {
      return new Set(this.oneOrMore(oneOrMore)).has(text);
    }

    if (butNo) {
      const paramsSet = new Set(this.butNo(butNo));
      if (paramsSet.has(text)) return false;
    }

    if (defaultCond) {
      const paramsSet = new Set(this.defaultCond(defaultCond));
      if (this.isTransparent(paramsSet)) return TagAnalyzerUnknown;
      return paramsSet.has(text);
    }

    return false;
  }
}

class CanincludeAnalyzer {
  constructor() {
    this.controller = new AbortController();
    this.signal = this.controller.signal;
    this.loading = false;
  }

  async load() {
    return new Promise((resolve, reject) => {
      if (this.loading) {
        this.controller.abort();
        this.controller = new AbortController();
        this.signal = controller.signal;
      }
      this.loading = true;
      const {signal} = this;
      readFile('./rules.json', {signal}, (err, buf) => {
        if (err) return reject(err);
        resolve(JSON.parse(buf));
      });
    });
  }

  analyze(childTagName, parentTagName) {

  }
}

if (require.main === module) {
  const analyzer = new CanincludeAnalyzer();
  analyzer.load().then((json) => {
    console.warn('json: ', json);
  });
} else {
  module.exports = {
    TagAnalyzer,
    CanincludeAnalyzer,
  };
}


