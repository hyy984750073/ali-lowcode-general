import * as React from 'react';
import { Nav, Button, Dialog, Form, Input } from '@alifd/next';
import { getSearchParam } from '../../utils/getUrlParams'
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
    {key: 'home', path: '', name: '首页', icon: ''},
    {key: 'login', path: '', name: '登录页', icon: ''}
  ]
  const [visible, setVisible] = useState(false);
  const [itemList, setItemList] = useState(pageList);


  const defaultCurrentPage = getSearchParam('page');

  const onSelect = (selectedKeys: Array, item: Object, extra: Object) => {
    // console.log(selectedKeys)
    // console.log(item)
    // location.href = `/${location.pathname}?page=${extra['key']}`
    location.href = `/?page=${extra['key']}`
  }

  const addPage = async (values:RouteItem) => {
    console.log(values)
    setItemList([...itemList, values])

    setVisible(false)

    savePageToLocalStorage()
  }

  const savePageToLocalStorage = () => {
    window.localStorage.setItem('pageList', JSON.stringify(itemList));
  }


  return (
    <>
      <Nav type="line" selectedKeys={[defaultCurrentPage]} onSelect={onSelect}>
        {
          itemList.map((item: RouteItem) => {
            return <Item icon={item.icon || 'account'} key={item.key}>{item.name}</Item>
          })
        }
      </Nav>
      <Button className='add-page-btn' onClick={() => setVisible(true)}>新增页面</Button>
      <Dialog
        title="新增页面"
        visible={visible}
        style={{ width: "420px" }}
        footer={false}
        onClose={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        onOk={addPage}
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
          <FormItem
            name="path"
            label="path"
          >
            <Input  />
          </FormItem>
          <FormItem
            name="icon"
            label="icon"
          >
            <Input />
          </FormItem>
          <FormItem label=" " colon={false}>
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