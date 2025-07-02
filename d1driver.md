# D1Driver

A lightweight TypeScript wrapper providing a simple interface to interact with SQLite D1 databases within workerd runtime intended for prototyping. Reducing SQL boilerplate to get, create, update, and remove functions. Not interfering with sqlite functionality.

D1Driver is designed for [Cloudflare D1](https://developers.cloudflare.com/d1/) databases and provides a clean, TypeScript-friendly API for common database operations.

## Installation

Install the package using npm:

```bash
npm install @s32n/d1driver
```

## [Quick Start](#quick-start)

D1Driver exports four main functions for database operations:

- `get` - Retrieve records from a table
- `create` - Insert new records  
- `update` - Modify existing records
- `remove` - Delete records

## [Basic Usage Examples](#basic-usage-examples)

### [Setting up the Environment](#setting-up-environment)

First, define your environment interface for Cloudflare D1:

```typescript
interface Env {
  DB: D1Database;
}
```

### [Retrieving Data](#retrieving-data)

Get all records from a table:

```typescript
import { get } from '@s32n/d1driver'

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { results: posts } = await get(
    context.env.DB,
    "blog"
  );

  if(posts.length === 0) {
    return new Response("no blog post found", { status: 404 });
  }

  return Response.json(posts);
}
```

Get records with conditions:

```typescript
const { results: activePosts } = await get(
  context.env.DB,
  "blog",
  { status: "published", author_id: 123 }
);
```

Get specific fields:

```typescript
const { results: postTitles } = await get(
  context.env.DB,
  "blog",
  { status: "published" },
  "id, title, created_at"
);
```

### [Creating Records](#creating-records)

Insert a new record:

```typescript
import { create } from '@s32n/d1driver'

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const blogFormData = await context.request.formData();
  const newBlogPost = {
    title: blogFormData.get('title'),
    content: blogFormData.get('content'),
    image: blogFormData.get('imageUrl'),
    createdAt: "CURRENT_TIMESTAMP"
  }

  const { success, results } = await create(
      context.env.DB,
      "blog", 
      newBlogPost
  );

  if(success !== true) {
    return new Response("something went wrong", {
      status: 500,
    });
  }

  return Response.json(results.shift())
}
```

### [Updating Records](#updating-records)

Update existing records with conditions:

```typescript
import { update } from '@s32n/d1driver'

export const onRequestPatch: PagesFunction<Env> = async (context) => {
  const blogFormData = await context.request.formData();

  const conditions = { id: blogFormData.get('id') }
  const blogPostUpdates = {
    title: blogFormData.get('update-title'),
    content: blogFormData.get('update-content'),
    image: blogFormData.get('update-imageUrl'),
    updatedAt: "CURRENT_TIMESTAMP"
  }

  const { success, results } = await update(
      context.env.DB,
      "blog", 
      blogPostUpdates,
      conditions
  );

  if(success !== true) {
    return new Response("something went wrong", {
      status: 500,
    });
  }

  return Response.json(results.shift())
}
```

### [Deleting Records](#deleting-records)

Remove records from a table:

```typescript
import { remove } from '@s32n/d1driver'

export const onRequestDelete: PagesFunction<Env> = async (context) => {
  const blogFormData = await context.request.formData();

  const conditions = { id: blogFormData.get('id') }

  const { success } = await remove(
      context.env.DB,
      "blog", 
      conditions
  );

  if(success !== true) {
    return new Response("something went wrong", {
      status: 500,
    });
  }

  return new Response("successfully deleted blog post with id:" + conditions.id, {
    status: 200,
  });
}
```

## [API Reference](#api-reference)

### [get(DB, table, conditions?, fields?)](#get-function)

Retrieve records from a table.

**Parameters:**
- `DB: D1Database` - Cloudflare D1Database instance
- `table: string` - Table name
- `conditions?: object` - Object of conditions, e.g.: `{status: 1, username: "john"}`
- `fields?: string` - Comma separated field names, defaults to `*`

**Returns:** Promise with D1 query result containing `results` array

### [create(DB, table, entity)](#create-function)

Create a new record in a table.

**Parameters:**
- `DB: D1Database` - Cloudflare D1Database instance
- `table: string` - Table name  
- `entity: object` - Object model to be inserted, e.g.: `{ name: "john", surname: "doe", age: 44 }`

**Returns:** Promise with D1 query result containing the created record

### [update(DB, table, entity, conditions?)](#update-function)

Update existing records in a table.

**Parameters:**
- `DB: D1Database` - Cloudflare D1Database instance
- `table: string` - Table name
- `entity: object` - Object with fields to update, e.g.: `{ age: 45 }`
- `conditions?: object` - Object of conditions to match records for update

**Returns:** Promise with D1 query result

### [remove(DB, table, conditions?, softRemove?)](#remove-function)

Delete records from a table.

**Parameters:**
- `DB: D1Database` - Cloudflare D1Database instance
- `table: string` - Table name
- `conditions?: object` - Object of conditions, e.g.: `{status: 1, username: "john"}`
- `softRemove?: boolean` - If true, sets `deletedAt` timestamp instead of deleting

**Returns:** Promise with D1 query result

## [Advanced Features](#advanced-features)

### [Handling NULL Values](#handling-null-values)

D1Driver automatically handles NULL values in conditions:

```typescript
// This will generate: WHERE status IS NULL
const { results } = await get(DB, "users", { status: null });
```

### [Timestamp Handling](#timestamp-handling)

Use `"CURRENT_TIMESTAMP"` string for automatic timestamp insertion:

```typescript
const newPost = {
  title: "My Post",
  content: "Post content",
  createdAt: "CURRENT_TIMESTAMP"  // Will use SQLite's CURRENT_TIMESTAMP
};
```

### [Soft Delete](#soft-delete)

Enable soft deletes by setting `softRemove: true`:

```typescript
// Sets deletedAt timestamp instead of removing the record
await remove(DB, "users", { id: 123 }, true);
```

## [What D1Driver Doesn't Do](#limitations)

::: warning Important Limitations
D1Driver is designed to be lightweight and focused. It **does not**:

- Create migrations or prepare schema for your database
- Perform validation or sanitization of parameters  
- Provide ORM features like relationships or complex queries
- Handle database connections or configuration
:::

For schema management, validation, and complex queries, you should use the native D1 API alongside D1Driver or consider a full ORM solution.

## [Repository](#repository)

Visit the [D1Driver GitHub repository](https://github.com/simultsop/d1driver) for source code, issues, and contributions.

## [License](#license)

MIT License - see the repository for full license details.