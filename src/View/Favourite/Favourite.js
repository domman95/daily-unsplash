import React from 'react'
import styles from './Favourite.module.scss'
import Image from '../../Components/Image/Image'
import AppContext from '../../context'


const Favourite = () => (
   <AppContext.Consumer>
        {(context) => (
        <div className={styles.wrapper}>
                <Image imgs={context.likedPhotos} unLike={context.clickForUnlike} view="favourite"/>
        </div>
        )}
    </AppContext.Consumer>
)

export default Favourite