export default async (req, context) => {
  return new Response(JSON.stringify(context))
}
