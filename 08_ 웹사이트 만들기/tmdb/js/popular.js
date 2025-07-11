const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMTM2ZTQyM2M0YWFlMTYzMmQ0YjFlNGIzZTJlOWNiMSIsIm5iZiI6MTc0ODM5NDQxOC4xMDMwMDAyLCJzdWIiOiI2ODM2NjFiMjczZmMzYTA5MzliNmMxNTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ucheBgocAmg6CWVxsqHoTvLCsr80K0mPxDzlKGoVyrk',
   },
}

const url = `https://api.themoviedb.org/3/tv/popular?language=ko-KR&page=3&with_original_language=ko`

console.log(url)

const getPopularTv = async (url) => {
   try {
      const res = await fetch(url, options)
      const data = await res.json()

      console.log(res)
      console.log(data)

      const results = data.results

      console.log(results)

      const container = document.querySelector('main .container')
      let rowsHtml = '' // 모든 row를 담을 변수

      // card 10행 2열
      for (let i = 0; i < results.length; i += 2) {
         let rowHtml = '<div class="row">' // 하나의 row를 담을 변수

         for (let j = 0; j < 2; j++) {
            const index = i + j
            // if (index >= results.length) break //results 배열을 벗어나면 중단

            const tv = results[index]

            rowHtml += `
                <div class="col-sm-6 p-3">
                     <div class="card popular-card" style="">
                        <div class="card-body1">
                           <a href="./popular_detail.html?series_id=${tv.id}" >
                              <img src="https://image.tmdb.org/t/p/w500${tv.poster_path}" class="card-img-top poster" alt="${tv.title}" />
                           </a>
                        </div>
                        <div class="card-body2">
                           <p class="card-text title">${tv.name}</p>
                           <p class="card-text average">${Number(tv.vote_average) === 0 ? '미반영' : tv.vote_average.toFixed(1) + '점'}</p>
                           <p class="card-text overview ellipsis">${tv.overview}</p>
                        </div>
                     </div>
                </div>
             `
         }

         rowHtml += '</div>'
         rowsHtml += rowHtml
      }

      container.innerHTML = rowsHtml
   } catch (error) {
      console.log('에러발생:', error)
   }
}

getPopularTv(url)
