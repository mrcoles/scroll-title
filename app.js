// ## Constants

const COLORS = [
  "#F00",
  "#F90",
  "#00F",
  "#90F",
  "#0FF",
  "#00F",
  "#F90",
  "#0F0",
  "#00F"
];

const TITLE = "ScrollTitle";

const TEXT = `
This ... is ... ${TITLE}. Welcome. This is ${TITLE}; welcome ... to ${TITLE}. You can do anything at ${TITLE}. Anything at all. The only limit is yourself. Welcome ... to ${TITLE}.

Welcome ... to ${TITLE}. This is ... ${TITLE}. Welcome ... to ${TITLE}! This is ${TITLE}, welcome! Yes ... This ... is ${TITLE}.

This is ${TITLE}! And welcome to you, who have come to ${TITLE}. Anything ... is possible ... at ${TITLE}. You can do ... anything at ${TITLE}. The infinite is possible at ${TITLE}. The unattainable is unknown at ${TITLE}. Welcome to ${TITLE}. This ... is ${TITLE}.

Welcome to ${TITLE}. Welcome. This ... is ... ${TITLE}. Welcome ... to ${TITLE}! Welcome ... to ${TITLE}.
`;

const LINES = TEXT.trim().split(/\s+/);
LINES.unshift(document.title);

const NUM_LINES = LINES.length;

// ## Main

const main = () => {
  const body = document.body;
  const doc = document.documentElement;
  const btn = document.getElementById("scroller");
  const arrow = scroller.querySelector("svg path");
  body.style.height = `${NUM_LINES * 100}vh`;
  window.setTimeout(() => {
    doc.classList.add("loaded");
  }, 500);

  const _scrollFn = () => {
    const vh = window.innerHeight;
    const scrollTop = doc.scrollTop;
    const pos = parseInt(scrollTop / vh);
    const word = LINES[pos];

    const color = pos === 0 ? "#000" : COLORS[pos % COLORS.length];
    doc.style.backgroundColor = color;

    const invColor = _invert(color);
    arrow.setAttribute("fill", invColor);

    document.title = word;
  };

  _on(window, "scroll", _scrollFn);

  window.setTimeout(_scrollFn, 1500);

  _on(btn, "click", evt => {
    evt.stopPropagation();
    Scroll.start();
  });

  _on(window, "click", evt => {
    Scroll.stop();
  });

  _on(doc, "keydown", evt => {
    switch (evt.keyCode) {
      case 27: {
        // esc
        Scroll.stop();
        break;
      }
      case 32:
      case 13: {
        // space || return
        Scroll.start();
        break;
      }
    }
  });
};

// ## Fns

const _on = (elt, evtName, fn) => elt.addEventListener(evtName, fn, false);

const _invert = color =>
  color
    .split("")
    .map(tok => (tok === "#" ? tok : (15 - parseInt(tok, 16)).toString(16)))
    .join("");

const Scroll = (function() {
  let _timeout;

  const self = {
    start: () => {
      self.stop();
      _timeout = window.setInterval(() => {
        window.scrollBy(0, window.innerHeight);
      }, 450);
    },
    stop: () => {
      window.clearInterval(_timeout);
    }
  };
  return self;
})();

//

main();
