/* eslint-disable require-jsdoc */
const {readFile} = require('fs');

const TagAnalyzerUnknown = 'unknown';
const TagAnalyzerTransparent = '#transparent';
const TagAnalyzerSkipResult = 'skip';

class TagAnalyzer {
  constructor(tagMetadata) {
    this.tagMetadata = tagMetadata;
    this.keywords = ['hasChild:', 'childOf:', 'hasAttr:'];
  }

  withoutSkip(v) {
    return v !== TagAnalyzerSkipResult;
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

  hasZeroOrMore(o, text) {
    return new Set(this.zeroOrMore(o)).has(text) || TagAnalyzerSkipResult;
  }

  hasOptional(o, text) {
    return new Set(this.optional(o)).has(text) || TagAnalyzerSkipResult;
  }

  hasOneOrMore(o, text) {
    return new Set(this.oneOrMore(o)).has(text);
  }

  hasOnlyOne(o, text) {
    return new Set(this.onlyOne(o)).has(text);
  }

  hasDefaultCond(o, text) {
    return new Set(this.defaultCond(o)).has(text);
  }

  hasOneOfChild(o, text) {
    if (Array.isArray(o)) {
      return new Set(o).has(text);
    }
    return new Set([o]).has(text);
  }

  hasChildOf(o, text) {
    if (Array.isArray(o)) {
      return new Set(o).has(text);
    }
    return new Set([o]).has(text);
  }

  notChildOf(o, text) {
    if (Array.isArray(o)) {
      return !new Set(o).has(text);
    }
    return !new Set([o]).has(text);
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

  hasOr(arr, {condition, text} = {}) {
    const checks = Array.isArray(text) ? text : [text];
    const result = arr.flatMap((item) => {
      if (item.and) return checks.map((text) => this.hasAnd(item.and, {condition, text}));
      if (item.or) return checks.map((text) => this.hasOr(item.or, {condition, text}));
      if (item.zeroOrMore) return checks.map((text) => this.hasZeroOrMore(item.zeroOrMore, text));
      if (item.oneOrMore) return checks.map((text) => this.hasOneOrMore(item.oneOrMore, text));
      if (item.onlyOne) return checks.map((text) => this.hasOnlyOne(item.onlyOne, text));
      if (item.optional) return checks.map((text) => this.hasOptional(item.optional, text));
      if (item.default) return checks.map((text) => this.hasDefaultCond(item.default, text));
      if (item.notHas) return checks.map((text) => this.notHas(item.notHas, text));
      if (item.oneOfChild) return checks.map((text) => this.hasOneOfChild(item.oneOfChild, text));
      if (item.hasChildOf) return checks.map((text) => this.hasChildOf(item.hasChildOf, text));
      if (item.notChildOf) return checks.map((text) => this.notChildOf(item.notChildOf, text));
    });
    return result.filter(this.withoutSkip).some(Boolean);
  }

  hasAnd(arr, {condition, text} = {}) {
    const checks = Array.isArray(text) ? text : [text];
    const result = arr.flatMap((item) => {
      if (item.and) return checks.map((text) => this.hasAnd(item.and, {condition, text}));
      if (item.or) return checks.map((text) => this.hasOr(item.or, {condition, text}));
      if (item.oneOrMore) return checks.map((text) => this.hasOneOrMore(item.oneOrMore, text));
      if (item.optional) return checks.map((text) => this.hasOptional(item.optional, text));
      if (item.zeroOrMore) return checks.map((text) => this.hasZeroOrMore(item.zeroOrMore, text));
      if (item.onlyOne) return checks.map((text) => this.hasOnlyOne(item.onlyOne, text));
      if (item.has) return checks.map((text) => this.has(item.has, condition || text));
      if (item.notHas) return checks.map((text) => this.notHas(item.notHas, text));
      if (item.noChild) return checks.map((text) => this.hasNoChild(item.noChild, condition || text));
      if (item.oneOfChild) return checks.map((text) => this.hasOneOfChild(item.oneOfChild, text));
      if (item.default) return checks.map((text) => this.hasDefaultCond(item.default, text));
      if (item.hasChildOf) return checks.map((text) => this.hasChildOf(item.hasChildOf, text));
      if (item.notChildOf) return checks.map((text) => this.notChildOf(item.notChildOf, text));
    });
    return result.filter(this.withoutSkip).every(Boolean);
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
      if (Array.isArray(text)) {
        return text.some((t) => new Set(o).has(this.normalize(t)));
      }
      return new Set(o).has(this.normalize(text));
    }

    if (Array.isArray(text)) {
      return text.some((t) => new Set([o]).has(this.normalize(t)));
    }
    return o == this.normalize(text);
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

  childOf(o, {condition, text}) {
    const check = condition || text;
    if (Array.isArray(check)) {
      if (check.some((v) => v === o.childOf)) {
        return this.ifthen(o.then);
      } else if (o.else) {
        return this.ifelse(o.else);
      }
    } else if (check === o.childOf) {
      return this.ifthen(o.then);
    } else if (o.else) {
      return this.ifelse(o.else);
    }
    return [];
  }

  ifCond(o, {condition, text} = {}) {
    if (o.childOf) {
      return this.childOf(o, {condition, text});
    }
    if (o.is) {
      if (o.is === text) {
        return this.ifthen(o.then);
      }
    }
    if (o.hasOne && this.hasOne(o.hasOne, text)) {
      return this.ifthen(o.then);
    }
    if (o.has) {
      if (this.has(o.has, condition || text)) {
        return this.ifthen(o.then);
      } if (o.else) {
        return this.ifelse(o.else);
      }
    }
    if (o.not && this.not(o, text)) {
      if (o.then) return this.ifthen(o.then);
    }
    if (o.zeroOrMore && this.hasZeroOrMore(o.zeroOrMore, text)) {
      return this.ifthen(o.then);
    }
    if (o.or) {
      const result = this.hasOr(o.or, {condition, text});
      if (o.then && result) {
        return this.ifthen(o.then);
      } else if (o.elseif && !result) {
        return this.ifCond(o.elseif, {condition, text});
      }
    }
    if (o.and) {
      const result = this.hasAnd(o.and, {condition, text});
      if (o.then && result) {
        return this.ifthen(o.then);
      } else if (o.elseif && !result) {
        return this.ifCond(o.elseif, {condition, text});
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

  hasNoChild(o, text) {
    if (Array.isArray(o)) {
      if (Array.isArray(text)) {
        return text.every((t) => !new Set(o).has(t));
      }
      return !new Set(o).has(text);
    }
    if (Array.isArray(text)) {
      return text.every((t) => !new Set([o]).has(t));
    }
    return o !== text;
  }

  notHas(o, text) {
    if (Array.isArray(o)) {
      return !new Set(o).has(this.normalize(text));
    }
    return o !== this.normalize(text);
  }

  normalize(text) {
    if (text === undefined || text === null) return text;
    if (Array.isArray(text)) {
      const filtered = text.filter((t) => !this.keywords.some((kw) => t.startsWith(kw)));
      if (filtered.length === 1) {
        return filtered[0];
      }
      return filtered;
    }
    return this.keywords.reduce((result, kw) => result.startsWith(kw) ? result.replace(kw, '') : result, text);
  }

  hasKeyword(text) {
    return this.keywords.some((kw) => text.startsWith(kw));
  }

  cleanFromKeywords(text) {
    return this.keywords.reduce((result, kw) => result.replace(kw, ''), text);
  }

  parseText(text) {
    if (Array.isArray(text)) {
      const result = text.reduce((result, item) => {
        if (this.hasKeyword(item)) {
          result.condition.push(this.cleanFromKeywords(item));
        } else {
          result.text = item;
        }
        return result;
      }, {condition: [], text: undefined});

      if (!result.condition.length) {
        result.condition = undefined;
      }

      return result;
    }
    return {condition: undefined, text};
  }

  isTransparent(setOfParams) {
    return setOfParams.has(TagAnalyzerTransparent);
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
      const parsed = this.parseText(text);
      tagCategories = tagCategories.concat(this.ifCond(ifCond, parsed));
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
      return this.hasOr(or, this.parseText(text));
    }

    if (and) {
      return this.hasAnd(and, this.parseText(text));
    }

    if (ifCond) {
      const parsed = this.parseText(text);
      const ifCondSet = new Set(this.ifCond(ifCond, parsed));
      if (this.isTransparent(ifCondSet)) {
        return TagAnalyzerUnknown;
      }
      return ifCondSet.has(this.normalize(text));
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


