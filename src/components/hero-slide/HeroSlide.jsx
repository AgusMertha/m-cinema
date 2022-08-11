import React, { useEffect, useRef, useState } from 'react'
import movieDbApi, { category, movieType} from '../../api/movieDbApi'
import { Swiper, SwiperSlide } from 'swiper/react';

import './heroslide.scss'
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';

import apiConfig from '../../api/config';

import { useNavigate } from "react-router-dom";
import Button, { OutlineButton } from '../button/Button';
import { Navigation, Autoplay } from 'swiper';
import Modal, {ModalContent} from '../modal/Modal';

const HeroSlide = () => {

  const [movieItems, setMovieItems] = useState([])

  useEffect(() =>{
    const getMovies = async () => {
      const params = {
        page: 1
      }
      try{
        const response = await movieDbApi.getMovieList(movieType.popular, {params})
        setMovieItems(response.results.slice(0,7))
      } catch(error) {
        console.log(error);
      }
    }
    getMovies()
  }, [])
  return (
    <div className="hero-slide">
      <Swiper
      modules={[Autoplay, Navigation]}
      slidesPerView={1}
      navigation
    >
        {
          movieItems.map((item, i) => (
            <SwiperSlide key={i}>
              {({isActive}) => (
                <HeroSlideItem item={item} className={`${isActive ? 'active' : ''}`}/>
              )}
            </SwiperSlide>
          ))
        }
      </Swiper>
      {
        movieItems.map((item, i) => <TrailerModal key={i} item={item}/>)
      }
    </div>
  )
}

const HeroSlideItem = props => {
  let navigate = useNavigate()
  const item = props.item
  const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path)

  const setModalActive = async () => {
    const modal = document.querySelector(`#modal_${item.id}`)
    const video = await movieDbApi.getVideos(category.movie, item.id)

    console.log(video)

    if(video.results.length > 0) {
      const videoSrc = `https://www.youtube.com/embed/${video.results[0].key}`
      modal.querySelector('.modal__content > iframe').setAttribute('src', videoSrc)
    } else{
      modal.querySelector('.modal__content').innerHTML = 'No Trailer'
    }

    modal.classList.toggle('active')
  }
  return (
    <div className={`hero-slide__item ${props.className}`} style={{backgroundImage: `url(${background})`}}>
      <div className="hero-slide__item__content container">
        <div className="hero-slide__item__content__info">
          <h2 className="title">{item.title}</h2>
          <div className="overview">{item.overview}</div>
          <div className="btns">
            <Button onClick={() => navigate(`/movie/${item.id}`, { replace: true })}>
                Watch now
            </Button>
            <OutlineButton onClick={setModalActive}>
                Watch trailer
            </OutlineButton>
          </div>
        </div>
        <div className="hero-slide__item__content__poster">
          <img src={apiConfig.w500Image(item.poster_path)} alt="" />
        </div>
      </div>
    </div>
  )
}

const TrailerModal = props => {
  const item = props.item
  const iframeRef = useRef(null)

  const onClose = () => iframeRef.current.setAttribute('src', '')

  return (
    <Modal active={false} id={`modal_${item.id}`}>
      <ModalContent onClose={onClose}>
        <iframe ref={iframeRef} width="100%" height="500px" title="trailer"></iframe>
      </ModalContent>
    </Modal>
  )
}

export default HeroSlide