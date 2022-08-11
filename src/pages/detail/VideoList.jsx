import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import movieDbApi from '../../api/movieDbApi'

const VideoList = () => {
  const {category, id} = useParams()
  const [videos, setVideos] = useState([])

  useEffect(() => {
    const getVideos = async () => {
      const response = await movieDbApi.getVideos(category, id)
      console.log(response.results.length)
      setVideos(response.results.slice(0,5))
    }
    getVideos()

  }, [category, id])
  console.log(videos);
  return (
    <>
      {
        videos.map((item, i) => (
          <Video item={item} key={i}/>
        ))
      }
    </>
  )
}

const Video = props => {
  const item = props.item
  const iframeRef = useRef(null)

  useEffect(() => {
    const height = iframeRef.current.offsetWidth * 9 / 16 + 'px';
    iframeRef.current.setAttribute('height', height)
  }, [])

  return (
    <div className="video">
      <div className="video__title">
        <h2>{item.name}</h2>
      </div>
      <iframe src={`https://www.youtube.com/embed/${item.key}`} ref={iframeRef} width="100%" title="video"></iframe>
    </div>
  )
}

export default VideoList