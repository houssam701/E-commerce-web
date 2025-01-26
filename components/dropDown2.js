'use client';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

export default function DropDown2({ section, href }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-md bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-600 shadow-sm ring-1 ring-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400">
          Filter the Section
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />
        </MenuButton>
      </div>

      <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/10 focus:outline-none">
        <div className="py-1">
          {href.map((h, index) => (
            <MenuItem key={index}>
              {({ active }) => (
                <Link
                  href={`/items/${h}/${section}`}
                  className={`block px-4 py-2 text-sm ${
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  }`}
                >
                  {h}
                </Link>
              )}
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
}
