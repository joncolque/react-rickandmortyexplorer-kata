import { CharacterItemResponse, Character } from "../interfaces/character";

export const getCleanItem = (item: CharacterItemResponse): Character => {
  return {
    id: item.id,
    image: item.image,
    name: item.name,
    species: item.species,
    status: item.status,
    location: item.location?.name,
    episode: item.episode?.length,
  }
}

export const getDifferences = (before: any, after: any) => {
  return Object.keys(after).reduce((diff: any, key) => {
    if (before[key] !== after[key]) {
      diff[key] = after[key];
    }
    return diff;
  }, {});
};