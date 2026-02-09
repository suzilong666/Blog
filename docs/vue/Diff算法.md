# Diff算法

**为什么要使用Diff算法：** 高效地复用已有DOM节点，从而最小化DOM操作的成本（包括创建、删除、移动节点等）。

diff算法的核心是 **深度优先**，**同层比较**。同层比较使用了双端比较算法。

## 双端比较算法

```js
  // src/core/vdom/patch.js/404行 updateChildren方法
  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0; // 旧开始节点下标
    var newStartIdx = 0; // 新开始节点下标
    var oldEndIdx = oldCh.length - 1; // 旧结束节点下标
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1; // 新结束节点下标
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];

    // oldKeyToIdx 旧节点 key 到 index 的映射；{ key1 : 1, key2 : 2 }
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // `removeOnly` 是一个特殊标志，仅由 `<transition-group>` 使用确保被移除的元素保持在正确的相对位置在离开过渡期间
    var canMove = !removeOnly;

    if (process.env.NODE_ENV !== 'production') {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        // 1. 旧头 对比 新头
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        // 2. 旧尾 对比 新尾
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        // 3. 旧头 对比 新尾
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        // 4. 旧尾 对比 新头
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        // 创建旧节点 key 到 index 的映射
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) {
          // 新开始节点不在旧节点列表，那么就需要创建一个新元素并插入
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // 键相同但元素不同。视为新元素
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      // 旧节点遍历完，添加剩余新节点
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      // 新节点遍历完，删除剩余旧节点
      removeVnodes(oldCh, oldStartIdx, oldEndIdx);
    }
  }
```

## 双端算法



##  最长递增子序列

在 Vue 3 中，最长递增子序列（Longest Increasing Subsequence，LIS）算法主要用于在更新虚拟 DOM 时，高效地确定一组子节点中的最小移动操作。这发生在比较新旧子节点列表时，目的是尽可能地复用已有的节点，而不是销毁和重新创建。