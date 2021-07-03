import fetch from 'node-fetch';

const sleep = (ms:number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const fetchOverpass = async (query:string) => {
  await sleep(1000);
  const res = await fetch('https://lz4.overpass-api.de/api/interpreter', {
    method: 'POST',
    body: query
  });
  const json = await res.json();
  return json.elements;
};

export const fetchNominatim = async (params:string) => {
  await sleep(1500);
  const res = await fetch(`https://nominatim.openstreetmap.org/search.php?${params}`);
  return await res.json();
};
