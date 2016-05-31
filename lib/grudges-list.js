const React = require('react');
const store = require('./data-store');
const GrudgesListItem = require('./grudges-list-item');

const GrudgesList = ({grudges}) => {
  let forgivenGrudges = [];

  for (var i = 0; i < grudges.length; i++) {
    if (grudges[i].forgiven === true) {
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

module.exports = GrudgesList
