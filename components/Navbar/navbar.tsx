"use client";

import { useState, ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Home,
  BarChart3,
  Book,
  Sun,
  Moon,
  Users,
  CalendarPlus2,
  Plus,
  Stethoscope,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useTheme } from "next-themes";
import { featureFlags } from "@/components/Navbar/featureFlags";

interface SubItem {
  href: string;
  label: string;
}

interface NavItemProps {
  href: string;
  icon: ReactNode;
  label: string;
  subItems?: SubItem[];
  featureFlag?: keyof typeof featureFlags;
}

const NavItem: React.FC<NavItemProps> = ({
  href,
  icon,
  label,
  subItems,
  featureFlag,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const isActive =
    pathname === href ||
    (subItems && subItems.some((item) => pathname === item.href));

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (window.innerWidth < 768) {
      if (subItems) {
        setIsSheetOpen(true);
      } else {
        router.push(href);
      }
    } else {
      if (subItems) {
        setIsOpen(!isOpen);
      } else {
        router.push(href);
      }
    }
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={isActive ? "secondary" : "ghost"}
              className={`w-full justify-center md:justify-start rounded-lg p-2 md:p-4
                ${
                  isActive
                    ? "bg-secondary text-secondary-foreground"
                    : "text-primary-foreground hover:bg-secondary/20 hover:text-secondary-foreground"
                }
                transition-all duration-300 ease-in-out
              `}
              onClick={handleClick}
            >
              <div className="flex items-center justify-center md:justify-start w-full">
                <span className="flex items-center justify-center w-8 h-8">
                  {icon}
                </span>
                <span className="hidden md:inline md:ml-4 text-lg">
                  {label}
                </span>
                {subItems && (
                  <span className="hidden md:inline md:ml-auto">
                    <Plus
                      size={20}
                      className={`transition-transform duration-300 ease-in-out ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    />
                  </span>
                )}
              </div>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" className="md:hidden">
            {label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {subItems && isOpen && (
        <ul className="ml-4 md:ml-8 space-y-2 mt-2 hidden md:block">
          {subItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block py-2 px-4 rounded-lg transition-all duration-300 ease-in-out hover:bg-secondary/20 hover:text-secondary-foreground text-sm"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent
          side="left"
          className="w-[300px] sm:w-[400px] bg-background text-foreground"
        >
          <h2 className="text-lg font-semibold mb-4">{label}</h2>
          <nav className="flex flex-col space-y-2">
            {subItems &&
              subItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block py-2 px-4 rounded-lg transition-all duration-300 ease-in-out hover:bg-secondary/20 hover:text-secondary-foreground text-sm"
                  onClick={() => setIsSheetOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
};

const navItems: NavItemProps[] = [
  { href: "/", icon: <Home />, label: "Inicio" },
  {
    href: "/pacientes",
    icon: <Users />,
    label: "Pacientes",
    featureFlag: "enablePacientes",
    subItems: [
      { href: "/pacientes/general", label: "General" },
      { href: "/pacientes/documentos", label: "Documentos" },
    ],
  },
  {
    href: "/citas",
    icon: <CalendarPlus2 />,
    label: "Citas",
    featureFlag: "enableCitas",
  },
  {
    href: "/reportes",
    icon: <BarChart3 />,
    label: "Reportes",
    featureFlag: "enableReportes",
  },
  {
    href: "/manuales",
    icon: <Book />,
    label: "Manuales",
    featureFlag: "enableManuales",
    subItems: [
      {
        href: "/manuales/terminos-condiciones",
        label: "Términos y Condiciones",
      },
      { href: "/manuales/manual-usuario", label: "Manual de Usuario" },
    ],
  },
];

const Navbar: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const filteredNavItems = navItems.filter(
    (item) => !item.featureFlag || featureFlags[item.featureFlag]
  );

  return (
    <nav className="flex flex-col h-screen w-16 md:w-64 border-r bg-primary text-primary-foreground">
      <div className="flex flex-col items-center py-6">
        <Link href="/">
          <Stethoscope className="h-12 w-12 sm:h-16 sm:w-16" />
        </Link>
      </div>
      <ul className="space-y-2 py-4 flex-grow">
        {filteredNavItems.map((item) => (
          <li key={item.href}>
            <NavItem {...item} />
          </li>
        ))}
      </ul>
      {mounted && (
        <div className="p-2 flex justify-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="w-8 h-8"
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
