const _toString = Object.prototype.toString
const _hasOwn = ({}).hasOwnProperty

/**
 * 是否是私有属性
 */
export function hasOwn(target, key) {
  return _hasOwn.call(target, key)
}

/**
 * 类型检查
 */
export function typeOf(value) {
  return _toString.call(value).match(/\[object\s+(.+)\]/)[1]
}

/*
* 深度合并多个对象
* @param target
* @param sources
* @returns {*}
*/
export function assign(target, ...sources) {
 for (let i = 0; i < sources.length; i++) {
   const source = sources[i]
   if (isPlainObject(source)) {
     for (let k in source) {
       if (hasOwn(source, k)) {
         if (isPlainObject(source[k])) {
           target[k] = assign({}, target[k], source[k])
         } else {
           target[k] = source[k]
         }
       }
     }
   }
 }
 return target
}

/**
 * 是否是对象
 */
export function isPlainObject(obj) {
  return typeOf(obj) === 'Object'
}
