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

const tvDetailUrl = `https://api.themoviedb.org/3/tv/${seriesId}?language=ko-KR&page=3&with_original_language=ko`
const mainContainer = document.querySelector('main .container')

console.log(tvDetailUrl)

/* 상세정보 바인딩 */
const getDetailTv = async (tvDetailUrl) => {
   try {
      const response = await fetch(tvDetailUrl, options)
      const data = await response.json()

      const results = data.response

      console.log(data)
      console.log(results)

      const imgSrc = `https://image.tmdb.org/t/p/w300${data.poster_path}`

      const rowHtml = `
                <div class="row rowbox">
                   <div class="col-sm-3 p-3">
                      <img src="${imgSrc}" alt="${data.name}" class="poster-detail" />
                   </div>
                   <div class="col-sm-9 p-3">
                      <h3>${data.name}</h3>
                      <ul class="popular-info">
                         <li>${data.original_name}</li>
                         <li>평점 ${Number(data.vote_average) === 0 ? '미반영' : data.vote_average.toFixed(1)}</li>
                         <li>최근방영일: ${data.last_air_date}</li>
                         <li>처음방영일: ${data.first_air_date}</li>
                      </ul>
                      <p>줄거리: ${data.overview}</p>
                   </div>
                </div>
                <div class="row rowbox">
                   <a href="#">>>${data.seasons[0].name} 보러가기<<</a>
                   <a href="#">>>${data.seasons[1].name} 보러가기<<</a>
                   <a href="#">>>${data.seasons[2].name} 보러가기<<</a>
                </div>
      `

      // 두번째 시리즈 정보를 담은 큰 div 수정하기 / UI도 보기좋게 수정
      mainContainer.innerHTML += rowHtml
   } catch (error) {
      console.log('에러 발생:', error)
   }
}

getDetailTv(tvDetailUrl)

// 시즌 바인딩
