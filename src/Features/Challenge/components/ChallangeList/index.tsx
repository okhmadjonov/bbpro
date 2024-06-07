import React from 'react'
import styles from  './ChallengeList.module.scss';
import PhotoGallery from '../ChallangeCard';



const ChallengeList = () => {
  return (
      <div className={styles.challengelist}>
          <PhotoGallery/>
    </div>
  )
}

export default ChallengeList;