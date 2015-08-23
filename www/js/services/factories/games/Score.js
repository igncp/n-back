import utils from '../../../utils';

var _values;

export class Score {
  reset(){
    _values = {};
  }
  add(entityName, result) {
    result = (typeof(result) === 'undefined') ? false : result;
    _values[entityName] = _values[entityName] || [];
    _values[entityName].push(result);
  }
  getSummary() {
    var summary = {};

    summary.data = utils.mapToObject((valueKey) => [
      valueKey, R.countBy(Boolean, _values[valueKey])
    ])(R.keys(_values));

    summary.result = ((data) =>
      R.reduce((acc, key) =>
        utils.mapToObject((value) => [
          value, (acc[value] || 0) + (data[key][value] || 0)
        ])([true, false])
      )({})(R.keys(data))
    )(summary.data);

    summary.percentage = ((result) => {
      var num = 100 * result['true'] / (result['true'] + result['false']);
      return String(num.toFixed(2));
    })(summary.result);

    return summary;
  }
}
