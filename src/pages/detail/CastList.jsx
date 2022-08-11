import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import apiConfig from '../../api/config'
import movieDbApi from '../../api/movieDbApi'

const CastList = () => {
  const {category, id} = useParams()
  const [casts, setCasts] = useState([])

  useEffect( () => {
    const getCredits = async () => {
      const response = await movieDbApi.credits(category, id)
      setCasts(response.cast)
    }
    getCredits()
  }, [category, id])
  return (
    <div className="casts">
      {
        casts.map((item, i) => (
          <div className="casts__item" key={i}>
            <div className="casts__item__img" style={item.profile_path ? {backgroundImage: `url(${apiConfig.w500Image(item.profile_path)})`} : {backgroundColor: "#fff" }}></div>
            <div className="casts__item__name">{item.name}</div>
          </div>
        ))
      }
    </div>
  )
}

export default CastList