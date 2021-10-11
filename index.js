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
      if (item.onlyOne) return this.onlyOne(item.onlyOne);
    });
  }

  not(o, text) {
    return o !== text;
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
    if (o.not) {
      if (this.not(o, text)) {
        if (o.then) return this.ifthen(o.then);
      } else {
        return [];
      }
    }
    return [];
  }

  defaultCond(o) {
    if (Array.isArray(o)) {
      return o;
    }
    return [o];
  }

  getCategories(text) {
    const {Categories} = this.tagMetadata.rules;
    const {
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

    if (ifCond) {
      return new Set(this.ifCond(ifCond, text)).has(text);
    }

    if (defaultCond) {
      return new Set(this.defaultCond(defaultCond)).has(text);
    }
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


