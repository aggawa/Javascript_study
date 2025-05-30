const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDI5ZmIzYTNiOGFkZjkzYzNkNTQxNDU4OTczNzA0OSIsIm5iZiI6MTY0OTIzMDY1Ny42NDEsInN1YiI6IjYyNGQ0MzQxYzM5MjY2MDA0ZjkyOThiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2VBrTVt3_4sbUJY1WztwmFvsSQJCkIaUZFESj21wNDA',
   },
}

/* 쿼리 스트링 값 가져오기 */
const urlParams = new URLSearchParams(location.search)
const tvId = urlParams.get('tv_id')

const tvDetailUrl = `https://api.themoviedb.org/3/tv/${tvId}?language=ko-KR`
const mainContainer = document.querySelector('main .container')

console.log(tvDetailUrl)

/* 상세정보 바인딩 */
const getDetailTv = async (tvDetailUrl) => {
   try {
      const response = await fetch(tvDetailUrl, options)
      const data = await response.json()

      const results = data.results

      console.log(response)
      console.log(data)
      console.log(results)
   } catch (error) {
      console.log('에러 발생:', error)
   }
}

getDetailTv(tvDetailUrl)
