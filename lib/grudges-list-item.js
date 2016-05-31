const React = require('react');
const store = require('./data-store');

const GrudgesListItem = ({id, name, offense, forgiven, active}) => {
  if (active === true) {
    var selectButton = <button onClick={() => store.deselect()}>Deselect</button>
  } else {
    var selectButton = <button onClick={() => store.select(id)}>Select</button>
  }

  if (forgiven === true) {
    var forgiveButton = <button onClick={() => store.unforgive(id)}>Unforgive</button>
  } else {
    var forgiveButton = <button onClick={() => store.forgive(id)}>Forgive</button>
  }

  return (
    <div className={active ? 'GrudgesListItem is-active' : 'GrudgesListItem'}>
      <h3 className="GrudgesListItem-name">{name}</h3>
      <div className="GrudgesListItem-offense">{offense}</div>
      <div className="GrudgesListItem-forgiven">{forgiven ? 'Forgiven? I guess so...' : 'Forgiven? NOPE'}</div>
      <div className="GrudgesListItem-buttons">
        {selectButton}
        {forgiveButton}
        <button onClick={() => store.destroy(id)}>Destroy</button>
      </div>
    </div>
  );
};

module.exports = GrudgesListItem
