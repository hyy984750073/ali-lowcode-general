import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import { Loading } from '@alifd/next';
import mergeWith from 'lodash/mergeWith';
import isArray from 'lodash/isArray';
import { buildComponents, assetBundle, AssetLevel, AssetLoader } from '@alilc/lowcode-utils';
// 引擎的渲染模块
import ReactRenderer from '@alilc/lowcode-react-renderer';
import { injectComponents } from '@alilc/lowcode-plugin-inject';
import appHelper from './appHelper';
import { getProjectSchemaFromLocalStorage, getPackagesFromLocalStorage, getPreviewLocale, setPreviewLocale } from './services/mockService';
import { Search, Icon, Nav, Shell } from '@alifd/next';
const { SubNav, Item, Group } = Nav;
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
} from "react-router-dom";

const basePath = '/preview.html'

const getScenarioName = function () {
  if (location.search) {
    return new URLSearchParams(location.search.slice(1)).get('scenarioName') || 'general';
  }
  return 'general';
}

const SamplePreview = () => {
  const [data, setData] = useState({});

  async function init() {
    const scenarioName = getScenarioName();
    const packages = getPackagesFromLocalStorage(scenarioName);
    const projectSchema = getProjectSchemaFromLocalStorage(scenarioName);
    const {
      componentsMap: componentsMapArray,
      componentsTree,
      i18n,
      dataSource: projectDataSource,
    } = projectSchema;
    const componentsMap: any = {};
    componentsMapArray.forEach((component: any) => {
      componentsMap[component.componentName] = component;
    });
    const pageSchema = componentsTree[0];

    const libraryMap = {};
    const libraryAsset = [];
    packages.forEach(({ package: _package, library, urls, renderUrls }) => {
      libraryMap[_package] = library;
      if (renderUrls) {
        libraryAsset.push(renderUrls);
      } else if (urls) {
        libraryAsset.push(urls);
      }
    });

    const vendors = [assetBundle(libraryAsset, AssetLevel.Library)];

    // TODO asset may cause pollution
    const assetLoader = new AssetLoader();
    await assetLoader.load(libraryAsset);
    const components = await injectComponents(buildComponents(libraryMap, componentsMap));

    setData({
      schema: pageSchema,
      components,
      i18n,
      projectDataSource,
    });
  }

  const { schema, components, i18n = {}, projectDataSource = {} } = data as any;

  if (!schema || !components) {
    init();
    return <Loading fullScreen />;
  }
  const currentLocale = getPreviewLocale(getScenarioName());

  if (!(window as any).setPreviewLocale) {
    // for demo use only, can use this in console to switch language for i18n test
    // 在控制台 window.setPreviewLocale('en-US') 或 window.setPreviewLocale('zh-CN') 查看切换效果
    (window as any).setPreviewLocale = (locale:string) => setPreviewLocale(getScenarioName(), locale);
  }

  function customizer(objValue: [], srcValue: []) {
    if (isArray(objValue)) {
      return objValue.concat(srcValue || []);
    }
  }
  /**
   * components：组件  是schema里面用到的哪些组件的实例，涉及到《低代码引擎搭建协议规范》
   * 我们需要用到这个组件，那我怎么知道我们页面里面用到哪些组件？这个时候就涉及到《低代码引擎资产包协议规范》（可以直接看assets.json文件（Readme.md文件有对这个文件的解析）
  */
  const itemList = window.localStorage.getItem('pageList') ? JSON.parse(window.localStorage.getItem('pageList') || '') : []
  const defaultCurrentPage = 'home'
  console.log(itemList)
  return (
    <div className="lowcode-plugin-sample-preview">
      <Shell className={"iframe-hack"} style={{ border: "1px solid #eee" }}>
        <Shell.Action>
          <Icon type="ic_tongzhi" />
          <span style={{ marginLeft: 10 }}>MyName</span>
        </Shell.Action>
        <Shell.Navigation>
          <Nav type="line" selectedKeys={[defaultCurrentPage]}>
          {
            itemList.length?itemList.map((item: any) => {
              return (<Item icon={item.icon || 'account'} key={item.key}>
                <Link to={`${basePath}/${item.key}`}>{item.name}</Link>
              </Item>)
            }):null
          }
        </Nav>
        </Shell.Navigation>

        <Shell.Content>
          {/* <ReactRenderer
            className="lowcode-plugin-sample-preview-content"
            schema={{
              ...schema,
              dataSource: mergeWith(schema.dataSource, projectDataSource, customizer),
            }}
            components={components}
            locale={currentLocale}
            messages={i18n}
            appHelper={appHelper}
          /> */}
          <div>123456</div>
        </Shell.Content>
      </Shell>
    </div>
  );
};

ReactDOM.render(<Router>
  <Routes>
    <Route path={basePath} element={<SamplePreview />}></Route>
  </Routes>
</Router>, document.getElementById('ice-container'));
