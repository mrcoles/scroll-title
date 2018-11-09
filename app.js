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

const MOBILE_MESSAGE =
  "Unfortunately, mobile doesn’t show the document title.\n\nSo you’ll only see background colors change.";

// ## Main

const main = () => {
  const body = document.body;
  const doc = document.documentElement;
  const btn = document.getElementById("scroller");
  const arrow = scroller.querySelector("svg path");
  body.style.height = `${NUM_LINES * 100}vh`;
  window.setTimeout(() => {
    doc.classList.add("loaded");

    if (_isMobileOrTablet()) {
      window.setTimeout(() => {
        _showMobileMsg();
      }, 1000);
    }
  }, 500);

  const _scrollFn = () => {
    const vh = window.innerHeight;
    const scrollTop = doc.scrollTop || body.scrollTop;
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

  ["touchstart", "click"].forEach(evtName => {
    _on(btn, evtName, evt => {
      evt.stopPropagation();
      Scroll.start();
    });

    _on(body, evtName, evt => {
      Scroll.stop();
    });
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
        if (self._atBottom()) {
          window.scrollTo(0, window.innerHeight);
        } else {
          window.scrollBy(0, window.innerHeight);
        }
      }, 450);
    },
    stop: () => {
      window.clearInterval(_timeout);
    },
    _atBottom: () => {
      return (
        document.documentElement.scrollTop + window.innerHeight >=
        document.body.offsetHeight
      );
    }
  };
  return self;
})();

const _isMobileOrTablet = () => {
  // via https://stackoverflow.com/a/11381730/376489
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  return (
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
      ua
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
      ua.substr(0, 4)
    )
  );
};

const _showMobileMsg = () => {
  const elt = document.createElement("h1");
  elt.innerText = MOBILE_MESSAGE;
  elt.style.opacity = 0;
  document.body.appendChild(elt);
  window.setTimeout(() => (elt.style.opacity = 1), 0);
};

//

main();
