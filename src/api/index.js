const APIXU_API_KEY = 'e0c738af7e0f4632a29153407170110'
const APIXU_API_ROOT = 'https://api.apixu.com/v1/forecast.json?'

const getWeather = async ({ city }) => {
  const response = await fetch(`${APIXU_API_ROOT}key=${APIXU_API_KEY}&q=${city}&days=10`, {
    method: 'GET'
  })

  const responseData =
    response.status === 204 // NO ceontent status
      ? null
      : await response.json()

  if (!response.ok) {
    throw responseData
  }
  return responseData
}

export default getWeather
