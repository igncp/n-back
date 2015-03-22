(function() {
  var unit = window.unit,
    directives = unit.directives = {};

  directives.getCompileElementFromTagName = function(tagName, attrs) {
    var htmlMarkup = unit.getHTMLMarkupFromTagName(tagName, attrs);

    return unit.getCompileElement(htmlMarkup);
  };

  directives.compileElementFromTagName = directives.getCompileElementFromTagName;

  directives.getCompileHTMLFromTagName = function(tagName, attrs) {
    var htmlMarkup = unit.getHTMLMarkupFromTagName(tagName, attrs);

    return unit.getCompileHTML(htmlMarkup);
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
})();
