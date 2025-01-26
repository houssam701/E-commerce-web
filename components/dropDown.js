'use client';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

export default function DropDown({ sections, href }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-md bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-600 shadow-sm ring-1 ring-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400">
          Filter the Section
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />
        </MenuButton>
      </div>

      <MenuItems
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/10 focus:outline-none"
      >
        <div className="py-1">
          {sections?.success && sections.data.length > 0 ? (
            sections.data.map((section) => (
              <MenuItem key={section.id}>
                {({ active }) => (
                  <Link
                    href={`/items/${href}/${section.title}`}
                    className={`block px-4 py-2 text-sm ${
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                    }`}
                  >
                    {section.title}
                  </Link>
                )}
              </MenuItem>
            ))
          ) : (
            <div className="px-4 py-2 text-sm text-gray-500">No sections available</div>
          )}
        </div>
      </MenuItems>
    </Menu>
  );
}
