const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDI5ZmIzYTNiOGFkZjkzYzNkNTQxNDU4OTczNzA0OSIsIm5iZiI6MTY0OTIzMDY1Ny42NDEsInN1YiI6IjYyNGQ0MzQxYzM5MjY2MDA0ZjkyOThiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2VBrTVt3_4sbUJY1WztwmFvsSQJCkIaUZFESj21wNDA',
   },
}

// 특정 쿼리 스트링 값 가져오기 (movie_id 값)
const urlParams = new URLSearchParams(location.search)
const movieId = urlParams.get('movie_id')

console.log(urlParams)
console.log(movieId)

const movieDetailUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`
const mainContainer = document.querySelector('main .container')

console.log(movieDetailUrl)
console.log(mainContainer)

// 1. 영화 상세정보 바인딩

const getDetailMovie = async (movieDetailUrl) => {
   try {
      const response = await fetch(movieDetailUrl, options)
      const data = await response.json()

      console.log(response)
      console.log(data)

      const imgSrc = `https://image.tmdb.org/t/p/w300${data.poster_path}`

      const rowHtml = `
                <div class="row">
                   <div class="col-sm-3" style="text-align:center">
                      <img src="${imgSrc}" alt="${data.title}" class="poster-detail" style="max-width:100%"/>
                   </div>
                   <div class="col-sm-9 movie-detail">
                      <h2>${data.title}</h2>
                      <ul class="movie-info">
                         <li>개봉일 ${data.release_date}</li>
                         <li>${data.genres.map((genres) => genres.name)}</li>
                         <li>${data.runtime}분</li>
                      </ul>
                      <p>평점 ${Number(data.vote_average) === 0 ? '미반영' : data.vote_average.toFixed(1)}</p>
                      <p>${data.overview}</p>
                   </div>
                </div> 
       `
      // 삼항연산자를 이용하여 평점이 0인 것을 미반영으로 출력하게 함

      mainContainer.innerHTML += rowHtml

      await getCreditsMovie(movieCreditsUrl)
   } catch (error) {
      console.error('에러 발생:', error)
   }
}

getDetailMovie(movieDetailUrl)

// 2. 출연배우 데이터 바인딩

const movieCreditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`

const getCreditsMovie = async (movieCreditsUrl) => {
   try {
      const response = await fetch(movieCreditsUrl, options)
      const data = await response.json()

      let castRowHtml = `<div class="row" style="margin-top:30px">`

      // 6명만 출력 / data.cast.length -> 출연배우가 6명 이하일때 나는 오류 해결
      for (let i = 0; i < data.cast.length; i++) {
         if (i === 6) break // 7명째가 되면 for문 종료

         // null은 false
         // profile_path가 null이면 person.png를 보여줌
         let profileImg = !data.cast[i].profile_path ? `./images/person.png` : `https://image.tmdb.org/t/p/w200${data.cast[i].profile_path}`

         castRowHtml += `
           <div class='col-sm-2 p-3'>
               <div class="card">
                    <img src="${profileImg}" class="card-img-top" alt="${data.cast[i].name}">
                    <div class="card-body">
                         <p class="card-text">${data.cast[i].name}</p>
                    </div>
                </div>
            </div>
            `
      }

      castRowHtml += `</div>`

      mainContainer.innerHTML += castRowHtml
   } catch (error) {
      console.log('에러 발생:', error)
   }
}
