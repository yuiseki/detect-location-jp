import fetch from 'node-fetch';

export const fetchOverpass = async (query:string) => {
  const res = await fetch('https://lz4.overpass-api.de/api/interpreter', {
    method: 'POST',
    body: query
  });
  const json = await res.json();
  return json.elements;
};

export const fetchNominatim = async (params:string) => {
  const res = await fetch(`https://nominatim.openstreetmap.org/search.php?${params}`);
  return await res.json();
};
