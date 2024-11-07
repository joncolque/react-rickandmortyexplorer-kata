import api from '../config/api';
import apiMiddleware from '../config/apiMiddleware';
import { Character, CharacterItemResponse } from '../interfaces/character';
import { PaginatedResponse } from '../interfaces/pagination';

const BASE_PATH = '/character';
const BASE_PATH_LOCATIONS = '/location';

export const getCharacters = async (page: number, searchQuery: string): Promise<PaginatedResponse<Character[]>> => {
  const [response1, response2] = await Promise.all([
    api.get<PaginatedResponse<CharacterItemResponse[]>>(`${BASE_PATH}?page=${page}&name=${searchQuery}`),
    apiMiddleware.get<Character[]>(`${BASE_PATH}`)
  ]);

  const combinedData: PaginatedResponse<Character[]> = {
    ...response1.data,
    results: response1.data.results.map((item) => {
      const matchingItem = response2.data.find(
        (result) => result.id == item.id
      );

      const characterCleaned = getCleanItem(item)
      if (matchingItem) {
        return {
          ...characterCleaned,
          ...matchingItem,
        };
      }

      return characterCleaned
    })
  };

  return combinedData;
}

export const getCharacter = async (id: number): Promise<Character> => {
  try {
    const response1 = await api.get<CharacterItemResponse>(`${BASE_PATH}/${id}`);
    let response2;

    try {
      response2 = await apiMiddleware.get<Character>(`${BASE_PATH}/${id}`);
    } catch (error) {
      response2 = { data: {} };
    }

    return {
      ...getCleanItem(response1.data),
      ...response2.data,
    };
  } catch (error) {
    console.error('Error fetching character data:', error);
    throw error;
  }
}

export const getLocations = async (): Promise<string[]> => {
  try {
    const response = await api.get<PaginatedResponse<{ name: string }[]>>(`${BASE_PATH_LOCATIONS}`);
    let locations = response.data.results.map(location => location.name);

    const totalPages = response.data.info.pages;
    if (totalPages > 1) {
      const pageRequests = [];

      for (let i = 2; i <= totalPages; i++) {
        pageRequests.push(api.get<PaginatedResponse<{ name: string }[]>>(`${BASE_PATH_LOCATIONS}?page=${i}`));
      }

      const pageResponses = await Promise.all(pageRequests);

      pageResponses.forEach(pageResponse => {
        locations = locations.concat(pageResponse.data.results.map(location => location.name));
      });
    }

    return locations;
  } catch (error) {
    console.error('Error fetching location data:', error);
    throw error;
  }
}

export const updateCharacter = async (characterId: number, data: Character) => {
  try {
    await apiMiddleware.get<Character>(`${BASE_PATH}/${characterId}`)
    await apiMiddleware.put<Character>(`${BASE_PATH}/${characterId}`, { ...data, id: data.id.toString() })
  } catch {
    await apiMiddleware.post<Character>(`${BASE_PATH}`, { ...data, id: data.id.toString() })
  }
};

export const deleteCharacter = async (characterId: number) => {
  try {
    await apiMiddleware.get<Character>(`${BASE_PATH}/${characterId}`)
    await apiMiddleware.patch<Character>(`${BASE_PATH}/${characterId}`, { deleted: true, id: characterId.toString() })
  } catch {
    await apiMiddleware.post<Character>(`${BASE_PATH}`, { deleted: true, id: characterId.toString() })
  }
};

const getCleanItem = (item: CharacterItemResponse): Character => {
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