tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            "colors": {
                "on-error": "var(--on-error)",
                "surface-container": "var(--surface-container)",
                "surface-container-high": "var(--surface-container-high)",
                "on-primary-fixed": "var(--on-primary-fixed)",
                "inverse-on-surface": "var(--inverse-on-surface)",
                "surface": "var(--surface)",
                "on-secondary-container": "var(--on-secondary-container)",
                "surface-container-highest": "var(--surface-container-highest)",
                "tertiary-fixed-dim": "var(--tertiary-fixed-dim)",
                "primary-fixed-dim": "var(--primary-fixed-dim)",
                "error": "var(--error)",
                "on-surface": "var(--on-surface)",
                "inverse-surface": "var(--inverse-surface)",
                "on-primary-fixed-variant": "var(--on-primary-fixed-variant)",
                "surface-bright": "var(--surface-bright)",
                "surface-dim": "var(--surface-dim)",
                "secondary-container": "var(--secondary-container)",
                "on-secondary-fixed-variant": "var(--on-secondary-fixed-variant)",
                "tertiary-container": "var(--tertiary-container)",
                "outline-variant": "var(--outline-variant)",
                "on-primary": "var(--on-primary)",
                "primary-container": "var(--primary-container)",
                "inverse-primary": "var(--inverse-primary)",
                "on-primary-container": "var(--on-primary-container)",
                "secondary-fixed-dim": "var(--secondary-fixed-dim)",
                "primary": "var(--primary)",
                "on-surface-variant": "var(--on-surface-variant)",
                "on-tertiary-fixed-variant": "var(--on-tertiary-fixed-variant)",
                "on-secondary": "var(--on-secondary)",
                "on-tertiary": "var(--on-tertiary)",
                "background": "var(--background)",
                "surface-container-low": "var(--surface-container-low)",
                "on-background": "var(--on-background)",
                "on-tertiary-container": "var(--on-tertiary-container)",
                "secondary-fixed": "var(--secondary-fixed)",
                "primary-fixed": "var(--primary-fixed)",
                "surface-variant": "var(--surface-variant)",
                "on-error-container": "var(--on-error-container)",
                "secondary": "var(--secondary)",
                "surface-container-lowest": "var(--surface-container-lowest)",
                "error-container": "var(--error-container)",
                "on-tertiary-fixed": "var(--on-tertiary-fixed)",
                "on-secondary-fixed": "var(--on-secondary-fixed)",
                "surface-tint": "var(--surface-tint)",
                "outline": "var(--outline)",
                "tertiary-fixed": "var(--tertiary-fixed)",
                "tertiary": "var(--tertiary)",
                "hayuk" : "var(--hayuk)",
                "muskal": "var(--muskal)",
                "gelap": "var(--gelap)",
                "putih": "var(--putih)"
            },
            "borderRadius": {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "full": "9999px"
            },
            "spacing": {
                "sm": "12px",
                "xl": "64px",
                "lg": "40px",
                "md": "24px",
                "base": "8px",
                "xs": "4px",
                "container-max": "1280px",
                "gutter": "24px"
            },
            "fontFamily": {
                "body-md": ["Inter"],
                "label-lg": ["Inter"],
                "body-lg": ["Inter"],
                "display-md": ["Lexend"],
                "caption": ["Inter"],
                "headline-md": ["Lexend"],
                "label-md": ["Inter"],
                "headline-lg": ["Lexend"],
                "headline-sm": ["Lexend"],
                "body-sm": ["Inter"],
                "display-lg": ["Lexend"]
            },
            "fontSize": {
                "body-md": ["16px", { "lineHeight": "1.6", "fontWeight": "400" }],
                "label-lg": ["14px", { "lineHeight": "1.2", "letterSpacing": "0.02em", "fontWeight": "600" }],
                "body-lg": ["18px", { "lineHeight": "1.6", "fontWeight": "400" }],
                "display-md": ["36px", { "lineHeight": "1.2", "fontWeight": "700" }],
                "caption": ["12px", { "lineHeight": "1.4", "fontWeight": "400" }],
                "headline-md": ["24px", { "lineHeight": "1.3", "fontWeight": "600" }],
                "label-md": ["12px", { "lineHeight": "1.2", "letterSpacing": "0.01em", "fontWeight": "600" }],
                "headline-lg": ["30px", { "lineHeight": "1.3", "fontWeight": "600" }],
                "headline-sm": ["20px", { "lineHeight": "1.4", "fontWeight": "600" }],
                "body-sm": ["14px", { "lineHeight": "1.5", "fontWeight": "400" }],
                "display-lg": ["48px", { "lineHeight": "1.1", "fontWeight": "700" }]
            }
        }
    }
}

// Theme Toggle Logic
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.classList.remove('light', 'dark');
    htmlElement.classList.add(savedTheme);
    updateToggleIcon(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.classList.contains('dark') ? 'dark' : 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            htmlElement.classList.remove(currentTheme);
            htmlElement.classList.add(newTheme);
            localStorage.setItem('theme', newTheme);
            updateToggleIcon(newTheme);
        });
    }

    function updateToggleIcon(theme) {
        if (!themeToggle) return;
        const icon = themeToggle.querySelector('.material-symbols-outlined');
        if (icon) {
            icon.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
        }
    }

    // --- Simulasi Loading Indicator ---
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
        // Tampilkan loading saat halaman dibuka
        loadingIndicator.classList.remove('hidden');
        loadingIndicator.classList.add('flex');
        
        // Sembunyikan setelah 3 detik
        setTimeout(() => {
            loadingIndicator.classList.add('hidden');
            loadingIndicator.classList.remove('flex');
        }, 3000);
    }
});

