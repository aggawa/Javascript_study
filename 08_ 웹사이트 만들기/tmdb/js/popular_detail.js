const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMTM2ZTQyM2M0YWFlMTYzMmQ0YjFlNGIzZTJlOWNiMSIsIm5iZiI6MTc0ODM5NDQxOC4xMDMwMDAyLCJzdWIiOiI2ODM2NjFiMjczZmMzYTA5MzliNmMxNTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ucheBgocAmg6CWVxsqHoTvLCsr80K0mPxDzlKGoVyrk',
   },
}

/* 쿼리 스트링 값 가져오기 */
const urlParams = new URLSearchParams(location.search)
const seriesId = urlParams.get('series_id')

console.log(urlParams)
console.log(seriesId)

const tvDetailUrl = `https://api.themoviedb.org/3/discover/${seriesId}?language=ko-KR&page=3&with_original_language=ko`
const mainContainer = document.querySelector('main .container')

console.log(tvDetailUrl)

/* 상세정보 바인딩 */
const getDetailTv = async (tvDetailUrl) => {
   try {
      const res = await fetch(tvDetailUrl, options)
      const data = await res.json()

      const results = data.response

      console.log(data)
      console.log(results)

      const imgSrc = `https://image.tmdb.org/t/p/w300${data.poster_path}`

      const rowHtml = `
                <div class="row rowbox">
                   <div class="col-sm-3 p-3">
                      <img src="${imgSrc}" alt="${data.title}" class="poster-detail" />
                   </div>
                   <div class="col-sm-9 p-3">
                      <h3>${data.title}</h3>
                      <ul class="popular-info">
                         <li>${data.original_title}</li>
                         <li>평점 ${Number(data.vote_average) === 0 ? '미반영' : data.vote_average.toFixed(1)}</li>
                         <li>인기도: ${data.popularity}</li>
                         <li>개봉일: ${data.release_date}</li>
                      </ul>
                      <p>${data.overview}</p>
                   </div>
                </div>
                <div class="row rowbox">
                   <a href="#">>>${data.title} 보러가기<<</a>
                </div>
      `

      mainContainer.innerHTML += rowHtml
   } catch (error) {
      console.log('에러 발생:', error)
   }
}

getDetailTv(tvDetailUrl)
