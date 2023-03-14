import { useRect } from '@studio-freight/hamo'
import cn from 'clsx'
import { Card } from 'components/card'
import { useScroll } from 'hooks/use-scroll'
import { clamp, mapRange } from 'lib/maths'
import { useRef, useState } from 'react'
import { useWindowSize } from 'react-use'
import s from './feature-cards2.module.scss'
import Popup from 'reactjs-popup'


const cards = [
  { text: <Popup
    trigger={<div className="example"><div style={{textAlign:"center"}}>
    <img src="Manga/venus.png" ></img></div><div> Venus </div></div>}
    modal
    nested
  >
  </Popup>,
    href: "https://www.humandivergence-manga.com/venus.html"  },
  { text: <Popup
    trigger={<div className="example"><div style={{textAlign:"center"}}>
    <img src="Manga/mars.png" ></img></div><div> Mars </div></div>}
    modal
    nested
  >
  </Popup>,
    href: "https://www.humandivergence-manga.com/mars.html"  },
  { text: <Popup
    trigger={<div className="example"><div style={{textAlign:"center"}}>
    <img src="Manga/jupiter.png" ></img></div><div> jupiter </div></div>}
    modal
    nested
  >
  </Popup>,
    href: "https://www.humandivergence-manga.com/jupiter.html"  },
  { text: <Popup
    trigger={<div className="example"><div style={{textAlign:"center"}}>
    <img src="Manga/uranus.png" ></img></div><div> Uranus </div></div>}
    modal
    nested
  >
  </Popup>,
    href: "https://www.humandivergence-manga.com/uranus.html"  },
  { text: <Popup
    trigger={<div className="example"><div style={{textAlign:"center"}}>
    <img src="Manga/neptune.png" ></img></div><div> Neptune </div></div>}
    modal
    nested
  >
  </Popup>,
    href: "https://www.humandivergence-manga.com/neptune.html"  },
]

export const Story = () => {
  const element = useRef()
  const [setRef, rect] = useRect()
  const { height: windowHeight } = useWindowSize()

  const [current, setCurrent] = useState()

  useScroll(
    ({ scroll }) => {
      const start = rect.top - windowHeight / 2
      const end = rect.top + rect.height - windowHeight

      const progress = clamp(0, mapRange(start, end, scroll, 0, 1), 1) * 5
      const cards = [...element.current.children]
      cards.forEach((node, i) => {
        node.style.setProperty('--progress', clamp(i, progress, i + 1) - i)
      })

       element.current.style.setProperty('--progress', progress * 4)
      const step = Math.floor(progress)
      setCurrent(step)
    },
    [rect]
  )

  return (
    <div
      ref={(node) => {
        setRef(node)
      }}
      className={s.features}
    >
      <div className={cn('layout-block-inner', s.sticky)}>
        <aside className={s.title}>
          <p className="h3">
            HD
            <br />
            <span className="grey">Manga</span>
          </p>
        </aside>
        <div ref={element}>
          {cards.map((card, index) => (
            <a key={index} href={card.href} className={cn(s.card)}>
            <SingleCard
              key={index}
              index={index}
              text={card.text}
              number={index + 1}
              current={index <= current}   
            />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

const SingleCard = ({ text, number, index }) => {
  return (
    <div className={cn(s.card)} style={{ '--i': index }}>
      <Card background="rgba(239, 239, 239, 0.8)" number={number} text={text} />
    </div>
  )
}
