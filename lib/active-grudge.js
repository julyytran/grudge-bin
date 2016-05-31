const React = require('react');
const store = require('./data-store');

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

module.exports = ActiveGrudge
