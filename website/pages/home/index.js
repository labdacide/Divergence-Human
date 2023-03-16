import { useRect } from '@studio-freight/hamo'
import cn from 'clsx'
import { Button } from 'components/button'
import { Card } from 'components/card'
import { FeatureCards } from 'components/feature-cards'
import { HorizontalSlides } from 'components/horizontal-slides'
import { Title } from 'components/intro'
import { Link } from 'components/link'
import { ListItem } from 'components/list-item'
import { Parallax } from 'components/parallax'
// import { WebGL } from 'components/webgl'
import { useScroll } from 'hooks/use-scroll'
import { Layout } from 'layouts/default'
import { clamp, mapRange } from 'lib/maths'
import { useStore } from 'lib/store'
import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { useWindowSize } from 'react-use'
import s from './home.module.scss'
import { Story } from 'components/feature-cards2'


const center = {
  textAlign: 'center',
}

const vid = {
   mixBlendMode: 'multiply',
   width: '100%',
   height: 'auto',
}

const Discord = dynamic(() => import('icons/discord.svg'), { ssr: false })
const GitHub = dynamic(() => import('icons/github.svg'), { ssr: false })

const WebGL = dynamic(
  () => import('components/webgl').then(({ WebGL }) => WebGL),
  { ssr: false }
)

const HeroTextIn = ({ children, introOut }) => {
  return (
    <div className={cn(s['hide-text'], introOut && s['show-text'])}>
      {children}
    </div>
  )
}

