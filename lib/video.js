export const getCommonVideos = async (url) => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY
  try {
    const BASE_URL = 'youtube.googleapis.com/youtube/v3'
    const response = await fetch(
      `https://${BASE_URL}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`
    )

    const data = await response.json()

    if (data?.error) {
      console.error('Youtube API error', data.error)
      return []
    }

    return data?.items.map((item) => {
      const id = item.id?.videoId || item.id
      return {
        title: item.snippet.title,
        imgUrl: item.snippet.thumbnails.high.url,
        id,
      }
    })
  } catch (error) {
    console.error('Something went wrong with video library', error)
    return []
  }
}

export const getVideos = (searchQuery) => {
  const url = `search?part=snippet&type=video&q=${searchQuery}`
  return getCommonVideos(url)
}

export const getPopularVideos = () => {
  const url = `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US`
  return getCommonVideos(url)
}
