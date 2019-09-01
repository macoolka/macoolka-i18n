---
title: types.ts
nav_order: 2
parent: 模块
---

# 概述

I18N 类型

---

<h2 class="text-delta">目录</h2>

- [I18NLanguagePackage (接口)](#i18nlanguagepackage-%E6%8E%A5%E5%8F%A3)
- [I18NOption (接口)](#i18noption-%E6%8E%A5%E5%8F%A3)
- [MessageInfo (接口)](#messageinfo-%E6%8E%A5%E5%8F%A3)
- [MonidI18NParam (接口)](#monidi18nparam-%E6%8E%A5%E5%8F%A3)
- [MonidI18N (类型)](#monidi18n-%E7%B1%BB%E5%9E%8B)
- [FormatMessage (导出)](#formatmessage-%E5%AF%BC%E5%87%BA)

---

# I18NLanguagePackage (接口)

i18n 语言包

定义了语言以及对应的消息 id 和消息格式。

**签名**

```ts
interface I18NLanguagePackage {}
```

**示例**

```ts
import { I18NLanguagePackage } from 'macoolka-i18n'
const languagePackage = {
  en: {
    'macoolka.i18n.errors.LanguageNotFound': 'Must provide a default locale({locale})',
    'macoolka.i18n.errors.MessageNotFound': 'Message ({id}) not found in locale({locale})'
  },
  zh: {
    'macoolka.i18n.errors.LanguageNotFound': '缺省语言({locale})没有发现',
    'macoolka.i18n.errors.MessageNotFound': '消息({id})没有定义，请核对语言包({locale})'
  }
}
```

v0.2.0 中添加

# I18NOption (接口)

解析消息时用到的参数

**签名**

```ts
interface I18NOption {
  /**
   *预定义的消息
   */
  data?: I18NLanguagePackage
  /**
   *缺省语言
   */
  defaultLanguage?: string
  /**
   *可用的语言
   */
  languages?: string[]
  /**
   *当前的语言
   */
  locale?: string
}
```

v0.2.0 中添加

# MessageInfo (接口)

消息模板

**签名**

```ts
interface MessageInfo {
  /**
   *这是一个标志，在应用程序中不能重复
   */
  id: K
  /**
   *在解析消息时用到的数据结构
   */
  value?: T
}
```

**示例**

```ts
import { MessageInfo } from 'macoolka-i18n'
export const messageNotFound = (value: { id: string; locale: string }): MessageInfo => ({
  id: 'macoolka.i18n.errors.MessageNotFound',
  value
})
```

# MonidI18NParam (接口)

MonidI18N 的参数

**签名**

```ts
interface MonidI18NParam {
  i18n?: I18NOption
}
```

v0.2.0 中添加

# MonidI18N (类型)

MonidI18N

**签名**

```ts
export type MonidI18N<A = string> = R.Reader<MonidI18NParam, A>
```

v0.2.0 中添加

# FormatMessage (导出)

**签名**

```ts
typeof FormatMessage
```
