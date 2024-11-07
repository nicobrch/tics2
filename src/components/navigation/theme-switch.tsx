"use client"
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Sun, Moon, SunMoon} from 'lucide-react';
import { useTheme } from "next-themes";

export default function ThemeSwitch() {
    const { setTheme, theme } = useTheme();

    const handleThemeSwitch = () => {
        if (theme === "system") {
            setTheme("dark");
        } else if (theme === "dark") {
            setTheme("light");
        } else {
            setTheme("system");
        }
    }

    return (
        <DropdownMenuItem onClick={handleThemeSwitch}>
            {theme === "system" && <SunMoon className="h-5 w-5"/>}
            {theme === "light" && <Sun className="h-5 w-5"/>}
            {theme === "dark" && <Moon className="h-5 w-5"/>}
            <span className="ml-2">Cambiar tema</span>
        </DropdownMenuItem>
    )
}