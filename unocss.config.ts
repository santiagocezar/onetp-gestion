import { defineConfig } from "@unocss/vite";
import presetUno from "@unocss/preset-uno";
import presetWebFonts from "@unocss/preset-web-fonts";

export default defineConfig({
    presets: [
        presetUno({}),
        presetWebFonts({
            fonts: {
                title: "Poppins:300,400,700,900",
                sans: "Inter:500,700",
            },
        }),
    ],
    shortcuts: {
        form: "p-4 flex flex-col gap-1",
        input: "b-1 b-gray rd-2 px-2 py-1",
        "taken-slot": "bg-bluegray border-bluegray text-white",
    },
});
