import { headerLinks } from '@/constants'
import Link from 'next/link'
import React from 'react'

const NavItems = () => {
  return (
    <ul className="flex gap-8">
      {headerLinks.map((link) => (
        <li key={link.route}>
          <Link href={link.route} className="text-lg font-medium text-white">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default NavItems
