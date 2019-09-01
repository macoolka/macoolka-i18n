---
title: types.ts
nav_order: 2
parent: Modules
---

# Overview

I18n type

---

<h2 class="text-delta">Table of contents</h2>

- [I18NLanguagePackage (interface)](#i18nlanguagepackage-interface)
- [I18NOption (interface)](#i18noption-interface)
- [MessageInfo (interface)](#messageinfo-interface)
- [MonidI18NParam (interface)](#monidi18nparam-interface)
- [MonidI18N (type alias)](#monidi18n-type-alias)
- [FormatMessage (export)](#formatmessage-export)

---

# I18NLanguagePackage (interface)

The define i18n locale and id and message
The Key is locale,Value is Record<ID,Message>

**Signature**

```ts
interface I18NLanguagePackage {}
```

**Example**

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

Added in v0.2.0

# I18NOption (interface)

Provide param when parse message

**Signature**

```ts
interface I18NOption {
  /**
   *language Package
   */
  data?: I18NLanguagePackage
  /**
   *default language
   */
  defaultLanguage?: string
  /**
   *suport languages
   */
  languages?: string[]
  /**
   *current locale
   */
  locale?: string
}
```

Added in v0.2.0

# MessageInfo (interface)

The define a message template.

**Signature**

```ts
interface MessageInfo {
  /**
   *The is a tag,It is unique string on the application
   */
  id: K
  /**
   *The is a record object,will be used when parse message
   */
  value?: T
}
```

**Example**

```ts
import { MessageInfo } from 'macoolka-i18n'
export const messageNotFound = (value: { id: string; locale: string }): MessageInfo => ({
  id: 'macoolka.i18n.errors.MessageNotFound',
  value
})
```

# MonidI18NParam (interface)

The Param for MonidI18N

**Signature**

```ts
interface MonidI18NParam {
  i18n?: I18NOption
}
```

Added in v0.2.0

# MonidI18N (type alias)

MonidI18N

**Signature**

```ts
export type MonidI18N<A = string> = R.Reader<MonidI18NParam, A>
```

Added in v0.2.0

# FormatMessage (export)

**Signature**

```ts
typeof FormatMessage
```
