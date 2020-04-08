import React from 'react'
import styles from './Gallery.module.scss'
import Image from '../../Components/Image/Image'
import AppContext from '../../context'

const Gallery = () => (
    <AppContext.Consumer>
        {(context) => (
        <div className={styles.wrapper}>
                <Image imgs={context.imgs} likeFn={context.clickForLike} view="gallery" />
        </div>
        )}
    </AppContext.Consumer>       
)

export default Gallery