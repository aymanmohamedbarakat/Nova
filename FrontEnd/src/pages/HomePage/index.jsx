import React from 'react'
import BannerImg from "../../assets/banner.png"
import styles from "./index.module.css"
import NewArrivals from '../../components/Home/NewArrivals'
import Category from '../../components/Home/Category'
// import Model from './Model'
export default function HomePage() {
  return (
    <div className="col-12 container d-flex flex-column justify-content-center align-items-center">
      <div className=" d-flex justify-content-center align-content-center" id={styles.Banner}>
        <img src={BannerImg}  />
        {/* <Model /> */}
      </div>
      <NewArrivals />
      <Category />
    </div>
  )
}
