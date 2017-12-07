# Draw2.js
一个基于h5 canvas实现的简单图形引擎。
### draw2.js 有什么用？
##### draw2.js 以现实事物来抽象。可以极大的方便你编写h5 canvas 代码。极大的方便了开发动画。

## demo
#### 创建一个Aplication
```javascript
  let app = new BApplication();
  app.createWindow(0,0,800,600,'1px solid #000',document.body,60);
  app.init();
```
#### 创建一个导演
```javascript
    let director = new BDirector();
    director.init(app);
```
#### 布置一个场景
```javascript
    let sceneLayer1 =new BScene(800,600);
```
#### 将场景加入 director 控制
```javascript
  director.addScene(sceneLayer1);
```

#### 创建一个精灵
```javascript
    let rectSprite1 = new BSprite(100,100);
```
#### 设置精灵的位置
```javascript
  rectSprite1.setPosition([100,100]);
```

#### 创建一个Action 并运行
```javascript
  let box = new BBollMove(4,4,[800,600]);
  rectSprite1.runAction(box);
```

#### 添加精灵到场景中
```javascript
    scene.addChild(rectSprite1)
```
#### 导演开始工作
```javascript
    director.run();
```

##### API 文档 https://github.com/348052148/Draw2.js/issues/1

#### 欢迎大家进行交流。邮箱: 34852148@qq.com