export default function Home() {
  const [hasScrolled, setHasScrolled] = useState()
  const zoomRef = useRef(null)
  const [zoomWrapperRectRef, zoomWrapperRect] = useRect()
  const { height: windowHeight } = useWindowSize()
  const introOut = useStore(({ introOut }) => introOut)

  const [theme, setTheme] = useState('dark')

  useScroll(({ scroll }) => {
    setHasScrolled(scroll > 10)
    if (!zoomWrapperRect.top) return

    const start = zoomWrapperRect.top + windowHeight * 0.5
    const end = zoomWrapperRect.top + zoomWrapperRect.height - windowHeight

    const progress = clamp(0, mapRange(start, end, scroll, 0, 1), 1)
    const center = 0.6
    const progress1 = clamp(0, mapRange(0, center, progress, 0, 1), 1)
    const progress2 = clamp(0, mapRange(center - 0.055, 1, progress, 0, 1), 1)
    setTheme(progress2 === 1 ? 'light' : 'dark')

    zoomRef.current.style.setProperty('--progress1', progress1)
    zoomRef.current.style.setProperty('--progress2', progress2)

    if (progress === 1) {
      zoomRef.current.style.setProperty('background-color', 'currentColor')
    } else {
      zoomRef.current.style.removeProperty('background-color')
    }
  })

  const [whyRectRef, whyRect] = useRect()
  const [cardsRectRef, cardsRect] = useRect()
  const [whiteRectRef, whiteRect] = useRect()
  const [featuresRectRef, featuresRect] = useRect()
  const [inuseRectRef, inuseRect] = useRect()

  const addThreshold = useStore(({ addThreshold }) => addThreshold)

  useEffect(() => {
    addThreshold({ id: 'top', value: 0 })
  }, [])

  useEffect(() => {
    const top = whyRect.top - windowHeight / 2
    addThreshold({ id: 'why-start', value: top })
    addThreshold({
      id: 'why-end',
      value: top + whyRect.height,
    })
  }, [whyRect])

  useEffect(() => {
    const top = cardsRect.top - windowHeight / 2
    addThreshold({ id: 'cards-start', value: top })
    addThreshold({ id: 'cards-end', value: top + cardsRect.height })
    addThreshold({
      id: 'red-end',
      value: top + cardsRect.height + windowHeight,
    })
  }, [cardsRect])

  useEffect(() => {
    const top = whiteRect.top - windowHeight
    addThreshold({ id: 'light-start', value: top })
  }, [whiteRect])

  useEffect(() => {
    const top = featuresRect.top
    addThreshold({ id: 'features', value: top })
  }, [featuresRect])

  useEffect(() => {
    const top = inuseRect.top
    addThreshold({ id: 'in-use', value: top })
  }, [inuseRect])

  const lenis = useStore(({ lenis }) => lenis)

  useEffect(() => {
    const top = lenis?.limit
    addThreshold({ id: 'end', value: top })
  }, [lenis?.limit])

  useScroll((e) => {
    console.log(e)
  })

  return (
    <Layout
      theme={theme}
      seo={{
        title: 'HUMAN DIVERGENCE',
        description:
          'An immersive role-playing game using blockchain technology',
      }}
      className={s.home}
    >
      <div className={s.canvas}>
        <WebGL />
      </div>

      <section className={s.hero}>
        <div className="layout-grid-inner">
          <Title className={s.title} />
          <span className={cn(s.sub)}>
            <HeroTextIn introOut={introOut}>
              <h2 className={cn('h3', s.subtitle)}>Play Beyond <br /> The Game</h2>
            </HeroTextIn>
            <HeroTextIn introOut={introOut}>
              <h2 className={cn('p-xs', s.tm)}>
                <span>©</span> {new Date().getFullYear()} Human Divergence
              </h2>
            </HeroTextIn>
          </span>
        </div>

        <div className={cn(s.bottom, 'layout-grid')}>
          <div
            className={cn(
              'hide-on-mobile',
              s['scroll-hint'],
              hasScrolled && s.hide,
              introOut && s.show
            )}
          >
            <div className={s.text}>
              <HeroTextIn introOut={introOut}>
                <p>scroll</p>
              </HeroTextIn>
              <HeroTextIn introOut={introOut}>
                <p> to explore</p>
              </HeroTextIn>
            </div>
          </div>
          <h1 className={cn(s.description, 'p-s')}>
            <HeroTextIn introOut={introOut}>
              <p className="p-s"> AN IMMERSIVE ROLE-PLAYING GAME USING BLOCKCHAIN TECHNOLOGY WITH A FUTURISTIC UNIVERSE CO-DESIGNED WITH THE COMMUNITY</p>
            </HeroTextIn>
          </h1>
          <Button
            className={cn(s.cta, introOut && s.in)}
            arrow
            icon={<Discord fill="#FFFFFF" />}
            href="https://discord.com/invite/human-divergence"
          >
            Join us on discord
          </Button>
          <Button
            className={cn(s.cta2, introOut && s.in)}
            arrow
            icon={<Github fill="#FFFFFF" />}
            href="https://divergentemblems.wlbl.xyz/"
          >
            Get My Divergent Emblem
          </Button>
        </div>
      </section>
      <section className={s.why}>
        <div className="layout-grid">
          <p className={cn(s.sticky, 'h2')}>
            <a href="#top">Welcome aboard</a>
          </p>
          <aside className={s.features} ref={whyRectRef}>
            <div className={s.feature}>
              <p className="p">
                Hop in our spaceship, we're going to take you for a journey
                into a gaming world like never before. Unlock the creative 
                potential and impact of your web experiences and keep tight to 
                be pulled into the flow of a new universe so substantial that 
                you forget you’re navigating a metaverse.
              </p>
            </div>
            <div className={s.feature}>
              <h4 className={cn(s.title, 'h4')}>
                DIVE INTO HUMAN DIVERGENCE
              </h4>
              <p className="p">
                Explore a world of adventure, strategy, and social interaction
                in our blockchain-based role-playing game. With a combination 
                of action elements, deep strategic mechanics, a vibrant trading
                economy, and immersive social experiences, Human Divergence will
                keep you captivated for years.
              </p>
            </div>
            <div className={s.feature}>
              <h4 className={cn(s.title, 'h4')}>
                BUILDING SOCIETIES IN THE METAVERSE
              </h4>
              <p className="p">
                Do you ever wonder what life would be like in a post-apocalyptic
                world? Every individual has their own distinct Non-Fungible Token
                Divergent avatar to attempt to reign over as much of the Earth's
                Metaverse as possible. Gamers can join without any cost and gain
                both NFTs and tokens, and construct whole societies with their own
                exclusive economies, governments, and more.
              </p>
            </div>
            <div className={s.feature}>
              <h4 className={cn(s.title, 'h4')}>
                PLAYER-DRIVEN UNIVERSE
              </h4>
              <p className="p">             
                Players can have a comprehensive experience by taking charge of the
                entire universe, allowing them to collaborate in the creation of the
                story and gameplay with fresh commands and quests suggested by the group.
                This dynamic universe will reflect the wishes of every Divergent. 
              </p>
            </div>
          </aside>
        </div>
      </section>
      <section className={s.rethink}>
        <div className={cn('layout-grid', s.pre)}>
          <div className={s.highlight}>
            <Parallax speed={-0.5}>
              <p className="h2">Choose your faction</p>
            </Parallax>
          </div>
          <div className={s.comparison} style={{marginTop: "4rem"}}>
            <Parallax speed={0.5}>
              <p className="p">
                It's time to discover the {' '}
                <Link
                  className="contrast semi-bold"
                  href="#top"
                >
                  Truth
                </Link>{' '}
                about{' '}
                <Link
                  className="contrast semi-bold"
                  href="#top"
                >
                  Divergents
                </Link>
                . Through gaming, manga, films, collectables, and apparel, they
                are the key to unlocking a variety of exciting options. There
                are five distinct factions, all with their own unique world,
                backgrounds, abilities, and traits. What will you choose?
              </p>
            </Parallax>
          </div>
        </div>
        <div className={s.cards} ref={cardsRectRef}>
          <HorizontalSlides>
            <Card
              className={s.card}
              number="01"
              text="Venus"
              src="Planetss/venus.png"
            />
            <Card
              className={s.card}
              number="02"
              text="Mars"
              src="Planetss/mars.png"
            />
            <Card
              className={s.card}
              number="03"
              text="Jupiter"
              src="Planetss/jupiter.png"
            />
            <Card
              className={s.card}
              number="04"
              text="Uranus"
              src="Planetss/uranus.png"
            />
            <Card
              className={s.card}
              number="05"
              text="Neptune"
              src="Planetss/neptune.png"
            />
          </HorizontalSlides>
        </div>
      </section>
      <section
        ref={(node) => {
          zoomWrapperRectRef(node)
          zoomRef.current = node
        }}
        className={s.solution}
      >
        <div className={s.inner}>
          <div className={s.zoom}>
            <h2 className={cn(s.first, 'h1 vh')}>
              dive into a <br />             
              <span className="contrast">rich universe</span>
            </h2>
            <h2 className={cn(s.enter, 'h3 vh')}>
              Enter <br /> Game
            </h2>
            <h2 className={cn(s.second, 'h1 vh')}>Full of secrets</h2>
          </div> 
        </div>
      </section>
      <section className={cn('theme-light', s.featuring)} ref={whiteRectRef}>
        <div className={s.inner}>
          <div style={center} className={cn('layout-block', s.intro)}>
          <video style={vid} loop autoPlay muted playsInline >
              <source src="Videoo/HD.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
        <section ref={featuresRectRef}>
          <Story />
        </section>
        <section ref={featuresRectRef}>
          <FeatureCards />
        </section>
      </section>
      <section ref={inuseRectRef} className={cn('theme-light', s['in-use'])}>
        <div className="layout-grid">
          <aside className={s.title}>
            <p className="h3">
              Core <br />
              <span className="grey">team</span>
            </p>
          </aside>
          <ul className={s.list}>
            <li>
              <ListItem
                title="Illan Knafou"
                source="Co-founder & CEO"
                href="https://www.linkedin.com/in/illan-knafou/"
              />
            </li>
            <li>
              <ListItem
                title="Victor Perez"
                source="Co-founder & COO"
                href="https://www.linkedin.com/in/victor-perez-03a70419a/"
              />
            </li>
            <li>
              <ListItem
                title="Khaled Grira"
                source="Blockchain Developer"
                href="https://www.linkedin.com/in/khaled-grira-math/"
              />
            </li> 
            <li>
              <ListItem
                title="Gael Gao"
                source="Artistic Director"
                href="https://gaelgaoart.com"
              />
            </li>
            <li>
              <ListItem
                title="Gregoire de Framond"
                source="Game Director"
                href="https://www.linkedin.com/in/grégoire-de-framond-645521114/"
              />
            </li>
            <li>
              <ListItem
                title="Elias El Manouzi"
                source="3D Designer"
                href="#"
              />
            </li>
            <li>
              <ListItem
                title="Chloé Morin"
                source="Narrative Designer"
                href="https://www.linkedin.com/in/cmorin058/"
              />
            </li>
            <li>
              <ListItem
                title="Maxime Nottin"
                source="Lead Moderator "
                href="#"
              />
            </li>
            <li>
              <ListItem
                title="PyratzLabs"
                source="Technical & Financial Support "
                href="https://www.pyratzlabs.com/"
              />
            </li>
          </ul>
        </div>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      id: 'home',
    }, // will be passed to the page component as props
  }
}
