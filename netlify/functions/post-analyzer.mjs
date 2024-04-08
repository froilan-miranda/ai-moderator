import axios from 'axios';

export default async (req, context) => {
  const POST_ANALYZER = 'Ai-moderator-api-docker-amd-env.eba-tppm6ecm.us-east-1.elasticbeanstalk.com/analyze'

  console.log('in serverless function')
  //const response = await fetch(POKE_API)
  //const data = await response.json()

  //return new Response(JSON.stringify(data))
  
  const response = await axios.post(POST_ANALYZER, JSON.stringify({
    text: req.text,
  }))
  .then(function (response) {
    console.log(response);
    return response
  })
  .catch(function (error) {
    console.log(error);
  });


  return new Response(JSON.stringify('Ok'))
}
