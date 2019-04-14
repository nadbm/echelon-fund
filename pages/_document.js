import { ServerStyleSheet } from 'styled-components'
import Document, { Head, Main, NextScript } from 'next/document'
import {DARKEST, GREY_BLUE} from '../common/colors'

export default class IndexPage extends Document {
  static getInitialProps ({ renderPage, req }) {
    const isServer = !!req
    if (!isServer) {
      return { page: renderPage(), styleTags: null }
    }

    const sheet = new ServerStyleSheet()
    // Bind is not enough as we receive a component and not an element
    // https://github.com/styled-components/styled-components-website/blob/master/pages/_document.js#L151
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleTags()
    return { ...page, styleTags }
  }
  render () {
    return (
      <html>
        <Head>
          <script src='https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.23.0/polyfill.min.js' />
          <link href='https://fonts.googleapis.com/css?family=Raleway:400|Nunito+Sans:200,400,700,900' rel='stylesheet' />
          <link href='https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css' rel='stylesheet' />
          <link rel='apple-touch-icon' sizes='180x180' href='/static/favicons/apple-touch-icon.png' />
          <link rel='icon' type='image/png' sizes='32x32' href='/static/favicons/favicon-32x32.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='/static/favicons/favicon-16x16.png' />
          <link rel='manifest' href='/static/favicons/manifest.json' />
          <link rel='mask-icon' href='/static/favicons/safari-pinned-tab.svg' color='#5bbad5' />
          <meta name='theme-color' content='#ffffff' />
          <script dangerouslySetInnerHTML={{__html: `
            (function(e,a){if(!a.__SV){var b=window;try{var c,l,i,j=b.location,g=j.hash;c=function(a,b){return(l=a.match(RegExp(b+"=([^&]*)")))?l[1]:null};g&&c(g,"state")&&(i=JSON.parse(decodeURIComponent(c(g,"state"))),"mpeditor"===i.action&&(b.sessionStorage.setItem("_mpcehash",g),history.replaceState(i.desiredHash||"",e.title,j.pathname+j.search)))}catch(m){}var k,h;window.mixpanel=a;a._i=[];a.init=function(b,c,f){function e(b,a){var c=a.split(".");2==c.length&&(b=b[c[0]],a=c[1]);b[a]=function(){b.push([a].concat(Array.prototype.slice.call(arguments,
            0)))}}var d=a;"undefined"!==typeof f?d=a[f]=[]:f="mixpanel";d.people=d.people||[];d.toString=function(b){var a="mixpanel";"mixpanel"!==f&&(a+="."+f);b||(a+=" (stub)");return a};d.people.toString=function(){return d.toString(1)+".people (stub)"};k="disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config reset people.set people.set_once people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" ");
            for(h=0;h<k.length;h++)e(d,k[h]);a._i.push([b,c,f])};a.__SV=1.2;b=e.createElement("script");b.type="text/javascript";b.async=!0;b.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file:"===e.location.protocol &&
                "//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(
                  /^\/\//
                ) ? "https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js" : "//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js"; c=e.getElementsByTagName("script")[0];c.parentNode.insertBefore(b,c)}})(document,window.mixpanel||[]);
            mixpanel.init("df90940c92fa394d45e60f3f98b7eedf");
          `}} />

          <script
            async
            src='https://www.googletagmanager.com/gtag/js?id=UA-107213877-1' />
          <script dangerouslySetInnerHTML={{__html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments)};
          gtag('js', new Date());
          gtag('config', 'UA-107213877-1');
        `}} />

          <meta name='viewport' content='width=device-width, initial-scale=1.0, minimum-scale=1' />
          <style>
            {`
                body { 
                  font: 12px Nunito Sans;
                  margin: 0;
                  overflow-x: hidden;
                  padding: 0;
                  font-family: Nunito Sans;
                }
                h1,h2,h3,h4,h5,h6 {
                  font-family: Nunito Sans;
                }
                h1 {
                  cursor: default;
                  user-select: none; 
                }
                p, h3 {
                  margin-top: 0;
                  font-size: 15px;
                  line-height: 1.5em;
                  margin: 7px 0px;
                  font-weight: 400;
                  color: ${GREY_BLUE};
                }
              `}
          </style>

        </Head>
        <head dangerouslySetInnerHTML={{__html: this.props.styleTags}} />
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
