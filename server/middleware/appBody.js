/*global module require */
import React from 'react'
import { renderToStaticNodeStream, renderToNodeStream } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import Loadable from 'react-loadable'
import { getBundles } from 'react-loadable/webpack'
import App from '../../client/client_index'
import stats from '../../webpack_server/react-loadable.json'

class SSR {
    // body内容
    body_stream = ''
    // 包内容
    bundles = []

    init(url, debug = false) {
        let modules = []
        let context = {}
        const render = debug ? renderToStaticNodeStream : renderToNodeStream
        this.body_stream = render(
          <Loadable.Capture report={moduleName => modules.push(moduleName)}>
            <StaticRouter context={context} location={url}>
              <App />
            </StaticRouter>
          </Loadable.Capture>
        ).read()
        this.bundles = getBundles(stats, modules)
    }

    getBundles() {
      return this.bundles.map(bundle => {
        return `<script src="${bundle.publicPath}"></script>`
      }).join('\n')
    }
}

export default new SSR()
