import { IoLogoGithub } from 'react-icons/io5'

import Image from 'next/image'
import Link from 'next/link'

import iconSrc from '../../images/icon.png'

export const Profile: React.FC = () => {
  return (
    <div className="flex bg-white p-4">
      <Link href="/about" aria-label="プロフィールへ">
        <Image src={iconSrc} alt="GitHub avatar" width="60" height="60" className="rounded-full" aria-hidden="true" />
      </Link>
      <div className="flex flex-col ml-4">
        <Link href="/about" className="text-lg font-bold" aria-label="プロフィールへ">
          phx13suns
        </Link>
        <ul className="flex mt-1 gap-x-1">
          <li>
            <a href="https://github.com/phx13suns">
              <IoLogoGithub role="graphics-symbol" title="GitHub" size={24} />
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
