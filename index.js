/* eslint-disable require-jsdoc */
const {readFile} = require('fs');

class TagAnalyzer {
  constructor(tagMetadata) {
    this.tagMetadata = tagMetadata;
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

  ifthen(o) {
    if (Array.isArray(o)) {
      return o;
    }
    return [o];
  }

  ifCond(o, text) {
    if (o.is) {
      if (o.is === text) {
        return this.ifthen(o.then);
      }
    }
    if (o.hasOne && this.hasOne(o.hasOne, text)) {
      return this.ifthen(o.then);
    }
    if (o.not && this.not(o, text)) {
      if (o.then) return this.ifthen(o.then);
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
      return new Set(this.ifCond(ifCond, text)).has(text);
    }

    if (defaultCond) {
      return new Set(this.defaultCond(defaultCond)).has(text);
    }

    if (oneOrMore) {
      return new Set(this.oneOrMore(oneOrMore)).has(text);
    }

    if (butNo) {
      return !new Set(this.butNo(butNo)).has(text);
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


