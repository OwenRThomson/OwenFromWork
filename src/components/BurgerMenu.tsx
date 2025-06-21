import { useState, useEffect, useRef, type ReactNode } from "react";

interface BurgerMenuProps {
  children: ReactNode;
}

export default function BurgerMenu({ children }: BurgerMenuProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  const closeMenu = (): void => {
    setIsOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    const handleKeydown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeydown);
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeydown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      {/* Burger Button */}
      <button
        className="flex md:btn-lg flex-col justify-center items-center w-32 h-32 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 rounded-md transition-all duration-200 z-50 relative"
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
        type="button"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" >
	<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="M4 7h3m13 0h-9m9 10h-3M4 17h9m-9-5h16" />
</svg>
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300"
          onClick={closeMenu}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              closeMenu();
            }
          }}
          aria-label="Close menu overlay"
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 w-full h-full bg-surface-50 dark:bg-surface-900 shadow-xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="menu-title"
      >
        {/* Header with close button */}
        <div className="flex justify-between text-4xl items-center p-4 border-b border-surface-200 dark:border-surface-700">
          <h3 id="menu-title" className="font-semibold text-5xl">
            Menu
          </h3>
          <button
        className="flex md:btn-lg flex-col justify-center items-center w-32 h-32 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 rounded-md transition-all duration-200 z-50 relative"
            onClick={closeMenu}
            aria-label="Close menu"
            type="button"
          >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z" />
          </svg>
          </button>
        </div>

        {/* Menu Content */}
        <div className="overflow-y-auto h-full pb-20">{children}</div>
      </div>
    </div>
  );
}
