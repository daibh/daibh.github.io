export { };

declare global {
    interface Window {
        dataLayer: any[];
    }
}

interface GaEvent {
    name: string;
    listener: EventListenerOrEventListenerObject;
}

class GoogleAnalysis {
    private static instance: GoogleAnalysis;
    private code: string;
    private events: GaEvent[] = [];
    private constructor(code: string) {
        this.code = code;
        this.injectDependences();
    }

    static init(code: string): GoogleAnalysis {
        console.log('GoogleAnalysis::initialize', { code });
        if (!GoogleAnalysis.instance) {
            return GoogleAnalysis.instance = new GoogleAnalysis(code);
        }
        return GoogleAnalysis.instance;
    }

    private injectDependences(): void {
        /// Google tag (gtag.js)
        (function (d, s, id, c, cb) {
        var e, fsc = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        e = d.createElement(s);
        e.id = id;
        e.onload = function() {
            cb();
        }
        e.src = "https://www.googletagmanager.com/gtag/js?id=".concat(c);
        e.setAttribute('async', true);
        fsc.parentNode.insertBefore(e, fsc);
        }(document, 'script', 'gtag-js-sdk', this.code, () => {
        this.gtag('js', new Date());
        this.gtag('config', 'G-DL3FM9GLQE');
        }));
        window.dataLayer = window.dataLayer || [];
    }

    private getDefinedEvents(): GaEvent[] {
        const links = document.getElementsByTagName('a');
        for(let i = 0; i < links.length; i++) {
            const _link = links.item(i);
            _link.addEventListener('click', e => {
                const event = _link.getAttribute('gaEvent');
                const category = _link.getAttribute('gaCategory');
                const value = _link.getAttribute('gaValue');
                this.gtag({ event, category, value });
            })
        }
        return [];
    }

    addEvent(event: GaEvent): void {
        this.events.push(event);
    }

    addEvents(events: GaEvent[]): void {
        this.events.push(...events);
    }

    bindEvents(): void {
        window.addEventListener('DOMContentLoaded', () => {
            this.getDefinedEvents();
            this.events.forEach(({ name, listener }) => window.document.addEventListener(name, listener));
        });
        window.addEventListener('beforeunload', () => this.events.forEach(({ name, listener }) => window.document.removeEventListener(name, listener)));
    }

    gtag(...params): void {
        params.forEach(_ => console.log('gtag', _));
        window.dataLayer.push(params);
    }
}

const googleAnalysis = GoogleAnalysis.init('G-DL3FM9GLQE');
googleAnalysis.addEvent({
    name: 'click',
    listener: function (e) {
        console.log('click', e, this);
    }
});
googleAnalysis.bindEvents();

