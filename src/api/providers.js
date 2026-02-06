import pgsoftIcon from '../assets/providers/pgsoft.png';
import pragmaticIcon from '../assets/providers/pragmatic.png';
import habaneroIcon from '../assets/providers/habanero.png';
import booongoIcon from '../assets/providers/booongo.png';
import evoplayIcon from '../assets/providers/evoplay.png';

export const providers = [
  { id: 'PGSOFT', name: 'PG Soft', icon: pgsoftIcon, variant: 'portrait' },
  { id: 'PRAGMATIC', name: 'Pragmatic Play', icon: pragmaticIcon, variant: 'portrait' },
  { id: 'HABANERO', name: 'Habanero', icon: habaneroIcon, variant: 'square' },
  { id: 'BOOONGO', name: 'Booongo', icon: booongoIcon },
  { id: 'EVOPLAY', name: 'Evoplay', icon: evoplayIcon },
  { id: 'DREAMTECH', name: 'Dreamtech', variant: 'square' },
];

export const getProviderIcon = (id) => {
  const provider = providers.find(p => p.id.toLowerCase() === id?.toLowerCase());
  return provider ? provider.icon : null;
};

export const getProviderName = (id) => {
  const provider = providers.find(p => p.id.toLowerCase() === id?.toLowerCase());
  return provider ? provider.name : id;
};
