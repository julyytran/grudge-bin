const React = require('react');
const ReactDOM = require('react-dom');

const store = require('./data-store');
const CreateGrudge = require('./create-grudge');
const ActiveGrudge = require('./active-grudge');
const GrudgesList = require('./grudges-list');

require('./reset.css');
require('./style.scss');

class GrudgeBin extends React.Component {
  constructor() {
    super();
    this.state = {
      grudges: store.all(),
    };
  }

  componentDidMount() {
    store.on('change', grudges => {
      this.setState({grudges});
    });
  }

  render() {
    const activeGrudge = this.state.grudges.find(grudge => grudge.active);

    return (
      <div className="GrudgeBin">
        <section className="sidebar">
          <header>
            <h1>{this.props.title}</h1>
          </header>
          <CreateGrudge/>
          <GrudgesList grudges={this.state.grudges}/>
        </section>
        <section className="main-content">
          <ActiveGrudge grudge={activeGrudge}/>
        </section>
        </div>
    );
  }
}

ReactDOM.render(<GrudgeBin title="Grudge Bin"/>, document.querySelector('.application'));
