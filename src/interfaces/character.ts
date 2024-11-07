export interface Character {
  id: number,
  image: string
  name: string
  species: string
  status?: string
  location?: string
  episode?: number
  deleted?: boolean
}

export interface CharacterItemResponse {
  id: number,
  image: string
  name: string
  species: string
  status?: string
  location?: { name: string }
  episode?: string[]
}