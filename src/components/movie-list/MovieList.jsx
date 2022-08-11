import React, { useEffect, useState } from 'react'
import propTypes from 'prop-types'
import movieDbApi, { category } from '../../api/movieDbApi'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import MovieCard from '../movie-card/MovieCard';

const MovieList = props => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const getList = async () => {
      let response = null
      const params = {}

      if(props.type !== 'similar') {
        switch (props.category) {
          case category.movie:
            response = await movieDbApi.getMovieList(props.type, {params})
            break;
        
          default:
            response = await movieDbApi.getTvList(props.type, {params})
            break;
        }
      } else {
        response = await movieDbApi.similar(props.category, props.id)
      }

      setItems(response.results)
    }
    getList()

  }, [props.category, props.id, props.type])
  return (
    <div className="movie-list">
      <Swiper
      modules={[Navigation]}
      slidesPerView={5}
      spaceBetween={30}
      navigation>
        {
          items.map((item, i) => (
            <SwiperSlide key={i}>
              <MovieCard item={item} category={props.category}/>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
}

MovieList.propTypes = {
  category: propTypes.string.isRequired,
  type: propTypes.string.isRequired
}

export default MovieList