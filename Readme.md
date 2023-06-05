### 资产包assets.json解读
1、package：用来做组件渲染，拿到组件实例去用的
  （1）定义的是组件的资源以及组件所依赖的其他资源，这些内容都会在引擎里面提前把他加载好，这样的话就可以通过window去拿到这些组件的实例；
  （2）怎么看：F12看element中的script有加载了哪些资源包
2、components：跟渲染没有关系，只是在搭建平台设计器用到
  （1）涉及到组件的右侧设计器面板的设置


### 一个组件选中之后，右侧的设计面板是怎么来的？
1、右侧面板其实是组件的属性；
2、其实是组件描叙协议定义的内容；
3、也就是资产包assets.json里的components；


### 源码组件实例package + 组件描述协议components = 设计器渲染 + 右侧属性设置（设计器）


### preview做什么：拿到全部schema + 源码组件实例package + 组件描述协议components

### 预览功能做好之后，怎么去把它部署到服务器端？
1、从demo项目中fork一个项目
2、本身会构建出几个文件出来
3、将这几个文件传到cdn
或者直接发布到npm包：
1、npm publish --access=publish     (也就是prepublishOnly命令)
2、一个好用的工具（知道npm包名就可以知道npm包里面有什么数据）：https://unpkg.com 或者 https://cdn.jsdeliver.net


### 组件资源
1、来自于：资产包assets.json定义的内容
2、如我要写一个组件，如何将它加到平台中？
  （1）把组件相关的资源和描述插入到assets.json对应的地方
  （2）因为assets.json是迭代的，动态的，所以放在项目中并不合适，可以放在oss上，然后在前端代码里面通过api动态的获取（建议）