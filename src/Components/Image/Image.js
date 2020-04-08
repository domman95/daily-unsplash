import React from 'react'
import styles from './Image.module.scss'

const Image = ({ imgs, likeFn, unLike, view }) => (
    <>
        {imgs.length > 0 ? (
            imgs.map(img => (
            <div id={styles.img} key={img.id} className={styles.active} onDoubleClick={view === 'gallery' ? () => likeFn(img) : () => unLike(img)}>
                    <img id={styles.image} src={img.urls.regular} alt={img.alt_description} />
                    <div className={styles.infoPanel}>
                        <div className={styles.tags}>
                            {img.tags.map(tag => (
                                <p key={tag.title} className={styles.tag}>#{tag.title}</p>
            ))}                            
                        </div>
                        <a href={img.user.portfolio_url} className={styles.author}>{img.user.name}</a>
                    </div>
            </div>
        ))
        ) : view === 'gallery' ? (<p className={styles.loading}>Your daily photos are loading, please wait!</p>) : (<p className={styles.loading}>There is nothing yet!</p>)}
    </>
)



export default Image