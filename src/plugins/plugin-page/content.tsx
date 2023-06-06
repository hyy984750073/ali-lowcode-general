import * as React from 'react';
import { Nav } from '@alifd/next';
import { getSearchParam } from '../../utils/getUrlParams'

const { Item, SubNav } = Nav;
const { useState } = React;

const ContentPane =  () => {

  const defaultCurrentPage = getSearchParam('page');

  const onSelect = (selectedKeys: Array, item: Object, extra: Object) => {
    // console.log(selectedKeys)
    // console.log(item)
    console.log(extra['key'])
    // location.href = `/${location.pathname}?page=${extra['key']}`
    location.href = `/?page=${extra['key']}`
  }


  return (
    <Nav type="line" selectedKeys={[defaultCurrentPage]} onSelect={onSelect}>
      <Item icon="account" key={'home'}>首页</Item>
      <Item icon="account" key={'login'}>登录页</Item>
      {/* <Item disabled icon="account">
        Navigation Three
      </Item>
      <Item icon="account">Navigation Four</Item>
      <Item icon="account">Navigation Five</Item>
      <SubNav disabled icon="account" label="Sub Nav">
        <Item icon="account">Item 1</Item>
        <Item icon="account">Item 2</Item>
        <Item icon="account">Item 3</Item>
        <Item icon="account">Item 4</Item>
      </SubNav> */}
    </Nav>
  )
}

export default ContentPane;