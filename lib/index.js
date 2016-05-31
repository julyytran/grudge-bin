const React = require('react');
const ReactDOM = require('react-dom');

const store = require('./data-store');

require('./reset.css');
require('./style.scss');

class GrudgeBin extends React.Component {
  constructor() {
    super();
    this.state = {
      grudges: store.all(),
    };
  }
}

ReactDOM.render(<GrudgeBin title="Grudge Bin"/>, document.querySelector('.application'));
