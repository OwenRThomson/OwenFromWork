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
        className="flex flex-col justify-center items-center w-8 h-8 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 rounded-md transition-all duration-200 z-50 relative"
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
        type="button"
      >
        <span
          className={`block w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${
            isOpen ? "rotate-45 translate-y-1.5" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out mt-1 ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out mt-1 ${
            isOpen ? "-rotate-45 -translate-y-1.5" : ""
          }`}
        />
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300"
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
        className={`fixed top-0 right-0 w-full h-full bg-surface-50 dark:bg-surface-900 shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="menu-title"
      >
        {/* Header with close button */}
        <div className="flex justify-between items-center p-4 border-b border-surface-200 dark:border-surface-700">
          <h3 id="menu-title" className="font-semibold text-lg">
            Menu
          </h3>
          <button
            className="p-2 rounded-md hover:bg-surface-100 dark:hover:bg-surface-800 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
            onClick={closeMenu}
            aria-label="Close menu"
            type="button"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Menu Content */}
        <div className="overflow-y-auto h-full pb-20">{children}</div>
      </div>
    </div>
  );
}
