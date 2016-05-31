const React = require('react');
const store = require('./data-store');

class CreateGrudge extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      offense: '',
      forgiven: false,
    };
  }

  updateProperties(e) {
    const {name, value} = e.target;
    this.setState({[name]: value});
  }

  createGrudge(e) {
    e.preventDefault();
    store.create(this.state);
    this.setState({name: '', offense: '', forgiven: false});
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

module.exports = CreateGrudge
