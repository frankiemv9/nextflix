import Card from './card'
import styles from './section-cards.module.css'

const SectionCards = (props) => {
  const { title, videos = [], size } = props
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((video, index) => {
          return (
            <Card imgUrl={video.imgUrl} size={size} id={index} key={index} />
          )
        })}
      </div>
    </section>
  )
}

export default SectionCards
