const breakpoints = {
    mobile: 320,
    tablet: 768,
    tabletHorizontal: 1024,
    laptop: 1366,
};

function matchQuery(query) {
    return window.matchMedia(query).matches;
}

const matchMedia = {
    till(breakpoint) {
        return matchQuery(`(max-width: ${breakpoint - 1}px)`);
    },

    from(breakpoint) {
        return matchQuery(`(min-width: ${breakpoint}px)`);
    },

    between(breakpointFrom, breakpointTo) {
        return matchQuery(`(min-width: ${breakpointFrom}px) and (max-width: ${breakpointTo - 1}px)`);
    },
};

export {
    matchMedia,
    breakpoints,
};
