(function() {
  var unit = window.unit,
    directives = unit.directives = {},
    cache = {};

  directives.getCompileElementFromTagName = function(tagName, attrs) {
    var htmlMarkup = unit.getHTMLMarkupFromTagName(tagName, attrs);

    return unit.getCompileElement(htmlMarkup);
  };

  directives.compileElementFromTagName = directives.getCompileElementFromTagName;

  directives.getCompileHTMLFromTagName = function(tagName, attrs) {
    var cacheKey = 'getCompileHTMLFromTagName-' + tagName + attrs,
      htmlMarkup;
    
    if (!cache[cacheKey]) {
      htmlMarkup = unit.getHTMLMarkupFromTagName(tagName, attrs);
      cache[cacheKey] = unit.getCompileHTML(htmlMarkup);
    }

    return cache[cacheKey];
  };

  directives.assertThatElementDirectiveIsTransformed = function(tagName) {
    it('element directive exists', function() {
      var compileHtml = directives.getCompileHTMLFromTagName(tagName),
        untransformedHTML = unit.getHTMLMarkupFromTagName(tagName, 'class="ng-scope"');

      expect(compileHtml).not.to.equal(untransformedHTML);
    });
  };

  directives.getScopeFromDirectiveTagName = function(tagName) {
    var markup = unit.getHTMLMarkupFromTagName(tagName),
      element = unit.getCompileElement(markup),
      scope = element.isolateScope();

    return scope;
  };

  directives.expectAttrValueIsPresentInsideHTMLString = function(attr, value, HTMLString) {
    var pattern = attr + "=\"([^\"]*)" + value + "([^\"]*)",
      re = new RegExp(pattern, ''),
      match = HTMLString.match(re);
    expect(match).not.to.equal(null);
  };

  directives.expectClassIsPresentInsideHTMLString = function(className, HTMLString) {
    directives.expectAttrValueIsPresentInsideHTMLString('class', className, HTMLString);
  };

  directives.expectIdIsPresentInsideHTMLString = function(idName, HTMLString) {
    directives.expectAttrValueIsPresentInsideHTMLString('id', idName, HTMLString);
  };
})();
