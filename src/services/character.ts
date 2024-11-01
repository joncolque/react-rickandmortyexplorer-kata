import api from '../config/api';
import {Character} from '../interfaces/character';
import {PaginatedResponse} from '../interfaces/pagination';

const BASE_PATH = '/character';

export const getCharacters = (page: number, searchQuery: string) =>
  api.get<PaginatedResponse<Character[]>>(BASE_PATH+`?page=${page}&name=${searchQuery}`);
  
export const getCharacter = (id: number) =>
  api.get<Character>(`${BASE_PATH}/${id}`);