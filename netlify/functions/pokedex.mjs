export default async (req, context) => {
  const POKE_API = 'https://pokeapi.co/api/v2/pokedex/kanto'

  const response = await fetch(POKE_API)
  const data = await response.json()

  return new Response(JSON.stringify(data))
}
