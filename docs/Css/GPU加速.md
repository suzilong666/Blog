# GPU 加速

GPU 加速（硬件加速）是利用计算机的图形处理器（GPU）来渲染网页元素，特别是那些涉及动画、过渡和变换的操作，从而提高性能。

## 常用的 GPU 加速属性

1. transform
    - translate3d()
    - translateZ()
    - scale3d()
    - rotate3d()
    - matrix3d()
2. opacity
3. filter
    - blur()
    - grayscale()
    - contrast()
4. will-change（现代浏览器）

## 注意事项

1. 内存消耗：每个 GPU 层都会消耗显存
2. 字体模糊：某些情况下可能引起文本模糊
3. 电池消耗：移动设备上可能增加功耗
4. 层爆炸：创建过多复合层反而会降低性能




