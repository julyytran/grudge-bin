const EventEmitter = require('events');

let grudges = [];

const store = new EventEmitter();

const storedGrudges = localStorage.getItem('grudges');
if (storedGrudges) {grudges = JSON.parse(storedGrudges);}

store.all = () => grudges.concat([]);

store.create = ({name, offense, forgiven}) => {
  grudges = grudges.concat({ name, offense, forgiven, active:false, id: Date.now() });
  store.emit('change', grudges);
};

store.destroy = (id) => {
  grudges = grudges.filter(grudge => grudge.id !== id);
  store.emit('change', grudges);
};

store.update = (id, data) => {
  grudges = grudges.map(grudge => {
    if (grudge.id !== id) {return grudge;}
    return Object.assign(grudge, data);
  });
  store.emit('change', grudges);
};

store.forgive = (id) => {
  grudges = grudges.map(grudge => {
    if (grudge.id !== id) {return grudge;}
    return Object.assign(grudge, {forgiven: true});
  });
  store.emit('change', grudges);
};

store.unforgive = (id) => {
  grudges = grudges.map(grudge => {
    if (grudge.id !== id) {return grudge;}
    return Object.assign(grudge, {forgiven: false});
  });
  store.emit('change', grudges);
};

store.select = (id) => {
  grudges = grudges.map(grudge => Object.assign(grudge, {active: grudge.id === id}));
  store.emit('change', grudges);
};

store.deselect = () => {
  grudges = grudges.map(grudge => Object.assign(grudge, {active: false}));
  store.emit('change', grudges);
};

store.on('change', () => {
  localStorage.setItem('grudges', JSON.stringify(grudges));
});

module.exports = store;
