---
title: index.ts
nav_order: 1
parent: 模块
---

# 概述

I18N

---

<h2 class="text-delta">目录</h2>

- [I18NValidation (常量)](#i18nvalidation-%E5%B8%B8%E9%87%8F)
- [MonidI18NMonoid (常量)](#monidi18nmonoid-%E5%B8%B8%E9%87%8F)
- [defaultOption (常量)](#defaultoption-%E5%B8%B8%E9%87%8F)
- [foldI18NOption (常量)](#foldi18noption-%E5%B8%B8%E9%87%8F)
- [i18ValidationMonoid (函数)](#i18validationmonoid-%E5%87%BD%E6%95%B0)
- [i18n (函数)](#i18n-%E5%87%BD%E6%95%B0)

---

# I18NValidation (常量)

Validation for MonidI18N

**签名**

```ts

export const I18NValidation: Monad2C<"Either", Reader<MonidI18NParam, string>> & Alt2C<"Either", Reader<MonidI18NParam, string>> = ...

```

v0.2.0 中添加

# MonidI18NMonoid (常量)

Monoid for MonidI18N

**签名**

```ts

export const MonidI18NMonoid: Monoid<MonidI18N> = ...

```

v0.2.0 中添加

# defaultOption (常量)

缺省的 i18n option

**签名**

```ts

export const defaultOption: I18NParam = ...

```

v0.2.0 中添加

# foldI18NOption (常量)

Fold for I18NOption

**签名**

```ts

export const foldI18NOption: (as: I18NOption[]) => I18NOption = ...

```

v0.2.0 中添加

# i18ValidationMonoid (函数)

Monoid for ValidationMonoid

**签名**

```ts

export const i18ValidationMonoid = <T>(empty: T) => ...

```

v0.2.0 中添加

# i18n (函数)

消息格式化到 MonidI18N

**签名**

```ts

export const i18n = <A extends MessageInfo = MessageInfo>(defaultParam: I18NOption) => (message: A | A[]): MonidI18N => (
  ({ i18n = {} }) => ...

```

**示例**

```ts
const options = {
  languages: ['en', 'zh'],
  defaultLanguage: 'en',
  locale: 'en',
  data: {
    en: {
      'macoolka.test.noparam': 'noparam',
      'macoolka.test.oneparam': 'one params {value}'
    },
    zh: {
      'macoolka.test.noparam': '没有参数',
      'macoolka.test.oneparam': '一个参数 {value}'
    }
  }
}
type Message = MessageInfo<keyof typeof options.data.en, { value: number }>
const formatI18N = buildi18n<Message>(options)

const formatNoParam = formatI18N({ id: 'macoolka.test.noparam', value: { value: 0 } })
it('no param', () => {
  expect(formatNoParam({})).toEqual('noparam')
  expect(formatNoParam({ i18n: { locale: 'zh' } })).toEqual('没有参数')
})
```
