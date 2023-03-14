import cn from 'clsx'
import s from './card.module.scss'

export const Card = ({
  number,
  text,
  className,
  inverted,
  background = 'rgba(14, 14, 14, 0.15)',
  src,
}) => {
  return (
    <div
      className={cn(className, s.wrapper, inverted && s.inverted)}
      style={{ '--background': background }}
    >
      {number && (
        <p className={s.number}>{number.toString().padStart(2, '0')}</p>
      )}
      <div className={s.div} >
      {src && (
        <img src={src} className={s.img} />
      )}
      </div>
      {text && <p className={s.text}>{text}</p>}
    </div>
  )
}
