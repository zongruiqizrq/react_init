/**
 * 前端入口
 */

import React from 'react'
import { Helmet } from 'react-helmet'
import { render, hydrate } from 'react-dom'
import { Provider, observer } from 'mobx-react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// 异步加载 按需加载
import loadable from 'react-loadable'
// uri => 页面
import pages from './router.jsx'
// 获取页面path列表
const page_keys = Object.keys(pages)
// render方式
const render_fun = process.env.IS_SSR ? hydrate : render

@observer
export default class PageManager extends React.Component {
  componentWillMount() {
    this.readable_components = page_keys.map(key => {
      return {
        key,
        component: loadable({
          loader: () => import(`${pages[key]}`),
          loading: () => null,
        })
      }
    })
  }

  render() {
    return (
      <Provider>
        <div>
          <Helmet>
            <meta charSet="utf-8" />
            <title>react 初始环境</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, minimal-ui"
            />
            <meta
              name="keywords"
            />
            <meta
              name="description"
            />
            <meta name="full-screen" content="yes" />
            <meta name="x5-fullscreen" content="true" />
            <link
              rel="Shortcut Icon"
              href="http://oscacgbbh.bkt.clouddn.com/ico_16X16.ico"
            />
            <link
              rel="Bookmark"
              href="http://oscacgbbh.bkt.clouddn.com/ico_16X16.ico"
            />
          </Helmet>
          <Switch>
            {this.readable_components.map((item) => (
              <Route key={item.key} path={item.key} component={item.component} />
            ))}
          </Switch>
        </div>
      </Provider>
    )
  }
}

if (typeof document !== 'undefined') {
  loadable.preloadReady().then(() => {
    render_fun(
      <Router>
        <Route component={PageManager} />
      </Router>,
      document.getElementById('wrap')
    )
  })
}
