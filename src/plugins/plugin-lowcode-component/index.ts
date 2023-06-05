import { IPublicModelPluginContext } from "@alilc/lowcode-types";
import lowcodeSchema from './lowcode-schema.json'
import searchTable from './search-table.json'

const lowcodePlugin = (ctx: IPublicModelPluginContext) => {
  return {
    async init() {
      const { material } = ctx;
      material.loadIncrementalAssets({
        version: '',
        components: [{
          devMode: 'lowCode',
          componentName: 'LowcodeDemo',
          title: '低代码组件示例',
          group: '低代码组件',
          schema: lowcodeSchema as any,
          snippets: [{
            schema: {
              componentName: 'LowcodeDemo'
            },
          }]
        },
        {
          devMode: 'lowCode',
          componentName: 'SearchTable',
          title: '表格增删改查',
          group: '低代码组件',
          schema: searchTable as any,
          snippets: [{
            schema: {
              componentName: 'SearchTable'
            },
          }]
        }],
      })
    },
  };
}
lowcodePlugin.pluginName = 'lowcodePlugin';
lowcodePlugin.meta = {
};
export default lowcodePlugin;