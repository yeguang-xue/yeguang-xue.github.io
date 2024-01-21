/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2023 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

const setTheme = theme => {
    document.documentElement.setAttribute('data-bs-theme', theme);

    let btn = document.getElementById("btn_toggleDarkMode");
    if (theme == "dark") {
        btn.classList.add('bi-moon-stars');
        btn.classList.remove('bi-sun');
    } else {
        btn.classList.remove('bi-moon-stars');
        btn.classList.add('bi-sun');
    }

    // Need to reload Disqus when dark/light mode has been changed
    if (typeof DISQUS !== "undefined") {
        DISQUS.reset({ reload: true });
    }
}

const toggleDarkMode = e => {
    let theme = document.documentElement.getAttribute('data-bs-theme');
    // console.log('Theme: ' + theme + " chainging theme");
    if (theme == "dark") {
        setTheme("light");
    } else {
        setTheme("dark");
    }
}


(() => {
    'use strict'
    window.addEventListener('DOMContentLoaded', () => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            // console.log("System dark theme detected");
            let theme = document.documentElement.getAttribute('data-bs-theme');
            if (theme == "light") {
                setTheme("dark");
            }
        }
    })
})()

