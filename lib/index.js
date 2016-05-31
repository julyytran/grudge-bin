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

class CreateGrudge extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      offense: '',
      forgiven: 'Forgiven? NOPE',
    }
  }

  updateProperties(e) {
    const {name, value} = e.target;
    this.setState({[name]: value});
  }

  createGrudge(e) {
    e.preventDefault();
    store.create(this.state);
    this.setState({name: '', offense: '', forgiven: 'NOPE'});
  }

  render() {
    return (
      <div className="CreateGrudge">
        <input className="CreateGrudge-name"
              name="name"
              placeholder="Name"
              value={this.state.name}
              onChange={(e) => this.updateProperties(e)}
        />
        <textarea className="CreateGrudge-offense"
              name="offense"
              placeholder="Offense"
              value={this.state.offense}
              onChange={(e) => this.updateProperties(e)}
        />
        <input className="CreateGrudge-submit"
              type="submit"
              onClick={(e) => this.createGrudge(e)}
        />
      </div>
    );
  }
}

const GrudgesList = ({grudges}) => {
  let forgivenGrudges = []

  for (var i = 0; i < grudges.length; i++) {
    if (grudges[i].forgiven === "Forgiven? I guess...") {
      forgivenGrudges.push(grudges[i]);
    }
  }

  return (
    <div className="GrudgesList">
      <div className="GrudgeCounts">
        <p>Grudge Count: {grudges.length}</p>
        <p>Forgiven: {forgivenGrudges.length}</p>
        <p>Dead to me: {grudges.length - forgivenGrudges.length}</p>
      </div>
      {grudges.map(grudge => <GrudgesListItem {...grudge} key={grudge.id}/>)}
    </div>
  );
};

const GrudgesListItem = ({id, name, offense, forgiven, active}) => {
  return (
    <div className={active ? 'GrudgesListItem is-active' : 'GrudgesListItem'}>
      <h3 className="GrudgesListItem-name">{name}</h3>
      <div className="GrudgesListItem-offense">{offense}</div>
      <div className="GrudgesListItem-forgiven">{forgiven}</div>
      <div className="GrudgesListItem-buttons">
        <button onClick={() => store.select(id)}>Select</button>
        <button onClick={() => store.destroy(id)}>Destroy</button>
        <button onClick={() => store.forgive()}>Forgive</button>
      </div>
    </div>
  );
};

const ActiveGrudge = ({grudge}) => {
  if (!grudge) {return <p className="ActiveGrudge">Please select a grudge.</p>;}

  const updateGrudge = (e) => {
    const {name, value} = e.target;
    store.update(grudge.id, Object.assign(grudge, {[name]: value}));
  };

  return (
    <div className="ActiveGrudge">
      <input className="ActiveGrudge-name"
            name="name"
            value={grudge.name}
            onChange={updateGrudge}
      />
      <textarea className="ActiveGrudge-offense"
            name="offense"
            value={grudge.offense}
            onChange={updateGrudge}
      />
      <textarea className="ActiveGrudge-forgiven"
            name="forgiven"
            value={grudge.forgiven}
            onChange={updateGrudge}
      />
    </div>
  )
}
ReactDOM.render(<GrudgeBin title="Grudge Bin"/>, document.querySelector('.application'));
