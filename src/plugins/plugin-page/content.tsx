import * as React from 'react';
import { Nav, Button, Dialog, Form, Input } from '@alifd/next';
import { getSearchParam } from '../../utils/getUrlParams'
// import { getProjectSchemaFromLocalStorage, getPackagesFromLocalStorage } from '../../services/mockService';
import './index.scss';

const { Item, SubNav } = Nav;
const FormItem = Form.Item;
const { useState } = React;

interface RouteItem {
  key: string;
  name: string;
  path?: string;
  icon?: string;
}

const ContentPane =  () => {
  let pageList:Array<RouteItem> = window.localStorage.getItem('pageList') ? JSON.parse(window.localStorage.getItem('pageList') || '') : [
    {key: 'login', path: '', name: '登录页', icon: ''},
    {key: 'home', path: '', name: '首页', icon: ''},
    {key: 'list', path: '', name: '工作室审核', icon: ''},
  ]
  const [visible, setVisible] = useState(false);
  const [itemList, setItemList] = useState(pageList);


  const defaultCurrentPage = getSearchParam('page');

  const onSelect = (selectedKeys: Array, item: Object, extra: Object) => {
    location.href = `/?page=${extra['key']}`
  }

  const addPage = async (values:RouteItem) => {
    console.log(values)
    window.localStorage.setItem('pageList', JSON.stringify([...itemList, values]));
    await setItemList([...itemList, values])

    setVisible(false)
    location.href = `/?page=${values['key']}`
  }


  return (
    <>
      <Nav type="line" selectedKeys={[defaultCurrentPage]} onSelect={onSelect}>
        {
          itemList.length ? itemList.map((item: RouteItem) => {
            return <Item icon={item.icon || 'account'} key={item.key}>{item.name}</Item>
          }) : null
        }
      </Nav>
      <Button className='add-page-btn' type='primary' onClick={() => setVisible(true)}>新增页面</Button>
      <Dialog
        title="新增页面"
        visible={visible}
        style={{ width: "420px" }}
        footer={false}
        onClose={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      >
        <Form style={{ width: "375px" }} >
          <FormItem
            name="key"
            label="key"
            required
            requiredMessage="Please input your key!"
          >
            <Input name="key" />
          </FormItem>
          <FormItem
            name="name"
            label="name"
            required
            requiredMessage="Please input your name!"
          >
            <Input name="name" />
          </FormItem>
          <FormItem name="path" label="path">
            <Input name="path"  />
          </FormItem>
          <FormItem name="icon" label="icon">
            <Input name="icon" />
          </FormItem>
          <FormItem label=" " colon={false} className='submit-add-page-btn'>
            <Form.Reset>重置</Form.Reset>
            <Form.Submit
              type="primary"
              validate
              onClick={addPage}
              style={{ marginRight: 8 }}
            >
              提交
            </Form.Submit>
          </FormItem>
        </Form>
      </Dialog>
    </>
  )
}

export default ContentPane;