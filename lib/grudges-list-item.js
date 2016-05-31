const React = require('react');
const store = require('./data-store');

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

module.exports = GrudgesListItem
