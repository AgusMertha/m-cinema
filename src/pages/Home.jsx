import React from 'react'
import { Link } from 'react-router-dom'
import { category, movieType, tvType } from '../api/movieDbApi'
import { OutlineButton } from '../components/button/Button'
import HeroSlide from '../components/hero-slide/HeroSlide'
import MovieList from '../components/movie-list/MovieList'

const Home = () => {
  return (
    <>
      <HeroSlide/>
      <div className="container">
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Trending Movies</h2>
            <Link to="/movie">
              <OutlineButton className="btn-small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.popular}/>
        </div>
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Upcoming Movies</h2>
            <Link to="/movie">
              <OutlineButton className="btn-small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.upcoming}/>
        </div>
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Popular TV Shows</h2>
            <Link to="/tv">
              <OutlineButton className="btn-small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={tvType.popular}/>
        </div>
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>On Going TV Shows</h2>
            <Link to="/tv">
              <OutlineButton className="btn-small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={tvType.on_the_air}/>
        </div>
      </div>
    </>
  )
}

export default Home