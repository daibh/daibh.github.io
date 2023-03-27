class GoogleAnalysis {
    private static instance: GoogleAnalysis;
    private code: string;
    private constructor(code: string) {
        this.code = code;
        this.configure();
    }

    static init(code: string): GoogleAnalysis {
        console.log('GoogleAnalysis::initialize', { code });
        if (!GoogleAnalysis.instance) {
            return GoogleAnalysis.instance = new GoogleAnalysis(code);
        }
        return GoogleAnalysis.instance;
    }

    private configure(): void {
        window.dataLayer = window.dataLayer || [];
        gtag('js', new Date());
        gtag('config', 'G-DL3FM9GLQE');
    }

    bindEvents(): void {
        window.addEventListener('DOMContentLoaded', () => {
            const links = document.getElementsByTagName('a');
            const onClickListener = (e) => {
                const el = e.currentTarget;
                const event = el.getAttribute('gaEvent');
                const category = el.getAttribute('gaCategory');
                const value = el.getAttribute('gaValue');
                gtag('event', 'click', { event, category, value });
            };
            for(let i = 0; i < links.length; i++) {
                const _link = links.item(i);
                _link.addEventListener('click', onClickListener);
            }
        });
    }
}

const googleAnalysis = GoogleAnalysis.init('G-DL3FM9GLQE');
googleAnalysis.bindEvents();