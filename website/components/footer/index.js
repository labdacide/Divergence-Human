import cn from 'clsx'
import { Button } from 'components/button'
import { Link } from 'components/link'
import dynamic from 'next/dynamic'
import s from './footer.module.scss'

const Discord = dynamic(() => import('icons/discord.svg'), { ssr: false })
// const GitHub = dynamic(() => import('icons/github.svg'), { ssr: false })

export const Footer = () => {
  
  return (
    <footer className={cn('theme-light', s.footer)}>
      <div className={cn(s.top, 'layout-grid hide-on-mobile')}>
        <p className={cn(s['first-line'], 'h1')}>
          HD is <br />
          <span className="contrast">a universe</span>
        </p>
        <div className={s['shameless-plug']}>
          <p className="h4">Human Divergence</p>
          <p className="p-s">
            A next-gen gaming metaverse based <br /> on blockchain technology
          </p>
        </div>
        <p className={cn(s['last-line'], 'h1')}>
          with a <span className="hide-on-desktop">&nbsp;</span> unique{' '}
          <br /> experience &nbsp;
        </p>
        <Button
          className={s.cta}
          arrow
          icon={<Discord />}
          href="https://discord.com/invite/human-divergence"
        >
        Join us on discord
        </Button>
        {/* <Button
          className={s.cta}
          arrow
          icon={<GitHub />}
          href="https://login.coinbase.com/signin?login_challenge=2d6c26cdf7a64eb7bce9d2271d686d09"
        >
        Connect your wallet
        </Button> */}
      </div>
      <div className={cn(s.top, 'layout-block hide-on-desktop')}>
        <div className={s['shameless-plug']}>
          <p className="h4">Human Divergence</p>
          <p className="p-s">
            A next-gen gaming metaverse based <br /> on blockchain technology
          </p>
        </div>
        <p className={cn(s['first-line'], 'h1')}>
          HD is <br />
          <span className="contrast">a universe</span>
          <br /> with a <br /> unique experience
        </p>
      </div>
      <div className={s.bottom}>
        <div className={s.links}>
          <Link
            className={cn(s.link, 'p-xs')}
            href="https://twitter.com/HumanDivergence"
          >
            Twitter
          </Link>
          <Link
            className={cn(s.link, 'p-xs')}
            href="https://www.linkedin.com/company/human-divergence/"
          >
            LinkedIn
          </Link>
          <Link
            className={cn(s.link, 'p-xs')}
            href="https://www.instagram.com/human_divergence/"
          >
            Instagram
          </Link>
          {/* <Link
            className={cn(s.link, 'p-xs')}
            href="https://discord.com/invite/human-divergence"
          >
            Discord
          </Link> */}
        </div>
        <p className={cn('p-xs', s.tm)}>
          Developed by <a href="https://www.linkedin.com/in/houssem-lachtar/">Houssem.L</a>
        </p>
        {/*<p className={cn('p-xs', s.tm)}>
          <span>©</span> {new Date().getFullYear()} Human Divergence
        </p>*/}
         <Button
          className={cn(s.cta, 'hide-on-desktop')}
          arrow
          icon={<Discord />}
          href="https://discord.com/invite/human-divergence"
        >
          Join us on Discord
        </Button>
        {/* <Button
          className={cn(s.cta, 'hide-on-desktop')}
          arrow
          icon={<GitHub />}
          href="https://login.coinbase.com/signin?login_challenge=2d6c26cdf7a64eb7bce9d2271d686d09"
        >
          Connect your wallet
        </Button> */}
      </div>
    </footer>
  )
}
