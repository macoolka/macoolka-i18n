---
title: index.ts
nav_order: 1
parent: Modules
---

# Overview

I18n

---

<h2 class="text-delta">Table of contents</h2>

- [I18NValidation (constant)](#i18nvalidation-constant)
- [MonidI18NMonoid (constant)](#monidi18nmonoid-constant)
- [defaultOption (constant)](#defaultoption-constant)
- [foldI18NOption (constant)](#foldi18noption-constant)
- [i18ValidationMonoid (function)](#i18validationmonoid-function)
- [i18n (function)](#i18n-function)

---

# I18NValidation (constant)

Validation for MonidI18N

**Signature**

```ts

export const I18NValidation: Monad2C<"Either", Reader<MonidI18NParam, string>> & Alt2C<"Either", Reader<MonidI18NParam, string>> = ...

```

Added in v0.2.0

# MonidI18NMonoid (constant)

Monoid for MonidI18N

**Signature**

```ts

export const MonidI18NMonoid: Monoid<MonidI18N> = ...

```

Added in v0.2.0

# defaultOption (constant)

default i18n option

**Signature**

```ts

export const defaultOption: I18NParam = ...

```

Added in v0.2.0

# foldI18NOption (constant)

Fold for I18NOption

**Signature**

```ts

export const foldI18NOption: (as: I18NOption[]) => I18NOption = ...

```

Added in v0.2.0

# i18ValidationMonoid (function)

Monoid for ValidationMonoid

**Signature**

```ts

export const i18ValidationMonoid = <T>(empty: T) => ...

```

Added in v0.2.0

# i18n (function)

build a message format to MonidI18N

**Signature**

```ts

export const i18n = <A extends MessageInfo = MessageInfo>(defaultParam: I18NOption) => (message: A | A[]): MonidI18N => (
  ({ i18n = {} }) => ...

```

**Example**

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
